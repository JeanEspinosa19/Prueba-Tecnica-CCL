using CCL_Server.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace CCL_Server.Controllers
{
    [Route("productos/")]
    public class productoController : ControllerBase
    {
        private readonly AplicationDB context;
        public productoController(AplicationDB context)
        {
            this.context = context;
        }

        [HttpGet("inventario", Name = "Inventario")]
        public async Task<List<Producto>> Get()
        {
            return await context.productos.ToListAsync();
        }

        [HttpGet("inventario/{id:int}", Name = "obtenerProductoId")]
        public async Task<ActionResult<Producto>> Get(int id)
        {
            var producto = await context.productos.FirstOrDefaultAsync(x => x.id == id);

            if (producto is null)
            {
                return NotFound();
            }
            return producto;
        }

        [HttpPost("movimiento")]
        public async Task<CreatedAtRouteResult> Post(Producto producto)
        {
            context.Add(producto);
            await context.SaveChangesAsync();
            return CreatedAtRoute("obtenerProductoId", new { id = producto.id }, producto);
        }

        [HttpPatch("movimiento/{id:int}")]
        public async Task<ActionResult> Patch(int id, Producto producto)
        {
            var productoExists = await context.productos.AnyAsync(x => x.id == id);
            if (!productoExists)
            {
                return NotFound();
            }

            context.Update(producto);
            await context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("depuracion/{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var producto = await context.productos.Where(x => x.id == id).ExecuteDeleteAsync();
            if (producto == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
