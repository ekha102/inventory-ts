import React from 'react'
import useSWR, { mutate } from 'swr';
import axios, { endpoints } from '@/services/axios';

import { ILocationTable } from './typeLocation';
import { Table } from '@radix-ui/themes';
import { deleteLocation } from '@/services/locations';
import { Button } from '@mui/material';

export default function TableListLocation() {
  const { data: locationList = [], error, isLoading } = useSWR<ILocationTable[]>(endpoints.locations, axios);

  const handleDeleteLocationItem = async (locId: number) => {
    // console.log("Loc_id: ", locId)
    try {
      await deleteLocation(locId);
      mutate(endpoints.locations);
    } catch (error) {
      alert("Location delete is error");
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
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { handleDeleteLocationItem(ele.loc_id) }}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

    </>
  )
}
