# Connectverse API

## Description

Connectverse API is a Node.js-based backend for a fictional social media platform. It provides user authentication, post creation, and commenting functionalities using Express.js and Prisma ORM with PostgreSQL.

LIVE AT: https://infloso-assignment.vercel.app

## Features

- User registration and authentication
- Email verification
- Secure password reset functionality
- JWT-based session management
- Post creation and retrieval (to be implemented)
- Commenting on posts (to be implemented)

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/connectverse-api.git
   cd connectverse-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/connectverse?schema=public"
   ```

4. Set up other environment variables in the `.env` file:
   ```
   JWT_SECRET="your-secret-key"
   ```

5. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```

## Getting Started

1. Start the server:
   ```
   npm run dev
   ```

2. The API will be available at `http://localhost:3000` (or whichever port you've configured).

## API Endpoints

### Authentication

BASE_URL = https://infloso-assignment.vercel.app

#### POST /signup
- Register a new user or log in an existing user
- Request body:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Response:
  - Status: 201 Created (new user) or 200 OK (existing user)
  - Body:
    ```json
    {
      "message": "string",
      "token": "string",
      "isNewUser": boolean
    }
    ```

#### POST /login
- Authenticate a user
- Request body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "token": "string"
    }
    ```

#### POST /reset-password-request
- Request a password reset
- Authentication: Required (JWT token in Authorization header)
- Request body: Empty
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Password reset email sent",
      "resetToken": "string"
    }
    ```

#### POST /reset-password
- Reset user's password
- Authentication: Required (JWT token in Authorization header)
- Request body:
  ```json
  {
    "newPassword": "string",
    "resetToken": "string"
  }
  ```
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Password reset successfully"
    }
    ```

### Posts (to be implemented)

#### POST /posts
- Create a new post
- Authentication: Required
- Request body:
  ```json
  {
    "content": "string"
  }
  ```
- Response:
  - Status: 201 Created
  - Body: Created post object

#### GET /posts
- Get all posts
- Authentication: Required
- Response:
  - Status: 200 OK
  - Body: Array of post objects

### Comments (to be implemented)

#### POST /posts/:postId/comments
- Add a comment to a post
- Authentication: Required
- Request body:
  ```json
  {
    "content": "string"
  }
  ```
- Response:
  - Status: 201 Created
  - Body: Created comment object

#### GET /posts/:postId/comments
- Get all comments for a post
- Authentication: Required
- Response:
  - Status: 200 OK
  - Body: Array of comment objects

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To authenticate requests, include the JWT token in the Authorization header of your HTTP request:

```
Authorization: Bearer <your-token-here>
```

You receive this token when you successfully sign up or log in.

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures.

## Security

- Passwords are hashed using bcrypt before storage
- JWT is used for maintaining user sessions
- Email verification is required for new accounts
- Password reset functionality requires authentication and uses a separate reset token
- All sensitive routes are protected and require authentication

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
