import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "",
          type: "text",
          placeholder: "Email"
        },
        password: {
          label: "",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        try {
          await connectMongoDB();
          const user = await User.findOne({ email: credentials?.email });
          
          if (!user) {
            console.log("User doesn't exist");
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials?.password, user.password);
  
          if (!passwordMatch) {
            console.log("Password is wrong");
            return null;
          }
  
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }

      }
    })
  ],
}

export default NextAuth(authOptions)