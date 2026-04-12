using CCL_Server.Entities;
using CCL_Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CCL_Server.Controllers
{
    [Route("auth")]
    [ApiController]
    public class authController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly usuariosTemporales _usuario;

        public authController(IConfiguration configuration, usuariosTemporales usuarioService)
        {
            _configuration = configuration;
            _usuario = usuarioService;
        }

        [HttpPost()]
        public IActionResult Login([FromBody] Usuarios dto)
        {
            var usuario = _usuario.GetByUsername(dto.Usuario);

            System.Diagnostics.Debug.WriteLine("This is a log");
            if (usuario == null ||
                !BCrypt.Net.BCrypt.Verify(dto.Pass, usuario.Pass))
            {
                return Unauthorized("Usuario o Contraseña Incorrectas");
            }



            var claims = new[]
            {
                new Claim("Usuario", usuario.Usuario),
                new Claim("Rol", usuario.Rol)
            };
            var key = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var expires = int.Parse(_configuration["Jwt:ExpiresInMinutes"]);

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expires),
                signingCredentials: signingCredentials
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}
