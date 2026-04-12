using System.ComponentModel.DataAnnotations;

namespace CCL_Server.Entities
{
    public class Usuarios
    {
        [Required(ErrorMessage = "El Campo Usuario NO Puede Estar Vacío")]
        public string Usuario { get; set; }
        [Required(ErrorMessage = "El Campo Contraseña NO Puede Estar Vacío")]
        public string Pass { get; set; }
        public string? Rol { get; set; }
    }
}
