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




@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Restaurants(Resource):
    
    def get(self):
        restaurants = Restaurant.query.all()        
        restuarants_list = [restaurant.to_dict for restaurant in restaurants]
        
        return make_response(restuarants_list, 200)
        
        
    def post(self):
        data = request.get_json()
        
        try:
            restaurant = Restaurant(
                name = data.get('name'),
                phone = data.get('phone'),
                email = data.get('email'),
                address = data.get('address'),
                city = data.get('city'),
                state = data.get('state'),
                zip = data.get('zip'),
                image = data.get('image'),
                website = data.get('website'),
                logo = data.get('logo'),
                menu_link = data.get('menu_link'),
                capacity = data.get('capacity'),
                open_time = data.get('open_time'),
                close_time = data.get('close_time'), 
                res_duration = data.get('res_duration'), 
            )
            db.session.add(restaurant)
            db.session.commit()        
            return make_response(restaurant.to_dict(), 201)
        
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)
    
    
api.add_resource(Restaurants, '/restuarants')


class RestaurantsById(Resource):
    
    def get(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()
        
        if not restaurant:
            return make_response({'error': 'Restaurant not found'}, 404)
        return make_response(restaurant.to_dict(), 200)
        
        
    def patch(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()
        
        if not restaurant:
            return make_response({'error': 'Restaurant not found'}, 404)
        
        try:
            data = request.get_json()
            for attr in data:
                setattr(restaurant, attr, data.get(attr))
                
            db.session.add(restaurant)
            db.session.commit()            
            return make_response(restaurant.to_dict(), 202)
        
        except ValueError:
            return({'errors': ['validation errors']}, 400)
        
        
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()
        
        if not restaurant:
            return make_response({'error': 'Restaurant not found'}, 404)
       
        try:
            db.session.delete(restaurant)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            print(f'Error deleting restaurant: {str(e)}')
            return({'errors': ['validation errors']}, 400)
             
             
api.add_resource(RestaurantsById, '/restuarants/<int:id>')


class Reviews(Resource):
    
    def get(self):
        reviews = Review.query.all()        
        reviews_list = [review.to_dict for review in reviews]
        
        return make_response(reviews_list, 200)
        
        
    def post(self):
        data = request.get_json()
        
        try:
            review = Review(
                timestamp = data.get('timestamp'),
                rating = data.get('rating'),
                comment = data.get('comment')
            )
            db.session.add(review)
            db.session.commit()        
            return make_response(review.to_dict(), 201)
        
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)
        
        
api.add_resource(Reviews, '/reviews')


class ReviewsById(Resource):
    
    def patch(self, id):
        review = Review.query.filter_by(id = id).first()
        
        if not review:
            return make_response({'error': 'Review not found'}, 404)
        
        try:
            data = request.get_json()
            for attr in data:
                setattr(review, attr, data.get(attr))
                
            db.session.add(review)
            db.session.commit()            
            return make_response(review.to_dict(), 202)
        
        except ValueError:
            return({'errors': ['validation errors']}, 400)
        
        
    def delete(self, id):
        review = Review.query.filter_by(id = id).first()
        
        if not review:
            return make_response({'error': 'review not found'}, 404)
        
        try:
            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            print(f'Error deleting review: {str(e)}')
            return({'errors': ['validation errors']}, 400)
        
        
api.add_resource(ReviewsById, '/reviews/<int:id>')   
    
     
class Reservations(Resource):
    
    def get(self):           
        reservations = Reservation.query.all()        
        reservations_list = [reservation.to_dict for reservation in reservations]
        
        return make_response(reservations_list, 200)
        

    def post(self):
        data = request.get_json()
        
        try:
            reservation = Reservation(
                timestamp = data.get('timestamp'),
                rating = data.get('rating'),
                comment = data.get('comment')
            )            
            db.session.add(reservation)
            db.session.commit()        
            return make_response(reservation.to_dict(), 201)
        
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)
    
    
api.add_resource(Reservations, '/reservations')


class ReservationsById(Resource):
    
    def get(self, id):
        reservation = Reservation.query.filter_by(id = id).first()
        
        if not reservation:
            return make_response({'error': 'Reservation not found'}, 404)
        
        return make_response(reservation.to_dict(), 200)
        
    
    def patch(self, id):
        reservation = Reservation.query.filter_by(id = id).first()
        
        if not reservation:
            return make_response({'error': 'Reservation not found'}, 404)
        
        try:
            data = request.get_json()
            for attr in data:
                setattr(reservation, attr, data.get(attr))
                
            db.session.add(reservation)
            db.session.commit()            
            return make_response(reservation.to_dict(), 202)
        
        except ValueError:
            return({'errors': ['validation errors']}, 400)
        
        
    def delete(self, id):
        reservation = Reservation.query.filter_by(id = id).first()
        
        if not reservation:
            return make_response({'error': 'Reservation not found'}, 404)
        
        try:
            db.session.delete(reservation)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            print(f'Error deleting reservation: {str(e)}')
            return({'errors': ['validation errors']}, 400)
        
        
api.add_resource(ReservationsById, '/reservations/<int:id>')


class Users(Resource):
    
    def get(self):           
        users = User.query.all()        
        users_list = [ user.to_dict for user in users]
        
        return make_response(users_list, 200)
    
    
    def post():
        data = request.get_json()
        
        try:
            user = User(
                first_name = data.get('first_name'),
                last_name = data.get('last_name'),
                username = data.get('username'),
                password = data.get('password'),
                phone = data.get('phone'),
                email = data.get('email'),
                IsAdmin = data.get('IsAdmin')
            )
            db.session.add(user)
            db.session.commit()        
            return make_response(user.to_dict(), 201)
        
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)


api.add_resource(Users, '/users')


class UsersById(Resource):    
    
    def get(self, id):        
        user = User.query.filter_by(id = id).first()        
        if not user:
            return make_response({'error': 'User not found'}, 404)
        
        return make_response(user.to_dict(), 200)
    
    
    def patch(self, id):        
        user = User.query.filter_by(id = id).first()        
        if not user:
            return make_response({'error': 'User not found'}, 404)
        
        try:
            data = request.get_json()            
            for attr in data:
                setattr(user, attr, data.get(attr))
                
            db.session.add(user)
            db.session.commit()            
            return make_response(user.to_dict(), 202)
        
        except ValueError:
            return({'errors': ['validation errors']}, 400)
        
        
    def delete(self, id):
        user = User.query.filter_by(id = id).first()
        
        if not user:
            return make_response({'error': 'User not found'}, 404)
        
        try:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception as e:
            print(f'Error deleting user: {str(e)}')
            return({'errors': ['validation errors']}, 400)
        
        
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

