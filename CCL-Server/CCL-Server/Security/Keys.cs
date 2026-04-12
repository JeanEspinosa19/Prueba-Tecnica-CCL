using System.Security.Cryptography;

namespace CCL_Server.Security
{
    public class Keys
    {
        public static string GenerarClaveSegura(int size = 32)
        {
            var bytes = new byte[size];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(bytes);
            }

            return Convert.ToBase64String(bytes);
        }
    }
}
