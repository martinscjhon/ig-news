import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.CLIENT_GITHUB_ID}`,
      clientSecret: `${process.env.CLIENT_GITHUB_SECRET}`,
    }),
  ],
}
export default NextAuth(authOptions)