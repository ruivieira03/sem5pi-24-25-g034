const jwt = require('jsonwebtoken');

const authenticate = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                issuer: process.env.JWT_ISSUER,
                audience: process.env.JWT_AUDIENCE,
            });

            // Extract the role from the custom claim key
            const role =
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (!role) {
                return res.status(403).json({ message: 'Forbidden: Role not found in token' });
            }

            console.log(`User role: ${role}`); // Debugging log

            req.user = { ...decoded, role }; // Attach role to the request object

            // Check if the user's role is allowed
            if (allowedRoles && !allowedRoles.includes(role)) {
                console.log(
                    `Access denied for role: ${role}. Allowed roles: ${allowedRoles}`
                );
                return res.status(403).json({ message: 'Forbidden: Access is denied' });
            }

            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    };
};

module.exports = authenticate;
