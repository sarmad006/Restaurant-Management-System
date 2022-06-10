import { Typography,Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const GoodBye = () => {
    return (
        <Box sx={{marginTop:"8rem",textAlign:"center"}}>
            <Typography textAlign="center" style={{fontFamily:"cursive",marginBottom:"2rem"}}>
                Sad to see you Going ....
            </Typography>
            <Link to='/' style={{textDecoration:"none"}}>Go back to login Page</Link>
        </Box>
    )
}

export default GoodBye
