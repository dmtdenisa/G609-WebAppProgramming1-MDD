import email
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

# def complete_profile(conn,body, email):
#     query = f"""insert into users(faculty, skills, phone) values (?,?,?) where email='{email}'"""
#     user_data = [
#         body.get("faculty"),
#         body.get("skill"),
#         body.get("phone") 
#     ]
#     cursor = conn.cursor()
#     cursor.execute(query, user_data)
#     conn.commit()

def get_user_email(conn, email):
    query = f"select email from users where email='{email}'"
    cursor = conn.cursor()
    email = list(cursor.execute(query))
    if email:
        return email[0][0]
    else:
        return None

def get_user_profile(conn, email):
    # create query to extract data from db for user_id
    query = f"""select first_name, last_name, faculty, skills, phone from users where email='{email}'"""

    # run query
    cursor = conn.cursor()
    user_details = list(cursor.execute(query))

    if len(user_details) == 0:
        return {}

    user_details = user_details[0]

    profile = {
        "first_name": user_details[0],
        "last_name": user_details[1],
        "faculty": user_details[2],
        "skills": user_details[3],
        "phone": user_details[4],
    }
    return profile

def update_user_profile(conn, user_details, email):
    set_statement = ''
    for key, value in user_details.items():
        if key in ["first_name", 'last_name']:
            if value is not None:
                set_statement = set_statement + f"{key}='{value}',"
            else:
                set_statement = set_statement + f"{key}='',"

        if key == 'faculty':
            set_statement = set_statement + f"{key}='{value}',"

        if key == 'skills':
            set_statement = set_statement + f"{key}='{value}',"

        if key == 'phone':
            set_statement = set_statement + f"{key}='{value}',"

        if key == 'description':
            set_statement = set_statement + f"{key}='{value}',"

    set_statement = set_statement[:-1]
    query = f"""UPDATE users SET {set_statement} WHERE email='{email}'"""

    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()

def get_users_profiles(conn, email):
    # create query to extract data from db for user_id
    query = f"""select first_name, faculty, skills, phone, description from users where email !='{email}'"""

    # run query
    cursor = conn.cursor()
    user_details = list(cursor.execute(query))

    if len(user_details) < 3:
        return {}

    user_details1 = user_details[0]
    user_details2 = user_details[1]
    user_details3 = user_details[2]

    profile1 = {
        "first_name": user_details1[0],
        "faculty": user_details1[1],
        "skills": user_details1[2],
        "phone": user_details1[3],
        "description": user_details1[4],
    }

    profile2 = {
        "first_name": user_details2[0],
        "faculty": user_details2[1],
        "skills": user_details2[2],
        "phone": user_details2[3],
        "description": user_details2[4],
    }

    profile3 = {
        "first_name": user_details3[0],
        "faculty": user_details3[1],
        "skills": user_details3[2],
        "phone": user_details3[3],
        "description": user_details3[4],
    }

    profiles = {
        "profile1":profile1,
        "profile2":profile2,
        "profile3":profile3
    }
    return profiles