CREATE DATABASE ccl_database;
\c ccl_database

CREATE TABLE productos (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre VARCHAR (60) NOT NULL UNIQUE,
	cantidad INT NOT NULL
);

INSERT INTO productos (nombre, cantidad) VALUES
('Cinta', 10),
('Cuerda', 5),
('Llave Inglesa', 3);