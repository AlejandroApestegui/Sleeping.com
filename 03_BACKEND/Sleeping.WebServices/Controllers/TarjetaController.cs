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
    public class TarjetaController : ControllerBase
    {
        private TarjetaService service;

        public TarjetaController(IConfiguration config, IHostingEnvironment env)
        {
            service = new TarjetaService(new System.Data.SqlClient.SqlConnection(config.GetValue<String>("ConnectionString")), env, config);
        }

        [HttpPost("[action]")]
        public Tarjeta insertar([FromBody] Tarjeta usuario)
        {
            return service.registrarTarjeta(usuario);
        }

        [HttpPost("[action]")]
        public Tarjeta actualizar([FromBody] Tarjeta usuario)
        {
            return service.actualizarTarjeta(usuario);
        }

        [HttpGet("[action]")]
        public List<Tarjeta> obtenerPorUsuario(Int32 usuario)
        {
            return service.obtenerTarjetas(usuario);
        }


    }
}