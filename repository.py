import sqlite3
from datetime import datetime


database = "SB_database.db"


def connect_to_database(path_to_database_file):
    conn = sqlite3.connect(path_to_database_file)
    return conn


def create_user(conn, body):
    query = """insert into users(first_name, last_name, email, password, created_at, updated_at)
    values (?,?,?,?,?,?)"""
    user_data = [
        body.get("first_name"),
        body.get("last_name"),
        body.get("email"),
        body.get("password"),
        datetime.utcnow(),
        datetime.utcnow()
    ]
    cursor = conn.cursor()
    cursor.execute(query, user_data)
    conn.commit()


def get_user_password(conn, email):
    query = f"select password from users where email='{email}'"
    cursor = conn.cursor()
    password = list(cursor.execute(query))
    if password:
        return password[0][0]
    else:
        return None

def complete_profile(conn,body, email):
    query = f"""insert into users(faculty, skills, phone) values (?,?,?) where email='{email}'"""
    user_data = [
        body.get("faculty"),
        body.get("skill"),
        body.get("phone") 
    ]
    cursor = conn.cursor()
    cursor.execute(query, user_data)
    conn.commit()