CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
    phone VARCHAR(20),
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);