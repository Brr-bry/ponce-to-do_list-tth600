CREATE DATABASE IF NOT EXISTS `ponce-todolist`;

USE `ponce-todolist`;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, completed)
VALUES
    ('Study React', 'Practice React components and state', FALSE),
    ('Practice API', 'Learn GET and POST requests using Express', FALSE),
    ('Finish Assignment', 'Complete and submit the school assignment', FALSE);