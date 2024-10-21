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

    
Replace your-database-host, your-database-username, your-database-password, and your-database-name with your actual database credentials.

## Usage

To start the server, run:

```bash
   node app.mjs
 ```

By default, the server will run on http://localhost:5000.


## API Endpoints
Here are the main endpoints provided by the API:

    
## Dependencies
    Node.js - JavaScript runtime
    Express - Web framework for Node.js
    MySQL2 - MySQL client for Node.js with promises
    dotenv - Loads environment variables from a .env file
    cors - Enables Cross-Origin Resource Sharing (CORS)
