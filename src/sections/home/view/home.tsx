import { Button } from "@mui/material";
import TableListItems from "../table-list-item";

import Link from "next/link";


export default function HomePage() {




  return (
    <>
      <Link href="/create-item">
        <Button variant="contained" color="primary">Create Item</Button>
      </Link>
      
      <TableListItems/>
    </>
  );
}