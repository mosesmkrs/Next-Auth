
import NextAuth from "next-auth/next";
import { authOptions } from "./routeConfig";
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions };