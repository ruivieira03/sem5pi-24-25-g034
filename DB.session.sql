

START TRANSACTION;
SELECT * from SystemUser;

COMMIT;

DELETE from Patients where FirstName like 'test123';