// import { getServerSession } from "next-auth"

// export default async function Home() {
//   const session = await getServerSession()

//   if (!session) {
//     return (
//       <div>
//         You are not signed in.
//       </div>
//     )
//   }
"use client"
  import { signIn, signOut, useSession} from "next-auth/react";
  
  export default function(){
    const session = useSession()
   return(
    <>
      <div className="bg-green-400 flex flex-row justify-between">
        <div>
          <button onClick={()=>signIn()}>Signin</button>
        </div>
        <div>
          <button onClick={()=>signOut()}>Log Out</button>
        </div>
      </div>
      <h1>{session.status}</h1>
      hii there
      <h1>{session.data ? `Hello ${session.data.user}` : 'You are not logged in'}</h1>

      {JSON.stringify(session)}
    </>
   ) 
  }