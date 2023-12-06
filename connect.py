import pymysql

def get_connection():
    try:
        connection = pymysql.connect(host="localhost", port=8889, user="root", passwd="root", database="project", cursorclass=pymysql.cursors.DictCursor)
        return connection
    except pymysql.MySQLError as e:
        print(f"Erreur MySQL : {e}")
        return None  # Retourne None en cas d'échec de la connexion

    


