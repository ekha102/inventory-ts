import fetcher, { endpoints } from "@/services/axios";
import { Table } from "@radix-ui/themes";
import useSWR from "swr";
import { IBins } from "./typeBins";


export default function BinsTable() {
  const { data: binsList = [], error, isLoading } = useSWR<IBins[]>(endpoints.bins, fetcher);
  console.log(binsList)


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
                <Table.Cell>{ele.bin_name}</Table.Cell>
                <Table.Cell>{ele.bin_desc}</Table.Cell>
                <Table.Cell>Edit</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );


}