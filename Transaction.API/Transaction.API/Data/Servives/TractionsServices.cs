using Microsoft.EntityFrameworkCore;
using Transaction.API.Data.Servives.Inteface;
using Transaction.API.DTOs;
using Transaction.API.Models;

namespace Transaction.API.Data.Servives
{
    public class TractionsServices(AppDbContext _context) : ITractionsServices
    {
        public async Task<Models.Transaction> CreateTransactionAsync(PostTransactionsDto postTransactionsDto)
        {
            var transaction = new Models.Transaction
            {
                TransactionType = postTransactionsDto.TransactionType,
                Category = postTransactionsDto.Category,
                Amount = postTransactionsDto.Amount,
                Description = postTransactionsDto.Description,
                TransactionDate = postTransactionsDto.TransactionDate,
                UserId = postTransactionsDto.UserId
            };
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<bool> DeleteTransactionAsync(Guid transactionId)
        {
            var transaction = await _context.Transactions.FindAsync(transactionId);
            if (transaction == null)
            {
                return false;
            }
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Models.Transaction>> GetAllTransactionsAsync()
        {
            var transactions = _context.Transactions.ToListAsync();
            return await transactions;
        }

        public Task<Models.Transaction?> GetTransactionByIdAsync(Guid transactionId)
        {
            var transaction = _context.Transactions.FirstOrDefaultAsync(w => w.Id.Equals(transactionId));
            return transaction;
        }

        public async Task<Models.Transaction?> UpdateTransactionAsync(Guid transactionId, PutTransactionsDto putTransactionsDto)
        {
            var transaction = await _context.Transactions.FindAsync(transactionId);
            if (transaction == null)
            {
                return null;
            }
            transaction.TransactionType = putTransactionsDto.TransactionType;
            transaction.Amount = putTransactionsDto.Amount;
            transaction.Description = putTransactionsDto.Description;
            transaction.Category = putTransactionsDto.Category;
            _context.Transactions.Update(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
