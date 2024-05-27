using Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infrastructure
{
    public class MongoContext
    {
        private readonly IMongoDatabase _database;

        public MongoContext(IConfiguration config)
        {
            var connectionString = config.GetSection("MongoSettings:ConnectionString").Value;
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(config.GetSection("MongoSettings:DatabaseName").Value);
        }

        public IMongoCollection<ChatMessage> ChatMessages => _database.GetCollection<ChatMessage>("chatMessages");
    }
}
