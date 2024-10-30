# US 5.1.1 - Admin Registration of Backoffice Users

## 1. Context

The healthcare system requires a controlled method for adding backoffice users with specific permissions. The Admin initiates the registration of these users (e.g., doctors, nurses, technicians) to ensure they can access the backoffice system securely and with the appropriate level of access. This process aligns with the system's need for strict access control, enforcing role-based permissions and ensuring only verified users can access sensitive functions.

## 2. Requirements

Domain - As an Admin, I want to register new backoffice users via an out-of-band process to ensure only designated roles (Doctor, Nurse, Technician, Admin) can access and manage the backoffice system's functionalities.

Acceptance Criteria:

- Admin Registration Process: Only Admins can register new backoffice users, preventing self-registration.
- Role Assignment: During registration, the Admin assigns roles to define the user's access level.
- One-Time Setup Link: Registered users receive a secure, one-time setup link to create a password and activate their account.
- Password Security: The system enforces strong password requirements.
- Registration Confirmation: A confirmation email is sent to the user to verify registration.

## 3. Analysis

3.1 Study:
The healthcare system’s need for controlled access to sensitive data and actions necessitates a robust backoffice user management model. The registration process requires validation, strong password policies, and email verification to ensure user authenticity and secure system entry. This aligns with Domain-Driven Design principles by clarifying domain concepts and establishing role-based access control.

3.2 Analysis:
The model ensures structured access, aiding readability and reducing complexity. By defining roles such as Doctor, Nurse, and Technician, it allows easy addition of new user types while maintaining secure access practices, minimizing the risk of unauthorized access.

## 4. Design

Here is the domain model for Admin Registration of Backoffice Users:

Admin Entity: Initiates the registration process, assigns roles, and triggers the setup link.
Role Enum: Defines role types (Admin, Doctor, Nurse, Technician).
BackofficeUser Entity: Includes profile details and login credentials after activation.
EmailService: Sends setup and confirmation emails to new users.
PasswordPolicy: Enforces password requirements upon initial setup.
Implementation
The team aligned the design with user requirements and applied DDD principles. Key components—such as Admin-controlled registration, role assignment, and secure account setup—were developed with compliance and security as priorities. Role-based access is enforced, with audit trails for registration activities to maintain data integrity.

## 5. Implementation/Major Commits

The model is implemented in the project, and UML diagrams for the registration workflow were created using PlantUML in SVG format. Below are detailed requirements:

Role Assignment: Admin chooses a role from the defined Role Enum.
Email Verification and Security: The system logs registration steps and sends confirmation emails via EmailService.
Password Setup: The system activates accounts only after successful password creation, enforced by PasswordPolicy.