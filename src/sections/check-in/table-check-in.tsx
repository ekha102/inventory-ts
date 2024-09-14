'use client'

import axiosInstance, { endpoints } from "@/services/axios";
import useSWR from "swr";
import { ICheckInTable } from "./typeCheckIn";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";


export default function TableCheckIn() {

  const router = useRouter();

  const { data: checkInList = [] } = useSWR<ICheckInTable>(endpoints.checkIn, axiosInstance);
  // console.log(checkInList);

  


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Item Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Check-In
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {checkInList?.map((ele) => {
            const checkInDate = dayjs(ele.check_in_date).format("MM-DD-YYYY");
            return (
              <tr key={ele.item_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ele.item_id}
                </th>
                <td className="px-6 py-4">
                  {ele.item_name}
                </td>
                <td className="px-6 py-4">
                  {ele.quantity}
                </td>
                <td className="px-6 py-4">
                  {checkInDate}
                </td>
                <td className="px-6 py-4">
                  {ele.comment}
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">Check-In</a>
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 mx-5 hover:underline" onClick={()=>{router.push(`/check-in/${ele.item_id}`)}}>View</a>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>


  );
}