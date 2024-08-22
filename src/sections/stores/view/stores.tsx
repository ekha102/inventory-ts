import { Button } from "@mui/material";
import CreateStore from "../create-store";
import StoreTable from "../table-stores";
import { useState } from "react";



export default function Stores() {
  
  const [open, setOpen] = useState<boolean>(false);


  return (
    <>
      <Button variant="contained" color="primary" onClick={()=>setOpen(true)} >Create Store</Button>
      {open ? <CreateStore open={open} setOpen={setOpen} /> : false}
      
      <StoreTable/>
    </>
  );
}