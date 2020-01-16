import jwt
import datetime
from flask import jsonify


secret = 'secret'
algorithm = 'HS256'

def generateJwtToken(payload):
    jsonPayload = {'name': payload.json['name'], 'email': payload.json['email'], 'exp': setExpireInOneDay()}
    encodedJwt = jwt.encode(jsonPayload, secret, algorithm=algorithm)

    return jsonify({'token' : encodedJwt.decode('UTF-8')})

def decodeJwtToken(tokenToDecode):
    try:
        decodedJwt = jwt.decode(tokenToDecode, secret, algorithms=algorithm)
    except jwt.ExpiredSignatureError:
        decodedJwt = "Token has expired"

    return decodedJwt

def setExpireInOneDay():
    expireDate = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    return expireDate