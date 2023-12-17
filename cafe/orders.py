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
