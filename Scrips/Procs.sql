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