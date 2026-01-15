namespace Transaction.API.DTOs
{
    public class PutTransactionsDto
    {
        public string TransactionType { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
