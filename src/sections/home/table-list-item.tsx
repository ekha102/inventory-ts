'use client'

import React from 'react'
import useSWR, { mutate } from "swr"

import axios, { endpoints } from '@/services/axios'
import { IItems } from './typeItems';
import { Table } from '@radix-ui/themes';
import { Button } from '@mui/material';
import { deleteItemId } from '@/services/home';
import { useRouter } from 'next/navigation'




export default function TableListItems() {

  const { data: itemsList = [], error, isLoading } = useSWR<IItems[]>(endpoints.items, axios);

  const router = useRouter();

  // Delete the item in the table out 
  const handleDeleteItem = async (itemId: number) => {
    // console.log(itemId);
    try {
      await deleteItemId(itemId);
      // Recall the useSWR to fetch the data again for delete item 
      mutate(endpoints.items);
    } catch (error) {
      
    }
  }

  if (error) return <div>Failed to load items.</div>;
  if (isLoading) return <div>Loading...</div>;


  return (
    <div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name of Items </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Alert</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Comment</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {itemsList?.map((ele) => {
            return (
              <Table.Row key={ele.item_id}>
                <Table.RowHeaderCell>{ele.item_id}</Table.RowHeaderCell>
                <Table.Cell>{ele.item_name}</Table.Cell>
                <Table.Cell>{ele.quantity}</Table.Cell>
                <Table.Cell>{ele.alert}</Table.Cell>
                <Table.Cell>{ele.comment}</Table.Cell>
                <Table.Cell>
                  <Button className="mr-2" variant="contained" color="primary" size='small' onClick={() => router.push(`/edit-item-id/${ele.item_id}`)}>Edit</Button>
                  <Button variant='contained' color='error' size='small' onClick={()=>{handleDeleteItem(ele.item_id)}} >Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}


        </Table.Body>
      </Table.Root>

    </div>
  )

}