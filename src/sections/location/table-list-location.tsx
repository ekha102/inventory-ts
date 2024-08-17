import React from 'react'
import useSWR, { mutate } from 'swr';
import axios, { endpoints } from '@/services/axios';

import { ILocationTable } from './typeLocation';
import { Button, Table } from '@radix-ui/themes';
import { deleteLocation } from '@/services/locations';

export default function TableListLocation() {
  const { data: locationList = [], error, isLoading } = useSWR<ILocationTable[]>(endpoints.locations, axios);

  const handleDeleteLocationItem = async (locId: number) => {
    // console.log("Loc_id: ", locId)
    const res = await deleteLocation(locId)
    if (res.status) {
      mutate(endpoints.locations);
    }

  }

  if (error) return <div>Failed to load locations.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <> {/* Table for location */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Location ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Location Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {locationList?.map((ele) => {
            return (
              <Table.Row key={ele.loc_id}>
                <Table.RowHeaderCell>{ele.loc_id}</Table.RowHeaderCell>
                <Table.Cell>{ele.loc_name}</Table.Cell>
                <Table.Cell>
                  <Button size="2" variant="solid" color="red" onClick={()=>{handleDeleteLocationItem(ele.loc_id)}}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

    </>
  )
}
