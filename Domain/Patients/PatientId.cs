using System;
using Hospital.Domain.Shared;
using Newtonsoft.Json;

namespace Hospital.Domain.Patients
{
<<<<<<< Updated upstream
    public class PatientId : EntityId
    {
        [JsonConstructor]
        public PatientId(Guid value) : base(value)
        {
        }

        public PatientId(String value) : base(value)
        {
        }
=======
    public class PatientId : EntityId{
        [JsonConstructor]
        public PatientId(Guid value) : base(value){}
>>>>>>> Stashed changes

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}