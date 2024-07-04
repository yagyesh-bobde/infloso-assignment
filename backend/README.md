# Auth Backend - Connectverse

Develop a Node.js API that handles user registration and authentication for a fictional social media platform called "Connectverse". The API should implement secure registration, login, and JWT-based authentication, following best practices.

## Features

- User registration
- User login
- JWT-based authentication
- Password hashing
- Secure password reset
- Secure email verification

## Requirements/Libraries

- Node.js
- MongoDB
- Postman (optional)
- Prisma
- Express

## Installation

1. Clone the repository
2. Install the dependencies
```
npm install
```
3. Create a `.env` file and add the following environment variables:

```
PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongo_uri
```

4. Run the server
```
npm start
```

## API Endpoints

### User Registration

- **POST** `/api/signup`
  - Register a new user
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john@doe.co",
      "password": "password"
    }

- **POST** `/api/login`
  - Login a user
  - Request body:
    ```json
    {
      "email": "john@doe.co",
      "password": "password"
    }
