CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at timestamptz
);

CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    description TEXT,
    style VARCHAR(255),
    instrumental SMALLINT,
    lyric TEXT,
    song_name TEXT,
    song_url TEXT,
    created_at timestamptz,
    status SMALLINT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamptz,
    user_email VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    plan VARCHAR(50),
    expired_at timestamptz,
    order_status SMALLINT NOT NULL,
    paied_at timestamptz,
    checkout_session_id VARCHAR(255),
    credits INT NOT NULL,
    paid_order_id VARCHAR(255) UNIQUE
);