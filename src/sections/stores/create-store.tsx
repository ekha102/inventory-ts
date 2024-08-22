import { AppBar, Button, Dialog, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


interface IStores {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateStore( {open, setOpen}: IStores ) {





  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={ ()=>setOpen(false) }
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Store
            </Typography>

            <Button autoFocus color="inherit" onClick={()=>setOpen(false)}>
              save
            </Button>

          </Toolbar>
        </AppBar>
        <List>
          {/* Form place here  */}
        </List>
      </Dialog>

    </>
  );
}