import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './database/db.js';
// import {dnssetup} from './utils/dnssetup.js';
import dns from './utils/dnssetup.js';

dotenv.config({ 
  path: './.env' 
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });