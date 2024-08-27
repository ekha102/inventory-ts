import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import useSWR from 'swr';
import axios, { endpoints } from '@/services/axios'
import { editIdForm } from '@/services/home';
import { IEditIdList } from './typeItems';


import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'


type Params = {
  itemId: number;
};


export default function EditItem() {

  const { itemId } = useParams<Params>();
  const [switchBin, setSwitchBin] = useState<boolean>(false);
  console.log("Bin Switch: ", switchBin);

  const formInput = Yup.object().shape({
    item_name: Yup.string().required("Item name must be required."),
  })

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<IEditIdList>({
    defaultValues: {
      item_name: "",
      switch_bin: switchBin || false,
      loc_id: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });



  const { data: editIdList = [], isLoading, error } = useSWR<IEditIdList>(itemId, () => editIdForm(itemId), axios);
  const { data: locationList = [] } = useSWR(endpoints.locations, axios);
  // console.log(editIdList);
  console.log(locationList);



  const onSubmit = (values: IEditIdList) => {
    console.log(values)
  }

  useEffect(() => {
    if (editIdList.length) {
      setSwitchBin(editIdList[0].switch_bin);
      reset(
        {
          item_name: editIdList[0].item_name,
          loc_id: editIdList[0].loc_id || "",
        }
      )
    }
  }, [editIdList])



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg" >
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item_name">
            Item Name:
          </label>

          <Controller
            control={control}
            name="item_name"
            render={({ field }) => {
              return (
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item_name" type="text" {...field} {...register("item_name")} />

              );
            }} />
          {errors.item_name && <p className="text-red-500 text-xs italic">{errors.item_name.message}</p>}
        </div>


        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loc_name">
            Location Name:
          </label>
          <Controller
            control={control}
            name="loc_id"
            render={({ field }) => {
              return (
                <div className="relative">
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item_name" {...field} {...register("loc_id")}>
                    {locationList?.map((ele) => {
                      return (
                        <option key={ele.loc_id} value={ele.loc_id}>{ele.loc_name}</option>
                      )
                    })}

                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>

              );
            }} />
          {errors.item_name && <p className="text-red-500 text-xs italic">{errors.item_name.message}</p>}
        </div>


        <div className="my-5">
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={switchBin}  onChange={()=>setSwitchBin(!switchBin)} />

          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Need Bin?</span>
        </label>

        </div>

        



        <div className="my-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
        </div>

      </form>
    </>
  );
}