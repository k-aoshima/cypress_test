import React, {useEffect} from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const CommonDialog = ({msg, isOpen, doYes, doNo}) => {

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
      <div>
        <Dialog
            open={open}
            keepMounted
            onClose={() => doNo()}
            aria-labelledby="common-dialog-title"
            aria-describedby="common-dialog-description"
        >
          <DialogContent>
            {msg}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => doNo()} color="primary">
              No
            </Button>
            <Button onClick={() => doYes()} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}
export default CommonDialog
