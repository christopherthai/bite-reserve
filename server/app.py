#!/usr/bin/env python3

from flask import request, jsonify, make_response, Flask
from flask_restful import Resource, Api
from flask_migrate import Migrate
import os

# Local imports
from config import app, db, api
from models import db, Restaurant, User, Reservation, Review


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


#Restaurants Routes
#get
#post
class Restaurants(Resource):
    
    def get(self):
        restaurants = Restaurant.query.all()
        restaurants_list = [restaurant.to_dict(rules=("-reservations", )) for restaurant in restaurants]

        return make_response(restaurants_list, 200)
    
    #First restaurant in a list of all restaurants, with first comment in a list of all comments.  
    # Response in this format.        
    '''[
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
            },'''
            
            

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
     
     
    #Restaurant created by posting.  
    # Response in this format.        
    '''{
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
}'''
        

api.add_resource(Restaurants, "/restaurants")


#RestaurantsById Routes
#get
#patch
#delete
class RestaurantsById(Resource):

    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if not restaurant:
            return make_response({"error": "Restaurant not found"}, 404)
        return make_response(restaurant.to_dict(), 200)

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
            return make_response(restaurant.to_dict(), 202)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

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


api.add_resource(RestaurantsById, "/restuarants/<int:id>")


#Reviews Routes
#get
#post
class Reviews(Resource):

    def get(self):
        reviews = Review.query.all()
        reviews_list = [review.to_dict for review in reviews]

        return make_response(reviews_list, 200)

    def post(self):
        data = request.get_json()

        try:
            review = Review(
                timestamp=data.get("timestamp"),
                rating=data.get("rating"),
                comment=data.get("comment"),
            )
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Reviews, "/reviews")


#ReviewsById Routes
#patch
#delete
class ReviewsById(Resource):

    def patch(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return make_response({"error": "Review not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(review, attr, data.get(attr))

            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 202)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return make_response({"error": "review not found"}, 404)

        try:
            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)

        except Exception as e:
            print(f"Error deleting review: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)


api.add_resource(ReviewsById, "/reviews/<int:id>")





##Spencer Below this~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



#Reservations Routes
#get
#post
class Reservations(Resource):

    def get(self):
        reservations = Reservation.query.all()
        reservations_list = [reservation.to_dict for reservation in reservations]

        return make_response(reservations_list, 200)

    def post(self):
        data = request.get_json()

        try:
            reservation = Reservation(
                timestamp=data.get("timestamp"),
                rating=data.get("rating"),
                comment=data.get("comment"),
            )
            db.session.add(reservation)
            db.session.commit()
            return make_response(reservation.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Reservations, "/reservations")


#ReservationsById
#get
#patch
#delete
class ReservationsById(Resource):

    def get(self, id):
        reservation = Reservation.query.filter_by(id=id).first()

        if not reservation:
            return make_response({"error": "Reservation not found"}, 404)

        return make_response(reservation.to_dict(), 200)

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
            return make_response(reservation.to_dict(), 202)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)

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


api.add_resource(ReservationsById, "/reservations/<int:id>")


#Users Routes
#get
#post
class Users(Resource):

    def get(self):
        users = User.query.all()
        users_list = [user.to_dict for user in users]

        return make_response(users_list, 200)

    def post():
        data = request.get_json()

        try:
            user = User(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                username=data.get("username"),
                password=data.get("password"),
                phone=data.get("phone"),
                email=data.get("email"),
                IsAdmin=data.get("IsAdmin"),
            )
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Users, "/users")


#UsersById Routes
#get
#patch
#delete
class UsersById(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(user.to_dict(), 200)

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
