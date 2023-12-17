--TRIGGER FROM ORDERS

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

--CREATE

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreatePayment`(
    IN p_orderId INT
)
BEGIN
    DECLARE v_totalAmount DECIMAL(10, 2);
    DECLARE v_customerId INT;
    DECLARE v_tblNum VARCHAR(15);
 
    -- Check if the order with the given orderId exists
    SELECT customerId, tblNum
    INTO v_customerId, v_tblNum
    FROM `order`
    WHERE orderId = p_orderId;
-- Check if the order does not exists 
    IF v_customerId IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Order does not exist';
    END IF;
 
    -- Check if the order is in 'Served' status
    -- If not served it will send a message
    IF (SELECT status FROM `order` WHERE orderId = p_orderId) <> 'Served' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Payment can only be processed for served orders';
    END IF;
 
    -- Calculate the total amount based on order details quantity and product price
    SELECT SUM(od.quantity * p.price)
    INTO v_totalAmount
    FROM orderdetails AS od
    INNER JOIN products AS p ON od.productId = p.productId
    WHERE od.orderId = p_orderId;
 
    -- Insert payment into the payment table
    INSERT INTO payment (orderId, amount, status)
    VALUES (p_orderId, v_totalAmount, 'Pending');

    -- Return result set for payment table
    SELECT * FROM payment WHERE orderId = p_orderId;

    -- Return result set with customerId and tblNum
    SELECT v_customerId AS customerId, v_tblNum AS tblNum;

END

--READ (we used VIEWS)

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `payment_view` AS
    SELECT 
        `payment`.`paymentId` AS `paymentId`,
        `order`.`orderId` AS `orderId`,
        `order`.`customerId` AS `customerId`,
        `customer`.`fName` AS `fName`,
        `customer`.`lName` AS `lName`,
        `customer`.`tblNum` AS `tblNum`,
        `payment`.`amount` AS `amount`,
        `payment`.`status` AS `status`
    FROM
        ((`payment`
        JOIN `order` ON ((`payment`.`orderId` = `order`.`orderId`)))
        JOIN `customer` ON ((`order`.`customerId` = `customer`.`customerId`)))


---UPDATE

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_payment`(
  IN p_paymentId INT,
  IN p_status VARCHAR(255)
)
BEGIN
  DECLARE orderStatus VARCHAR(255);

  -- Get the order status based on paymentId
  SELECT `status` INTO orderStatus
  FROM `order`
  WHERE orderId = (SELECT orderId FROM payment WHERE paymentId = p_paymentId) LIMIT 1;

  -- Check if the order status is 'Served'
  IF orderStatus = 'Served' THEN
    -- Update the payment status to 'Paid' based on paymentId
    UPDATE payment
    SET status = 'Paid'
    WHERE paymentId = p_paymentId;

    -- Return the updated payment row
    SELECT *
    FROM payment
    WHERE paymentId = p_paymentId;
    -- If the stattus is not served, it cannot update payment
  ELSE
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Order is not served, cannot update payment';
  END IF;
END

--TRIGGER 

DELIMITER //

CREATE TRIGGER after_payment_status_update
AFTER UPDATE ON payment
FOR EACH ROW
BEGIN
      --If the payment status is PAID
    IF NEW.status = 'Paid' AND OLD.status <> 'Paid' THEN
        -- Update isPaid column in order table to TRUE
        UPDATE `order` SET isPaid = TRUE WHERE orderId = NEW.orderId;

        -- Update isPaid column in customer table to TRUE
        UPDATE customer SET isPaid = TRUE WHERE customerId = (SELECT customerId FROM `order` WHERE orderId = NEW.orderId);
    END IF;
END;
//

DELIMITER ;

















