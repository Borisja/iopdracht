from flask import jsonify
#from app.server import app, db, ma
#from app.schema.productSchema import Product, ProductSchema, product_schema, products_schema
from serverInfo import db, ma


def addProduct(request):
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']

    newProduct = Product(name, description, price)

    db.session.add(newProduct)
    db.session.commit()

    return product_schema.jsonify(newProduct)
    
def getProducts():
    allProducts = Product.query.all()
    result = products_schema.dump(allProducts)
    return jsonify(result)
    
def getProduct(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)
    
def updateProduct(request, id):
    product = Product.query.get(id)

    name = request.json['name']
    description = request.json['description']
    price = request.json['price']

    product.name = name
    product.description = description
    product.price = price

    db.session.commit()

    return product_schema.jsonify(product)
    
def deleteProduct(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

    return product_schema.jsonify(product)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    price = db.Column(db.Float)

    def __init__(self, name, description, price):
        self.name = name
        self.description = description
        self.price = price


class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'price')


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)