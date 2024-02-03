CREATE TABLE IF NOT EXISTS public.event (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
place_of_event VARCHAR(100) NOT NULL,
date_of_event DATE NOT NULL,
max_sites INT,
time_of_event TIME);


CREATE TABLE IF NOT EXISTS public.user (
name VARCHAR(100) NOT NULL,
surname VARCHAR(100) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_event (
user_email VARCHAR(50) NOT NULL,
event_id BIGINT NOT NULL,
is_sent BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT cpk_user_event PRIMARY KEY (user_email, event_id),
CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES public.event(id),
CONSTRAINT fk_user_id FOREIGN KEY (user_email) REFERENCES public.user(email)
);