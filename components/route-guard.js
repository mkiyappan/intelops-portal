import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export { RouteGuard };

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);
        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = [
            '/sign-in',
            '/sign-up',
            '/verify-email',
            '/signin-error',
            '/callback',
            '/experiment'];
        const path = url.split('?')[0];
        const filteredPath = path.split('#')[0];
        const isLoggedIn = window.localStorage.getItem('USER_CODE') == null ? true : false;
        if (isLoggedIn && !publicPaths.includes(filteredPath)) {
            setAuthorized(true);
            // router.push({
            //     pathname: '/sign-in'
            // });
        } else {
            setAuthorized(true);
        }

    }

    return (authorized && children);
}