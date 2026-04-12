using CCL_Server.Entities;

namespace CCL_Server.Services
{
    public class usuariosTemporales
    {
        private readonly List<Usuarios> usuarios = new()
    {
        new Usuarios
        {
            Usuario = "CCL204",
            Pass = "$2a$12$8uIHi9x9kTO6T2y7My4xZOVebLROln3A0ygcAIz40uf6Ex1o2WGCG",
            Rol = "Admin"
        },
        new Usuarios
        {
            Usuario = "CCL205",
            Pass = "$2a$12$8uIHi9x9kTO6T2y7My4xZOVebLROln3A0ygcAIz40uf6Ex1o2WGCG",
            Rol = "Viewer"
        }
    };

        public Usuarios? GetByUsername(string username)
        {
            return usuarios.FirstOrDefault(u => u.Usuario == username);
        }
    }
}
