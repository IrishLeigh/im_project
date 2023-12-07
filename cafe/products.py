from database import fetchall, fetchone, execute

def create_product(data):
    cur = execute("""CALL create_product(%s, %s, %s)""", 
    (data["productName"], data["description"], data["price"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data
    
def get_all_products():
    rv = fetchall("""SELECT * FROM products""")
    return rv

def get_product_by_id(id):
    rv = fetchone("""SELECT * FROM products WHERE productId = %s""", (id,))
    return rv

def update_product(id, data):
    cur = execute("""CALL update_product(%s, %s, %s, %s)""",
    (id, data["productName"], data["description"], data["price"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data

def delete_product(id):
    cur = execute("""CALL delete_product(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return "Product has been deleted successfully"
    return "Unable to delete product."
