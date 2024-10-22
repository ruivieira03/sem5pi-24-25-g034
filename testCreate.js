const mysql = require('mysql2/promise'); // Import mysql2 with promise support

// Function to create a user
async function create(username, role, password, iamId, email, phoneNumber) {
    // MySQL database connection settings
    const connection = await mysql.createConnection({
        host: 'vsgate-s1.dei.isep.ipp.pt',
        port: 10658,
        user: 'root',
        password: 'B7j3zfKKkOXf',
        database: 'sem5pi'
    });

    try {
        console.log('Connected to MySQL');

        // SQL query to insert a new user into the SystemUser table
        const query = 'INSERT INTO SystemUser (Username, Role, Password, IAMId, Email, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)';
        
        // Execute the query
        const [results] = await connection.query(query, [username, role, password, iamId, email, phoneNumber]);
        console.log('User created with ID: ' + results.insertId);
        
    } catch (err) {
        console.error('Error inserting user into database: ' + err.stack);
    } finally {
        await connection.end(); // Ensure connection is closed
    }
}

// Call the create function with the specified parameters
create(
    'adtest',                  // Username
    0,                      // Role (make sure this matches your database's expected value)
    'SEM5pi1234@',               // Password
    '1',                          // IAMId
    'ruimdv03@gmail.com',        // Email
    '912028969'                  // PhoneNumber
);
