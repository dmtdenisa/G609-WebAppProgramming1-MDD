from flask import Flask, request
from flask_cors import CORS

from repository import database, connect_to_database, create_user, get_user_password

app = Flask("UsersAPI")
CORS(app)


@app.route("/api/v1/sign-up", methods=["POST"])
def signup():
    body = request.json
    if not body:
        error = {
            "error": "--Failed to create a new user. Empty body provided."
        }
        return error, 400

    try:
        first_password = body["password"]
        second_password = body["secondPassword"]
        if first_password != second_password:
            error = {
                "error": "--Failed to create user. Password mismatch."
            }
            return error, 400

        conn = connect_to_database(database)
        #user_details = [
        #    body["first_name"],
        #    body["last_name"],
        #    body["email"],
        #    body["password"]
        #]

        create_user(conn, body)
        conn.close()

        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to create a new user. Message: {e}"
        }
        return error, 500


@app.route("/api/v1/sign-in", methods=["POST"])
def sign_in():
    try:
        body = request.json
        email = body.get("email")
        password = body.get("password")
        conn = connect_to_database(database)
        existing_password = get_user_password(conn, email)
        if existing_password is None or password != existing_password:
            error = {
                "error": "--Failed to sign in. Email or password are wrong."
            }
            return error, 401

        # if password != existing_password:
        #     error = {
        #         "error": "--Failed to sign in. Email or password are wrong."
        #     }
        #     return error, 401

        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to sign in. Cause: {e}"
        }
        return error, 500


if __name__ == "__main__":
    app.run(debug=True, port=3004)