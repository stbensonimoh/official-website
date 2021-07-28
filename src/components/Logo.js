import React from 'react'

const Logo = ({ ...props }) => {
    return (
        <>
            <img src="/logo.svg" alt="Benson's Logo" {...props} />
        </>
    )
}

export default Logo
