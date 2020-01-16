from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from serverInfo import db, ma

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(200))
    pw = db.Column(db.String(300))

    def __init__(self, name, email, pw):
        self.name = name
        self.email = email
        self.pw = pw


class UserSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'name', 'email', 'pw')


user_schema = UserSchema()
users_schema = UserSchema(many=True)