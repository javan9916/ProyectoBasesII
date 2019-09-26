--DROP TABLE Usuarios
CREATE TABLE Usuarios
(
	usuario			VARCHAR(50) PRIMARY KEY NOT NULL,
	contraseña		VARCHAR(20) NOT NULL,
	direccion_ip	VARCHAR(15) CHECK(direccion_ip LIKE '%_%.%_%.%_%.%_%' AND direccion_ip NOT LIKE '%.%.%.%.%' AND 
										(ParseName(direccion_ip, 4) BETWEEN 0 AND 255) 
										AND (ParseName(direccion_ip, 3) BETWEEN 0 AND 255) 
										AND (ParseName(direccion_ip, 2) BETWEEN 0 AND 255) 
										AND (ParseName(direccion_ip, 1) BETWEEN 0 AND 255)) NOT NULL,
	puerto			INT NOT NULL
)

SELECT * FROM Usuarios;
go
CREATE PROCEDURE Agregar_Usuario
@usuario VARCHAR(50), 
@contraseña VARCHAR(20), 
@direccion_ip VARCHAR(15), 
@puerto INT
AS
BEGIN
	INSERT INTO Usuarios(usuario, contraseña, direccion_ip, puerto)
	VALUES (@usuario, @contraseña, @direccion_ip, @puerto)
END

EXECUTE Agregar_Usuario @usuario = 'roberto', @contraseña = '123', @direccion_ip = '126.123.64.7', @puerto = 5
go
	
