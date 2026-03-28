using CCL_Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace CCL_Server
{
    public class AplicationDB : DbContext
    {
        public AplicationDB(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Producto> productos {get; set; }

        protected AplicationDB()
        {
        }
    }
}
