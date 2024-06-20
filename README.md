# CesiEats
## Description

CesiEats is a web application that allows users to order food from local restaurants. The application is designed to be user-friendly and easy to navigate. Users can browse through a list of restaurants, view their menus, and place orders for delivery. The application also allows users to create accounts, and track their order. 
CesiEats is the perfect solution for anyone looking to order food online.

## Features
### Customer

- Create an account, login and disconnect
- Browse through a list of restaurants
- View restaurant menus
- Place orders for delivery
- Track order status
- See profile information and order history
- Update profile information

### Restaurant owner

- Create an account, login and disconnect
- Create a restaurant profile
- Make his restaurant available or not for delivery
- Add menu items
- See list of orders
- Accept or reject orders and signal when the order is ready to be delivered

### Delivery man

- Create an account, login and disconnect
- See list of orders available for delivery
- Accept an order to deliver
- Enter the verification code given by the customer to confirm the delivery

## Technologies

- Frontend: React.js
- Framework: Vite
- Backend: Node.js, Express.js
- Database: MongoDB, postgreSQL
- Authentication: JWT

## Installation

1. Clone the repository with the following command:
```bash
git clone
```
2. Install the dependencies with the following commands:
```bash
npm install
```

3. Create two docker containers for the database with the following commands:
```bash
docker run --name cesieats-mongo -p 27017:27017 -d mongo
docker run --name cesieats-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
4. Run the backend server with the following command:
```bash
cd backend
npm start
```
5. Run the frontend servers with the following command:
```bash
cd frontend/customer-vite
npm run dev
```
```bash
cd frontend/restaurant-vite
npm run dev
```
```bash
cd frontend/delivery-vite
npm run dev
```

## Contributors

- Mathis WAUTERS
- Edwin TRENY
- Cléa FLATRES
- Camille RAAD

## License

This project is licensed under the MIT License. CeSiEats © 2021. All Rights Reserved.