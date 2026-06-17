    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
    CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'VIEWER');

    CREATE TABLE admin_users (
        id UUID PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role admin_role NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE visitors (
        id UUID PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        company TEXT NOT NULL,
        country TEXT NOT NULL,
        arrival_date DATE NOT NULL,
        departure_date DATE NOT NULL,
        accommodation_notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'VIEWER');

-- CREATE TABLE admin_users (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     email TEXT NOT NULL UNIQUE,
--     password_hash TEXT NOT NULL,
--     role admin_role NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE visitors (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     company TEXT NOT NULL,
--     country TEXT NOT NULL,
--     arrival_date DATE NOT NULL,
--     departure_date DATE NOT NULL,
--     accommodation_notes TEXT,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );