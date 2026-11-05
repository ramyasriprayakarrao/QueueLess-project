CREATE DATABASE IF NOT EXISTS queueless;
USE queueless;
CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 role ENUM('student','admin') NOT NULL DEFAULT 'student',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS queue_tokens (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL,
 token_number VARCHAR(30) NOT NULL,
 service VARCHAR(100) NOT NULL,
 status ENUM('waiting','serving','completed','cancelled') NOT NULL DEFAULT 'waiting',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
 INDEX idx_queue_status(status),
 INDEX idx_queue_service_date(service,created_at)
);
