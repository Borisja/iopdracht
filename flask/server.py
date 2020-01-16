from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from app.service.productService import addProduct, getProducts, getProduct, updateProduct, deleteProduct
from app.service.userService import newUser, getUsers, getUserByEmail, loginByMail
from app.service.authService import decodeJwtToken
from functools import wraps
from serverInfo import app
# app = Flask(__name__)
#
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1:3306/iopdracht'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#
# db = SQLAlchemy(app)
# ma = Marshmallow(app)

def tokenRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'authorization' in request.headers:
            token = request.headers['authorization']

        if not token:
            return jsonify({'error':'Token not found.'}), 401

        try:
            info = decodeJwtToken(token)
            currentUser = getUserByEmail(info['email']), 401
        except:
            return jsonify({'error':'Token is invalid'}), 401

        return f(currentUser, *args, **kwargs)

    return decorated


@app.route('/')
def hello():
    return "hi"


#Product
@app.route('/product', methods=['POST'])
def addNewProduct():
    return addProduct(request)


@app.route('/product', methods=['GET'])
def productList():
    return getProducts()


@app.route('/product/<id>', methods=['GET'])
def getProductByid(id):
    return getProduct(id)


@app.route('/product/<id>', methods=['PUT'])
@tokenRequired
def updateCurrentProduct(currentUser, id):
    return updateProduct(request, id)


@app.route('/product/<id>', methods=['DELETE'])
@tokenRequired
def deleteCurrentProduct(currentUser, id):
    return deleteProduct(id)


#User
@app.route('/user', methods=['POST'])
def addNewUser():
    return newUser(request)


@app.route('/user', methods=['GET'])
def getAllUsers():
    return getUsers();


@app.route('/login', methods=['POST'])
def login():
    return loginByMail(request)


if __name__ == '__main__':
    app.run(debug=True)