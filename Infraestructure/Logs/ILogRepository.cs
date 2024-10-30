using Hospital.Domain.Logs;

namespace Hospital.Infraestructure.Logs

{
    public interface ILogRepository
    {
        Task LogProfileUpdateAsync(ProfileUpdateLog logEntry);
        Task LogAccountDeletionAsync(AccountDeletionLog logEntry);
    }
}