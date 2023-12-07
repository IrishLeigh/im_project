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
    print(data)
    cur = execute("""CALL CreatePayment(%s)""", (data["orderId"],))

    # Assuming you have a view or another way to retrieve the created payment details
    result = fetchone("""
        SELECT
            p.paymentId,
            p.orderId,
            p.amount,
            p.status
        FROM payment AS p
        WHERE p.orderId = LAST_INSERT_ID()
    """)

    success_message = "Payment successfully processed!"

    return {"data": result, "message": success_message}

def get_all_payment():
    rv = fetchall(""" SELECT * FROM payment_view """)
    return rv

def get_payment_by_id(paymentId):
    rv = fetchone("""SELECT * FROM payment_view WHERE paymentId = %s""", (paymentId,))
    return rv

def update_payment(paymentId, data):
    cur = execute("CALL UpdatePaymentStatus (%s)", (data["paymentId"],))
    row = cur.fetchone()
    data["paymentId"] = row["paymentId"]
    return data

def delete_payment(payment_id):
    for index, payment_entry in enumerate(payment):
        if payment_entry["id"] == int(payment_id):
            # @TODO replace this with a database call (DELETE)
            payment.pop(index)
            return True
    return False
