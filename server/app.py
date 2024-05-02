#!/usr/bin/env python3

from flask import request, jsonify, make_response, Flask
from flask_restful import Resource, Api
from flask_migrate import Migrate
import os
# Local imports
from config import app, db, api
from models import db, Restaurant, User, Reservation, Review


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Restaurants(Resource):
    def get(self):
        restaurants = Restaurant.query.all()
        
        restuarants_list = restaurant.to_dict for restuarant in restaurants
        
        pass    
    def post():
        pass    
api.add_resource(Restaurants, '/restuarants')



class RestaurantsById(Resource):
    def get():
        pass
    def patch():
        pass
    def delete():
        pass      
api.add_resource(RestaurantsById, '/restuarants/<int:id>')



class Reviews(Resource):
    def get():
        pass
    def post():
        pass
api.add_resource(Reviews, '/reviews')



class ReviewsById():
    def patch():
        pass
    def delete():
        pass
api.add_resource(ReviewsById, '/reviews/<int:id>')   
    
'''
Keenan above

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Spencer below
'''    
     
class Reservations():
    def get():
        pass
    def post():
        pass
api.add_resource(Reservations, '/reservations')



       
class ReservationsById():
    def get():
        pass
    def patch():
        pass
    def delete():
        pass
api.add_resource(ReservationsById, '/reservations/<int:id>')





class Users():
    def get():
        pass
    def post():

api.add_resource(Users, '/users')





class UsersById():
    def get():
        pass
    def patch():
        pass
    def delete():
        pass
api.add_resource(UsersById, '/users/<int:id>')



'''
PLACEHOLDER FOR STRETCH GOALS DISHES

class Dishes():

    def get():
        pass
    def post():
        pass
api.add_resource(Dishes, '/dishes')





class 

        
'''


if __name__ == '__main__':
    app.run(port=5555, debug=True)

