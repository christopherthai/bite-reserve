# BiteReserve

<!-- Headings -->

## Description

BiteReserve is an intuitive web application that simplifies restaurant reservations by allowing users to seamlessly browse, book, and manage their dining experiences online.

## Wireframe

### Home Page

![HomePage](./planning/HomePage.png)

### Restaurant Detail Page

![RestaurantDetailPage](./planning/Wireframe.png)

### Reservations Page

![ReservationsPage](./planning/Wireframe.png)

### Admin Dashboard Page

![AdminDashboard](./planning/Wireframe.png)

## User Stories

1. Users can see a list of restaurants on the homepage. When users click on one of the restaurants, they are redirected to view more details about the restaurant. Here, they can book a reservation, leave a rating, and comment on the restaurant.

2. Users must log in to the website to book a reservation, leave a rating, and comment.

3. Users can view info about the site on the “About” page.

4. Users can log into the website to make a reservation at a restaurant with a unique username and password.

5. Users can register on the website, where they set up a username and password and will be prompted to become admin users.

6. Users can check, update, and cancel their reservations on the reservation list page when they log in.

7. Admin users can manage the restaurants on the website, where they can add, edit, and delete restaurants.
8. Admin users can manage the reservations for all restaurants where they can add, edit, and delete reservations.

## React Components Tree

![ReactComponentsTree](./planning/ComponentTree.png)

## Database Schema

![Database](./planning/Database.png)

## Constraints

- All users should have an unique usernames
- Admin users should only be allowed to edit restaurants and reservations, but not to make reservations

## Validations

- Ensure the capacity and table_size attributes in the Restaurant table are integers.
- Check the phone format in the Restaurant table and email format in User table
- Restaurant name must be unique
- Restaurant capacity must be an integer
- Reservation table size must be an integer
- Reservation status must be a valid string value
- Email address must be in a valid format
- The name of the user must be non-empty
- The username and password of the user must be non-empty
- Rating must be between 1 and 5
- Review comments on a restaurant must be non-empty

## API Routes

![API Routes](./planning/)

## React Routes

![ReactRoutes](./planning/ReactRoutes.png)

## Stretch Goals

1. Users can pick their table using the restaurant's visual layout. Available and taken tables will be color-coordinated. The user can sort by date, time, and total party size.

2. Users can receive text messages or an email regarding their reservations. The user will also receive a link to change/change reservation.

3. Users can see available openings when reserving across all restaurants in the system.

## Trello Board

![Trello Board](./planning/TrelloBoard.png)
