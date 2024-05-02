from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from flask_sqlalchemy import SQLAlchemy     #add to pipfile
from sqlalchemy import MetaData          #add to pipfile
from sqlalchemy.orm import validates         #add to pipfile
from datetime import datetime       #add to pipfile
import re     #add to pipfile


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
    open_time = db.Column(db.Integer)
    close_time = db.Column(db.Integer)
    res_duration = db.Column(db.Integer)

    # add relationship
    reservations = db.relationship('Reservation', back_populates='restaurant', cascade ='all, delete-orphan')
    users = association_proxy('reservations', 'user')
    
    reviews = db.relationship('Review', back_populates='restaurant')  
    users = association_proxy('reviews', 'user')
    
    # add serialization rules
    
    
    # add validations
    @validates('name', 'phone', 'email', 'location')
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError(f"{key} cannot be empty")
        return value

    @validates('capacity')
    def validate_capacity(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Capacity must be a positive integer")
        return value
    
    @validates('email')
    def validate_email(self, key, value):
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, value):
            raise ValueError("Invalid email format")
        return value

    @validates('phone')
    def validate_phone(self, key, value):
        phone_regex = r'^\+?1?\d{9,15}$'
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format")
        return value

    @validates('website', 'menu_link')
    def validate_url(self, key, value):
        url_regex = r'^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
        if not re.match(url_regex, value):
            raise ValueError(f"Invalid {key} URL format")
        return value

    @validates('rating')
    def validate_rating(self, key, value):
        if not isinstance(value, int) or value < 0 or value > 5:
            raise ValueError("Rating must be an integer between 0 and 5")
        return value

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
    @validates('username', 'password', 'email', 'phone')
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError(f"{key} cannot be empty")
        return value

    @validates('IsAdmin')
    def validate_is_admin(self, key, value):
        if not isinstance(value, bool):
            raise ValueError("IsAdmin must be a boolean value")
        return value

    @validates('email')
    def validate_email(self, key, value):
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, value):
            raise ValueError("Invalid email format")
        return value

    @validates('phone')
    def validate_phone(self, key, value):
        phone_regex = r'^\+?1?\d{9,15}$'
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format")
        return value

    @validates('username', 'email')
    def validate_unique(self, key, value):
        existing_user = User.query.filter(getattr(User, key) == value).first()
        if existing_user:
            raise ValueError(f"{key.capitalize()} must be unique")
        return value

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
    @validates('reservation_time')
    def validate_reservation_time(self, key, value):
        if value <= datetime.now():
            raise ValueError("Reservation time must be in the future")
        return value

    @validates('table_size')
    def validate_table_size(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Table size must be a positive integer")
        return value
    
    @validates('table_size')
    def validate_table_size(self, key, value):
        if value > self.restaurant.capacity:
            raise ValueError("Party size exceeds restaurant's capacity")
        return value
    
    @validates('restaurant_id', 'reservation_time')
    def validate_unique_reservation(self, key, value):
        existing_reservation = Reservation.query.filter_by(restaurant_id=self.restaurant_id, reservation_time=value, user_id=self.user_id).first()
        if existing_reservation:
            raise ValueError("You have already made a reservation at this restaurant for that time")
        return value

    
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
    @validates('rating')
    def validate_rating(self, key, value):
        if not isinstance(value, int) or value < 1 or value > 5:
            raise ValueError("Rating must be an integer between 1 and 5")
        return value

    @validates('comment')
    def validate_comment(self, key, value):
        if not value:
            raise ValueError("Comment cannot be empty")
        return value
    
    @validates('restaurant_id', 'user_id', 'timestamp')
    def validate_unique_review(self, key, value):
        existing_review = Review.query.filter_by(restaurant_id=self.restaurant_id, user_id=self.user_id).order_by(Review.timestamp.desc()).first()
        if existing_review and (datetime.now() - existing_review.timestamp).days < 7:
            raise ValueError("You have already submitted a review for this restaurant within the last week")
        return value
    
    @validates('comment')
    def validate_comment(self, key, value):
        if len(value) > 500:  # Assuming a maximum of 500 characters for the comment
            raise ValueError("Comment exceeds maximum character limit (500 characters)")
        return value
    
# add any models you may need.
