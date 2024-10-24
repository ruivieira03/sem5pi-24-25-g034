namespace Hospital.Domain.Users
{
    public class CreatingSystemUserDto
    {
        public string Username { get; set; }
        public Roles Role { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string IAMId { get; set; }
    }
}
