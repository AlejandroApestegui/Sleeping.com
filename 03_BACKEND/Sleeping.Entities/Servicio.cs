using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sleeping.Entities
{
    public class Servicio
    {
        public String idServicio { get; set; }
        public int? idUsuario { get; set; }
        public String descServicio { get; set; }
        public int? cantServicio { get; set; }
        public String precioServicio { get; set; }
        public int? estadoServicio { get; set; }
        public String fecRegistro { get; set; }
        public String inicioDisponible { get; set; }
        public String finDisponible { get; set; }
        public int? minIntervalo { get; set; }
    }
}
