const mysql = require('mysql2/promise');

// Function to log in a user
async function login(username, password) {
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

        // Query to check if the user exists and retrieve their password
        const query = 'SELECT Username, Password, Role FROM SystemUser WHERE Username = ?'; // Update with the correct primary key

        const [results] = await connection.query(query, [username]);

        if (results.length === 0) {
            // No user found with the provided username
            throw new Error('Invalid username or password');
        }

        const user = results[0];

        // Simple password check (plain-text comparison)
        if (password !== user.Password) {
            throw new Error('Invalid username or password');
        }

        // User authenticated successfully, return the user profile
        return {
            username: user.Username,
            role: user.Role
        };

    } catch (err) {
        console.error('Error during login: ' + err.message);
        throw err; // Rethrow the error to handle it outside if needed
    } finally {
        await connection.end(); // Ensure connection is closed
    }
}

// Example usage
(async () => {
    try {
        const user = await login('adminUser', 'SEM5pi1234@'); // Example credentials
        console.log('Login successful:', user);
    } catch (err) {
        console.error('Login failed:', err.message);
    }
})();
