#!/usr/bin/env python3

from flask import request, jsonify, make_response, Flask, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError
import os

# Local imports
from config import app, db, api
from models import db, Restaurant, User, Reservation, Review


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.secret_key = b"Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K"
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# Signup Routes
class Signup(Resource):

    def post(self):

        request_json = request.get_json()

        first_name = request_json.get("first_name")
        last_name = request_json.get("last_name")
        username = request_json.get("username")
        password = request_json.get("password")
        phone = request_json.get("phone")
        email = request_json.get("email")
        IsAdmin_from_request = request_json.get("isAdmin")

        IsAdmin = (
            False if IsAdmin_from_request == 0 else True
        )  # If IsAdmin is 0, then False, else True

        user = User(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            phone=phone,
            email=email,
            IsAdmin=IsAdmin,
        )

        try:

            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id  # session is a dictionary that stores user_id

            return user.to_dict(), 201

        except IntegrityError:

            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")


# CheckSession Routes
class CheckSession(Resource):

    def get(self):

        user_id = session["user_id"]
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401


api.add_resource(CheckSession, "/check_session", endpoint="check_session")


# Login Routes
class Login(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")

        user = User.query.filter(User.username == username).first()

        if user:
            if user.password == password:

                session["user_id"] = (
                    user.id
                )  # session is a dictionary that stores user_id
                return user.to_dict(), 200

        return {"error": "401 Unauthorized"}, 401


api.add_resource(Login, "/login", endpoint="login")


# Logout Routes
class Logout(Resource):

    def delete(self):

        if session.get("user_id"):

            session["user_id"] = None
            return {}, 204

        return {}, 401


api.add_resource(Logout, "/logout", endpoint="logout")


# Restaurants Routes
# get
# post
class Restaurants(Resource):

    def get(self):
        restaurants = Restaurant.query.all()
        restaurants_list = [restaurant.to_dict() for restaurant in restaurants]

        return make_response(restaurants_list, 200)

    # First restaurant in a list of all restaurants, with first comment in a list of all comments.
    # Response in this format.
    """[
    {
        "address": "550 3rd Avenue",
        "capacity": 60,
        "category": "Chinese",
        "city": "New York",
        "close_time": 2000,
        "id": 1,
        "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
        "menu_link": "https://www.littlealley.nyc/menu",
        "name": "Little Alley",
        "open_time": 1600,
        "phone": "646-998-3976",
        "res_duration": 90,
        "reviews": [
            {
                "comment": "The food was amazing!",
                "id": 1,
                "rating": 5,
                "restaurant_id": 1,
                "timestamp": 1735012800,
                "user": {
                    "IsAdmin": false,
                    "email": "john@example.com",
                    "first_name": "John",
                    "id": 1,
                    "last_name": "Doe",
                    "password": "password123",
                    "phone": "123-456-7890",
                    "username": "johndoe"
                },
                "user_id": 1
            },"""

    def post(self):
        data = request.get_json()

        try:
            restaurant = Restaurant(
                name=data.get("name"),
                phone=data.get("phone"),
                address=data.get("address"),
                city=data.get("city"),
                state=data.get("state"),
                zip=data.get("zip"),
                image=data.get("image"),
                website=data.get("website"),
                menu_link=data.get("menu_link"),
                category=data.get("category"),
                capacity=data.get("capacity"),
                open_time=data.get("open_time"),
                close_time=data.get("close_time"),
                res_duration=data.get("res_duration"),
            )
            db.session.add(restaurant)
            db.session.commit()
            return make_response(restaurant.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    # Restaurant created by posting.
    # Response in this format.
    """{
    "address": "what street test",
    "capacity": 1000000,
    "category": "Cat Food",
    "city": "TEST TEST",
    "close_time": 1,
    "id": 10,
    "image": "WEBSITE",
    "menu_link": "MENU",
    "name": "WE SERVE CAT FOOD",
    "open_time": 1600,
    "phone": "777-777-7777",
    "res_duration": 90,
    "reservations": [],
    "reviews": [],
    "state": "MN",
    "website": "WEBSITE",
    "zip": "55555"
}"""


api.add_resource(Restaurants, "/restaurants")


# RestaurantsById Routes
# get
# patch
# delete
class RestaurantsById(Resource):

    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)
        return make_response(restaurant.to_dict(rules=("-reservations.user",)), 200)

    # Restaurant with id, with first reservation in a list of all reservations,
    # with first comment in a list of all comments. Response in this format.
    """{
    "address": "550 3rd Avenue",
    "capacity": 60,
    "category": "Chinese",
    "city": "New York",
    "close_time": 2000,
    "id": 1,
    "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
    "menu_link": "https://www.littlealley.nyc/menu",
    "name": "Little Alley",
    "open_time": 1600,
    "phone": "646-998-3976",
    "res_duration": 90,
    "reservations": [
        {
            "id": 1,
            "notes": " ",
            "reservation_time": 1730500200,
            "restaurant_id": 1,
            "status": "confirmed",
            "table_size": 4,
            "user_id": 1
        }, list of all reservations continues:
        ],
        
         "reviews": [
        {
            "comment": "The food was amazing!",
            "id": 1,
            "rating": 5,
            "restaurant_id": 1,
            "timestamp": 1735012800,
            "user": {
                "IsAdmin": false,
                "email": "john@example.com",
                "first_name": "John",
                "id": 1,
                "last_name": "Doe",
                "password": "password123",
                "phone": "123-456-7890",
                "username": "johndoe"
            },
            "user_id": 1
        },  list of all comments continues:
        
     }   
        
        """

    # Restaurant by ID patch
    def patch(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(restaurant, attr, data.get(attr))

            db.session.add(restaurant)
            db.session.commit()
            return make_response(
                restaurant.to_dict(rules=("-reservations", "-reviews")), 202
            )

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

    # Restaurant by ID with only address changed. Response in this format:
    """   
        {
    "address": "CHANGED",
    "capacity": 1000000,
    "category": "Cat Food",
    "city": "TEST TEST",
    "close_time": 1,
    "id": 10,
    "image": "WEBSITE",
    "menu_link": "MENU",
    "name": "WE SERVE CAT FOOD",
    "open_time": 1600,
    "phone": "777-777-7777",
    "res_duration": 90,
    "state": "MN",
    "website": "WEBSITE",
    "zip": "55555"
}"""

    # Restaurant by ID detele
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        try:
            db.session.delete(restaurant)
            db.session.commit()
            return make_response({}, 204)

        except Exception as e:
            print(f"Error deleting restaurant: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)

    """
    Empty response 204, tested and persists
    """


api.add_resource(RestaurantsById, "/restaurants/<int:id>")


# Reviews Routes
# get
# post
class Reviews(Resource):

    def get(self, restaurant_id):
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

        reviews_list = [
            review.to_dict(rules=("-restaurant.reservations",))
            for review in restaurant.reviews
        ]

        return make_response(reviews_list, 200)

    # Single review in a list of all reviews for a specific restaurant.  Response in format:

    """
    [
    {
        "comment": "The food was amazing!",
        "id": 1,
        "rating": 5,
        "restaurant": {
            "address": "550 3rd Avenue",
            "capacity": 60,
            "category": "Chinese",
            "city": "New York",
            "close_time": 2000,
            "id": 1,
            "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
            "menu_link": "https://www.littlealley.nyc/menu",
            "name": "Little Alley",
            "open_time": 1600,
            "phone": "646-998-3976",
            "res_duration": 90,
            "state": "NY",
            "website": "https://www.littlealley.nyc/",
            "zip": "10016"
        },
        "restaurant_id": 1,
        "timestamp": 1735012800,
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    },
    """

    def post(self, restaurant_id):
        data = request.get_json()

        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        try:
            review = Review(
                timestamp=data.get("timestamp"),
                rating=data.get("rating"),
                comment=data.get("comment"),
                user_id=data.get("user_id"),
                restaurant_id=restaurant_id,
            )
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(rules=("-restaurant",)), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    # Posting a review to a specific restaurant. Response:
    """
    {
        "comment": "ISHHH WHO EATS CAT FOOD",
        "id": 84,
        "rating": 1,
        "restaurant_id": 1,
        "timestamp": "CHANGED",
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    }
    """


api.add_resource(Reviews, "/restaurants/<int:restaurant_id>/reviews")


# ReviewsById Routes
# patch
# delete
class ReviewsById(Resource):

    def patch(self, restaurant_id, review_id):
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        review = Review.query.filter_by(
            restaurant_id=restaurant_id, id=review_id
        ).first()

        if not review:
            return make_response({"error": "Review not found"}, 404)

        try:
            data = request.get_json()
            # for attr in data:
            #     setattr(restaurant.review, attr, data.get(attr))
            for key, value in data.items():
                if hasattr(review, key):
                    setattr(review, key, value)

            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(rules=("-restaurant",)), 202)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

    """
    {
        "comment": "YUM CAT FOOD!",
        "id": 85,
        "rating": 1,
        "restaurant_id": 1,
        "timestamp": "CHANGED",
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    }
    """

    def delete(self, restaurant_id, review_id):
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        review = Review.query.filter_by(
            restaurant_id=restaurant_id, id=review_id
        ).first()

        if not review:
            return make_response({"error": "Review not found"}, 404)

        try:
            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)

        except Exception as e:
            print(f"Error deleting review: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)

    """
    Empty response 204, tested and persists
    """


api.add_resource(
    ReviewsById, "/restaurants/<int:restaurant_id>/reviews/<int:review_id>"
)


# Reservations Routes
# get
# post
class Reservations(Resource):

    def get(self, restaurant_id):
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        reservations = [
            reservation.to_dict(rules=("-restaurant.reviews",))
            for reservation in restaurant.reservations
        ]

        if not reservations:
            return make_response({"error": "Review not found"}, 404)

        return make_response(reservations, 200)

    # Single reservation in a list of reserations for a single restaurant. Format:
    """
    [
    {
        "id": 1,
        "notes": " ",
        "reservation_time": 1730500200,
        "restaurant": {
            "address": "550 3rd Avenue",
            "capacity": 60,
            "category": "Chinese",
            "city": "New York",
            "close_time": 2000,
            "id": 1,
            "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
            "menu_link": "https://www.littlealley.nyc/menu",
            "name": "Little Alley",
            "open_time": 1600,
            "phone": "646-998-3976",
            "res_duration": 90,
            "state": "NY",
            "website": "https://www.littlealley.nyc/",
            "zip": "10016"
        },
        "restaurant_id": 1,
        "status": "confirmed",
        "table_size": 4,
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    },
    """

    def post(self, restaurant_id):
        data = request.get_json()

        session = db.session

        restaurant = session.get(Restaurant, restaurant_id)

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)

        try:
            reservation = Reservation(
                reservation_time=data.get("reservation_time"),
                table_size=data.get("table_size"),
                status=data.get("status"),
                notes=data.get("notes"),
                user_id=data.get("user_id"),
                restaurant=restaurant,
            )

            db.session.add(reservation)
            db.session.commit()
            return make_response(
                reservation.to_dict(rules=("-restaurant.reviews",)), 201
            )

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    """
    {
        "id": 704,
        "notes": "I like shellfish",
        "reservation_time": 1,
        "restaurant": {
            "address": "550 3rd Avenue",
            "capacity": 60,
            "category": "Chinese",
            "city": "New York",
            "close_time": 2000,
            "id": 1,
            "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
            "menu_link": "https://www.littlealley.nyc/menu",
            "name": "Little Alley",
            "open_time": 1600,
            "phone": "646-998-3976",
            "res_duration": 90,
            "state": "NY",
            "website": "https://www.littlealley.nyc/",
            "zip": "10016"
        },
        "restaurant_id": 1,
        "status": "confirmed",
        "table_size": 4,
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    }
    """


api.add_resource(Reservations, "/restaurants/<int:restaurant_id>/reservations")


# ReservationsById
# get
# patch
# delete
class ReservationsById(Resource):

    def get(self, id):
        reservation = Reservation.query.filter_by(id=id).first()

        if not reservation:
            return make_response({"error": "Reservation not found"}, 404)

        return make_response(reservation.to_dict(rules=("-restaurant.reviews",)), 200)

    """
    {
        "id": 1,
        "notes": " ",
        "reservation_time": 1730500200,
        "restaurant": {
            "address": "550 3rd Avenue",
            "capacity": 60,
            "category": "Chinese",
            "city": "New York",
            "close_time": 2000,
            "id": 1,
            "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
            "menu_link": "https://www.littlealley.nyc/menu",
            "name": "Little Alley",
            "open_time": 1600,
            "phone": "646-998-3976",
            "res_duration": 90,
            "state": "NY",
            "website": "https://www.littlealley.nyc/",
            "zip": "10016"
        },
        "restaurant_id": 1,
        "status": "confirmed",
        "table_size": 4,
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    }"""

    def patch(self, id):
        reservation = Reservation.query.filter_by(id=id).first()

        if not reservation:
            return make_response({"error": "Reservation not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(reservation, attr, data.get(attr))

            db.session.add(reservation)
            db.session.commit()
            return make_response(
                reservation.to_dict(rules=("-restaurant.reviews",)), 202
            )

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

    """{
        "id": 704,
        "notes": "I hate shellfish",
        "reservation_time": 2,
        "restaurant": {
            "address": "550 3rd Avenue",
            "capacity": 60,
            "category": "Chinese",
            "city": "New York",
            "close_time": 2000,
            "id": 1,
            "image": "https://assets-global.website-files.com/645aecde0bd10564f39f4379/64e73f688681676ffdf401d0_20230103%20Little%20Alley_367%20WHD.jpg",
            "menu_link": "https://www.littlealley.nyc/menu",
            "name": "Little Alley",
            "open_time": 1600,
            "phone": "646-998-3976",
            "res_duration": 90,
            "state": "NY",
            "website": "https://www.littlealley.nyc/",
            "zip": "10016"
        },
        "restaurant_id": 1,
        "status": "confirmed",
        "table_size": 4,
        "user": {
            "IsAdmin": false,
            "email": "john@example.com",
            "first_name": "John",
            "id": 1,
            "last_name": "Doe",
            "password": "password123",
            "phone": "123-456-7890",
            "username": "johndoe"
        },
        "user_id": 1
    }"""

    def delete(self, id):
        reservation = Reservation.query.filter_by(id=id).first()

        if not reservation:
            return make_response({"error": "Reservation not found"}, 404)

        try:
            db.session.delete(reservation)
            db.session.commit()
            return make_response({}, 204)

        except Exception as e:
            print(f"Error deleting reservation: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)

    """
    Empty response 204, tested and persists
    """


api.add_resource(ReservationsById, "/reservation/<int:id>")


# AllReservations Routes
# get
class AllReservations(Resource):

    def get(self):
        reservations = Reservation.query.all()
        reservations_list = [reservation.to_dict(rules=("-restaurant.reviews",)) for reservation in reservations]

        return make_response(reservations_list, 200)


api.add_resource(AllReservations, "/reservations")


# Users Routes
# get
# post
class Users(Resource):

    def get(self):
                
        user_id = request.args.get('id')
        username = request.args.get('username')
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        
        query = User.query
                
         # Filter by user_id if provided
        if user_id:
            query = query.filter(User.id == user_id)

        # Filter by username if provided
        if username:
            query = query.filter(User.username.ilike(f'%{username}%'))

        # Filter by first name if provided
        if first_name:
            query = query.filter(User.first_name.ilike(f'%{first_name}%'))

        # Filter by last name if provided
        if last_name:
            query = query.filter(User.last_name.ilike(f'%{last_name}%'))
        
        users = query.all()
        
        users_list = [user.to_dict() for user in users]

        return make_response(users_list, 200)

    # First user in a list of all users. Format:
    """   {
        "IsAdmin": false,
        "email": "john@example.com",
        "first_name": "John",
        "id": 1,
        "last_name": "Doe",
        "password": "password123",
        "phone": "123-456-7890",
        "username": "johndoe"
        },
        """

    def post(self):
        data = request.get_json()

        try:
            user = User(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                username=data.get("username"),
                password=data.get("password"),
                phone=data.get("phone"),
                email=data.get("email"),
                IsAdmin=data.get("IsAdmin", False),
            )
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    """{
        "IsAdmin": false,
        "email": "email@email.com",
        "first_name": "JR",
        "id": 244,
        "last_name": "JR",
        "password": "99999999",
        "phone": "999999999",
        "username": "999999999999"
}"""


api.add_resource(Users, "/users")


# UsersById Routes
# get
# patch
# delete
class UsersById(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(user.to_dict(), 200)

    """{
        "IsAdmin": false,
        "email": "john@example.com",
        "first_name": "John",
        "id": 1,
        "last_name": "Doe",
        "password": "password123",
        "phone": "123-456-7890",
        "username": "johndoe"
    }"""

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(user, attr, data.get(attr))

            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 202)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

    """{
        "IsAdmin": false,
        "email": "email@email.com",
        "first_name": "CARL",
        "id": 1,
        "last_name": "JR",
        "password": "2111111",
        "phone": "111-111-1111",
        "username": "111"
    }"""

    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        try:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)

        except Exception as e:
            print(f"Error deleting user: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)

    """
    Empty response 204, tested and persists
    """


api.add_resource(UsersById, "/users/<int:id>")


"""
PLACEHOLDER FOR STRETCH GOALS DISHES

class Dishes():

    def get():
        pass
    def post():
        pass
api.add_resource(Dishes, '/dishes')





class 

        
"""


if __name__ == "__main__":
    app.run(port=5555, debug=True)
