namespace CCL_Server.Entities
{
    public class Producto
    {
        public int id { get; set; }
        public required string nombre { get; set; }
        public required int cantidad { get; set; }
    }
}
