using System.ComponentModel.DataAnnotations;

namespace Transaction.API.DTOs
{
    public class PostUserDto
    {
        [MaxLength(25)]
        public string Username { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [MaxLength(10)]
        public string Password { get; set; }
    }
}
