using Transaction.API.Models.Base;

namespace Transaction.API.Models
{
    public class Transaction : BaseEntity
    {
        public string TransactionType { get; set; }
        public string Category { get; set; }
        public Guid UserId { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
    }
}
