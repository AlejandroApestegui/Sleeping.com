using System;
using System.Collections.Generic;
using System.Text;
using Sleeping.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace Sleeping.Logic
{
    public class UserService
    {

        private IHostingEnvironment env;
        private SqlConnection sqlConnection;
        private IConfiguration config;

        public UserService(SqlConnection _sqlConnection, IHostingEnvironment _env, IConfiguration _config)
        {
            sqlConnection = _sqlConnection;
            env = _env;
            config = _config;
        }

        public ResponseModel acceder(string email, string password)
        {
            User user = null;

            ResponseModel response = new ResponseModel();

            try
            {
                SqlCommand command = new SqlCommand("SP_LOGIN_USUARIO", sqlConnection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@LOGIN_USUARIO", SqlDbType.VarChar).Value = email;
                command.Parameters.Add("@PASS_USUARIO", SqlDbType.VarChar).Value = password;
                sqlConnection.Open();

                SqlDataReader sqlDataReader = command.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    user = new User();

                    if (!sqlDataReader.IsDBNull(0))
                        user.id_usuario = sqlDataReader.GetString(0);
                    if (!sqlDataReader.IsDBNull(1))
                        user.id_rol = sqlDataReader.GetString(1);
                    if (!sqlDataReader.IsDBNull(2))
                        user.nombres = sqlDataReader.GetString(2);
                    if (!sqlDataReader.IsDBNull(3))
                        user.apellidos = sqlDataReader.GetString(3);
                    if (!sqlDataReader.IsDBNull(4))
                        user.login = sqlDataReader.GetString(4);
                    if (!sqlDataReader.IsDBNull(6))
                        user.edad = sqlDataReader.GetString(6);
                    if (!sqlDataReader.IsDBNull(7))
                        user.direccion = sqlDataReader.GetString(7);
                    if (!sqlDataReader.IsDBNull(8))
                        user.documento = sqlDataReader.GetString(8);
                    if (!sqlDataReader.IsDBNull(9))
                        user.empresa = sqlDataReader.GetString(9);
                    if (!sqlDataReader.IsDBNull(13))
                        user.estado = sqlDataReader.GetString(13);

                }

                sqlConnection.Close();

            }
            catch (Exception e)
            {

                throw e;
            }

            if (user != null)
            {
                response.result = user;
                response.messageResponse = "Operacion Exitosa";
                response.codeResponse = "0000";
            }
            else
            {
                response.messageResponse = "Usuario o contraseña incorrecta";
            }



            return response;
        }

        public List<User> proveedores()
        {
            SqlCommand command = new SqlCommand("SP_OBTENER_PROVEEDORES", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;
            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            List<User> lst = new List<User>();
            while (sqlDataReader.Read())
            {

                User user = new User();
                if (!sqlDataReader.IsDBNull(0))
                    user.id_usuario = sqlDataReader.GetString(0);
                if (!sqlDataReader.IsDBNull(1))
                    user.id_rol = sqlDataReader.GetString(1);
                if (!sqlDataReader.IsDBNull(2))
                    user.nombres = sqlDataReader.GetString(2);
                if (!sqlDataReader.IsDBNull(3))
                    user.apellidos = sqlDataReader.GetString(3);
                if (!sqlDataReader.IsDBNull(4))
                    user.login = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    user.pass = sqlDataReader.GetString(5);
                if (!sqlDataReader.IsDBNull(6))
                    user.edad = sqlDataReader.GetString(6);
                if (!sqlDataReader.IsDBNull(7))
                    user.direccion = sqlDataReader.GetString(7);
                if (!sqlDataReader.IsDBNull(8))
                    user.documento = sqlDataReader.GetString(8);
                if (!sqlDataReader.IsDBNull(9))
                    user.empresa = sqlDataReader.GetString(9);
                if (!sqlDataReader.IsDBNull(10))
                    user.fechaNacimiento = sqlDataReader.GetString(10);
                if (!sqlDataReader.IsDBNull(12))
                    user.estado = sqlDataReader.GetString(12);

                if (!sqlDataReader.IsDBNull(13))
                    user.latitud = sqlDataReader.GetString(13);

                if (!sqlDataReader.IsDBNull(14))
                    user.longitud = sqlDataReader.GetString(14);

                lst.Add(user);
            }

            sqlConnection.Close();

            return lst;
        }

        public User obtenerUsuario(int usuario)
        {
            SqlCommand command = new SqlCommand("SP_OBTENER_USUARIO", sqlConnection);
            User user = new User();
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = usuario;
            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            if (sqlDataReader.Read())
            {
                if (!sqlDataReader.IsDBNull(0))
                    user.id_usuario = sqlDataReader.GetString(0);
                if (!sqlDataReader.IsDBNull(1))
                    user.id_rol = sqlDataReader.GetString(1);
                if (!sqlDataReader.IsDBNull(2))
                    user.nombres = sqlDataReader.GetString(2);
                if (!sqlDataReader.IsDBNull(3))
                    user.apellidos = sqlDataReader.GetString(3);
                if (!sqlDataReader.IsDBNull(4))
                    user.login = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    user.pass = sqlDataReader.GetString(5);
                if (!sqlDataReader.IsDBNull(6))
                    user.edad = sqlDataReader.GetString(6);
                if (!sqlDataReader.IsDBNull(7))
                    user.direccion = sqlDataReader.GetString(7);
                if (!sqlDataReader.IsDBNull(8))
                    user.documento = sqlDataReader.GetString(8);
                if (!sqlDataReader.IsDBNull(9))
                    user.empresa = sqlDataReader.GetString(9);
                if (!sqlDataReader.IsDBNull(10))
                    user.fechaNacimiento = sqlDataReader.GetString(10);
                if (!sqlDataReader.IsDBNull(12))
                    user.estado = sqlDataReader.GetString(12);
            }

            sqlConnection.Close();

            return user;
        }

        public ResponseModel recuperarClave(string email)
        {
            ResponseModel response = new ResponseModel();
            try
            {

                SqlCommand command = new SqlCommand("SP_RECUPERAR_CONTRASEÑA_USUARIO", sqlConnection);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@CORREO", SqlDbType.VarChar).Value = email;
                sqlConnection.Open();

                SqlDataReader sqlDataReader = command.ExecuteReader();

                String nombre = null;
                String clave = null;

                while (sqlDataReader.Read())
                {

                    if (!sqlDataReader.IsDBNull(0))
                        nombre = sqlDataReader.GetString(0);
                    if (!sqlDataReader.IsDBNull(1))
                        clave = sqlDataReader.GetString(1);
                }

                if (nombre == null)
                {
                    response.messageResponse = "El correo no existe en el sistema";
                }
                else
                {
                    var html = System.IO.File.ReadAllText(System.IO.Path.Combine(env.WebRootPath, "correo_recuperar_clave.html"));
                    html = html.Replace("[p_nombre]", nombre);
                    html = html.Replace("[p_clave]", clave);

                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress(config["Correo:From"]);
                    mail.To.Add(new MailAddress(email));
                    mail.Subject = "Recuperar clave";
                    mail.Body = html;
                    mail.IsBodyHtml = true;

                    SmtpClient smtp = new SmtpClient(config["Correo:Host"], Int32.Parse(config["Correo:Port"]));
                    smtp.Credentials = new NetworkCredential(config["Correo:From"], config["Correo:Clave"]);

                    smtp.EnableSsl = true;

                    try
                    {
                        smtp.Send(mail);


                        response.codeResponse = "0000";
                        response.messageResponse = "Se envió un mensaje a su correo con su nueva clave";
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        Console.ReadLine();
                    }

                }
            }
            catch (Exception e)
            {

                throw e;
            }
            finally
            {
                sqlConnection.Close();
            }

            return response;
        }

        public ResponseModel actualizar(CambioContraseñaRq request)
        {

            ResponseModel response = new ResponseModel();

            try
            {

                ResponseModel login = acceder(request.email, request.passOld);

                if (login.codeResponse.Equals("0000"))
                {

                    SqlCommand command = new SqlCommand("SP_CAMBIAR_CONTRASEÑA_USUARIO", sqlConnection);

                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@LOGIN_USUARIO", SqlDbType.VarChar).Value = request.email;
                    command.Parameters.Add("@PASS_USUARIO", SqlDbType.VarChar).Value = request.passNew;

                    sqlConnection.Open();

                    var res = command.ExecuteNonQuery();

                    response.codeResponse = "0000";
                    response.messageResponse = "Se actualizó la clave de forma exitosa";
                }
                else
                {
                    response.codeResponse = "9999";
                    response.messageResponse = "Error al actualizar la clave";
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                sqlConnection.Close();
            }


            return response;
        }

        public User actualizarUsuario(User usuario)
        {
            SqlCommand command = new SqlCommand("SP_ACTUALIZAR_USUARIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add("@ID", SqlDbType.VarChar).Value = usuario.id_usuario;
            command.Parameters.Add("@ROL", SqlDbType.VarChar).Value = usuario.id_rol;
            command.Parameters.Add("@NOM", SqlDbType.VarChar).Value = usuario.nombres;
            command.Parameters.Add("@APE", SqlDbType.VarChar).Value = usuario.apellidos;
            command.Parameters.Add("@LOGIN", SqlDbType.VarChar).Value = usuario.login;
            command.Parameters.Add("@PASS", SqlDbType.VarChar).Value = usuario.pass;
            command.Parameters.Add("@EDAD", SqlDbType.VarChar).Value = usuario.edad;
            command.Parameters.Add("@DIR", SqlDbType.VarChar).Value = usuario.direccion;
            command.Parameters.Add("@DOC", SqlDbType.VarChar).Value = usuario.documento;
            command.Parameters.Add("@EMP", SqlDbType.VarChar).Value = usuario.empresa;
            command.Parameters.Add("@NAC", SqlDbType.VarChar).Value = usuario.fechaNacimiento;
            command.Parameters.Add("@REG", SqlDbType.VarChar).Value = DateTime.Now.ToString("dd/MM/yyyy");
            command.Parameters.Add("@EST", SqlDbType.VarChar).Value = usuario.estado;

            command.Parameters.Add("@LAT", SqlDbType.VarChar).Value = usuario.latitud;
            command.Parameters.Add("@LON", SqlDbType.VarChar).Value = usuario.longitud;

            sqlConnection.Open();

            command.ExecuteNonQuery();

            sqlConnection.Close();

            return usuario;
        }

        public User registrarUsuario(User usuario)
        {
            SqlCommand command = new SqlCommand("SP_REGISTRAR_USUARIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@ROL", SqlDbType.VarChar).Value = usuario.id_rol;
            command.Parameters.Add("@NOM", SqlDbType.VarChar).Value = usuario.nombres;
            command.Parameters.Add("@APE", SqlDbType.VarChar).Value = usuario.apellidos;
            command.Parameters.Add("@LOGIN", SqlDbType.VarChar).Value = usuario.login;
            command.Parameters.Add("@PASS", SqlDbType.VarChar).Value = usuario.pass;
            command.Parameters.Add("@EDAD", SqlDbType.VarChar).Value = usuario.edad;
            command.Parameters.Add("@DIR", SqlDbType.VarChar).Value = usuario.direccion;
            command.Parameters.Add("@DOC", SqlDbType.VarChar).Value = usuario.documento;
            command.Parameters.Add("@EMP", SqlDbType.VarChar).Value = usuario.empresa;
            command.Parameters.Add("@NAC", SqlDbType.VarChar).Value = usuario.fechaNacimiento;
            command.Parameters.Add("@REG", SqlDbType.VarChar).Value = DateTime.Now.ToString("dd/MM/yyyy");
            command.Parameters.Add("@EST", SqlDbType.VarChar).Value = usuario.estado;

            command.Parameters.Add("@LAT", SqlDbType.VarChar).Value = usuario.latitud;
            command.Parameters.Add("@LON", SqlDbType.VarChar).Value = usuario.longitud;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            if (sqlDataReader.Read())
            {
                usuario.id_usuario = sqlDataReader.GetString(0);
            }

            sqlConnection.Close();

            return usuario;

        }
    }
}
