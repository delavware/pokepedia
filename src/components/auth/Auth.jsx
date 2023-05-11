import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const Auth = () => {

    const nameTrainer = useSelector((store) => store.nameTrainer)

    if (nameTrainer) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

}

export default Auth