import { Button } from "@mui/material";

import { mutate } from "swr";
import { endpoints } from "@/services/axios";
import { createBinName } from "@/services/bins";

export default function AddBin() {

  const handleCreateBin = async () => {   
    try {
      await createBinName({bin_name: "Bin"});
      mutate(endpoints.bins);
    } catch (error) {
      
    }
    
  }


  return (
    <>
      <Button  variant="contained" color="primary" onClick={handleCreateBin}>Create New Bin</Button>
    </>
  );
}