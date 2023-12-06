from pydantic import BaseModel
from fastapi import FastAPI
from datetime import date


app = FastAPI()

class User(BaseModel):
    username: str
    password: str
    name_people: str
    prenom: str
    type_poste: str
    mail: str
    portable: int


class AdvertisementCreate(BaseModel):
    employeur : str
    type_de_poste : str
    remuneration : int
    date_plubi : date
    details : str
    adresse : str
    contrat_type : str
    duree_contrat : int
    teletravail : bool

list_ad = []

class Advertisement(AdvertisementCreate):
    id_advertisement : int


class Advertissement_Mod(BaseModel):

    id_advertisement: int
    type_de_poste : str
    employeur : str
    remuneration : float
    details : str
    adresse : str

class User(BaseModel):
    id_people: int
    user: str
    name_people: str
    prenom: str
    type_poste: str
    mail: str
    portable: int
    disabled: bool or None = None

class UserCreate(BaseModel):
    username: str
    password: str
    name_people: str
    prenom: str
    type_poste: str
    mail: str
    portable: int

class UserInDB(User):
    password: str
    is_admin: bool
    

class TokenData(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


class User_up(BaseModel):
    id_people: int
    name_people: str
    prenom: str
    type_poste: str
    mail: str
    portable: str


