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
    public class LoginController : ControllerBase
    {
        private UserService user;

        public LoginController(IConfiguration config, IHostingEnvironment env)
        {
            user = new UserService(new System.Data.SqlClient.SqlConnection(config.GetValue<String>("ConnectionString")), env, config);
        }

        [HttpPost("[action]")]
        public ResponseModel acceder(LoginRequest request)
        {
            return user.acceder(request.email, request.password);
        }

        [HttpPost("[action]")]
        public ResponseModel cambiarClave([FromBody] CambioContraseñaRq request)
        {
            return user.actualizar(request);
        }

        [HttpGet("[action]")]
        public ResponseModel recuperarClave(String email)
        {
            return user.recuperarClave(email);
        }
    }
}