<<<<<<< Updated upstream


START TRANSACTION;
SELECT * from SystemUser;

COMMIT;

DELETE from Patients where FirstName like 'test123';
=======
SELECT VERSION();
>>>>>>> Stashed changes
