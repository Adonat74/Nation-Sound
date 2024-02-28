# Node.js Express API with User Authentication and CRUD Operations

This Node.js API built with Express provides user authentication and CRUD operations for managing user data. It utilizes various packages including bcrypt, body-parser, jsonwebtoken, mariadb, connect-session-sequelize, cors, express-mongo-sanitize, express-rate-limit, xss-clean, and sequelize.

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Configure your MariaDB connection in `credential/dbConfig.js`.
5. Set up your private key for JWT in `credential/private-key.js` file.

## Usage

1. Start the server by running `npm start`.
2. Use API endpoints for user creation, login, update, and deletion.

## API Endpoints

- `POST /api/createUser`: Create a new user.
- `POST /api/login`: Log in existing user.
- `PUT /api/updateUser/`: Update user data.
- `DELETE /api/deleteUser`: Delete a user account.

## User Model

The user model contains the following data types:

- `id` (integer)
- `email` (string)
- `username` (string)
- `password` (string)
- `favoritemusicgenre` (string)

each one contains various constraint.

## Middleware

### Custom Middleware

- **src/auth/auth.js**: Middleware to verify the JWT token present in the request header using a private key.

### Express Middleware

- `body-parser`: Parses incoming request bodies.
- `cors`: Enables CORS.
- `express-mongo-sanitize`: Sanitizes input against NoSQL Injection.
- `express-rate-limit`: Limits repeated requests to prevent abuse.
- `xss-clean`: Sanitizes user input against XSS.

## Initialization

- **Express Initialization**: Configuration of middleware, routes, and server start in `App.js`.
- **Database Initialization**: Connection to MariaDB and synchronization of user model with database table in `sequelize.js`.

## Contributing

Contributions are welcome. Feel free to open issues and pull requests.

## License

This project is licensed under the [ISC License](LICENSE).