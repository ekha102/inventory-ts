
'use client'

import useSWR from "swr";
import axios, { endpoints } from "@/services/axios";
import { IViewAlertTable } from "./typeViewAlert";
import { useRouter } from 'next/navigation';



export default function TableViewAlert() {
  const router = useRouter();
  const { data: viewAlertList = [] } = useSWR<IViewAlertTable>(endpoints.viewAlert, axios);
  console.log(viewAlertList);



  return (
    <table className="border-collapse border border-slate-400">
      <thead>
        <tr>
          <th className="border border-slate-300">ID</th>
          <th className="border border-slate-300">Name of Item</th>
          <th className="border border-slate-300">Store Name</th>
          <th className="border border-slate-300">Location Name</th>
          <th className="border border-slate-300">Bin Name</th>
          <th className="border border-slate-300">Quantity</th>
          <th className="border border-slate-300">Alert</th>
          <th className="border border-slate-300">Status Item</th>
        </tr>
      </thead>
      <tbody>
        {viewAlertList?.map((ele) => {
          return (
            <tr key={ele.item_id}>
              <td className="border border-slate-300">{ele.item_id}</td>
              <td className="border border-slate-300" onClick={()=>{router.push(`/view-alert/${ele.item_id}`)}}>{ele.item_name}</td>
              <td className="border border-slate-300">{ele.store_name}</td>
              <td className="border border-slate-300">{ele.loc_name}</td>
              <td className="border border-slate-300">{ele.bin_name} {ele.bin_id}</td>
              <td className="border border-slate-300">{ele.quantity}</td>
              <td className="border border-slate-300">{ele.alert}</td>
              <td className="border border-slate-300" style={{color: (ele.status_alert) === 'High' ? 'green' : 'red' }}>{ele.status_alert}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}