# x-clone

Effortlessly launch your own Twitter-like experience with Node.js!

## Features

User registration and authentication
Post creation and viewing
Following and follower management
Secure password hashing
RESTful API endpoints
Potential for customization and extensions

## Installation

1. Clone the repository:
    git clone https://github.com/dhruv95goradiya/x-clone.git

2. Navigate to the project directory:
    **cd x-clone**

3. Install dependencies
    **npm install**

## Setup

1. Create a MongoDB database.
2. Create a .env file in the root directory with the following variables:

    MONGODB_URI=mongodb://your_mongodb_uri
    JWT_SECRET=your_strong_secret_key

## Usage

1. Run backend **npm start**

## Testing

1. Run unit tests with coverage report **npm test**

## API Endpoints

1. User Operations APIs:

    Signup:

        Endpoint: POST /auth/signup
        Description: Sign up a new user with a unique username (email) and password.

    Login:

        Endpoint: POST /auth/login
        Description: Log in an existing user with a valid username (email) and password.
    
    Post Message:

        Endpoint: POST /post/dopost
        Description: Create a new post message. Requires authentication.

    Get My Posts:

        Endpoint: GET /user/myposts
        Description: Get a list of posts created by the authenticated user.

    Get Other Users:

        Endpoint: GET /user/other-users
        Description: Get a list of other users (excluding the authenticated user).

    Follow User:

        Endpoint: POST /user/follow/:userId
        Description: Follow another user by providing their user ID. Requires authentication.
    
    Get My Feed:

        Endpoint: GET /user/feed
        Description: Get the feed containing posts from the authenticated user and users they follow.

    API Usage:

        Token Authorization:
            All the endpoints requiring authentication should include a valid JWT token in the Authorization header.

    Request and Response Format:

        Request Format:
            Ensure the request payload is in JSON format.

        Response Format:
            The response will be in JSON format and will include a status code, message, data (if any), and error (if any).

## Additional Information
    Library Documentation: https://github.com/acargorkem/twitter-clone

## License

This project is licensed under the MIT License.
