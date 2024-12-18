# skyMatch API

This is a RESTful API built with Node.js and Express for managing an aircraft renting app. The API allows you to perform CRUD operations on airlines, crews, aircrafts, rentals and reviews.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/enriquesuarezzz/sky-match-api.git
  ```

2. Navigate to the project directory:
   
 ```bash
   cd sky-match-api
 ```

3. Install the dependencies:
   
 ```bash
   npm install
 ```

## Environment Variables

Create a .env file in the root of your project and add the following environment variables:

    PORT=5000
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    JWT_SECRET=your-secret-key

    
Replace your-database-host, your-database-username, your-database-password, and your-database-name with your actual database credentials.

## Usage

To start the server, run:

```bash
   node app.mjs
 ```

By default, the server will run on http://localhost:5000.


## API Endpoints
Here are the main endpoints provided by the API:
    
    Aircrafts
      GET /api/aircrafts - Get all aircrafts
      GET /api/aircrafts/:id - Get a single aircraft by airline ID
      DELETE /api/aircrafts/:id - Delete an aircraft by aircraft ID
      POST /api/aircrafts - Create a new aircraft
    
    Airlines
      GET /api/airlines - Get all airlines
      GET /api/airlines/:id - Get a single airline by airline ID
      PUT /api/airlines/:id - Update an airline by ID
    
    Crew
      GET /api/crew - Get all crew

    Login
      POST /api/login - Airline Log in 

    Register
      POST /api/register - Register new airline

    Rentals
      GET /api/rentals - Get all rentals
      GET /api/rentals/:id - Get a single rental by rental ID
      POST /api/rentals  - Create rental
      POST /api/rentals - Create a new rental
      DELETE /api/rentals/:id - Delete a rental by rental ID

    Reviews
      GET /api/reviews - Get all reviews
      POST /api/reviews - Create a new review
     

    
## Dependencies
    Node.js - JavaScript runtime
    Express - Web framework for Node.js
    MySQL2 - MySQL client for Node.js with promises
    dotenv - Loads environment variables from a .env file
    cors - Enables Cross-Origin Resource Sharing (CORS)
    jsonwebtoken -  library for securely creating and verifying JSON Web Tokens (JWTs), which are used for authentication and information exchange between parties.
