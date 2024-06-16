import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const authOptions : AuthOptions = {
   pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
    providers: [

        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { 
                    label: "Username",
                    type: "text", 
                    placeholder: "username" 
                },
                password: {  
                    label: "Password", 
                    type: "password" 
                },
            },

            async authorize(credentials) {

                  const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username,
                    },
                  });

                  if (!user) {
                    throw new Error("Wrong Username or password");
                  }
                  
                  if(!credentials?.password){
                    throw new Error("Please provide  Username or password");
                  }

                  if (!user.emailVerified) throw new Error("Please verify your email first!");

                  const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                  );

                  if (!isPasswordValid) {
                    throw new Error("Wrong Username or password");
                  }

                  const {password, ...userWithoutPass} = user;

                  return userWithoutPass;
            },


        }) ,
    ],
    callbacks: {

      
        async jwt({ token, user }) {
          if (user) {
            token.User = user as User;
          }
          return token;
        },
        async session({ session, token }) {
          session.user = token.User
          return session;
        }

    }
}
