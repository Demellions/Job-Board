from fastapi import APIRouter
from models import AdvertisementCreate, Advertissement_Mod
from connect import get_connection
import pymysql
import json

route = APIRouter()

@route.post("/addadvertisement")
async def create_ad(ad: AdvertisementCreate): 
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            'INSERT INTO advertisement (type_de_poste, employeur, remuneration, date_plubi, details, adresse, contrat_type, duree_contrat, teletravail) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)', 
            (ad.type_de_poste, ad.employeur, ad.remuneration, ad.date_plubi, ad.details, ad.adresse, ad.contrat_type, ad.duree_contrat, ad.teletravail)
        )
        co.commit()
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

@route.get("/getadvertisement")
async def display_ads():
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            'SELECT * FROM advertisement'
        )
        res = cur.fetchall()
        list_ad=json.dumps(res, default=str)
        
        return list_ad
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

@route.delete("/supadvertisement/{ad_id}")
async def del_ad(ad_id: int):
    try:
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            'DELETE FROM advertisement WHERE id_advertisement = %s', (ad_id)
        )
        co.commit()
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")

@route.put("/modad/{adId}")
async def mod_user(adId: int, user : Advertissement_Mod):
    try :
        co = get_connection()
        cur = co.cursor()
        cur.execute(
            "UPDATE advertisement SET type_de_poste = %s, employeur = %s, adresse = %s, remuneration = %s, details = %s WHERE id_advertisement = %s",
                (user.type_de_poste, user.employeur, user.adresse, user.remuneration, user.details, adId)
        )            
        co.commit()
        return {"message": "Add modifié avec succès."}
    except pymysql.MySQLError as e:
        print(f"ERROR {e}")
        return {"errorMessage": e}



