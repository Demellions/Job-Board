from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from connect import get_connection
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from models import User, UserInDB, TokenData
# from connect import get_connection
import json
import pymysql


SECRET_KEY = "2ed2b221e81ad5e910ff8d02ae623bc8b5f597ffe15fab5c339890eabf75c47b"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30





# class TokenData(BaseModel):
#     username: str or None = None

# class User(BaseModel):
#     username: str
#     email: str or None = None
#     full_name: str or None = None
#     disabled: bool or None = None

# class UserInDB(User):
#     hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


app2 = APIRouter()


def get_all_users(): 
    users_list = {}
    try:
        with get_connection() as co:
            with co.cursor() as cur:
                cur.execute('SELECT * FROM people')
                co.commit()
                res = cur.fetchall()   
                for i in res:
                    users_list.update({i["user"] : i})
                return users_list
            
    except pymysql.MySQLError as e:
        # Gestion des exceptions MySQL
        print(f"Erreur MySQL : {e}")

db = get_all_users()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, user: str):
    db = get_all_users()
    if user in db and 'user' in db[user] and 'password' in db[user]:
        user_data = db[user]
        return UserInDB(**user_data)


    return None
    
def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception
        
        token_data = TokenData(username = username)
    except JWTError:
        raise credential_exception
    
    user = get_user(db, username = token_data.username)
    if user is None:
        raise credential_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code = 400, detail = "Inactive user")
    
    return current_user


@app2.post("/token")
async def login_for_access_token(form_data: TokenData):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = "Incorrect username or password", headers = {"WWW-Authenticate": "Bearer"})

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token =  create_access_token(
        data={"sub": user.user}, expires_delta=access_token_expires) 
    return {"access_token": access_token, "token_type": "bearer"}

@app2.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app2.get("/user/me/items")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user}]

 
