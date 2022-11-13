import { Button } from '@mui/material'
import React from 'react'
import './confirmar_dialog.scss'
const ConfirmarDialog = ({ handleClose }) => {
    return (
        <div className='confirmarDialog-container'>
            <h3 className='text-center'>¿Confirmas operacion?</h3>
            <div className='buttons-wrap'>

                <Button variant="contained" className='btn-outline-danger' onClick={()=>handleClose('si')}>Si</Button>
                <Button variant="contained" onClick={()=>handleClose('no')}>No</Button>
            </div>
        </div>
    )
}

export default ConfirmarDialog