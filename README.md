# Members Only Auth App

[Live App](https://members-only-auth-app-production.up.railway.app/)


## Concepts Learned

- Creating a basic authentication system using Passport.js
- Using EJS for templating
- Using PostgreSQL as a database
- Deploying an app on Railway

## Technologies Used

- Node.js: Server-side JavaScript runtime.
- Express.js: Web application framework for Node.js.
- Passport.js: Authentication middleware.
- Bcrypt.js: Password hashing library.
- PostgreSQL: Relational database for session and user management.
- Connect-Pg-Simple: PostgreSQL session store for Express.
- EJS: Templating engine for rendering views.

# Deployment:
Deployed to Railway with PostgreSQL database in a Railway environment

## Features

- User Registration
- User Login and Logout
- Session Management with PostgreSQL
- Admin Status Management
- User Authentication using Passport.js
- Secure Password Handling with Bcrypt.js


## Set Up

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a PostgreSQL database and add the credentials to a `.env` file
4. Run `npm run start` to start the development server
5. Open a browser and navigate to `localhost:3000`

You can access the following routes:

- /log-in: Login page
- /sign-up: Registration page
- /log-out: Log out user
- /: Home page

## Dependencies

- `bcryptjs` for password hashing
- `connect-pg-simple` for using PostgreSQL with Express
- `dotenv` for loading environment variables from a `.env` file
- `ejs` for templating
- `express` for creating the server
- `express-session` for creating sessions
- `express-validator` for validating form data
- `moment` for formatting dates
- `passport` for authentication
- `passport-local` for using local authentication with Passport
- `pg` for interacting with PostgreSQL

## License
Distributed under the MIT License. See LICENSE for more information.