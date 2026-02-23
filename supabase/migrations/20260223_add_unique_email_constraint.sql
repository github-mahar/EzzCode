-- Add unique constraint on contacts.email to prevent duplicate submissions
-- This enforces at the database level that the same email cannot submit twice.

ALTER TABLE contacts
ADD CONSTRAINT contacts_email_unique UNIQUE (email);
