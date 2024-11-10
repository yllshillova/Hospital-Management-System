﻿namespace Domain.Base
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
