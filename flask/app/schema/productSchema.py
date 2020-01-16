# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
#
# from server import db,ma
#
#
# class Product(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     description = db.Column(db.String(200))
#     price = db.Column(db.Float)
#
#     def __init__(self, name, description, price):
#         self.name = name
#         self.description = description
#         self.price = price
#
#
# class ProductSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'description', 'price')
#
#
# product_schema = ProductSchema()
# products_schema = ProductSchema(many=True)