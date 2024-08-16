import fetcher, { endpoints } from "@/services/axios";
import { Table } from "@radix-ui/themes";
import useSWR, { mutate } from "swr";
import { IBins } from "./typeBins";
import { Button, Grid } from "@mui/material";
import { deleteBinId } from "@/services/bins";

interface IPropsBinsTable {
  setOpen: (open: boolean) => void;
  setBinId: (binId: number) => void;
}



export default function BinsTable( {setOpen, setBinId}:IPropsBinsTable ) {
  const { data: binsList = [], error, isLoading } = useSWR<IBins[]>(endpoints.bins, fetcher);
  // console.log(binsList);


  const handleEditBin = (binId: number) => {
    // console.log("Bin Id: ", binId);
    setBinId(binId);
    setOpen(true);
  }
  


  const handleDeleteBin = async (binId: number) => {
    try {
      await deleteBinId(binId);
      mutate(endpoints.bins);
    } catch (error) {
      
    }
  }


  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      {/* Provide the structure table code below:  */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Bin Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {/* Display the data into the table by using map function  */}
          {binsList?.map((ele) => {
            return (
              <Table.Row key={ele.bin_id}>
                <Table.RowHeaderCell>{ele.bin_id}</Table.RowHeaderCell>
                <Table.Cell>{ele.bin_name} {ele.bin_id}</Table.Cell>
                <Table.Cell>{ele.bin_desc}</Table.Cell>
                <Table.Cell>
                  <Grid container direction="row" spacing={1}>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={()=>{handleEditBin(ele.bin_id)}} >Edit</Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="error" onClick={ ()=>{handleDeleteBin(ele.bin_id)} } >Delete</Button>
                    </Grid>
                  </Grid>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );


}