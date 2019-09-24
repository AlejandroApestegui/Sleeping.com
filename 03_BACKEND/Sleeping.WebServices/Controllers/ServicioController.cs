using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sleeping.Entities;
using Sleeping.Logic;

namespace Sleeping.WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase
    {
        private ServicioService service;
        private UserService userService;

        public ServicioController(IConfiguration config, IHostingEnvironment env)
        {
            service = new ServicioService(new System.Data.SqlClient.SqlConnection(config.GetValue<String>("ConnectionString")), env, config);
            userService = new UserService(new System.Data.SqlClient.SqlConnection(config.GetValue<String>("ConnectionString")), env, config);
        }

        [HttpGet("[action]")]
        public IList<Servicio> buscar(Int32 proveedor, String nombre)
        {
            return service.buscar(nombre, proveedor);
        }

        [HttpPost("[action]")]
        public Servicio insertar([FromBody] Servicio servicio)
        {
            return service.insertar(servicio);
        }

        [HttpPost("[action]")]
        public Servicio actualizar([FromBody] Servicio servicio)
        {
            return service.actualizar(servicio);
        }

        [HttpGet("[action]")]
        public IList<Horario> horarioDisponible(Int32 proveedor, String servicio, String fecha, Int32 usuarioActual)
        {
            return service.horarioDisponible(proveedor, servicio, fecha, usuarioActual);
        }

        [HttpPost("[action]")]
        public ResponseModel registrarReserva([FromBody] Reserva reserva)
        {
            return service.registrarReserva(reserva);
        }

        [HttpPost("[action]")]
        public List<Reserva> reservasPorConfirmar([FromBody] Servicio servicio)
        {
            return service.reservasPorConfirmar(servicio);
        }

        [HttpPost("[action]")]
        public List<DtoMonitor> reservasMonitor([FromBody] DtoConsultaMonitor dtoMonitor)
        {
            return service.reservasMonitor(dtoMonitor);
        }

        [HttpPost("[action]")]
        public DtoReserva verDetalleReserva([FromBody] Reserva reserva)
        {
            DtoReserva dtoReserva = new DtoReserva();
            dtoReserva.usuario = userService.obtenerUsuario(reserva.idUsuario);
            return dtoReserva;
        }

        [HttpPost("[action]")]
        public ResponseModel confirmarReserva([FromBody] Reserva reserva)
        {
            return service.confirmarReserva(reserva, "A");
        }


        [HttpGet("[action]")]
        public List<DtoMisReservas> misReservas(int usuario)
        {
            return service.misReservas(usuario);
        }

        [HttpPost("[action]")]
        public ResponseModel rechazarReserva([FromBody] Reserva reserva)
        {
            return service.confirmarReserva(reserva, "R");
        }

    }
}
