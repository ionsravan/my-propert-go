// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'


const AuthGuard = (props: any) => {
    const { children, fallback } = props
    const router = useRouter()

    useEffect(
        () => {
            if (!router.isReady) {
                return
            }
            if (!window.localStorage.getItem('userData')) {
                if (router.asPath !== '/') {
                    router.replace({
                        pathname: '/admin/login',
                        query: { returnUrl: router.asPath }
                    })
                } else {
                    router.replace('/login')
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router]
    )

    if (auth.loading || auth.user === null) {
        return fallback
    }

    return <>{children}</>
}

export default AuthGuard
