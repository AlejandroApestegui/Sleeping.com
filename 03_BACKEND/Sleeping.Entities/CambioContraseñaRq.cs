using System;
using System.Collections.Generic;
using System.Text;

namespace Sleeping.Entities
{
    public class CambioContraseñaRq
    {

        public String email { get; set; }
        public String passOld { get; set;}
        public String passNew { get; set; }

    }
}
