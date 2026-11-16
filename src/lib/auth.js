import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { nextCookies } from 'better-auth/next-js';

const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'MongoDB URL is missing! Please check your environment variables.',
  );
}

let client = global._mongoClient;

if (!client) {
  client = global._mongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000, // ৫০০০ থেকে বাড়িয়ে ১৫০০০ করা হলো
  });
}

const db = client.db('Bazar_Dor');

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});
