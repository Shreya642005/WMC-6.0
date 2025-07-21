# MongoDB Atlas Setup Instructions

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account or log in
3. Click "Create a New Cluster"

## 2. Set Up Your Cluster

1. Choose "Shared" (free tier)
2. Select a cloud provider and region closest to you
3. Click "Create Cluster"
4. Wait for the cluster to be created (this may take a few minutes)

## 3. Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set "Database User Privileges" to "Read and write to any database"
6. Click "Add User"

## 4. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Add Current IP Address" or "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## 5. Get Connection String

1. Go to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string

## 6. Update Environment Variables

1. Open the `.env` file in your project root
2. Replace `your_mongodb_atlas_connection_string_here` with your actual connection string
3. Make sure to replace `<password>` in the connection string with your database user password

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 7. Test Connection

1. Start your server: `npm run server:dev`
2. You should see "MongoDB Connected" in the console
3. Test the health endpoint: `http://localhost:5000/api/health`

## Troubleshooting

### Connection Issues
- Ensure your IP address is whitelisted in Network Access
- Verify your username and password are correct
- Check that your connection string includes the correct database name

### Common Errors
- **Authentication failed**: Check your username/password
- **Network timeout**: Verify your IP is whitelisted
- **Database not found**: The database will be created automatically when you first insert data

## Security Best Practices

1. Never commit your `.env` file to version control
2. Use strong passwords for database users
3. Regularly rotate your database passwords
4. Use IP whitelisting instead of allowing access from anywhere in production