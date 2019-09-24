using System;
using System.Collections.Generic;
using System.Text;

namespace Sleeping.Entities
{
    public class ResponseModel
    {

        public ResponseModel()
        {
            this.codeResponse = "9999";
            this.messageResponse = "Ocurrio un error inesperado";
        }


        public dynamic result {get; set;}
        public String messageResponse { get; set; }
        public String codeResponse { get; set; }
}
}
