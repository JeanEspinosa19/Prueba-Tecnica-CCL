using System.ComponentModel.DataAnnotations;

namespace CCL_Server.Entities
{
    public class Producto
    {
        public int id { get; set; }
        [Required (ErrorMessage = "Debe Agregar un Producto")]
        [MaxLength(60, ErrorMessage = "El Nombre Del Producto Solo Permite un Tamaño de Hasta 60 Caracteres")]
        public required string nombre { get; set; }
        [Required(ErrorMessage = "Debe Agregar una Cantidad para Definir el Stock del Inventario")]
        [Range(0, int.MaxValue, ErrorMessage = "La Cantidad No Puede Ser Negativa")]
        public required int cantidad { get; set; }
    }

    public class ActualizarCantidadDTO
    {
        public int id { get; set; }
        public string? nombre { get; set; }
        [Required(ErrorMessage = "Debe Agregar una Cantidad para Definir el Stock del Inventario")]
        [Range(0, int.MaxValue, ErrorMessage = "La Cantidad No Puede Ser Negativa")]
        public int cantidad { get; set; }
    }

}
