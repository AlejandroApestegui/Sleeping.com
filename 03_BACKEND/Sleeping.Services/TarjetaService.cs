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
    public class TarjetaService
    {

        private IHostingEnvironment env;
        private SqlConnection sqlConnection;
        private IConfiguration config;

        public TarjetaService(SqlConnection _sqlConnection, IHostingEnvironment _env, IConfiguration _config)
        {
            sqlConnection = _sqlConnection;
            env = _env;
            config = _config;
        }

        public Tarjeta registrarTarjeta(Tarjeta tarjeta)
        {
            SqlCommand command = new SqlCommand("SP_REGISTRAR_TARJETA", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = tarjeta.idUsuario;
            command.Parameters.Add("@AFILIADO", SqlDbType.VarChar).Value = tarjeta.afiliado;
            command.Parameters.Add("@TITULAR", SqlDbType.VarChar).Value = tarjeta.titular;
            command.Parameters.Add("@NUMERO", SqlDbType.VarChar).Value = tarjeta.numero;
            command.Parameters.Add("@VENCIMIENTO", SqlDbType.VarChar).Value = tarjeta.vencimiento;
            command.Parameters.Add("@CSV", SqlDbType.VarChar).Value = tarjeta.csv;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            if (sqlDataReader.Read())
            {
                tarjeta.idSecuencia = sqlDataReader.GetInt32(0);
            }

            sqlConnection.Close();

            return tarjeta;
        }

        public Tarjeta actualizarTarjeta(Tarjeta tarjeta)
        {
            SqlCommand command = new SqlCommand("SP_ACTUALIZAR_TARJETA", sqlConnection);

            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = tarjeta.idUsuario;
            command.Parameters.Add("@SECUENCIA", SqlDbType.Int).Value = tarjeta.idSecuencia;
            command.Parameters.Add("@AFILIADO", SqlDbType.VarChar).Value = tarjeta.afiliado;
            command.Parameters.Add("@TITULAR", SqlDbType.VarChar).Value = tarjeta.titular;
            command.Parameters.Add("@NUMERO", SqlDbType.VarChar).Value = tarjeta.numero;
            command.Parameters.Add("@VENCIMIENTO", SqlDbType.VarChar).Value = tarjeta.vencimiento;
            command.Parameters.Add("@CSV", SqlDbType.VarChar).Value = tarjeta.csv;

            sqlConnection.Open();

            command.ExecuteNonQuery();

            sqlConnection.Close();

            return tarjeta;
        }

        public List<Tarjeta> obtenerTarjetas(int usuario)
        {
            SqlCommand command = new SqlCommand("SP_LISTAR_TARJETA", sqlConnection);
            List<Tarjeta> lst = new List<Tarjeta>();
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add("@USUARIO", SqlDbType.Int).Value = usuario;

            sqlConnection.Open();

            SqlDataReader sqlDataReader = command.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Tarjeta tarjeta = new Tarjeta();

                if (!sqlDataReader.IsDBNull(0))
                    tarjeta.idUsuario = sqlDataReader.GetInt32(0);
                if (!sqlDataReader.IsDBNull(1))
                    tarjeta.idSecuencia = sqlDataReader.GetInt32(1);
                if (!sqlDataReader.IsDBNull(2))
                    tarjeta.afiliado = sqlDataReader.GetString(2);
                if (!sqlDataReader.IsDBNull(3))
                    tarjeta.titular = sqlDataReader.GetString(3);
                if (!sqlDataReader.IsDBNull(4))
                    tarjeta.numero = sqlDataReader.GetString(4);
                if (!sqlDataReader.IsDBNull(5))
                    tarjeta.vencimiento = sqlDataReader.GetString(5);
                if (!sqlDataReader.IsDBNull(6))
                    tarjeta.csv = sqlDataReader.GetString(6);

                lst.Add(tarjeta);
            }

            sqlConnection.Close();

            return lst;
        }
    }
}
