using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Transaction.API.Data.Servives.Inteface;
using Transaction.API.DTOs;
namespace Transaction.API.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly ILogger<TransactionsController> _logger;
        private readonly ITractionsServices _tractionsServices;
        public TransactionsController(ILogger<TransactionsController> logger,
            ITractionsServices tractionsServices)
        {
            _logger = logger;
            _tractionsServices = tractionsServices;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var httpContext = HttpContext;
            var transactions = await _tractionsServices.GetAllTransactionsAsync();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Placeholder for getting a transaction by ID logic
            var transaction = await _tractionsServices.GetTransactionByIdAsync(id);
            if (transaction == null)
            {
                return NotFound("Transaction not found.");
            }
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] PostTransactionsDto request)
        {
            // Placeholder for creating a new transaction logic
            var nameIdentiferName = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(nameIdentiferName))
            {
                return BadRequest("Invalid user");
            }

            var user = await _tractionsServices.GetUserByEmailAsync(nameIdentiferName);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (request == null)
            {
                return BadRequest("Invalid transaction data.");
            }

            request.UserId = user.Id;
            var transaction = await _tractionsServices.CreateTransactionAsync(request);
            return Ok(transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction([FromRoute] Guid id, [FromBody] PutTransactionsDto request)
        {
            // Placeholder for updating an existing transaction logic
            if (request == null)
            {
                return BadRequest("Invalid transaction data.");
            }
            var transaction = await _tractionsServices.UpdateTransactionAsync(id, request);
            if (transaction == null)
            {
                return NotFound("Transaction not found.");
            }
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction([FromRoute] Guid id)
        {
            // Placeholder for deleting a transaction logic
            var result = await _tractionsServices.DeleteTransactionAsync(id);
            if (!result)
            {
                return NotFound("Transaction not found.");
            }
            return Ok();
        }
    }
}
