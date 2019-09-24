using System;
using System.Collections.Generic;
using System.Text;

namespace Sleeping.Entities
{
    public class Reserva
    {
        public int idProveedor { get; set; }
        public string idServicio { get; set; }
        public int idUsuario { get; set; }
        public int idOrden { get; set; }
        public string fecha { get; set; }
        public string desde { get; set; }
        public string hasta { get; set; }
        public int estado { get; set; }
        public string auxMotivo { get; set; }
    }
}
