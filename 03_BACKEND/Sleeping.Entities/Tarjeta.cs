using System;
using System.Collections.Generic;
using System.Text;

namespace Sleeping.Entities
{
    public class Tarjeta
    {
        public Int32 idUsuario { get; set; }
        public Int32 idSecuencia { get; set; }
        public String afiliado { get; set; }
        public String titular { get; set; }
        public String numero { get; set; }
        public String vencimiento { get; set; }
        public String csv { get; set; }
    }
}
