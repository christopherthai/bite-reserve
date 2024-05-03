INSERT INTO Reviews (timestamp, rating, comment, user_id, restaurant_id) VALUES 
-- Reviews for Restaurant 1
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'The food was amazing!', 1, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was excellent, but the food could be better.', 2, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Decent quality food, but cleanliness needs improvement.', 3, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great service and delicious food!', 4, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing experience. Food was cold and service was slow.', 5, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food, friendly staff.', 6, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Top-notch service and food quality!', 7, 1),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience overall.', 8, 1),

-- Reviews for Restaurant 2
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'The food was tasty, but service could be faster.', 9, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Amazing service and great food!', 10, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average food quality, but service was excellent.', 11, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Food was below expectations and staff was unfriendly.', 12, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Exceptional food quality and cleanliness!', 13, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Friendly staff and good food.', 14, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Outstanding service and delicious food!', 15, 2),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Satisfactory experience overall.', 16, 2),

-- Reviews for Restaurant 3 (and so on, you can extend this pattern for the remaining restaurants)
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Delicious food and excellent service!', 17, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was good, but the food could be better.', 18, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Decent food quality, but cleanliness needs improvement.', 19, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Friendly staff and tasty food!', 20, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing experience. Food was bland and service was slow.', 21, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food, but the service could be friendlier.', 22, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great food and excellent service!', 23, 3),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience overall.', 24, 3),

-- Reviews for Restaurant 4
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Excellent food quality and great ambiance!', 25, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was good, but the menu options were limited.', 26, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience. Food was okay.', 27, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Friendly staff and delicious food!', 28, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing service and mediocre food.', 29, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food and cozy atmosphere.', 30, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Outstanding service and excellent cuisine!', 1, 4),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Fair experience overall.', 2, 4),

-- Reviews for Restaurant 5
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'The food was delicious, but the service was slow.', 3, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great service and flavorful dishes!', 4, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average food quality, but friendly staff.', 5, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Food was cold and tasted stale.', 6, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Fantastic food and impeccable service!', 7, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Friendly staff and good atmosphere.', 8, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Outstanding experience overall.', 9, 5),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Satisfactory experience overall.', 10, 5),

-- Reviews for Restaurant 6
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Delicious food and excellent service!', 11, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was good, but the food could be better.', 12, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Decent food quality, but cleanliness needs improvement.', 13, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Friendly staff and tasty food!', 14, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing experience. Food was bland and service was slow.', 15, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food, but the service could be friendlier.', 16, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great food and excellent service!', 17, 6),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience overall.', 18, 6),

-- Reviews for Restaurant 7
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'The food was outstanding and the service was impeccable!', 19, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was good, but the food could be improved.', 20, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Decent food quality, but cleanliness needs attention.', 21, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Friendly staff and delicious cuisine!', 22, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing experience. Food was undercooked and service was slow.', 23, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food, but the service was lacking.', 24, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great food and excellent service!', 25, 7),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience overall.', 26, 7),

-- Reviews for Restaurant 8
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'The food was delicious, but the service was slow.', 27, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great service and flavorful dishes!', 28, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average food quality, but friendly staff.', 29, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Food was cold and tasted stale.', 30, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Fantastic food and impeccable service!', 1, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Friendly staff and good atmosphere.', 2, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Outstanding experience overall.', 3, 8),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Satisfactory experience overall.', 4, 8),

-- Reviews for Restaurant 9
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Delicious food and excellent service!', 5, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Service was good, but the food could be better.', 6, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Decent food quality, but cleanliness needs improvement.', 7, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Friendly staff and tasty food!', 8, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 2, 'Disappointing experience. Food was bland and service was slow.', 9, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 4, 'Good food, but the service could be friendlier.', 10, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 5, 'Great food and excellent service!', 11, 9),
(FROM_UNIXTIME(UNIX_TIMESTAMP() - FLOOR(RAND() * 31536000)), 3, 'Average experience overall.', 12, 9),


