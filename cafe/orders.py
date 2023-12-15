# perform queries here
from database import fetchall,fetchone ,execute
# assume this is from a database
orders = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "johndoea@gmail.com",
        "password": "123456"
    },
    {
        "id": 2,
        "name": "Jane May",
        "email": "jane@gmail.com",
        "password": "123456"
    }
]
"""

CREATE VIEW order_view AS
    SELECT
        o.customerId,
        c.fName,
        c.lName,
        o.orderDate,
        o.orderTime,
        od.orderDetailId,
        o.orderId,
        c.tblNum,
        p.productId,
        p.productName,
        od.quantity,
        p.price
    FROM `Order` AS o
    INNER JOIN customer AS c ON o.customerId = c.customerId
    INNER JOIN OrderDetails AS od ON o.orderId = od.orderId
    INNER JOIN products AS p ON od.productId = p.productId;

DELIMITER //

CREATE PROCEDURE CreateOrder(
    IN p_customerId INT,
    IN p_fName VARCHAR(255),
    IN p_lName VARCHAR(255),
    IN p_orderDate VARCHAR(10),
    IN p_orderTime VARCHAR(8),
    IN p_productId INT,
    IN p_quantity INT,
    IN p_tblNum VARCHAR(15)
)
BEGIN
    DECLARE v_orderId INT;  -- Declare variable at the beginning

    -- Check if the customer already exists
    IF NOT EXISTS (SELECT 1 FROM customer WHERE customerId = p_customerId) THEN
        -- Insert into customer table
        INSERT INTO customer (customerId, fName, lName, tblNum)
        VALUES (p_customerId, p_fName, p_lName, p_tblNum);
    END IF;

    -- Insert into order table
    INSERT INTO `order` (customerId, orderDate, orderTime, status)
    VALUES (p_customerId, p_orderDate, p_orderTime, 'Pending');

    -- Get the last inserted orderId
    SET v_orderId = LAST_INSERT_ID();

    -- Insert into orderdetails table
    INSERT INTO orderdetails (orderId, productId, quantity)
    VALUES (v_orderId, p_productId, p_quantity);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CreateOrder(
    IN p_customerId INT,
    IN p_fName VARCHAR(255),
    IN p_lName VARCHAR(255),
    IN p_orderDate VARCHAR(10),
    IN p_orderTime VARCHAR(8),
    IN p_productId INT,
    IN p_quantity INT,
    IN p_tblNum VARCHAR(15)
)
BEGIN
    DECLARE v_orderId INT;  -- Declare variable at the beginning

    -- Check if the customer already exists
    IF NOT EXISTS (SELECT 1 FROM customer WHERE customerId = p_customerId) THEN
        -- Insert into customer table
        INSERT INTO customer (customerId, fName, lName, tblNum)
        VALUES (p_customerId, p_fName, p_lName, p_tblNum);
    END IF;

    -- Insert into order table
    INSERT INTO `order` (customerId, orderDate, orderTime, status)
    VALUES (p_customerId, p_orderDate, p_orderTime, 'Pending');

    -- Get the last inserted orderId
    SET v_orderId = LAST_INSERT_ID();

    -- Insert into orderdetails table
    INSERT INTO orderdetails (orderId, productId, quantity)
    VALUES (v_orderId, p_productId, p_quantity);

    -- Update order table with the corresponding orderDetailId
    UPDATE `order` SET orderDetailId = v_orderId WHERE orderId = v_orderId;

    -- Return the orderId as a result set
    SELECT v_orderId AS orderId;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE UpdateOrder(
    IN p_orderId INT,
    IN p_newOrderDate VARCHAR(10),
    IN p_newOrderTime VARCHAR(8),
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
    SET orderDate = p_newOrderDate,
        orderTime = p_newOrderTime
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
        o.orderDate,
        o.orderTime,
        od.orderDetailId,
        o.orderId,
        c.tblNum,
        p.productId,
        p.productName,
        od.quantity,
        p.price
    FROM `Order` AS o
    INNER JOIN customer AS c ON o.customerId = c.customerId
    INNER JOIN OrderDetails AS od ON o.orderId = od.orderId
    INNER JOIN products AS p ON od.productId = p.productId
    WHERE o.orderId = p_orderId;

END //

DELIMITER ;
"""
def create_order(data):
    cur = execute("""CALL CreateOrder(%s, %s, %s, %s, %s)""",
(
        data["customerId"],
        data["orderDate"],
        data["orderTime"],
        data["productId"],
        data["quantity"],
    ))

    # Assuming you have a view or another way to retrieve the created order details
    row = cur.fetchone()
    data["orderId"] = row["orderId"]
    return data

    #success_message = "Order successfully created!"
    #return { "message": success_message}


def get_all_orders():
    rv = fetchall(
        """
        SELECT * from order_view
        """)
    return rv

def get_order_by_id(id):
    rv = fetchall("""SELECT * FROM order_view WHERE orderId = %s""", (id,))
    return rv


#def get_order_by_id(id):
    #rv = fetchone("""SELECT * FROM order_view #WHERE orderId = %s""", (id,))
    #return rv



def update_order(id, data):
    cur = execute("""CALL UpdateOrder(%s, %s, %s)""",
                   (
                    id,
                   data["productId"],
                   data["quantity"]
                   ))
 
    row = cur.fetchone()
    data["id"] = row["orderId"]
    return data

def update_orderStatus(id, data):
    cur = execute("""CALL UpdateOrderStatus(%s, %s)""", (id, data["status"]))
    row = cur.fetchone()
    data["id"] = row["orderId"]
    return data


def delete_order(id):
  cur = execute("""CALL DeleteOrderAndDetails(%s)""", (id,))
  row = cur.fetchone()
  return row['message']
