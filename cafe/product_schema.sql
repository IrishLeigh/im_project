

--STORED PROCEDURES

--Create product

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_product`(
  IN p_productName VARCHAR(255),
  IN p_description TEXT,
  IN p_price DECIMAL(10,2)
)
BEGIN
  DECLARE p_productId INT;
  
  -- Use the correct table name 'products'
  INSERT INTO products (productName, description, price)
    VALUES (p_productName, p_description, p_price);
  
  SET p_productId = LAST_INSERT_ID();
  SELECT p_productId AS id;
END

--