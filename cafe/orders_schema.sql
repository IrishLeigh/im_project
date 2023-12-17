-- create order

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrder`(
    IN p_customerId INT,
    IN p_orderDate VARCHAR(10),
    IN p_orderTime VARCHAR(20),
    IN p_productId INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_orderId INT;  -- Declare variable at the beginning
    DECLARE v_orderDetailId INT;

    -- Check if the quantity is greater than 0
    IF p_quantity > 0 THEN
        -- Check if the customer already exists
        IF EXISTS (SELECT 1 FROM customer WHERE customerId = p_customerId) THEN
            -- Insert into order table
            INSERT INTO `order` (customerId, orderDate, orderTime, status)
            VALUES (p_customerId, p_orderDate, p_orderTime, 'Pending');

            -- Get the last inserted orderId
            SET v_orderId = LAST_INSERT_ID();

            -- Insert into orderdetails table
            INSERT INTO orderdetails (orderId, productId, quantity)
            VALUES (v_orderId, p_productId, p_quantity);

            -- Get the last inserted orderDetailId
            SET v_orderDetailId = LAST_INSERT_ID();

            -- Update order table with the corresponding orderDetailId
            UPDATE `order` SET orderDetailId = v_orderDetailId WHERE orderId = v_orderId;

            -- Update orderdetails table with the corresponding orderId
            UPDATE orderdetails SET orderId = v_orderId WHERE orderDetailId = v_orderDetailId;

            -- Return the orderId as a result set
            SELECT v_orderId AS orderId;
        ELSE
            -- Handle the case when the customer does not exist
            -- You can raise an error, log a message, or take appropriate action
            -- For now, I'll just return an error message
            SELECT 'Customer does not exist' AS error_message;
        END IF;
    ELSE
        -- Handle the case when quantity is 0 or less
        SELECT 'Quantity must be greater than 0' AS error_message;
    END IF;
END

---READ (VIEWS)

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `order_view` AS
    SELECT 
        `o`.`customerId` AS `customerId`,
        `c`.`fName` AS `fName`,
        `c`.`lName` AS `lName`,
        `o`.`orderDate` AS `orderDate`,
        `o`.`orderTime` AS `orderTime`,
        `o`.`status` AS `status`,
        `od`.`orderDetailId` AS `orderDetailId`,
        `o`.`orderId` AS `orderId`,
        `c`.`tblNum` AS `tblNum`,
        `p`.`productId` AS `productId`,
        `p`.`productName` AS `productName`,
        `od`.`quantity` AS `quantity`,
        `p`.`price` AS `price`,
        `c`.`isPaid` AS `isPaid`
    FROM
        (((`order` `o`
        JOIN `customer` `c` ON ((`o`.`customerId` = `c`.`customerId`)))
        JOIN `orderdetails` `od` ON ((`o`.`orderId` = `od`.`orderId`)))
        JOIN `products` `p` ON ((`od`.`productId` = `p`.`productId`)))



--  UPDATE PRODUCT AND QTY

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateOrder`(
    IN p_orderId INT,
    IN p_newProductId INT,
    IN p_newQuantity INT
)
BEGIN
    -- Check if the order with the given orderId exists
    IF NOT EXISTS (SELECT 1 FROM `order` WHERE orderId = p_orderId) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Order does not exist';
    END IF;

    -- Update order table
    UPDATE `order`
    SET orderDate = CURRENT_DATE(),  -- Updated line to set current date
        orderTime = CURRENT_TIME()  -- Updated line to set current time
    WHERE orderId = p_orderId;

    -- Update orderdetails table
    UPDATE orderdetails
    SET productId = p_newProductId,
        quantity = p_newQuantity
    WHERE orderId = p_orderId;

    -- Return the updated order details as a result set
    SELECT
        o.customerId,
        c.fName,
        c.lName,
        od.orderDetailId,
        o.orderId,
        c.tblNum,
        od.productId,  -- Updated line to use productId from orderdetails
        p.productName,
        od.quantity,
        p.price
    FROM `Order` AS o
    INNER JOIN customer AS c ON o.customerId = c.customerId
    INNER JOIN OrderDetails AS od ON o.orderId = od.orderId
    INNER JOIN products AS p ON od.productId = p.productId
    WHERE o.orderId = p_orderId;

END
--- UPDATE ORDER STATUS

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateOrderStatus`(
    IN p_orderId INT,
    IN p_newStatus VARCHAR(255)
)
BEGIN
    -- Check if the order with the given orderId exists
    IF NOT EXISTS (SELECT 1 FROM `order` WHERE orderId = p_orderId) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Order does not exist';
    END IF;

    -- Update order table with the new status
    UPDATE `order`
    SET status = p_newStatus
    WHERE orderId = p_orderId;

    -- Return the updated order details as a result set
    SELECT
        o.customerId,
        c.fName,
        c.lName,
        od.orderDetailId,
        o.orderId,
        c.tblNum,
        od.productId,
        p.productName,
        od.quantity,
        p.price
    FROM `Order` AS o
    INNER JOIN customer AS c ON o.customerId = c.customerId
    INNER JOIN OrderDetails AS od ON o.orderId = od.orderId
    INNER JOIN products AS p ON od.productId = p.productId
    WHERE o.orderId = p_orderId;

END

--- DELETE
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteOrderAndDetails`(IN p_orderId INT)
BEGIN
    -- Declare variable
    DECLARE v_orderStatus VARCHAR(20);

    -- Temporarily remove the foreign key check
    SET foreign_key_checks = 0;

    -- Retrieve order status before deleting order and details
    SELECT status
    INTO v_orderStatus
    FROM `order`
    WHERE orderId = p_orderId;

    -- Check if the status is not 'Served'
    IF v_orderStatus IS NOT NULL AND v_orderStatus != 'Served' THEN
        -- Delete from orderdetails first
        DELETE FROM orderdetails
        WHERE orderId = p_orderId;

        -- Delete the order itself
        DELETE FROM `order`
        WHERE orderId = p_orderId;

        -- Restore the foreign key check
        SET foreign_key_checks = 1;

        -- Return a success message
        SELECT 'Order and details successfully deleted' AS message;
    ELSE
        -- Restore the foreign key check
        SET foreign_key_checks = 1;

        -- Return a message indicating that the order cannot be deleted
        SELECT 'Cannot delete. Order does not exist or status is "Served".' AS message;
    END IF;
END

---TRIGGER

DELIMITER //
CREATE TRIGGER after_order_update
AFTER UPDATE ON order
FOR EACH ROW
BEGIN
    -- Check if the 'status' column is updated to 'served'
    IF NEW.`status` = 'served' AND OLD.`status` != 'served' THEN
        SET @total_amount = 0;

        -- Calculate the payment amount and get the newly generated paymentId
        CALL calculate_payment_amount(NEW.orderId, NULL, @total_amount);

        -- Check if the total amount is not null before inserting into 'payment' table
        IF @total_amount IS NOT NULL THEN
            -- Insert a new row into the 'payment' table
            INSERT INTO payment (orderId, amount, status)
            VALUES (NEW.orderId, @total_amount, 'Pending'); -- You can set the default status as needed
        END IF;
    END IF;
END //
DELIMITER ;