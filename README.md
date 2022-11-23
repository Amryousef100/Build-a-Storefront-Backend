# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
           npm install -g db-migrate

- Node/Express for the application logic
            npm install -g n
            npm i  express
- dotenv from npm for managing environment variables
            npm i dotenv or yarn add dotenv
            npm install --save-dev cross-env
            Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing.
            
Install the global package npm install -g db-migrate
Install the package to the project yarn add db-migrate db-migrate-pg
Add a database.json reference file in the root of the project. Later, when we are working with multiple databases - this will allow us to specify what database we want to run migrations on. Here is  database.json

- db-migrate from npm for migrations
              npm install -g db-migrate
               yarn add db-migrate db-migrate-pg

Create a migration db-migrate create orders-table --sql-file
Add the SQL you need to the up and down sql files
Bring the migration up db-migrate up
Bring the migration down db-migrate down

for modles
Create the models folder and order model file. The directory structure should look like this:src --> models --> order.ts


****************************************************************
all the required routes.

  for Users
- Index [token required]
- Show [token required]
- Create 

1 - UsersRoute is shown as follows :
`````
const UsersRoute = (app) => {
    app.get('/users', authentication_1.default, index);
    app.get('/users/:id', authentication_1.default, show);
    app.post('/users', create);
    app.delete('/users/:id', authentication_1.default, destroy);
    app.patch('/users/:id', authentication_1.default, update);
};
exports.default = UsersRoute;
``````


Orders
- Index
- Show > Current Order by user (args: user_ id)[token required]

2- for OrdersRoute is shown as foolows :

````````
const OrdersRoute = (app:express.Application)=>{
    app.get('/orders',index);
    app.get('/orders/:id',verifyAuthToken,show);
    app.post('/orders',verifyAuthToken,create);
    app.post('/orders/:id/products',verifyAuthToken,addProduct);
    app.delete('/orders/:id',verifyAuthToken,destroy)
}

``````


3 -for ProductsRoute
`````

const ProductsRoute =(app:express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',verifyAuthToken,create);
    app.delete('/products/:id',verifyAuthToken,destroy);
    app.patch('/products/:id',verifyAuthToken,update);
}

