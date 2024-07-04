# Connectverse API

## Description

Connectverse API is a Node.js-based backend for a fictional social media platform. It provides user authentication, post creation, and commenting functionalities using Express.js and Prisma ORM with PostgreSQL.

## Features

- User registration and authentication
- Email verification
- Password reset functionality
- JWT-based session management
- Post creation and retrieval
- Commenting on posts

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

2. The API will be available at `http://localhost:5000` (or whichever port you've configured).

## API Endpoints

### Authentication

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

#### GET /verify-email/:token
- Verify user's email address
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Email verified successfully"
    }
    ```

#### POST /reset-password-request
- Request a password reset
- Request body:
  ```json
  {
    "email": "string"
  }
  ```
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "message": "Password reset email sent"
    }
    ```

#### POST /reset-password/:token
- Reset user's password
- Request body:
  ```json
  {
    "newPassword": "string"
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

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures.

## Security

- Passwords are hashed using bcrypt before storage
- JWT is used for maintaining user sessions
- Email verification is required for new accounts
- Password reset functionality is available

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
