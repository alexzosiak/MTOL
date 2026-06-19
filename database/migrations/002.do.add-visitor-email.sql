ALTER TABLE visitors
ADD COLUMN email TEXT;

ALTER TABLE visitors
ADD CONSTRAINT visitors_email_unique UNIQUE (email);