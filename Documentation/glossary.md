# Glossary

This document includes the glossary with the terms important to the project's business.

This is a live document, so it'll be constantly updated in the middle of a *Sprint* and in between *Sprints*.

For the sake of organization, our group decided to sort the following list of Terms by its aggregate's prefixes:

**U:** User  
**P:** Patient  
**St:** Staff  
**OR:** Operation Request  
**OT:** Operation Type  
**A:** Appointment  
**SR:** Surgery Room

**Note:** Each term without any prefix is assumed not be part of any aggregate and therefore be a **Service**.

| Expression                   | Meaning                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| (P) Patient                   | User that will request a surgery                                        |
| (P) PatientId                 | Unique Identifier of the **Patient**                                    |
| (ST) Staff                    | The **Staff** member responsible for performing surgeries or operations. |
| (ST) LicenseNumber            | Unique identifier for the **Staff** member's professional license.       |
| (ST) AvailableSlots            | **Staff** availability schedule for surgeries.                         |
| (ST) Specialization            | The specific area of expertise or medical specialty of the **Staff**.   |
| (P) Name                      | A value object representing the **Patient's** full name.               |
| (P) Email                     | A value object representing the **Patient's** email address.           |
| (P) PhoneNumber               | A value object representing the **Patient's** phone number.            |
| (P) MRN                       | The Medical Record Number of the **Patient**.                          |
| (P) AppointmentHistory        | **Patient's** record of past appointments.                             |
| (P) Allergies/MedicalCondition | A list of allergies or medical conditions of the **Patient**.          |
| (P) EmergencyContact          | **Patient's** emergency contact details.                               |
| (SR) Surgery Room             | The operating room where surgeries are performed.                      |
| (SR) RoomNumber               | A value object representing the room number of the **Surgery Room**.   |
| (SR) RoomType                 | Enum defining the type of the **Surgery Room**.                        |
| (SR) RoomCurrentStatus        | Enum defining the current status of the **Surgery Room**.              |
| (SR) Equipment                | Equipment available in the **Surgery Room**.                           |
| (SR) Capacity                 | The capacity of the **Surgery Room** (how many surgeries can be done). |
| (SR) MaintenanceSlots         | Time slots reserved for maintenance in the **Surgery Room**.           |
| (A) Appointment               | The scheduled operation for the **Patient**.                           |
| (A) OperationTime             | The time scheduled for the **Appointment**.                            |
| (A) Status                    | The current status of the **Appointment** (e.g., confirmed, canceled). |
| (OR) Operation Request        | A request to perform a surgery or operation.                           |
| (OR) Priority                 | The priority level of the **Operation Request**.                       |
| (OR) DeadlineDate             | The deadline by which the **Operation Request** needs to be fulfilled. |
| (OT) Operation Type           | The type of surgery or operation to be performed.                      |
| (OT) OperationName            | The name of the specific surgery or operation.                         |
| (OT) RequiredStaffBySpecialization | The specialization required for the **Operation Type**.           |
| (OT) AnesthesiaTime           | The amount of time required for administering anesthesia.              |
| (OT) CleaningTime             | The amount of time required for cleaning post-operation.               |
| (OT) SurgeryTime              | The duration of the surgery itself.                                    |
| (OT) EstimatedDuration        | The total estimated time for the surgery (anesthesia + surgery + cleaning). |

### Notas Adicionais:
- A **Specialization** é um VO associado ao agregado de Staff, que especifica a área médica na qual o staff é especializado.
- O termo **ID** refere-se a um objeto de valor (VO) utilizado para identificar entidades únicas dentro do sistema, como **Paciente**, **Request de Operação**, **Tipo de Operação**, etc.
