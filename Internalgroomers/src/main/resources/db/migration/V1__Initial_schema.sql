
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS salon_amenities CASCADE;
DROP TABLE IF EXISTS amenities CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS customer_roles CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS salons CASCADE;

CREATE TABLE salons (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    image_path VARCHAR(255),
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(255),
    country VARCHAR(255),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    contact_phone VARCHAR(255),
    contact_email VARCHAR(255),
    opening_hours jsonb
);

CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price BIGINT,
    duration_minutes INT,
    image_path VARCHAR(255),
    salon_id BIGINT REFERENCES salons(id)
);

CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE customer_roles (
    customer_id BIGINT REFERENCES customers(id),
    role VARCHAR(255)
);

CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    salon_id BIGINT REFERENCES salons(id),
    service_id BIGINT REFERENCES services(id),
    customer_id BIGINT REFERENCES customers(id),
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    status VARCHAR(255)
);

CREATE TABLE staff (
    id BIGSERIAL PRIMARY KEY,
    salon_id BIGINT REFERENCES salons(id),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    email VARCHAR(255),
    image_path VARCHAR(255),
    specialization VARCHAR(255),
    is_active BOOLEAN
);
