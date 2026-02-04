using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Transaction.API.Data;
using Transaction.API.DTOs;
using Transaction.API.Models;

namespace Transaction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly AppDbContext _appContext;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<User> _passwordHasher;
        public AuthController(
            ILogger<AuthController> logger,
            AppDbContext appContext,
            IConfiguration configuration,
            IPasswordHasher<User> passwordHasher)
        {
            _logger = logger;
            _appContext = appContext;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginUserDto postUserDto)
        {
            var user = _appContext.Users.FirstOrDefault(m => m.Email.Equals(postUserDto.Email));
            if (user == null)
            {
                return BadRequest("Invalid email or password");
            }
            var hasher = new PasswordHasher<User>();
            //var result = hasher.VerifyHashedPassword(null, user.Password, postUserDto.Password);
            var result = _passwordHasher.VerifyHashedPassword(null, user.Password, postUserDto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return BadRequest("Invalid email or password");
            }
            var token = GenerateJwtToken(user);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(120)
            };
            Response.Cookies.Append("X-Access-Token", token, cookieOptions);
            return Ok(new { Token = token });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] PostUserDto postUserDto)
        {
            if (_appContext.Users.Any(m => m.Email.Equals(postUserDto.Email)))
            {
                return BadRequest("This email address is already taken");
            }

            var hasher = new PasswordHasher<User>();
            //string hashedPassword = hasher.HashPassword(null, postUserDto.Password);
            string hashedPassword = _passwordHasher.HashPassword(null, postUserDto.Password);
            var user = new Models.User
            {
                Username = postUserDto.Username,
                Email = postUserDto.Email,
                Password = hashedPassword
            };
            await _appContext.Users.AddAsync(user);
            await _appContext.SaveChangesAsync();
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            // Placeholder for JWT token generation logic
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings.GetSection("secretKey").Value;
            var expired = jwtSettings.GetSection("expires").Value;
            int expiring = !string.IsNullOrEmpty(expired) ? Convert.ToInt32(expired) : 60;
            var claims = new[]
            {
                new System.Security.Claims.Claim("id", user.Id.ToString()),
                new System.Security.Claims.Claim("email", user.Email),
                new System.Security.Claims.Claim("username", user.Username)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // Token generation logic would go here
            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("validIssuer").Value,
                audience: jwtSettings.GetSection("validAudience").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiring),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
