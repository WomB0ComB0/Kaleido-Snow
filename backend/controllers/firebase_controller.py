import pyrebase

config = {
  "apiKey": "AIzaSyCJufIOgAIxK3E2CFPvADt5iXaFleR8bXQ",
  "authDomain": "snow-9dd3e.firebaseapp.com",
  "databaseURL": "https://snow-9dd3e-default-rtdb.firebaseio.com/",
  "storageBucket": "snow-9dd3e.appspot.com",
  "serviceAccount": "fb-admin-conf.json"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

def hash_exists(hash):
    return db.child("hashes").child(hash).get().val() is not None

def add_hash(hash):
    db.child("hashes").child(hash).set(True)

