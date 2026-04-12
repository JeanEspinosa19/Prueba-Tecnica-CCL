using CCL_Server.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CCL_Server.Controllers
{
    [Route("productos/")]
    [ApiController]
        
    public class productoController : ControllerBase
    {
        private readonly AplicationDB context;
        public productoController(AplicationDB context)
        {
            this.context = context;
        }
        [Authorize(Roles = "Admin,Viewer")]
        [HttpGet("inventario", Name = "Inventario")]
        public async Task<ActionResult<List<Producto>>> Get()
        {
            return await context.productos.ToListAsync();
        }

        [Authorize(Roles = "Admin,Viewer")]
        [HttpGet("inventario/{id:int}", Name = "obtenerProductoId")]
        public async Task<ActionResult<Producto>> Get(int id)
        {
            var producto = await context.productos.FirstOrDefaultAsync(x => x.id == id);

            if (producto is null)
            {
                return NotFound("Producto No Encontrado en Inventario");
            }
            return producto;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("movimiento")]
        public async Task<IActionResult> Post([FromBody] Producto producto)
        {
            var productoExistente = await context.productos.AnyAsync(x => x.nombre == producto.nombre);

            if (productoExistente)
            {
                var mensajeError = $"Ya Existe un Producto con Este Nombre";
                ModelState.AddModelError(nameof(producto.nombre), mensajeError);
                return ValidationProblem(ModelState);
            }

            context.Add(producto);
            await context.SaveChangesAsync();
            return CreatedAtRoute("obtenerProductoId", new { id = producto.id }, producto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("movimiento/{id:int}")]
        public async Task<ActionResult> Patch(int id, [FromBody] ActualizarCantidadDTO producto)
        {
            var modificarProducto = await context.productos.FirstOrDefaultAsync(x => x.id == id);
            if (modificarProducto == null)
            {
                return NotFound();
            }
            if (producto == null)
            {
                return BadRequest("El cuerpo de la petición está vacío o mal formado");
            }

            var productoExistente = await context.productos
                .AnyAsync(x => x.nombre == producto.nombre && x.id!= id);

            if (productoExistente)
            {
                var mensajeError = $"Ya Existe un Producto con Este Nombre";
                ModelState.AddModelError(nameof(producto.nombre), mensajeError);
                return ValidationProblem(ModelState);
            }

            if (producto.nombre == null)
            {
                modificarProducto.nombre = modificarProducto.nombre;
            }
            else
            {
                modificarProducto.nombre = producto.nombre;
            }

            modificarProducto.cantidad = producto.cantidad;
            await context.SaveChangesAsync();
            return NoContent();

        }

        [Authorize(Roles = "Admin")]
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
