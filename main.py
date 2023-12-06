from fastapi import FastAPI
from routes.affiche_ad import route
from routes.user import route2
from routes.session import app2
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route)
app.include_router(route2)
app.include_router(app2)