using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace entdemo.website.Models.Entdemo
{
    public class Tenant
    {
        [Key]
        public int TenantId { get; set; }
        public string Name { get; set; }

    }
}
