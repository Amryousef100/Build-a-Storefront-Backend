CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
   order_status VARCHAR(50),
    user_id INTEGER REFERENCES Users(id)
    )