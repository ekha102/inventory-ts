'use client';

import React from 'react'
import axios, { endpoints } from "@/services/axios";
import useSWR from "swr";
import { IViewAlertDetail } from './typeViewAlert';
import { getDetailItemById } from '@/services/view-alert';
import { useParams } from 'next/navigation';
import dayjs from "dayjs";

export default function ViewAlertPage() {
  const { itemId } = useParams<Params>();
  // console.log("Item ID: ", itemId);

  const { data: detailItem = [], error, isLoading } = useSWR<IViewAlertDetail[]>(itemId, () => getDetailItemById(itemId), axios);

  // console.log("Data", detailItem);



  if (error) return <div>Failed to load locations.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {detailItem.map((ele) => {
        const createDate = dayjs(ele.create_date).format("DD-MMM-YYYY @ h:mm a");
        const updateDate = dayjs(ele.update_date).format("DD-MMM-YYYY @ h:mm a"); 
        const checkInDate = dayjs(ele.check_in_date).format("MM-DD-YYYY");
        const checkOutDate = dayjs(ele.check_out_date).format("MM-DD-YYYY");   
        return (
          <div key={ele.item_id}>
            <h1 className="font-bold">Detail Item: {ele.item_name}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>ID:</div>
              <div>{ele.item_id}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Created Date:</div>
              <div>{createDate}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Updated Date:</div>
              <div>{updateDate}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Item Name:</div>
              <div>{ele.item_name}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Store Name:</div>
              <div>{ele.store_name}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Quantity:</div>
              <div>{ele.quantity}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Alert:</div>
              <div>{ele.alert}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Desc:</div>
              <div>{ele.item_desc}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Comment:</div>
              <div>{ele.comment}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Check-In-Date:</div>
              <div>{checkInDate}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Check-Out-Date:</div>
              <div>{checkOutDate}</div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="grid grid-cols-2 gap-4">
              <div>Location:</div>
              <div>{ele.loc_name} </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>Bin Name:</div>
              <div>{ele.bin_name} {ele.bin_id}</div>
            </div>

          </div >
        );
      })}
    </>
  );
}