import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL,
  session:{
      jwt: true
  },
  secret: process.env.NEXT_AUTH_SECRET
});
