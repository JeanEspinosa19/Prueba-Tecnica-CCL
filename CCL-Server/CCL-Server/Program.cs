    using CCL_Server;
    using CCL_Server.Security;
    using CCL_Server.Services;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Http.HttpResults;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    var builder = WebApplication.CreateBuilder(args);

    var key = builder.Configuration["Jwt:Key"];

    // Add services to the container.

    builder.Services.AddControllers();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();

    builder.Services.AddSingleton<usuariosTemporales>();

    builder.Services.AddAuthorization();
    builder.Services.AddAuthentication("Bearer").AddJwtBearer(opt => {
    
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        opt.RequireHttpsMetadata = false;
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            RoleClaimType = "Rol",
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signingKey,
            ClockSkew = TimeSpan.Zero
        };
        opt.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse(); // evita respuesta por defecto
                if (context.Response.HasStarted)
                    return Task.CompletedTask;               
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";

                string mensaje = "Debes Iniciar Sesión Para Ver la Información o Realizar Cualquier Acción";

                if (context.AuthenticateFailure is SecurityTokenExpiredException)
                {
                    mensaje = "Tu Tiempo de Sesión ha Expirado, Vuelve a Iniciar Sesión";
                }

                return context.Response.WriteAsync($@"{{""message"": ""{mensaje}""}}");

            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";

                return context.Response.WriteAsync(
                    "{\"message\": \"No Tienes Permisos Para Realizar Esta Acción\"}"
                );
            }
        };
    });

    var origenesPermitidos = builder.Configuration.GetValue<string>("OrigenesPermitidos")!.Split(',');

    builder.Services.AddCors(opt =>
    {
        opt.AddDefaultPolicy(politica =>
        {
            politica.WithOrigins(origenesPermitidos).AllowAnyHeader().AllowAnyMethod();
        });
    });

    builder.Services.AddDbContext<AplicationDB>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseHttpsRedirection();

    //Middleware CORS
    app.UseCors();


    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
