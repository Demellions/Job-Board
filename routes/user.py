from fastapi import APIRouter
from models import UserCreate, User_up
from connect import get_connection
import pymysql
import json
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
import bcrypt

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

route2 = APIRouter()


@route2.post("/adduser")
async def add_user(u: UserCreate): 
    passwd = get_password_hash(u.password)
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            'INSERT INTO people (user, password, name_people, prenom,  type_poste, mail, portable) VALUES(%s, %s, %s, %s, %s, %s, %s)', 
            (u.username, passwd, u.name_people, u.prenom, u.type_poste, u.mail, u.portable)
        )
        co.commit()
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

@route2.get("/getusers")
def get_user():
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            'SELECT id_people, name_people, prenom, type_poste, mail, portable, user, password FROM people'
        )
        co.commit()
        rows = cur.fetchall()
        json_data = json.dumps(rows, default=str)
        return json_data
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

@route2.delete("/suppuser/{id}")
def supp_user(id: int):
    
    try:
        print(type(id))
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            "DELETE FROM `people` WHERE `id_people` = %s",
                        (id))
        co.commit()
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")


@route2.put("/upuser/{user_id}")
def mod_user(user_id: int, user: User_up):
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            "UPDATE people SET name_people = %s, prenom = %s, type_poste = %s, mail = %s, portable = %s WHERE id_people = %s",
            (user.name_people, user.prenom, user.type_poste, user.mail, user.portable, user_id)
        )
        co.commit()
        return {"message": "Utilisateur modifié avec succès."}
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

