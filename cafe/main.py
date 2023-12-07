from flask import Flask, request, jsonify
from users import get_all_orders, get_order_by_id, create_order, update_order, delete_order
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
