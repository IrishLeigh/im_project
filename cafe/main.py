from flask import Flask, request, jsonify
from orders import get_all_orders, get_order_by_id, create_order, update_order, delete_order
from payment import get_all_payment, get_payment_by_id, create_payment, update_payment, delete_payment
from customer import get_all_customers, get_customer_by_id, create_customer, update_customer, delete_customer
from products import get_all_products, get_product_by_id, create_product, update_product, delete_product
from flask_mysqldb import MySQL
from database import set_database

app = Flask(__name__)

app.config["MYSQL_HOST"] = "localhost"
# app.config["MYSQL_PORT"] = 3306  # Uncomment and set if your MySQL server is using a different port
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "root"  # Set your MySQL password here
app.config["MYSQL_DB"] = "dbcafe"
# app.config["MYSQL_DATABASE_DB"] = ""  # Uncomment and set if your MySQL server is using a different database
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
app.config["MYSQL_AUTOCOMMIT"] = True 

mysql = MySQL(app)
set_database(mysql)

@app.route("/")
def home():
    return "<p>Hello, World!</p>"

@app.route("/orders", methods=["GET", "POST"])
def orders():
    if request.method == "POST":
        data = request.get_json()
        result = create_order(data)
    else:
        result = get_all_orders()
    return jsonify(result)

@app.route("/orders/<id>", methods=["GET", "PUT", "DELETE"])
def users_by_id(id):
  if request.method == "PUT":
    data = request.get_json()
    result = update_order(id, data)
  elif request.method == "DELETE":
    result = get_order_by_id(id)
    if result is not None:
      result = delete_order(id)
    else:
      result = {"error": "User not found"}
  else:
    result = get_order_by_id(id)
  return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/orders/status/<id>", methods=["GET", "PUT", "DELETE"])
def users_by_id(id):
  if request.method == "PUT":
    data = request.get_json()
    result = update_order(id, data)
  elif request.method == "DELETE":
    result = get_order_by_id(id)
    if result is not None:
      result = delete_order(id)
    else:
      result = {"error": "User not found"}
  else:
    result = get_order_by_id(id)
  return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

#PAYMENT

@app.route("/payment", methods=["GET", "POST"])
def payment():
    if request.method == "POST":
        data = request.get_json()
        result = create_payment(data)
    else:
        result = get_all_payment()
    return jsonify(result)

@app.route("/payment/<id>", methods=["GET", "PUT", "DELETE"])
def payment_by_id(id):
    if request.method == "PUT":
        data = request.get_json()   
        result = update_payment(id, data)
    elif request.method == "DELETE":
        success = delete_payment(id)
        if success:
            return "<p>You just deleted payment with ID {}</p>".format(id)
        else:
            return "<p> Payment with ID {} not found</p>".format(id)
    else:
        result = get_payment_by_id(id)
    return jsonify(result)

    #CUSTOMER AND PRODUCTS

@app.route("/cafe/customer", methods=["GET", "POST"])
def customers():
  if request.method == "POST":
    data = request.get_json()
    customers = get_all_customers()
    result = create_customer(data)
    return jsonify(result)
  else:
    result = get_all_customers()
  return jsonify(result)

@app.route("/cafe/customer/<id>", methods=["GET", "PUT", "DELETE"])
def customers_by_id(id):
    if request.method == "PUT":
        data = request.get_json()
        result = update_customer(id, data)
    elif request.method == "DELETE":
        result = get_customer_by_id(id)
        if result is not None:
            result = delete_customer(id)
        else:
            result = {"Error: Customer not found"}
    else:
        result = get_customer_by_id(id)
    return jsonify(result)




@app.route("/cafe/menu", methods=["GET", "POST"])
def menu():
    if request.method == "POST":
        data = request.get_json()
        product = get_all_products()
        result = create_product(data)
        return jsonify(result)
    else:
        result = get_all_products()
    return jsonify(result)

@app.route("/cafe/menu/<id>", methods=["GET", "PUT", "DELETE"])
def menu_by_id(id):
    if request.method == "PUT":
        data = request.get_json()
        result = update_product(id, data)
    elif request.method == "DELETE":
        result = get_product_by_id(id)
        if result is not None:
            result = delete_product(id)
        else:
            result = {"Error: Product not found"}
    else:
        result = get_product_by_id(id)
    return jsonify(result)
