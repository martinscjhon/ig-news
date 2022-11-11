import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"
import { query as q } from 'faunadb'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: `${process.env.CLIENT_GITHUB_ID}`,
      clientSecret: `${process.env.CLIENT_GITHUB_SECRET}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      const { email } = user
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }

    },
  }
}

export default NextAuth(authOptions)