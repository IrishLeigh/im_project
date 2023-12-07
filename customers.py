from database import fetchall, fetchone, execute

def create_customer(data):
    cur = execute("""CALL create_customer(%s, %s, %s)""", 
    (data["fName"], data["lName"], data["tblNum"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data
    
def get_all_customers():
    rv = fetchall("""SELECT * FROM customer""")
    return rv

def get_customer_by_id(id):
    rv = fetchone("""SELECT * FROM customer WHERE customerId = %s""", (id,))
    return rv

def update_customer(id, data):
    cur = execute("""CALL update_customer(%s, %s, %s, %s)""",
    (id, data["fName"], data["lName"], data["tblNum"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data

def delete_customer(id):
    cur = execute("""CALL delete_customer(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return "Customer has been deleted successfully"
    return "Unable to delete customer."
