# US 5.1.3 - Patient Registration for Healthcare Application

## 1. Context

The healthcare application provides patients the ability to self-register to create a user profile and access essential services like booking appointments. This functionality establishes a patient profile within the system and ensures identity verification through email confirmation, supporting secure, convenient access to healthcare services.

## 2. Requirements

Domain - As a Patient, I want to self-register for the healthcare application to create a profile and gain access to appointment booking and other patient services.

Acceptance Criteria:

- Self-Registration: Patients can register themselves using an external Identity and Access Management (IAM) system.
- Profile Creation: During registration, patients input personal details, such as name, email, and phone number, to build their profile.
- Email Verification: The system sends a verification email with a confirmation link to validate the patient’s email address.
- Access Restriction: Patients cannot access or list appointments until completing the registration process.

## 3. Analysis

3.1 Study:
Patient registration requires seamless integration with an external IAM system for self-registration, enabling secure handling of personal data and identity verification. This process aligns with healthcare standards and GDPR requirements, ensuring only verified patients can access services such as appointment booking.

3.2 Analysis:
The design focuses on straightforward onboarding and secure profile creation, incorporating IAM integration and email verification. By validating email addresses, the system prevents unauthorized access and ensures accurate user information, supporting smooth appointment management for verified patients.

## 4. Design

Here is the domain model for Patient Registration in the Healthcare Application:

IAMService: Manages self-registration and authentication through an external IAM provider.
Patient Entity: Represents the patient’s profile, containing personal details and registration status.
EmailService: Sends a verification email with a confirmation link for validating the patient’s email address.
AppointmentAccessControl: Enforces restricted access to appointment services until registration completion.
Implementation
The team developed this feature in alignment with DDD principles, focusing on secure data handling and ease of use. Key components—such as IAM integration, email verification, and restricted access—were implemented to protect patient information and ensure secure system entry. Registration status checks are incorporated to verify email confirmation before allowing access to booking features.

## 5. Implementation/Major Commits

The registration process is integrated into the system, with UML diagrams illustrating patient self-registration workflows created using PlantUML and saved in SVG format. Below are individual requirements:

IAMService: Manages patient registration and authentication via the external IAM system.
EmailService: Sends confirmation emails, ensuring patients verify their email addresses.
AppointmentAccessControl: Checks registration status before allowing patients to access appointment booking features.