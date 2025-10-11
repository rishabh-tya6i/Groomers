
ALTER TABLE salons
ADD COLUMN owner_id BIGINT REFERENCES customers(id);
