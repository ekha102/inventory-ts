
import { useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '../hooks/use-auth-context'

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { loading } = useAuthContext()

    return <>{loading ? <div>Loading....</div> : <Container>{children}</Container>}</>
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
    const router = useRouter()

    const searchParams = useSearchParams()

    const returnTo = searchParams.get('returnTo') || '/bins'

    const { authenticated } = useAuthContext()

    const check = useCallback(() => {
      if (authenticated) {
          router.replace(returnTo)
      }
    }, [authenticated, returnTo, router])

    useEffect(() => {
        check()
    }, [check])

    return <>{children}</>
}

