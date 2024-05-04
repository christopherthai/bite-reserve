import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const [restaurants, setRestaurants] = ([]);

useEffect(() => {
    fetch('/restaurants')
    .then(res => {
        if(res.ok){
            return res.json()
        } else {
            console.log('restaurants not found')
        }
    })
    .then(data => setRestaurants(data))
}, [])
function RestaurantList() {
  return restaurants;
}

export default RestaurantList;



// { title: 'Mcdonald ', content: 'Content for Card 1' },
// { title: 'papa johns', content: 'Content for Card 2' },
// { title: 'PF chang', content: 'Content for Card 3' },
// { title: 'Card 4', content: 'Content for Card 4' },
// { title: 'Card 5', content: 'Content for Card 5' },
// { title: 'Card 6', content: 'Content for Card 6' },
// { title: 'Card 7', content: 'Content for Card 7' },
// { title: 'Card 8', content: 'Content for Card 8' },
// { title: 'Card 9', content: 'Content for Card 9' },