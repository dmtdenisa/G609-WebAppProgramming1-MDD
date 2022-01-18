from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from repository import database, connect_to_database, create_user, get_user_email, get_user_password, complete_profile
import datetime
from functools import wraps

app = Flask("UsersAPI")
CORS(app)
app.config['JWT_SECRET_KEY']='jnlwbiRIQ7XulA'
jwt = JWTManager(app)

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
     
        create_user(conn, body)
        conn.close()

        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to create a new user. Message: {e}"
        }
        return error, 500


@app.route("/api/v1/sign-in", methods=["POST", "GET"])
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

        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

    except Exception as e:
        error = {
            "error": f"--Failed to sign in. Cause: {e}"
        }
        return error, 500

@app.route("/api/v1/sign-in/completeProfile", methods=["POST", "GET"])
@jwt_required()
def complete_profile():
    current_user = get_jwt_identity()
    body = request.json
    if not body:
        error = {
            "error": "--Failed to complete profile. Empty body provided."
        }
        return error, 400
    try:
        conn = connect_to_database(database)
        complete_profile(conn,body,current_user)
        return jsonify(logged_in_as=current_user),200
    except Exception as e:
        error = {
            "error": f"--Failed to complete profile. Cause: {e}"
        }
        return error, 500

if __name__ == "__main__":
    app.run(debug=True, port=3004)