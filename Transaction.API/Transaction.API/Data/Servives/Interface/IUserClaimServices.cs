using Transaction.API.Models;

namespace Transaction.API.Data.Servives.Interface
{
    public interface IUserClaimServices
    {
        Task<User?> GetUserByEmailAsync(string email);
    }
}
