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
    public class UsuarioController : ControllerBase
    {
        private UserService user;

        public UsuarioController(IConfiguration config, IHostingEnvironment env)
        {
            user = new UserService(new System.Data.SqlClient.SqlConnection(config.GetValue<String>("ConnectionString")), env, config);
        }

        [HttpPost("[action]")]
        public User insertar([FromBody] User usuario)
        {
            return user.registrarUsuario(usuario);
        }

        [HttpPost("[action]")]
        public User actualizar([FromBody] User usuario)
        {
            return user.actualizarUsuario(usuario);
        }

        [HttpGet("[action]")]
        public User obtenerPorid(Int32 usuario)
        {
            return user.obtenerUsuario(usuario);
        }

        [HttpGet("[action]")]
        public List<User> proveedores()
        {
            return user.proveedores();
        }
    }
}