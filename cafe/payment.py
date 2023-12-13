from database import fetchall, fetchone, execute

# assume this is from a database
payment = [
    {
        "paymentId": 1,
        "orderId": 1,
        "amount": 39
    },
    {
        "paymentId": 2,
        "orderId": 2,
        "amount": 39
    },
    
]

""""
CREATE VIEW payment_view AS
SELECT
  payment.id,
  payment.paymentId,
  order.orderId,
  payment.amount
FROM
  payment
INNER JOIN
  order ON payment.orderId = order.id;
"""

def create_payment(data):
    cur = execute("CALL CreatePayment(%s)", (data["orderId"],))
    row = cur.fetchone()
    data["id"] = row["paymentId"]  # Use the correct column name from the 
    return data

def get_all_payment():
    rv = fetchall(""" SELECT * FROM payment_view """)
    return rv

def get_payment_by_id(paymentId):
    rv = fetchone("""SELECT * FROM payment_view WHERE paymentId = %s""", (paymentId,))
    return rv

def update_payment(paymentId, data):
    cur = execute("""CALL update_payment(%s, %s)""", (paymentId, data["status"]))
    row = cur.fetchone()
    data["paymentId"] = row["paymentId"]  # Assuming the returned
    return data

def delete_payment(payment_id):
    for index, payment_entry in enumerate(payment):
        if payment_entry["id"] == int(payment_id):
            # @TODO replace this with a database call (DELETE)
            payment.pop(index)
            return True
    return False
