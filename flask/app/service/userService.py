from flask import jsonify
from serverInfo import app, db, ma
from app.schema.userSchema import User, UserSchema, user_schema, users_schema
from app.service.authService import generateJwtToken

def newUser(request):
    name = request.json['name']
    email = request.json['email']
    pw = request.json['pw']

    newUser = User(name, email, pw)

    db.session.add(newUser)
    db.session.commit()

    return user_schema.jsonify(newUser)
    
def getUsers():
    allUsers = User.query.all()
    result = users_schema.dump(allUsers)
    return jsonify(result)
    
def getUserByEmail(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return "Incorrect email or password"
    
    return user_schema.jsonify(user)

def loginByMail(request):
    loginInfo = getUserByEmail(request.json['email'])
    if request.json['pw'] != loginInfo.json['pw']:
        return "Incorrect email or password"

    jwt = generateJwtToken(loginInfo)
    return jwt