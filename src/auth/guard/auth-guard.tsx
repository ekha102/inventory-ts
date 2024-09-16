'use client'

import { useRouter } from "next/navigation" //Only uses in client
//import { useRouter } from "next/router" //Only uses in server
import { useAuthContext } from "../hooks/use-auth-context"
import { useCallback, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export function AuthGuard({children}: Props) {
  const { loading} = useAuthContext()

  return <>
  {loading ? <div>...Loading</div> : <Container>{children}</Container>}
  </>
}


// Create the container to handle login for user access
function Container ({children}: Props) {
  const router = useRouter()

  const {authenticated} = useAuthContext();
  console.log("Authenticated: ", authenticated);
  
  const [checked, setChecked] = useState(false)

  console.log(authenticated);
  
  // Login: user has not login and bring to the currently page
  const check = useCallback(() => {
    if(!authenticated) { // if the auth is false then save the endpoint pathname
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString()

      const href = `/login?${searchParams}`
      
      router.replace(href);
    }else {
      setChecked(true)
    }
  }, [authenticated, router])


  useEffect(() => {
    check()
  },[])

  if (!checked) return null

  return <>{children}</>
}

