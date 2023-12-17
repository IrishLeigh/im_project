from database import fetchall, fetchone, execute


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
    cur = execute("""CALL update_payment(%s, %s)""", (paymentId, data["status"]))
    row = cur.fetchone()
    data["paymentId"] = row["paymentId"]  # Assuming the returned
    return data
