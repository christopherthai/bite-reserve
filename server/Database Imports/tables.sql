CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    isAdmin INTEGER NOT NULL
    
);

CREATE TABLE Reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_time INTEGER NOT NULL,
    table_size INTEGER NOT NULL,
    status TEXT NOT NULL,
    notes TEXT NOT NULL,
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
    zip TEXT NOT NULL,
    image TEXT NOT NULL,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    menu_link TEXT NOT NULL,
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