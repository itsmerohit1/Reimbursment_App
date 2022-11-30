using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace finalProject.Models
{
    public class UserModel
    {
         
        [Required]
        public string password { get; set; }

        [Key]
        [Required]
        public string email { get; set; }
        [Required]
        public string fullName { get; set; }
        [Required]
        public string panNumber { get; set; }
        [Required]
        public string bankName { get; set; }


        [Required]
        [StringLength(12)]
        
         
        public string bankAccount{get;set;}

        public bool isApprover { get; set; }

       

    }
}
