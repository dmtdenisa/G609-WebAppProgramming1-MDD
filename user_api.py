from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
import jwt
from repository import database, connect_to_database, create_user, get_user_password, complete_profile
import datetime
from functools import wraps

app = Flask("UsersAPI")
CORS(app)
app.config['SECRET_KEY']='jnlwbiRIQ7XulA'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')

        if not token:
            return jsonify({'message': 'token is missing'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated

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
        token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=10)}, app.config['SECRET_KEY'])

        #return '', 204
        raspuns= jsonify({'token' : token})
        return raspuns, 204
    
    except Exception as e:
        error = {
            "error": f"--Failed to sign in. Cause: {e}"
        }
        return error, 500

@app.route("/api/v1/completeProfile", methods=["POST", "GET"])
@token_required
def complete_profile():
    body = request.json
    if not body:
        error = {
            "error": "--Failed to complete profile. Empty body provided."
        }
        return error, 400
    return '', 204

if __name__ == "__main__":
    app.run(debug=True, port=3004)