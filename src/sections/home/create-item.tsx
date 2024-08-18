import { Button, FormHelperText, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { ICreateItem } from "./typeItems";
import useSWR from "swr";
import axios, { endpoints } from "@/services/axios";
import { IStoretoItem } from "../stores/typeStores";
import { ILocationInBins } from "../location/typeLocation";
import { ITableBins } from "../bins/typeBins";
import { createItemToForm } from "@/services/home";
import { useRouter } from 'next/navigation';



export default function CreateItem() {
  const router = useRouter();

  const { data: storeList = [] } = useSWR<IStoretoItem[]>(endpoints.stores, axios);
  const { data: locationList = [] } = useSWR<ILocationInBins[]>(endpoints.locations, axios);
  const { data: binList=[] } = useSWR<ITableBins[]>(endpoints.bins, axios);
  // console.log(storeList);
  // console.log(locationList);
  // console.log(binList);


  const formInput = Yup.object().shape({
    item_name: Yup.string().required("Item name must be required.")
  })

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<ICreateItem>({
    defaultValues: {
      item_name: "",
      store_id: "",
      loc_id: "",
      bin_id: "",
      quantity: "",
      alert: "",
      comment: "",
      item_desc: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });

  const onSubmit = async (values: ICreateItem[]) => {
    // console.log(values)
    await createItemToForm(values);
    router.push("/");
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        {/* Item Name  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="item_name"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField id="outlined-basic" label="Item Name" variant="outlined" {...field} error={!!error} {...register("item_name")} />
              );
            }}
          />
          {errors.item_name && <FormHelperText error>{errors.item_name.message}</FormHelperText>}
        </div>

        {/* Store  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="store_id"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField select id="outlined-basic" label="Store Name" variant="outlined" {...field} error={!!error} {...register("store_id")} sx={{ minWidth: 210 }} >
                  {storeList?.map((ele) => {
                    return (
                      <MenuItem key={ele.store_id} value={ele.store_id}>{ele.store_name}</MenuItem>
                    );
                  })}
                </TextField>
              );
            }}
          />
          {errors.store_id && <FormHelperText error>{errors.store_id.message}</FormHelperText>}
        </div>

        {/* Location  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="loc_id"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField select id="outlined-basic" label="Location Name" variant="outlined" {...field} error={!!error} {...register("loc_id")} sx={{ minWidth: 210 }} >
                  {locationList?.map((ele) => {
                    return (
                      <MenuItem key={ele.loc_id} value={ele.loc_id}>{ele.loc_name}</MenuItem>
                    );
                  })}
                </TextField>
              );
            }}
          />
          {errors.loc_id && <FormHelperText error>{errors.loc_id.message}</FormHelperText>}
        </div>


        {/* Bins  */}
        <div className="mb-3">
          <Controller
            control={control}
            name="bin_id"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField select id="outlined-basic" label="Bin Name" variant="outlined" {...field} error={!!error} {...register("bin_id")} sx={{ minWidth: 210 }} >
                  {binList?.map((ele) => {
                    return (
                      <MenuItem key={ele.bin_id} value={ele.bin_id}>{ele.bin_name} {ele.bin_id}</MenuItem>
                    );
                  })}
                </TextField>
              );
            }}
          />
          {errors.bin_id && <FormHelperText error>{errors.bin_id.message}</FormHelperText>}
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField id="outlined-basic" label="Quantity" variant="outlined" {...field} error={!!error} {...register("quantity")} />
              );
            }}
          />
          {errors.quantity && <FormHelperText error>{errors.quantity.message}</FormHelperText>}
        </div>

        {/* Alert */}
        <div className="mb-3">
          <Controller
            control={control}
            name="alert"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField id="outlined-basic" label="Alert" variant="outlined" {...field} error={!!error} {...register("alert")} />
              );
            }}
          />
          {errors.alert && <FormHelperText error>{errors.alert.message}</FormHelperText>}
        </div>

        {/* Comment */}
        <div className="mb-3">
          <Controller
            control={control}
            name="comment"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField id="outlined-basic" label="Comment" variant="outlined" {...field} error={!!error} {...register("comment")} />
              );
            }}
          />
          {errors.comment && <FormHelperText error>{errors.comment.message}</FormHelperText>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <Controller
            control={control}
            name="item_desc"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField id="outlined-basic" label="Description" variant="outlined" {...field} error={!!error} {...register("item_desc")} />
              );
            }}
          />
          {errors.item_desc && <FormHelperText error>{errors.item_desc.message}</FormHelperText>}
        </div>


        <Button type="submit" variant="contained" color="primary">Submit</Button>

      </form>
    </>
  );
}