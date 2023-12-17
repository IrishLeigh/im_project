-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dbcafe
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `archivedcustomer`
--

LOCK TABLES `archivedcustomer` WRITE;
/*!40000 ALTER TABLE `archivedcustomer` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivedcustomer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (14,'sdfdsfdsfd','asdsadasd','1',1),(16,'Trigger','Test','4',1),(17,'test','case','12',1),(18,'test case','case','5',1),(19,'ascascsc','asdcasdcas','3',1),(20,'Irish','San Juan','14',1),(21,'Irish','San Juan','10',1),(27,'Irish','San Juan','1',1),(28,'test','test','12',1),(29,'Irish Leigh','San Juan','4',1),(30,'Jane','Doe','10',1),(31,'Jane','Doe','14',1),(32,'Irish ','San Juan','4',1),(33,'Jane','Doe','14',1),(35,'Irish','San Juan','4',1),(36,'Jane','Doe','10',1),(39,'Jane','Doe','10',1),(41,'Irish','San Juan','4',1),(43,'Jane','Doe','10',1),(44,'John ','Doe','14',1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (63,16,'04/12/2023','11:35','Pending',64,1),(65,14,'2023-12-15','10:03:24 PM','Served',66,1),(66,14,'2023-12-15','10:03:26 PM','Served',67,1),(67,17,'2023-12-15','10:07:56 PM','Served',68,1),(68,18,'2023-12-15','10:16:28 PM','Served',69,1),(69,19,'2023-12-15','10:19:36 PM','Served',70,1),(70,19,'2023-12-16','12:10:20 PM','Served',71,1),(71,20,'2023-12-16','12:16:43 PM','Served',72,1),(72,21,'2023-12-16','12:51:21 PM','Served',73,1),(74,27,'2023-12-16','1:58:45 PM','Served',75,1),(75,28,'2023-12-16','1:59:54 PM','Served',76,1),(76,29,'2023-12-16','2:09:41 PM','Served',77,1),(77,30,'2023-12-16','2:09:47 PM','Served',78,1),(78,31,'2023-12-16','2:12:36 PM','Served',79,1),(79,32,'2023-12-16','2:12:49 PM','Served',80,1),(80,33,'2023-12-16','2:15:54 PM','Served',81,1),(82,36,'2023-12-16','2:25:06 PM','Served',83,1),(83,35,'2023-12-16','2:38:46 PM','Served',84,1),(85,39,'2023-12-16','8:54:08 PM','Served',86,1),(86,39,'2023-12-16','8:58:27 PM','Served',87,1),(87,41,'2023-12-16','9:03:31 PM','Served',88,NULL),(93,44,'12/16/23','11:09 PM','Served',94,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_order_update` AFTER UPDATE ON `order` FOR EACH ROW BEGIN
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
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (64,63,2,5),(66,65,2,2),(67,66,1,1),(68,67,1,2),(69,68,1,1),(70,69,1,1),(71,70,1,1),(72,71,1,1),(73,72,1,1),(75,74,1,2),(76,75,1,1),(77,76,1,1),(78,77,1,2),(79,78,1,2),(80,79,2,2),(81,80,1,1),(83,82,3,2),(84,83,1,1),(86,85,1,50),(87,86,1,2),(88,87,1,2),(94,93,1,3);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (37,66,170.00,'Paid',NULL),(38,65,350.00,'Paid',NULL),(39,67,340.00,'Paid',NULL),(40,68,170.00,'Paid',NULL),(41,69,170.00,'Paid',NULL),(42,70,170.00,'Paid',NULL),(43,71,170.00,'Paid',NULL),(44,72,170.00,'Paid',NULL),(45,74,340.00,'Paid',NULL),(46,75,170.00,'Paid',NULL),(47,77,340.00,'Paid',NULL),(48,76,170.00,'Paid',NULL),(49,78,340.00,'Paid',NULL),(50,79,350.00,'Paid',NULL),(51,80,170.00,'Paid',NULL),(52,82,240.00,'Paid',NULL),(53,83,170.00,'Paid',NULL),(54,85,8500.00,'Paid',NULL),(55,86,340.00,'Paid',NULL),(56,87,340.00,'Pending',NULL),(58,93,510.00,'Paid',NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_payment_update` AFTER UPDATE ON `payment` FOR EACH ROW BEGIN
    DECLARE custId INT;

    IF NEW.status = 'Paid' AND OLD.status != 'Paid' THEN
        -- Get customerId based on orderId from payment
        SELECT orderId INTO custId FROM payment WHERE paymentId = NEW.paymentId;
        
        -- Update customer table
        UPDATE customer
        SET isPaid = TRUE
        WHERE customerId = custId;

        -- Update order table
        UPDATE `order`
        SET isPaid = TRUE
        WHERE orderId = custId;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_payment_status_update` AFTER UPDATE ON `payment` FOR EACH ROW BEGIN
    IF NEW.status = 'Paid' AND OLD.status <> 'Paid' THEN
        -- Update isPaid column in order table
        UPDATE `order` SET isPaid = TRUE WHERE orderId = NEW.orderId;

        -- Update isPaid column in customer table
        UPDATE customer SET isPaid = TRUE WHERE customerId = (SELECT customerId FROM `order` WHERE orderId = NEW.orderId);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Caffee Latte','Fresh brewed espresso and steamed milk',170.00,'caffe_latte.jpg'),(2,'Caffee Mocha','Espresso, chocolate, steamed milk, whipped cream',175.00,'caffe_mocha.jpg'),(3,'CAPPUCCINO','Espresso, and smoothed Layer of Foam',120.00,'cappuccino.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `unavailableproducts`
--

LOCK TABLES `unavailableproducts` WRITE;
/*!40000 ALTER TABLE `unavailableproducts` DISABLE KEYS */;
INSERT INTO `unavailableproducts` VALUES (1,'machaito','asdasdasdasdadasdasda',170.00);
/*!40000 ALTER TABLE `unavailableproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbcafe'
--

--
-- Dumping routines for database 'dbcafe'
--
/*!50003 DROP PROCEDURE IF EXISTS `calculate_payment_amount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_payment_amount`(IN orderId INT, IN paymentId INT, OUT total_amount DECIMAL(10, 2))
BEGIN
    DECLARE total DECIMAL(10, 2);

    -- Initialize total amount
    SET total = 0;

    -- Calculate total amount for the given order
    SELECT SUM(p.price * od.quantity)
    INTO total
    FROM orderdetails od
    JOIN products p ON od.productId = p.productId
    WHERE od.orderId = orderId;

    -- Update the payment table with the calculated amount for the specific paymentId
    UPDATE payment
    SET amount = total
    WHERE orderId = orderId AND paymentId = paymentId;

    -- Set the output parameter
    SET total_amount = total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreatePayment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

    IF v_customerId IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Order does not exist';
    END IF;
 
    -- Check if the order is in 'Served' status
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

    -- Additional steps or messages if needed
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteOrderAndDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

        -- If needed, you can perform additional actions here

        -- Return a success message
        SELECT 'Order and details successfully deleted' AS message;
    ELSE
        -- Restore the foreign key check
        SET foreign_key_checks = 1;

        -- Return a message indicating that the order cannot be deleted
        SELECT 'Cannot delete. Order does not exist or status is "Served".' AS message;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteOrderWithDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteOrderWithDetails`(IN p_orderId INT)
BEGIN
    -- Delete from orderdetails
    DELETE FROM orderdetails WHERE orderId = p_orderId;

    -- Delete from order
    DELETE FROM `order` WHERE orderId = p_orderId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_paid_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_paid_order`(
  IN p_paymentId INT
)
BEGIN
  DECLARE payment_status VARCHAR(255);
  DECLARE order_id INT;

  -- Get the payment status and order ID based on paymentId
  SELECT status, orderId INTO payment_status, order_id
  FROM payment
  WHERE paymentId = p_paymentId;

  -- Check if payment status is 'Paid'
  IF payment_status = 'Paid' THEN
    -- Delete corresponding row from payment
    DELETE FROM payment WHERE paymentId = p_paymentId;

    -- Delete corresponding rows from orderdetails
    DELETE FROM orderdetails WHERE orderId = order_id;

    -- Delete corresponding row from order
    DELETE FROM `order` WHERE orderId = order_id;

    -- Delete corresponding row from customer
    DELETE FROM customer WHERE customerId = (
        SELECT customerId FROM `order` WHERE orderId = order_id
    );

    -- Return success message or result if needed
    SELECT 'Successfully Deleted' AS message;

  ELSE
    -- Return a message indicating payment is not 'Paid'
    SELECT 'Payment is not Paid, cannot delete' AS message;
  END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product`(IN p_productId INT)
BEGIN
  -- Declare variables to store product details
  DECLARE p_productName VARCHAR(255);
  DECLARE p_description TEXT;
  DECLARE p_price DECIMAL(10, 2);

  -- Get product details before deleting from products table
  SELECT productName, description, price
  INTO p_productName, p_description, p_price
  FROM products
  WHERE productId = p_productId;

  -- Move the product to UnavailableProducts table
  INSERT INTO UnavailableProducts (productId, productName, description, price)
  VALUES (p_productId, p_productName, p_description, p_price);

  -- Delete the product from products table
  DELETE FROM products WHERE productId = p_productId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateOrderStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_payment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
    
  ELSE
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Order is not served, cannot update payment';
  END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_product`(
  IN p_productId INT,
  IN p_productName varchar(255),
  IN p_description text,
  IN p_price decimal(10,2)
)
BEGIN
  UPDATE products
  SET
    productName = p_productName,
    `description` = p_description,
    price = p_price
  WHERE productId= p_productId;
  SELECT p_productId AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-17 14:19:32
