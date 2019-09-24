using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Sleeping.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Sleeping.Logic
{
    public class ServicioService
    {
        private SqlConnection sqlConnection;
        private IHostingEnvironment env;
        private IConfiguration config;

        public ServicioService(SqlConnection _sqlConnection, IHostingEnvironment _env, IConfiguration _config)
        {
            sqlConnection = _sqlConnection;
            env = _env;
            config = _config;
        }

        public IList<Servicio> buscar(String nombre, Int32 proveedor)
        {
            List<Servicio> lst = new List<Servicio>();

            SqlCommand command = new SqlCommand("SP_BUSCAR_SERVICIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            if (nombre == null)
            {
                nombre = "";
            }
            else if (nombre.Trim() == "")
            {
                nombre = "";

            }
            command.Parameters.Add("@proveedor", SqlDbType.Int).Value = proveedor;
            command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = nombre;
            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Servicio servicio = new Servicio();
                if (!sqlDataReader.IsDBNull(0))
                    servicio.idServicio = sqlDataReader.GetString(0);
                if (!sqlDataReader.IsDBNull(1))
                    servicio.idUsuario = sqlDataReader.GetInt32(1);
                if (!sqlDataReader.IsDBNull(2))
                    servicio.descServicio = sqlDataReader.GetString(2);
                if (!sqlDataReader.IsDBNull(3))
                    servicio.cantServicio = sqlDataReader.GetInt32(3);
                if (!sqlDataReader.IsDBNull(4))
                    servicio.precioServicio = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    servicio.estadoServicio = sqlDataReader.GetInt32(5);
                if (!sqlDataReader.IsDBNull(6))
                    servicio.fecRegistro = sqlDataReader.GetString(6);
                if (!sqlDataReader.IsDBNull(7))
                    servicio.inicioDisponible = sqlDataReader.GetString(7);
                if (!sqlDataReader.IsDBNull(8))
                    servicio.finDisponible = sqlDataReader.GetString(8);
                if (!sqlDataReader.IsDBNull(9))
                    servicio.minIntervalo = sqlDataReader.GetInt32(9);

                lst.Add(servicio);
            }

            sqlConnection.Close();

            return lst;
        }

        public List<DtoMisReservas> misReservas(int usuario)
        {
            List<DtoMisReservas> lst = new List<DtoMisReservas>();


            SqlCommand command = new SqlCommand("SP_MIS_RESERVAS", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = usuario;

            sqlConnection.Open();
            SqlDataReader sqlDataReader = command.ExecuteReader();

            while (sqlDataReader.Read())
            {

                DtoMisReservas dtoMisReservas = new DtoMisReservas();

                Reserva reserva = new Reserva();

                if (!sqlDataReader.IsDBNull(0))
                    reserva.idProveedor = sqlDataReader.GetInt32(0);
                if (!sqlDataReader.IsDBNull(1))
                    reserva.idServicio = sqlDataReader.GetString(1);
                if (!sqlDataReader.IsDBNull(2))
                    reserva.idUsuario = sqlDataReader.GetInt32(2);
                if (!sqlDataReader.IsDBNull(3))
                    reserva.idOrden = sqlDataReader.GetInt32(3);
                if (!sqlDataReader.IsDBNull(4))
                    reserva.fecha = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    reserva.desde = sqlDataReader.GetString(5);
                if (!sqlDataReader.IsDBNull(6))
                    reserva.hasta = sqlDataReader.GetString(6);
                if (!sqlDataReader.IsDBNull(7))
                    reserva.estado = sqlDataReader.GetInt32(7);

                Servicio servicio = new Servicio();

                if (!sqlDataReader.IsDBNull(8))
                    servicio.idServicio = sqlDataReader.GetString(8);
                if (!sqlDataReader.IsDBNull(9))
                    servicio.idUsuario = sqlDataReader.GetInt32(9);
                if (!sqlDataReader.IsDBNull(10))
                    servicio.descServicio = sqlDataReader.GetString(10);
                if (!sqlDataReader.IsDBNull(11))
                    servicio.cantServicio = sqlDataReader.GetInt32(11);
                if (!sqlDataReader.IsDBNull(12))
                    servicio.precioServicio = sqlDataReader.GetString(12);
                if (!sqlDataReader.IsDBNull(13))
                    servicio.estadoServicio = sqlDataReader.GetInt32(13);
                if (!sqlDataReader.IsDBNull(14))
                    servicio.fecRegistro = sqlDataReader.GetString(14);
                if (!sqlDataReader.IsDBNull(15))
                    servicio.inicioDisponible = sqlDataReader.GetString(15);
                if (!sqlDataReader.IsDBNull(16))
                    servicio.finDisponible = sqlDataReader.GetString(16);
                if (!sqlDataReader.IsDBNull(17))
                    servicio.minIntervalo = sqlDataReader.GetInt32(17);

                dtoMisReservas.reserva = reserva;
                dtoMisReservas.servicio = servicio;

                lst.Add(dtoMisReservas);
            }

            sqlConnection.Close();

            return lst;
        }

        public DtoReserva verDetalleReserva(Reserva reserva)
        {
            DtoReserva dto = new DtoReserva();

            return dto;
        }

        public List<DtoMonitor> reservasMonitor(DtoConsultaMonitor dtoMonitor)
        {
            List<DtoMonitor> lst = new List<DtoMonitor>();

            foreach (var servicio in buscar(null, dtoMonitor.proveedor))
            {
                DtoMonitor dto = new DtoMonitor();
                dto.servicio = servicio;
                dto.horario = horarioDisponible(dtoMonitor.proveedor, dto.servicio.idServicio, dtoMonitor.fecha, dtoMonitor.proveedor);
                lst.Add(dto);
            }

            return lst;
        }

        public List<Reserva> reservasPorConfirmar(Servicio servicio)
        {
            SqlCommand command = new SqlCommand("SP_RESERVA_X_CONFIRMAR", sqlConnection);
            List<Reserva> lst = new List<Reserva>();
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@PROVEEDOR", SqlDbType.Int).Value = servicio.idUsuario;
            command.Parameters.Add("@SERVICIO", SqlDbType.VarChar).Value = servicio.idServicio;

            sqlConnection.Open();
            SqlDataReader sqlDataReader = command.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Reserva reserva = new Reserva();

                if (!sqlDataReader.IsDBNull(0))
                    reserva.idProveedor = sqlDataReader.GetInt32(0);
                if (!sqlDataReader.IsDBNull(1))
                    reserva.idServicio = sqlDataReader.GetString(1);
                if (!sqlDataReader.IsDBNull(2))
                    reserva.idUsuario = sqlDataReader.GetInt32(2);
                if (!sqlDataReader.IsDBNull(3))
                    reserva.idOrden = sqlDataReader.GetInt32(3);
                if (!sqlDataReader.IsDBNull(4))
                    reserva.fecha = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    reserva.desde = sqlDataReader.GetString(5);
                if (!sqlDataReader.IsDBNull(6))
                    reserva.hasta = sqlDataReader.GetString(6);
                if (!sqlDataReader.IsDBNull(7))
                    reserva.estado = sqlDataReader.GetInt32(7);

                lst.Add(reserva);
            }

            sqlConnection.Close();

            return lst;
        }

        public ResponseModel confirmarReserva(Reserva reserva, String modo)
        {

            SqlCommand command = new SqlCommand("SP_CONFIRMAR_RESERVA", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@PROVEEDOR", SqlDbType.Int).Value = reserva.idProveedor;
            command.Parameters.Add("@SERVICIO", SqlDbType.VarChar).Value = reserva.idServicio;
            command.Parameters.Add("@DIA", SqlDbType.VarChar).Value = reserva.fecha;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = reserva.idUsuario;
            command.Parameters.Add("@ID_ORDEN", SqlDbType.Int).Value = reserva.idOrden;
            command.Parameters.Add("@MODO", SqlDbType.VarChar).Value = modo;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            String correo = null;
            String desServicio = null;
            String rango = null;

            ResponseModel mensaje = new ResponseModel();

            if (sqlDataReader.Read())
            {
                var res = sqlDataReader.GetString(0);

                mensaje.codeResponse = res.Split(";")[0].Equals("EXITO") ? "0000" : "9999";
                mensaje.messageResponse = res.Split(";")[1];
                correo = res.Split(";")[2];
                desServicio = res.Split(";")[3];
                rango = res.Split(";")[4];
            }

            sqlConnection.Close();
            var html = "";
            if (modo.Equals("A"))
            {
                html = System.IO.File.ReadAllText(System.IO.Path.Combine(env.WebRootPath, "correo_notificar_aprobacion.html"));

            }
            else
            {
                html = System.IO.File.ReadAllText(System.IO.Path.Combine(env.WebRootPath, "correo_notificar_rechazo.html"));

            }
            //mandar correo de confirmacion al que se le aprobo
            html = html.Replace("[p_dia]", reserva.fecha);
            html = html.Replace("[p_servicio]", desServicio);
            html = html.Replace("[p_rango]", rango);
            html = html.Replace("[p_motivo]", reserva.auxMotivo);

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(config["Correo:From"]);
            mail.To.Add(new MailAddress(correo));
            mail.Subject = "Reserva confirmada";
            mail.Body = html;
            mail.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient(config["Correo:Host"], Int32.Parse(config["Correo:Port"]));
            smtp.Credentials = new NetworkCredential(config["Correo:From"], config["Correo:Clave"]);

            smtp.EnableSsl = true;

            try
            {
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.ReadLine();
            }


            return mensaje;
        }

        public ResponseModel registrarReserva(Reserva reserva)
        {
            SqlCommand command = new SqlCommand("SP_RESERVAR_SERVICIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@PROVEEDOR", SqlDbType.Int).Value = reserva.idProveedor;
            command.Parameters.Add("@SERVICIO", SqlDbType.VarChar).Value = reserva.idServicio;
            command.Parameters.Add("@DIA", SqlDbType.VarChar).Value = reserva.fecha;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = reserva.idUsuario;
            command.Parameters.Add("@ID_ORDEN", SqlDbType.Int).Value = reserva.idOrden;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            ResponseModel mensaje = new ResponseModel();

            String correoProveedor = null;
            String servicioDesc = null;

            if (sqlDataReader.Read())
            {
                var res = sqlDataReader.GetString(0);

                mensaje.codeResponse = res.Split(";")[0].Equals("EXITO") ? "0000" : "9999";
                mensaje.messageResponse = res.Split(";")[1];
                correoProveedor = res.Split(";")[2];
                servicioDesc = res.Split(";")[3];
            }

            sqlConnection.Close();

            //ENVIAR CORREO AL PROVEEDOR PARA QUE ACEPTE EL MENSAJE
            if (mensaje.codeResponse.Equals("0000"))
            {
                var html = System.IO.File.ReadAllText(System.IO.Path.Combine(env.WebRootPath, "correo_notificar_por_aprobar.html"));
                html = html.Replace("[p_dia]", reserva.fecha);
                html = html.Replace("[p_servicio]", servicioDesc);

                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(config["Correo:From"]);
                mail.To.Add(new MailAddress(correoProveedor));
                mail.Subject = "Reserva por confirmar";
                mail.Body = html;
                mail.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient(config["Correo:Host"], Int32.Parse(config["Correo:Port"]));
                smtp.Credentials = new NetworkCredential(config["Correo:From"], config["Correo:Clave"]);

                smtp.EnableSsl = true;

                try
                {
                    smtp.Send(mail);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    Console.ReadLine();
                }
            }

            return mensaje;
        }

        public List<Horario> horarioDisponible(int proveedor, string servicio, string fecha, Int32 usuarioActual)
        {
            List<Horario> lst = new List<Horario>();

            SqlCommand command = new SqlCommand("SP_GENERAR_HORARIO_DISPONIBLES", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@PROVEEDOR", SqlDbType.Int).Value = proveedor;
            command.Parameters.Add("@SERVICIO", SqlDbType.VarChar).Value = servicio;
            command.Parameters.Add("@DIA", SqlDbType.VarChar).Value = fecha;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = usuarioActual;
            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Horario horario = new Horario();
                if (!sqlDataReader.IsDBNull(0))
                    horario.id = sqlDataReader.GetInt32(0);
                if (!sqlDataReader.IsDBNull(1))
                    horario.inicio = sqlDataReader.GetString(1);
                if (!sqlDataReader.IsDBNull(2))
                    horario.fin = sqlDataReader.GetString(2);
                if (!sqlDataReader.IsDBNull(3))
                    horario.estado = sqlDataReader.GetInt32(3);

                lst.Add(horario);
            }

            sqlConnection.Close();

            return lst;
        }

        public Servicio insertar(Servicio servicio)
        {
            SqlCommand command = new SqlCommand("SP_INSERTAR_SERVICIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@ID_USUARIO", SqlDbType.Int).Value = servicio.idUsuario;
            command.Parameters.Add("@DESC_SERVICIO", SqlDbType.VarChar).Value = servicio.descServicio;
            command.Parameters.Add("@CANT_SERVICIO", SqlDbType.Int).Value = servicio.cantServicio;
            command.Parameters.Add("@PRECIO_SERVICIO", SqlDbType.VarChar).Value = servicio.precioServicio;
            command.Parameters.Add("@ESTADO_SERVICIO", SqlDbType.Int).Value = servicio.estadoServicio;
            command.Parameters.Add("@FEC_REGISTRO", SqlDbType.VarChar).Value = servicio.fecRegistro;
            command.Parameters.Add("@INICIO", SqlDbType.VarChar).Value = servicio.inicioDisponible;
            command.Parameters.Add("@FIN", SqlDbType.VarChar).Value = servicio.finDisponible;
            command.Parameters.Add("@MIN", SqlDbType.Int).Value = servicio.minIntervalo;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            if (sqlDataReader.Read())
            {
                servicio.idServicio = sqlDataReader.GetString(0);
            }

            sqlConnection.Close();

            return servicio;
        }

        public Servicio actualizar(Servicio servicio)
        {
            SqlCommand command = new SqlCommand("SP_ACTUALIZAR_SERVICIO", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@ID_SERVICIO", SqlDbType.VarChar).Value = servicio.idServicio;
            command.Parameters.Add("@ID_USUARIO", SqlDbType.Int).Value = servicio.idUsuario;
            command.Parameters.Add("@DESC_SERVICIO", SqlDbType.VarChar).Value = servicio.descServicio;
            command.Parameters.Add("@CANT_SERVICIO", SqlDbType.Int).Value = servicio.cantServicio;
            command.Parameters.Add("@PRECIO_SERVICIO", SqlDbType.VarChar).Value = servicio.precioServicio;
            command.Parameters.Add("@ESTADO_SERVICIO", SqlDbType.Int).Value = servicio.estadoServicio;
            command.Parameters.Add("@FEC_REGISTRO", SqlDbType.VarChar).Value = servicio.fecRegistro;
            command.Parameters.Add("@INICIO_DISPONIBLE", SqlDbType.VarChar).Value = servicio.inicioDisponible;
            command.Parameters.Add("@FIN_DISPONIBLE", SqlDbType.VarChar).Value = servicio.finDisponible;
            command.Parameters.Add("@MIN_INTERVALO", SqlDbType.Int).Value = servicio.minIntervalo;

            sqlConnection.Open();

            var res = command.ExecuteNonQuery();

            sqlConnection.Close();

            return servicio;
        }
    }
}
