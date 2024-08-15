
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


interface IProp {
    open: boolean;
    setOpen: (open: boolean) => void;
    binId: number;
}


export default function DialogEditBin({ open, setOpen, binId }: IProp) {

  console.log("Pass down to children component for Bin Id: ", binId);

  return (
    <React.Fragment>
      <Dialog open={open} onClick={() => setOpen(false)} >
        <DialogTitle>Title</DialogTitle>
        <DialogContent>
          <DialogContentText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis minima ipsa quis.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">Submit</Button>
          <Button variant="contained" color="error" onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}