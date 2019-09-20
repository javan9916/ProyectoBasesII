DROP TABLE Usuarios
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

---DROP PROC Login_remoto
go
CREATE PROC Login_remoto
@usuario AS VARCHAR(50),
@contraseña AS VARCHAR(20),
@direccion_ip AS VARCHAR(15),
@servidor AS VARCHAR(15),
@puerto AS NUMERIC,
@Resultado AS BIT OUTPUT
AS
BEGIN TRY
	exec sp_addlinkedserver
		@server = @direccion_ip,
		@srvproduct = @servidor;
	
	exec sp_addlinkedsrvlogin
		@rmtsrvname = @direccion_ip,
		@rmtuser = N@usuario,
		@emtpassword = @contraseña
	
	exec sp_serveroption
		@server = @direccion_ip,
		@optname = 'data access',
		@optvalue = 'true'
END TRY

BEGIN CATCH
	SET @Resultado = 0;
END CATCH
go
--EXECUTE Login_remoto 'roberto', '123', '126.123.64.7', 500, @Resultado

	
