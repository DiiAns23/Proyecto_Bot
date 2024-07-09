CREATE DATABASE IF NOT EXISTS PROYECTO_BOT;
USE PROYECTO_BOT;
CREATE TABLE Dudas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    correo VARCHAR(50),
    edad INT,
    pregunta TEXT,
    respuesta TEXT,
    correcta BOOLEAN
);

CREATE TABLE Respuestas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pregunta TEXT,
    respuesta TEXT
);

INSERT INTO Respuestas (pregunta, respuesta) 
VALUES
    ('¿que significa pap de matemática?', 'Programa Académico Preparatorio de Matemática para Ingeniería'),
    ('¿cuanto tiempo se estudia?', 'El programa se imparte durante 18 semanas, 50 minutos diarios de lunes a viernes'),
    ('¿para que sirve?', 'Este programa permite al aspirante nivelar sus conocimientos de matematica, le permite conocer con anticipacion el sistema de estudios universitario de la Facultad de Ingenieria'),
    ('¿que jornadas hay?', 'Matutina y Vespertina'),
    ('¿para que sirve estudiar el pap de matematica?', 'Si se aprueba el curso con una nota igual o mayor a 61 pts. el resultado equivale a tener aprobada la Prueba Específica de Matemática para Ingeniería y ya no es necesario examinarse de esta Prueba'),
    ('¿se imparte de forma virtual o presencial?', 'El programa se imparte de acuerdo a lo indicado por el CSU, se informa con anticipación a los aspirantes la modalidad en que se impartirá. De forma virtual se realiza a través de ZOOM y se utiliza el sistema interno de Aula Virtual. Cuando las clases son presenciales se imparten en el Campus Central de la USAC, en los edificios asignados a la Facultad de Ingeniería'),
    ('informacion', 'Para mayor información puede ingresar a la página: https://www.usac.edu.gt/pap/ingenieria')
;
