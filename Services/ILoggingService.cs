using Hospital.Domain.Users.SystemUser;

namespace Hospital.Services

{
    public interface ILoggingService
    {
        Task LogProfileUpdateAsync(string userId, string changedFields, DateTime timestamp);
        Task LogAccountDeletionAsync(string userId, DateTime timestamp);
        string GetChangedFields(SystemUser existingUser, SystemUserDto updatedUser);
    }
}