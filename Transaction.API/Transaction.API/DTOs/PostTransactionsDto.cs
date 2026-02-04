namespace Transaction.API.DTOs
{
    public class PostTransactionsDto
    {
        public string TransactionType { get; set; }
        public string Category { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public Guid UserId { get; set; }
    }
}
