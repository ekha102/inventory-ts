
import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Stack, TextField } from "@mui/material";
import useSWR, { mutate } from "swr";
import axios, { endpoints } from "@/services/axios";
import { Controller, useForm } from "react-hook-form";
import { putBinForm } from "@/services/bins";
import { IEditBins } from "./typeBins";
import { ILocationInBins } from "../location/typeLocation";


interface IProp {
  open: boolean;
  setOpen: (open: boolean) => void;
  binId: number;
}

export default function DialogEditBin({ open, setOpen, binId }: IProp) {

  // console.log("Pass down to children component for Bin Id: ", binId);
  const { data: formBinById = [], isLoading, error } = useSWR<IEditBins[]>(`/api/bins/bin-by-id/${binId}`, axios);
  console.log("Display one Bin Id: ", formBinById)

  const { data: locationsList=[]} = useSWR<ILocationInBins[]>(endpoints.locations, axios);
  console.log(locationsList);

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<IEditBins>({
    defaultValues: {
      bin_id: "",
      bin_name: "",
      loc_id: "",
      bin_desc: "",
    },
  })



  const onSubmit = async (values: IEditBins) => {

    // console.log(values);
    try {
      const { bin_id } = values;
      await putBinForm(bin_id as number, values);
      mutate(endpoints.bins);
      setOpen(false);

    } catch (error) {

    }
  }

  useEffect(() => {
    if (formBinById.length) {
      reset(
        {
          bin_id: formBinById[0].bin_id,
          bin_name: formBinById[0].bin_name || "",  // In the backend maybe pass in the null value that we need to handle the empty string.
          loc_id: formBinById[0].loc_id || "", 
          bin_desc: formBinById[0].bin_desc,
        });
    }
  }, [formBinById]);


  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle>Update Location and Bin Description</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              <Stack spacing={2}>
                {/* Location Name  */}
                <Controller
                control={control}
                name="loc_id"
                render={({ field, fieldState: { error } }) => (
                  <TextField select {...field} sx={{ minWidth: 210 }}
                    id="demo-simple-select-filled" label="Location Name" variant="outlined"  {...register("loc_id")} error={!!error} >
                    {/* Dynamically generate options */}
                    {locationsList?.map((ele) => {
                      return (
                        <MenuItem key={ele.loc_id} value={ele.loc_id}>{ele.loc_name}</MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />

                {/* Description  */}
                <Controller
                  control={control}
                  name="bin_desc"
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <TextField id="outlined-basic" label="Bin Description" variant="outlined" {...field} {...register("bin_desc")} error={!!error} />
                    );
                  }} />
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}