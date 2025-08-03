# Login Credentials

## Test Users

### Admin User

- **Email**: admin@example.com
- **Password**: admin123
- **Role**: admin

### Regular User

- **Email**: user@test.com
- **Password**: user123
- **Role**: user

### Additional Admin Users

- **Email**: minjisoo114@gmail.com
- **Password**: admin123
- **Role**: admin

- **Email**: osohoo691016@gmail.com
- **Password**: (original password - not reset)
- **Role**: admin

## Issue Resolution

The login 401 error was caused by:

1. **Password Mismatch**: The existing users in the database had different passwords than expected
2. **Server Restart Required**: After resetting passwords, the backend server needed to be restarted
3. **Frontend Server Restart**: The frontend development server also needed to be restarted to pick up API route changes

## Solution Applied

1. **Password Reset**: Created and ran a script to reset passwords for existing users
2. **Server Restarts**: Restarted both backend and frontend servers
3. **Testing**: Verified login functionality with the new credentials

## Current Status

✅ **Login functionality is now working correctly**
✅ **Both admin and regular user accounts are available for testing**
✅ **Backend and frontend servers are running properly**
