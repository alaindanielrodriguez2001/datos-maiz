// Configuración de autenticación
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const refreshAccessToken = async (token) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
      refresh: token.refreshToken,
    });
    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh || token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const user = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
            username: credentials.username,
            password: credentials.password
          });
          if (user.data) {
            return { status: 'success', data: user.data };
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.data.access;
        token.refreshToken = user.data.refresh;
        token.accessTokenExpires = Date.now() + user.data.expires_in * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    }
  }
});

export { handler as GET, handler as POST };