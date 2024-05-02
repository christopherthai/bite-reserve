from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from flask_sqlalchemy import SQLAlchemy     #add to pipfile
from sqlalchemy import MetaData          #add to pipfile
from sqlalchemy.orm import validates         #add to pipfile

from config import db

# Models go here!

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    location = db.Column(db.String)
    image = db.Column(db.String)
    website = db.Column(db.String)
    logo = db.Column(db.String)
    menu_link = db.Column(db.String)
    capacity = db.Column(db.Integer)

    # add relationship
    reservations = db.relationship('Reservation', back_populates='restaurant', cascade ='all, delete-orphan')
    users = association_proxy('reservations', 'user')
    
    reviews = db.relationship('Review', back_populates='restaurant')  
    users = association_proxy('reviews', 'user')
    
    # add serialization rules
    # add validations
    

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    phone = db.Column(db.String)
    email = db.Column(db.String)
    IsAdmin = db.Column(db.Boolean)
    
    

    # add relationship
    reservations = db.relationship('Reservation', back_populates='user')
    restaurants = association_proxy('reservations', 'restaurant')
    
    reviews = db.relationship('Review', back_populates='user')  
    restaurants = association_proxy('reviews', 'restaurant')

    # add serialization rules
    # add validations


class Reservation(db.Model, SerializerMixin):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    reservation_time = db.Column(db.DateTime)
    table_size = db.Column(db.Integer)
    status = db.Column(db.String)
    guest_name = db.Column(db.String)
    
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    
    # add relationships
    user = db.relationship('User', back_populates='reservations')
    restaurant = db.relationship('Restaurant', back_populates='reservations')
    # add serialization rules
    serialize_rules =('-user.reservations', '-restaurant.reservations')
    # add validations

    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    # add relationships
    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')
    # add serialization rules
    serialize_rules =('-user.reviews', '-restaurant.reviews')
    
    # add validations
    
# add any models you may need.
