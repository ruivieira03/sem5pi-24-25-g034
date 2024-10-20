namespace Hospital.Domain.Shared
{
    // Represents contact information for a user
    public class ContactInformation
    {
        public string Email { get; set; }
        public string Phone { get; set; }

        public ContactInformation(string email, string phone)
        {
            Email = email;
            Phone = phone;
        }
    }
}
