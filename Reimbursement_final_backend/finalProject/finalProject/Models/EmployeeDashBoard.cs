using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace finalProject.Models
{
    public class EmployeeDashBoard
    {
        [Required]
        [Key]
        public string id { get; set; }
        
        [Required]
        public string CurrDateTime { get; set; }


        [Required]
        public string email { get; set; }
        [Display(Name = "Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "This Field can't be empty")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        public string Date { get; set; }

        [Required]
        public string reim_Type { get; set; }

        [Required]
        public int  requested_Value { get; set; }

       

        public int approved_Value { get; set; }

        [Required]
        public string currency { get; set; }

         
        public string requestPhase { get; set; }

        
        public string RecieptAttached { get; set; }

      
       



    }
}
