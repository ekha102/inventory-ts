import { Table } from "@radix-ui/themes";
import useSWR, { mutate } from "swr";
import { IStores } from './typeStores';
import axios, { endpoints } from '@/services/axios';
import { Button } from "@mui/material";
import { deleteStore } from "@/services/stores";



export default function StoreTable() {

  const { data: storeList = [], isLoading, error } = useSWR<IStores[]>(endpoints.stores, axios);
  // console.log(storeList);
  

  const handleDeleteStore = async (storeId: number) => {
    // console.log(storeId);
    try {
      await deleteStore(storeId);
      mutate(endpoints.stores);
    } catch (error) {
      alert("Store delete is error");
    }    
  }

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID Store</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Store Name </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {storeList?.map((ele) => {
            return (
              <Table.Row key={ele.store_id}>
                <Table.RowHeaderCell>{ele.store_id}</Table.RowHeaderCell>
                <Table.Cell>{ele.store_name}</Table.Cell>
                <Table.Cell>
                  <Button variant="contained" color="error" size="small" onClick={ ()=>{handleDeleteStore(ele.store_id)} }>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}

        </Table.Body>
      </Table.Root>
    </>
  );
}