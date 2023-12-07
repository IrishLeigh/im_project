# perform queries here
from database import fetchall,fetchone  
# assume this is from a database
users = [
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

def create_user(data):
    # @TODO replace this with a database call (INSERT)
    users.append(data)
    return data

def get_all_users():
    # @TODO replace this with a database call (SELECT)
    rv = fetchall("""SELECT * FROM Products""")
    return rv

def get_user_by_id(id):
  rv = fetchone("""SELECT * FROM Products WHERE productId = %s""", (id,))
  return rv

def update_user(id, data):
    for user in users:
        if user["id"] == int(id):
            # @TODO replace this with a database call (UPDATE)
            user["name"] = data["name"]
            user["email"] = data["email"]
            user["password"] = data["password"]
            return user
    return None

def delete_user(id):
    for index, user in enumerate(users):
        if user["id"] == int(id):
            # @TODO replace this with a database call (DELETE)
            users.pop(index)
            return True
    return False
