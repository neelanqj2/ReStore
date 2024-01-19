using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using API.Extensions;
using API.Entities;

namespace API.Data
{
    public class StoreContext: IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions options): base(options) {

        }

        public DbSet<Product> Products { get; set; } 
        public DbSet<Basket> Basket { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName="MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}