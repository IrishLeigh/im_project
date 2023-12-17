--CREATE
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_customer`(
  IN p_fName varchar(255),
  IN p_lName varchar(255),
  IN p_tblNum varchar(15)
)
BEGIN
  DECLARE p_customerId INT;
  INSERT INTO customer (fName, lName, tblNum)
    VALUES (p_fName, p_lName, p_tblNum);
  SET p_customerId = LAST_INSERT_ID();
  SELECT p_customerId AS id;
END

--UPDATE
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_customer`(
  IN p_customerId INT,
  IN p_fName varchar(255),
  IN p_lName varchar(255),
  IN p_tblNum varchar(15)
)
BEGIN
  UPDATE customer
  SET
    fName = p_fName,
    lName = p_lName,
    tblNum = p_tblNum
  WHERE customerId = p_customerId;
  SELECT p_customerId AS id;
END


--DELETE

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_customer`(IN p_customerId INT)
BEGIN
  -- Check if the customer has any orders
  IF EXISTS (SELECT 1 FROM `order` WHERE customerId = p_customerId) THEN
    -- Customer has orders, return a message
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Customer has existing orders. Check the status of the order.';
  ELSE
    -- No orders, delete from the customer table
    DELETE FROM customer WHERE customerId = p_customerId;
    -- Return success message
    SELECT 'Customer successfully deleted' AS message;
  END IF;
END

--

---NO TRIGGER YET FOR THIS ENTITY