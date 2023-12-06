Requirement :

Soyez sur, avant de lancer le code, d'obtenir tous ces "packages" qui servent au bon fonctionnement du code : 

	from fastapi import  Depends, FastAPI, HTTPException, status, APIRouter
	from pydantic import BaseModel
	import mariadb
	import json
	import sys
	from fastapi.middleware.cors import CORSMiddleware
	import bcrypt
	from datetime import date, datetime, timedelta
	from passlib.context import CryptContext
	from jose import jwt, JWTError
	from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
	import json


Installez mariaDB grâce a votre terminal (suivez le process de ce lien "https://devopscube.com/install-mariadb-on-ubuntu/"). 

Installez Phpmyadmin grâce a votre terminal(suivez le process de ce lien "https://doc.ubuntu-fr.org/phpmyadmin"). 

Importez la base de donnée "project.sql" sur votre espace Phpmyadmin.

Installez FastAPI (pip install fastAPI, pip install uvicorn) grâce a votre terminal, fastAPI utilise le port 8000 par défault normalement rien est à changer, sinon remettez vous sur le port 8000. Rendez-vous dans le dossier qui héberge nos fichiers. Lancer la commande "uvicorn main:app --reload" dans votre terminal. Le serveur est lancé, vous pouvez utiliser notre code. 

Vous pouvez désormais double cliquer sur un fichier HTML, commencez par "acceuil.html" celui-ci vous ouvrira la page d'accueil de notre site. 
Vous pouvez désormais naviguer sur notre site. 

Cliquez sur "annonces" dans le header pour accéder aux annonces publiées. 

Cliquez sur "entreprise" dans le header pour créer une annonce et la publier. 

Le bouton "s'inscrire" fait apparaitre un pop-up d'inscription, celui-ci aura pour but de créer un compte à l'utilisateur et la sauvegarder dans la base de donnée. 

Le bouton connexion sert à l'utilisateur de moyen de connexion. Ce qui aura pour but de récuperer un token.

Pour le côté Administrateur nous n'avons pas eu le temps de créer un lien directement sur la page principale. Il y aura donc deux côtés admin différents. L'un pour gérer les utilisateurs et l'autre pour gérer les annonces. 

Double cliquez sur le fichier "admin.html" pour gérer les utilisateurs, vous pouvez changer certaines informations concernant l'utilisateur en cliquant directement dans les cases prévu à cette effet puis en cliquant sur "modifier". Vous pouvez aussi supprimer l'utilisateur en cliquant sur "Supprimer"

Double cliquez sur le fichier "adminannonces.html" pour gérer les annonces, vous pouvez changer certaines informations concernant l'annonces en cliquant directement dans les cases prévu à cette effet puis en cliquant sur "modifier". Vous pouvez aussi supprimer l'annonces en cliquant sur "Supprimer".
