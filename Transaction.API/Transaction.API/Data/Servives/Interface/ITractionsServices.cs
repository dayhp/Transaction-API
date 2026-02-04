using Transaction.API.Models;

namespace Transaction.API.Data.Servives.Inteface
{
    public interface ITractionsServices
    {
        Task<Models.Transaction> CreateTransactionAsync(DTOs.PostTransactionsDto postTransactionsDto);
        Task<Models.Transaction?> GetTransactionByIdAsync(Guid transactionId);
        Task<IEnumerable<Models.Transaction>> GetAllTransactionsAsync();
        Task<Models.Transaction?> UpdateTransactionAsync(Guid transactionId, DTOs.PutTransactionsDto putTransactionsDto);
        Task<bool> DeleteTransactionAsync(Guid transactionId);
        Task<User?> GetUserByEmailAsync(string email);
    }
}
