from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []
next_id = 1 

@app.route("/")
def health_check():
    return jsonify({"status": "Backend is running!"})

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    global next_id

    new_todo = request.json

    todo = {
        "id": next_id,   
        "task": new_todo.get("task"),
        "completed": False
    }

    next_id += 1
    todos.append(todo)


    return jsonify(todo), 201

@app.route("/todos/<int:id>", methods=["PATCH"])
def toggle_todo(id):
    for todo in todos:
        if todo["id"] == id:
            todo["completed"] = not todo["completed"]
            return jsonify(todo)

    return jsonify({"error": "Todo not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)