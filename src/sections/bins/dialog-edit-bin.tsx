
import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import useSWR, { mutate } from "swr";
import axios, { endpoints } from "@/services/axios";
import { Controller, useForm } from "react-hook-form";
import { IBins } from "./typeBins";
import { putBinForm } from "@/services/bins";


interface IProp {
  open: boolean;
  setOpen: (open: boolean) => void;
  binId: number;
}



export default function DialogEditBin({ open, setOpen, binId }: IProp) {

  // console.log("Pass down to children component for Bin Id: ", binId);
  const { data: formBinById = [], isLoading, error } = useSWR(`/api/bins/bin-by-id/${binId}`, axios);
  // console.log("Display one Bin Id: ", formBinById)

  const { control, register, formState: { errors }, handleSubmit, reset } = useForm<IBins>({
    defaultValues: {
      bin_id: "",
      bin_name: "",
      // loc_id: "",
      bin_desc: "",
    },
  })



  const onSubmit = async (values) => {
    console.log(values);
    try {
      const {bin_id} = values;
      console.log("bin id: ", bin_id)
      await putBinForm(bin_id, values);
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
          bin_name: formBinById[0].bin_name,
          // loc_id: formBinById[0].loc_id,
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
              <Controller
                control={control}
                name="bin_desc"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField id="outlined-basic" label="Bin Description" variant="outlined" {...field} {...register("bin_desc")} error={!!error} />
                  );
                }} />
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