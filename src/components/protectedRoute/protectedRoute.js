import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useSessionStorage from '../../hooks/useSessionStorage'

function ProtectedRoute({ children }) {
    const location = useLocation();
    const { getValue: getSessionToken } = useSessionStorage('managamentUserToken')
    const userSession = getSessionToken()
    React.useLayoutEffect(() => {

    })

    return (
        userSession ?
            children :
            <Navigate
                to='/'
            />
    )
}

export default ProtectedRoute