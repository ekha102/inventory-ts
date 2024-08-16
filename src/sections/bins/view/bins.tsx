import { useState } from "react";
import BinForm from "../add-bin-form";
import DialogEditBin from "../dialog-edit-bin";
import BinsTable from "../table-list-bins";


export default function bin() {
  const [open, setOpen] = useState<boolean>(false)
  const [binId, setBinId] = useState<number>(0);
  // console.log("parent component bin id: ", binId);

  return (
    <div>
      <BinForm/>
      <BinsTable setOpen={setOpen} setBinId={setBinId}/>
      {open ? <DialogEditBin open={open} setOpen={setOpen} binId={binId}/> : false}
      
    </div>
  )
}
