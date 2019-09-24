using System;
using System.Collections.Generic;
using System.Text;

namespace Sleeping.Entities
{
    public class DtoMonitor
    {
        public Servicio servicio { get; set; }
        public List<Horario> horario { get; set; }
    }
}
