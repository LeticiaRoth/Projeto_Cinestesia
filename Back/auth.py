import secrets
import hashlib
import database as db

#Dicionario para os tokens
sessions = {}
#Chave para embaralhar
SALT = b'your_project_salt_CINESTESIA'

def hash_password(password):
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256', 
        password.encode('utf-8'), 
        SALT, 
        100000
    )
    return pwd_hash.hex()

def verify_password(plain_password, password_from_db):
    # Compara o texto puro digitado com o texto puro do banco
    return plain_password == password_from_db

#Cadastro
def handle_register(nome, email, password):
    user = db.get_user_by_email(email)
    if user:
        return None 

    hashed_pass = password 

    tipo_usuario = 'Comum'
    
    new_user_id = db.create_user(nome, email, hashed_pass, tipo_usuario)
    return {'id_usuario': new_user_id, 'email': email}

#Login
def handle_login(email, password):
    user = db.get_user_by_email(email)

    if user and verify_password(password, user['senha']):
        token = secrets.token_hex(20)

        #Guarda os tokens dos usuarioos
        sessions[token] = {
            'id_usuario': user['id_usuario'],
            'nome': user['nome'],
            'tipo_usuario': user['tipo_usuario']
        }
        return {'token': token, 'user_type': user['tipo_usuario'], 'nome': user['nome']}
    else:
        return None

#Verificação do token
def get_user_from_token(auth_header):
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    user_data = sessions.get(token)
    return user_data

#Função para sair
def handle_logout(auth_header):
    if not auth_header or not auth_header.startswith('Bearer '):
        return False
    
    token = auth_header.split(' ')[1]
    if token in sessions:
        del sessions[token]
        return True
    return False