
import prisma from "@repo/db/client";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

interface Credentials {
    email : string
    password : string
}

const handler = nextAuth({
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email : { label: "Email", type: "email",placeholder:"Enter your Email address"},
            password: { label: "Password", type: "password",placeholder: "Enter your Password"} 
          },
          // TODO: User credentials type from next-aut
        //   @ts-ignore
          async authorize(credentials:Credentials) : Promise<{email : string} | null> {
            console.log(credentials);
            // Do zod validation, OTP validation here
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: credentials.email,
                    password : credentials.password
                }
            });

            if (existingUser) {

                    return {
                        email: existingUser.email
                    }
                }

            try {
                const user = await prisma.user.create({
                    data: {
                        email : credentials.email,
                        password : credentials.password
                    }
                });
                return {
                    email: user.email
                }
            } catch(e) {
                console.error(e);
            }
            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "saurabh412",
  })

  export { handler as GET, handler as POST}