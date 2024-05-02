CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    isAdmin INTEGER NOT NULL
    
);

CREATE TABLE Reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date INTEGER NOT NULL,
    time INTEGER NOT NULL,
    party_size INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
    
);

CREATE TABLE Restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip INTEGER NOT NULL,
    image TEXT NOT NULL,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    zip INTEGER NOT NULL,
    menu_link TEXT NOT NULL,
    rating INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    open_time INTEGER NOT NULL,
    close_time INTEGER NOT NULL,
    res_duration INTEGER NOT NULL
    
);

CREATE TABLE Reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
    
);