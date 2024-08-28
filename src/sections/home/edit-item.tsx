import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import useSWR, { mutate } from 'swr';
import axios, { endpoints } from '@/services/axios'
import { editIdForm, updateFormItemById } from '@/services/home';
import { IEditIdList } from './typeItems';


import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { ILocationTable } from "../location/typeLocation";
import { IStores } from "../stores/typeStores";
import { ITableBins } from "../bins/typeBins";
import { useRouter } from 'next/navigation';


type Params = {
  itemId: number;
};


export default function EditItem() {

  const { itemId } = useParams<Params>();
  const router = useRouter();

  const [switchBin, setSwitchBin] = useState<boolean>(false);
  // console.log("Bin Switch: ", switchBin);

  const formInput = Yup.object().shape({
    item_name: Yup.string().required("Item name must be required."),
  })

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<IEditIdList>({
    defaultValues: {
      item_name: "",
      store_id: "",
      switch_bin: switchBin || false,
      loc_id: "",
      bin_id: "",
      quantity: "",
      alert: "",
      comment: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });



  const { data: editIdList = [], isLoading, error } = useSWR<IEditIdList>(itemId, () => editIdForm(itemId), axios);
  const { data: locationList = [] } = useSWR<ILocationTable>(endpoints.locations, axios);
  const { data: storeList = [] } = useSWR<IStores>(endpoints.stores, axios);
  const { data: binList = [] } = useSWR<ITableBins>(endpoints.bins, axios);
  // console.log(editIdList);
  // console.log("Bin List: ", binList);



  const onSubmit = async (values: IEditIdList) => {
    try {
      const { itemId } = values;
      await updateFormItemById(itemId as number, values);
      router.push("/");
      mutate(endpoints.items);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (editIdList.length) {
      setSwitchBin(editIdList[0].switch_bin);
      reset(
        {
          item_name: editIdList[0].item_name,
          store_id: editIdList[0].store_id,
          loc_id: editIdList[0].loc_id || "",
          bin_id: editIdList[0].bin_id || "",
          quantity: editIdList[0].quantity,
          alert: editIdList[0].alert,
          comment: editIdList[0].comment,
          item_desc: editIdList[0].item_desc,
        }
      )
    }
  }, [editIdList])



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg" >

        {/* Item Name  */}
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


        {/* Store Name  */}
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store_name">
            Store Name:
          </label>
          <Controller
            control={control}
            name="store_id"
            render={({ field }) => {
              return (
                <div className="relative">
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="store_name" {...field} {...register("store_id")}>
                    {storeList?.map((ele) => {
                      return (
                        <option key={ele.store_id} value={ele.store_id}>{ele.store_name}</option>
                      )
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              );
            }} />
          {errors.store_id && <p className="text-red-500 text-xs italic">{errors.store_id.message}</p>}
        </div>




        {/* Switch Bin  */}
        <div className="my-5">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={switchBin} onChange={() => setSwitchBin(!switchBin)} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Need Bin?</span>
          </label>
        </div>


        {switchBin ?
          <div className="my-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loc_name">
              Bin Name:
            </label>
            <Controller
              control={control}
              name="bin_id"
              render={({ field }) => {
                return (
                  <div className="relative">
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bin_name" {...field} {...register("bin_id")}>
                      {binList?.map((ele) => {
                        return (
                          <option key={ele.bin_id} value={ele.bin_id}>{ele.bin_name} {ele.bin_id}</option>
                        )
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>

                );
              }} />
            {errors.loc_id && <p className="text-red-500 text-xs italic">{errors.loc_id.message}</p>}
          </div>
          :
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
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="loc_name" {...field} {...register("loc_id")}>
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
            {errors.loc_id && <p className="text-red-500 text-xs italic">{errors.loc_id.message}</p>}
          </div>
        }

        {/* Quantity  */}
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity:
          </label>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => {
              return (
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" min={0} max={100} {...field} {...register("quantity")} />
              );
            }} />
          {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity.message}</p>}
        </div>


        {/* Alert  */}
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alert">
            Alert:
          </label>
          <Controller
            control={control}
            name="alert"
            render={({ field }) => {
              return (
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="alert" type="number" min={0} max={100} {...field} {...register("alert")} />
              );
            }} />
          {errors.alert && <p className="text-red-500 text-xs italic">{errors.alert.message}</p>}
        </div>


        {/* Comment */}
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
            Comment:
          </label>
          <Controller
            control={control}
            name="comment"
            render={({ field }) => {
              return (
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" rows={3} {...field} {...register("comment")} />
              );
            }} />
          {errors.comment && <p className="text-red-500 text-xs italic">{errors.comment.message}</p>}
        </div>


        {/* Description */}
        <div className="my-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item_desc">
            Description:
          </label>
          <Controller
            control={control}
            name="item_desc"
            render={({ field }) => {
              return (
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item_desc" rows={5} {...field} {...register("item_desc")} />
              );
            }} />
          {errors.item_desc && <p className="text-red-500 text-xs italic">{errors.item_desc.message}</p>}
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