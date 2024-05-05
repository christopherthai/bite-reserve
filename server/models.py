from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from flask_sqlalchemy import SQLAlchemy  # add to pipfile
from sqlalchemy import MetaData, func  # add to pipfile
from sqlalchemy.orm import validates  # add to pipfile
from datetime import datetime, timedelta  # add to pipfile
import re  # add to pipfile


from config import db


metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

#Establish Restaurant class
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    menu_link = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    open_time = db.Column(db.Integer, nullable=False)
    close_time = db.Column(db.Integer, nullable=False)
    res_duration = db.Column(db.Integer, nullable=False)

    # Define relationships
    reservations = db.relationship(
        "Reservation", back_populates="restaurant", cascade="all, delete-orphan"
    )
    reviews = db.relationship("Review", back_populates="restaurant")

    # Define association proxies with unique names
    reservation_users = association_proxy("reservations", "user")
    review_users = association_proxy("reviews", "user")

    # serialization rules
    serialize_rules = ("-reviews.restaurant", "-reservations.restaurant" )

    
    
    # validations for Restaurants.  Validates name, phone and address.
    @validates("name", "address", "category")
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError(f"{key} cannot be empty")
        return value
    
    # validates restaurant capacity upon entry.
    @validates("capacity")
    def validate_capacity(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Capacity must be a positive integer")
        return value
    
    # validates phone number upon entry
    @validates("phone")
    def validate_phone(self, key, value):
        phone_regex = r"^\+?1?[-\s(]?\d{3}[-\s)]?\s?\d{3}[-\s]?\d{4}$"
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format")
        return value
    
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError(f"{key} cannot be empty")
        return value
    
    #validates that the website and menu link are in the proper html format
    @validates("website", "menu_link")
    def validate_url(self, key, value):
        url_regex = r"^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
        if not re.match(url_regex, value):
            raise ValueError(f"Invalid {key} URL format")
        return value

    #Establish User Class
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    IsAdmin = db.Column(db.Boolean, nullable=False)

    # relationships with reservations and reviews
    reservations = db.relationship("Reservation", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")

    # association proxies
    reservation_restaurants = association_proxy("reservations", "restaurant")
    review_restaurants = association_proxy("reviews", "restaurant")

    # serialization rules
    serialize_rules = ("-reviews", "-reservations")
    
    # validates the user's username, password, email and phone # upon entry
    # @validates("password")
    # def validate_password_not_empty(self, key, value):
    #     if not value:
    #         raise ValueError(f"{key} cannot be empty")
    #     return value

    # # # validates that the isAdmin is a boolean value
    # @validates("IsAdmin")
    # def validate_is_admin(self, key, value):
    #     if not isinstance(value, bool):
    #         raise ValueError("IsAdmin must be a boolean value")
    #     return value
    
    # # # validatse that the users email is valid upon entry    
    # @validates("email")
    # def validate_email(self, key, value):
    #     email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    #     if not re.match(email_regex, value):
    #         raise ValueError("Invalid email format")
    #     return value
    
    # def validate_unique_email(self, key, value):
    #     existing_user = User.query.filter(getattr(User, key) == value).first()
    #     if existing_user:
    #         raise ValueError(f"{key.capitalize()} must be unique")
    #     return value
    
    # def validate_email_not_empty(self, key, value):
    #     if not value:
    #         raise ValueError(f"{key} cannot be empty")
    #     return value
    
    # # validates that the user's phone number is in the correct format upon entry
    # # @validates("phone")
    # # def validate_phone(self, key, value):
    # #     phone_regex = r"^\+?1?\d{9,15}$"
    # #     if not re.match(phone_regex, value):
    # #         raise ValueError("Invalid phone number format")
    # #     return value
    
    # def validate_phone_not_empty(self, key, value):
    #     if not value:
    #         raise ValueError(f"{key} cannot be empty")
    #     return value
    
    # # validates that the user's username and email are both unique
    # @validates("username")
    # def validate_username_unique(self, key, value):
    #     existing_user = User.query.filter(getattr(User, key) == value).first()
    #     if existing_user:
    #         raise ValueError(f"{key.capitalize()} must be unique")
    #     return value
    
    # def validate_username_not_empty(self, key, value):
    #     if not value:
    #         raise ValueError(f"{key} cannot be empty")
    #     return value


    # Establish Reservation class
class Reservation(db.Model, SerializerMixin):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    reservation_time = db.Column(db.Integer, nullable=False)
    table_size = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))

    # Relationships with user and restaurant
    user = db.relationship("User", back_populates="reservations")
    restaurant = db.relationship("Restaurant", back_populates="reservations")

    # Serialization rules
    serialize_rules = ("-user.reservations", "-restaurant.reservations")

    # Validates the table size as a positive integer
    @validates("table_size")
    def validate_table_size(self, key, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Table size must be a positive integer")
        return value

    # Validates that the reservation is unique and not a duplicate
    @validates("restaurant_id", "user_id")
    def validate_unique_reservation(self, key, value):
        if key == "restaurant_id" and value is not None:
            existing_reservation = Reservation.query.filter_by(
                restaurant_id=self.restaurant_id,
                reservation_time=self.reservation_time,
                user_id=self.user_id,
            ).first()
            if existing_reservation:
                raise ValueError(
                    "You have already made a reservation at this restaurant for that time"
                )
        return value

    # Validates that the reservation is in the future and the restaurant is not at capacity
    @validates("reservation_time")
    def validate_reservation_time(self, key, value):
        reservation_datetime = datetime.fromtimestamp(value)
        if reservation_datetime <= datetime.now():
            raise ValueError("Reservation time must be in the future")

        if self.restaurant is None:
            raise ValueError("Restaurant is not assigned to the reservation")

        start_time, end_time = self.get_reservation_time_window(
            reservation_datetime, self.restaurant.res_duration
        )
        total_table_sizes = self.get_total_table_sizes(
            self.restaurant_id, start_time, end_time
        )

        if total_table_sizes + self.table_size > self.restaurant.capacity:
            raise ValueError("Restaurant capacity exceeded for the selected time")

        return value

    # Validates the notes length to keep it under 500 characters
    @validates("notes")
    def validate_notes(self, key, value):
        if len(value) > 500:  # Maximum of 500 characters for the comment
            raise ValueError("Notes exceed maximum character limit (500 characters)")
        return value

    # Calculates a window of time based on the reservation duration
    @staticmethod
    def get_reservation_time_window(reservation_time, res_duration):
        return (
            reservation_time - timedelta(minutes=res_duration - 15),
            reservation_time + timedelta(minutes=res_duration),
        )

    # Uses the time window to query the sum of table sizes of all reservations
    @staticmethod
    def get_total_table_sizes(restaurant_id, start_time, end_time):
        total_table_sizes = (
            Reservation.query.filter(
                Reservation.restaurant_id == restaurant_id,
                Reservation.reservation_time >= start_time,
                Reservation.reservation_time <= end_time,
            )
            .with_entities(func.sum(Reservation.table_size))
            .scalar()
        )
        return total_table_sizes or 0

    # Establish Review class
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))

    # relationships with user and restaurant
    user = db.relationship("User", back_populates="reviews")
    restaurant = db.relationship("Restaurant", back_populates="reviews")

    # serialization rules
    serialize_rules = ("-user.reviews", "-restaurant.reviews")

    # # validates the rating of the review as b/w 1-5
    @validates("rating")
    def validate_rating(self, key, value):
        if not isinstance(value, int) or value < 1 or value > 5:
            raise ValueError("Rating must be an integer between 1 and 5")
        return value
    
    # validates that the rating comment is not empty
    @validates("comment")
    def validate_comment(self, key, value):
        if not value:
            raise ValueError("Comment cannot be empty")
        return value
    
    # validates the comment length to keep it under 500 characters
    def validate_comment_length(self, key, value):
        if len(value) > 500:  # maximum of 500 characters for the comment
            raise ValueError("Comment exceeds maximum character limit (500 characters)")
        return value

    # # validates that the user is not submitting multiple reviews for 
    # # the same restaurant in a specified period of time
    @validates("restaurant_id", "user_id", "timestamp")
    def validate_unique_review(self, key, value):
        existing_review = (
            Review.query.filter_by(
                restaurant_id=self.restaurant_id, user_id=self.user_id
            )
            .order_by(Review.timestamp.desc())
            .first()
        )
        if existing_review and (datetime.now() - existing_review.timestamp).days < 7:
            raise ValueError(
                "You have already submitted a review for this restaurant within the last week"
            )
        return value
    
    