```````

 1-database schema for TABLE products(
    id SERIAL PRIMARY  KEY,
      productname VARCHAR(100) NOT NULL,
    price integer NOT NULL
);

2- database schema for TABLE Orders (
    id SERIAL PRIMARY KEY,
   order_status VARCHAR(50),
    user_id INTEGER REFERENCES Users(id)
    )

    3- database schema for TABLE  Users (
    id SERIAL PRIMARY  KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(255)
);
4- database schema for TABLE Order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
)















provide instructions to set up the database through the PSQL terminal

````
C:\Users\Amr>psql -U postgres
Password for user postgres:postgres
psql (15.0)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# create database storefront1;
CREATE DATABASE
postgres=# create database storefront1_test;
CREATE DATABASE
postgres=# \l

                                                                List of databases
       Name       |  Owner   | Encoding |          Collate           |           Ctype            | ICU Locale | Locale Provider |   Access privileges
------------------+----------+----------+----------------------------+----------------------------+------------+-----------------+-----------------------
 postgres         | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 storefront1      | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 storefront1_test | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 storefront2      | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 storefront2_test | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 storefront4      | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            |
 template0        | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
                  |          |          |                            |                            |            |                 | postgres=CTc/postgres
 template1        | postgres | UTF8     | English_United States.1252 | English_United States.1252 |            | libc            | =c/postgres          +
                  |          |          |                            |                            |            |                 | postgres=CTc/postgres
(8 rows)



postgres=# \c storefront1 ;
You are now connected to database "storefront1" as user "postgres".
storefront1=# \dt
             List of relations
 Schema |      Name      | Type  |  Owner
--------+----------------+-------+----------
 public | migrations     | table | postgres
 public | order_products | table | postgres
 public | orders         | table | postgres
 public | products       | table | postgres
 public | users          | table | postgres
(5 rows)


storefront1=# select  * from  users ;
 id | firstname | lastname |                           password
----+-----------+----------+--------------------------------------------------------------
 14 | Amr       | Mohamed  | $2b$10$dgGr/q3cUz4v2V3HXhwvO..74sRKJl0jcz.9Y1/sLZidTQoQ4hVQK
 15 | Amr       | Mohamed  | $2b$10$wlnqukISP57yYu3EpmDQq.UAJl.uLDLFHDUpQwMGZ3SnaFDsPmoYO
 16 | Amr       | Mohamed  | $2b$10$05YVLiQIcnwlhYIZpEz3ae6RobkqBsR6dYuTqHFWd5UhIbj7IKSn6
 17 | ali       | mazen    | $2b$10$jO2eOznjswS0bjZdUlIpCunvKnmUhVGfx2cJ6wwHqAekc/4REcUqi
 18 | youssef   | amr      | $2b$10$kJXTHKMqC2JCNNXoxtNEZuA7iCDWT1SmcsN1SkV.q/vC6pBpHHQLW
 19 | tamer     | ali      | $2b$10$JUXAsMGnYLAQd2oFEBUjXeYtQXuXiVxEa.ceERtFbNEDS7Bb3638K
 20 | omr       | ali      | $2b$10$XcNipBd4T3MK6rqZn9D0tOvvS388a.ozCk08zViPmRzBqjvrRQN0W
 21 | amr       | youssef  | $2b$10$qIRkt6t1/WHe.mshjM1CX.y6jtvT/74iSzDnGjuY7L9vtLGmKMksC
 22 | ali       | mazen    | $2b$10$57iwzJkUERfkO5EKz8KYQ.7T5cnCz3aVgmnYoTSYU2/eJxUAXVHSu
 23 | youssef   | amr      | $2b$10$a9ouGS/ZCrbJuROJJRsWWuLsIZZBysz80YIsTM0blLzVcKxjPxLXi
 24 | tamer     | ali      | $2b$10$hEZsnxlNkklg1kwK3AgtYuIlQWOTu4RAzV/Qdu2pKEiJkxT5uXdFW
 25 | omr       | ali      | $2b$10$GZ2s6EOJHb8KYrAysd/Kue4bZHhCVeOOz6zRadH6/sV0irLRyEmDG
 26 | amr       | youssef  | $2b$10$MtU1MQbGGg9hUqSiL5daNeW0YkswQOS3o2/LV4kJBrreRViDULH3G
(13 rows)


storefront1=# select  * from  orders ;
 id | order_status | user_id
----+--------------+---------
  9 | Active       |      16
(1 row)


storefront1=# select  * from   products;
 id | productname | price
----+-------------+-------
  2 | pen         |     3
  3 | book        |    20
  4 | cap         |     8
  6 | pen         |     3
  7 | book        |    20
  8 | cap         |     8
  9 | pen         |     3
(7 rows)


storefront1=#  select  * from  order_products;
 id | quantity | order_id | product_id
----+----------+----------+------------
(0 rows)


storefront1=# \q

**************************************************************


postgres=# \c  storefront1_test;
You are now connected to database "storefront1_test" as user "postgres".
storefront1_test=# \dt
             List of relations
 Schema |      Name      | Type  |  Owner
--------+----------------+-------+----------
 public | migrations     | table | postgres
 public | order_products | table | postgres
 public | orders         | table | postgres
 public | products       | table | postgres
 public | users          | table | postgres
(5 rows)


storefront1_test=# select  * from  users ;
 id | firstname | lastname |                           password
----+-----------+----------+--------------------------------------------------------------
  1 | amr       | ahmed    | $2b$10$ifYOvqHqw0Zd0b5HlkYlQOQK317OQ2DBoVYVID/mbFj1U40FPWqdC
  2 | amr       | ali      | $2b$10$fcxMUSTCzpzSQHlKD7nkk.oOvBkmp/YeVzoapd1MfzL707VC3e1pW
  3 | tamer     | ali      | $2b$10$p/5M/7P0u/3jjhSpNNVzD.5uYgXEIrTHnN9GgTW19YYHY7i1F55BK
  4 | amr       | youssef  | $2b$10$ALH5sSj4VWYid9sbw5l/8uTv.FxZsf.YjwhiPB0fAjC8wtC4AxtzS
  5 | amr       | ans      | $2b$10$QS7Vgm37bJw/dZp6Cn4FcuqhtKcrbHd2Mu2wfJb5RtMdDAG9dlDji
(5 rows)


storefront1_test=#  select  * from  users;
 id | firstname | lastname |                           password
----+-----------+----------+--------------------------------------------------------------
  1 | amr       | ahmed    | $2b$10$ifYOvqHqw0Zd0b5HlkYlQOQK317OQ2DBoVYVID/mbFj1U40FPWqdC
  2 | amr       | ali      | $2b$10$fcxMUSTCzpzSQHlKD7nkk.oOvBkmp/YeVzoapd1MfzL707VC3e1pW
  3 | tamer     | ali      | $2b$10$p/5M/7P0u/3jjhSpNNVzD.5uYgXEIrTHnN9GgTW19YYHY7i1F55BK
  4 | amr       | youssef  | $2b$10$ALH5sSj4VWYid9sbw5l/8uTv.FxZsf.YjwhiPB0fAjC8wtC4AxtzS
  5 | amr       | ans      | $2b$10$QS7Vgm37bJw/dZp6Cn4FcuqhtKcrbHd2Mu2wfJb5RtMdDAG9dlDji
(5 rows)


storefront1_test=#  select  * from   products;
 id | productname | price
----+-------------+-------
  1 | watch       |    25
  2 | book        |    20
  3 | cap         |     8
  4 | pen         |     3
(4 rows)


storefront1_test=#  select  * from orders;
 id | order_status | user_id
----+--------------+---------
  1 | active       |       1
  2 | active       |       2
(2 rows)


storefront1_test=#  select  * from orders order_products;
 id | order_status | user_id
----+--------------+---------
  1 | active       |       1
  2 | active       |       2
(2 rows)


storefront1_test=#



````







Installing Jasmine
Add globally for CLI commands npm install -g jasmine
Add Jasmine and its Typescript types locally to package.json yarn add jasmine @types/jasmine
Run Jasmine initialization to get test structure jasmine init

- jasmine from npm for testing
       npm install -g jasmine
       yarn add jasmine @types/jasmine
       Run Jasmine initialization to get test structure jasmine init

then 
 write some Express handlers for incoming requests, now we need to connect the last of the plumbing and make sure those handlers can interact with the model methods 

 Express handles incoming HTTP requests to the API and the handler functions call model methods
Model methods query the database and send the information back to the handler, which parses it into json and sends the HTTP response

and

Installing Bcrypt  Bcrypt is a very common library for implementing password encryption 
      yarn add bcrypt
      then create necssary enviroment variables

                 BCRYPT_PASSWARD=your-secret-passward
                 SALT_ROUNDS=10

                 use bcrypt hashing method with salt and pepper in creat method

       
- jsonwebtoken from npm for working with JWTs
              npm install jsonwebtoken 
               then create necssary enviroment variables
                TOKEN_SECRET=amr123!
When we use JWTs, we pass them as a special header called the Authorization header using this format:

Authorization: Bearer <token>

Where Bearer is a string separated by the token with a space.

Getting the header

In Node, we can locate the authorization header sent with a request like this:

const authorizationHeader = req.headers.authorization

Very similar to the way we get the request body.

Parsing the header

Then, to get the token out of the authorization header, we need to do a little bit of Javascript string parsing. Remember that the word "Bearer" and the token are together as string, separated by a space. We can separate them with this logic:

const token = authorizationHeader.split(' ')[1]

Where we split the string by the space, and take the second item. The second item is the token.

Putting it all together

Now we have a way to get the token from its correct location in the authorization header, so the code from the video could be revised to look like this:

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    ....rest of method is unchanged
}
And this would work. But to be even more professional about this, let's make this process of requiring token verification easily replicable by turning it into a function.

Making a custom Express middleware

In the handler file, we are going to add a new function called verifyAuthToken. I'll first show you the function, most of the logic is a direct copy from the create method above:

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
    }
}


              

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

