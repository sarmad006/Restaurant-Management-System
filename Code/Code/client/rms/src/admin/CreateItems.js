import React from 'react'
import { Box } from '@mui/system'
import { Button, Card,CardContent, TextField, Typography } from '@mui/material'

const CreateItems = () => {
    return (
        <Box sx={{marginTop:"8rem"}}>
            <Typography variant="h5" textAlign="center" style={{fontFamily:"cursive"}}>
                Add Items
            </Typography>
            <Card sx={{marginLeft:"20rem",width:"25rem",marginTop:"3rem"}}>
                <CardContent>
                   <form>
                       <TextField label="Add Item Title" gutterBottom></TextField>
                       <TextField label="Add Item Subheader"></TextField>
                    
                       </form>  
                  <Button sx={{marginTop:"1rem",marginLeft:"2rem"}} >Add</Button>
                </CardContent>
            </Card>
            
        </Box>
    )
}

export default CreateItems
