using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Entities
{
    public class User: IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}