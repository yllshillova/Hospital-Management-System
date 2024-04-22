using Application.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rooms
{
    public class RoomPatientDto : BaseEntityDto
    {
        public Guid RoomId { get; set; }
        public Guid PatientId { get; set; }
    }
}