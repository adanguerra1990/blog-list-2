import { Button, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

const Overlay = ({ buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOverlay = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={toggleOverlay} variant='contained' color='primary'>
        {buttonLabel}
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
          <DialogContent className='bg-white p-6 rounded-lg shadow-lg w-full'>
            {children(handleClose)}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Overlay
