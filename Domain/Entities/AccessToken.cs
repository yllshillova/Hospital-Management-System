namespace Domain.Entities
{
    public class AccessToken
    {
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

}
