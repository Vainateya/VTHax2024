
from firebase_admin import credentials, initialize_app, storage
from creds import get_key, get_db_name

class Firebase:
    def __init__(self):
        # Init firebase with your credentials
        cred = credentials.Certificate(get_key())
        initialize_app(cred, {'storageBucket': get_db_name()})

    def add_file(self, file_name):
        # Put your local file path 
        bucket = storage.bucket()
        blob = bucket.blob(file_name)
        blob.upload_from_filename(file_name)

        # Opt : if you want to make public access from the URL
        blob.make_public()

        return blob.public_url