import { endpoints } from '@/services/axios';
import { getAddForm } from '@/services/locations';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField, Button, Stack } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import * as Yup from 'yup'
import { ICreateLoc, ILocations } from './typeLocation';

// interface FormValues {
//   loc_name: string;
// }

const schema = Yup.object().shape({
  loc_name: Yup.string().required('Location name is required'),
});

export default function CreateFormLocation() {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<ILocations>({
    defaultValues: {
      loc_name: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: ICreateLoc) => {
    try {
      await getAddForm(values);
      mutate(endpoints.locations);
      reset();
    } catch (error) {
    }
  }

  return (
    <div>
      {/* Need to seperate into component for form location  */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <Controller
            control={control}
            name="loc_name"
            render={({ field, fieldState: { error } }) =>
              <TextField id="outlined-basic" label="Location Name" variant="outlined" {...field} {...register("loc_name")} error={!!error} />}
          />
          {errors.loc_name && <FormHelperText error>{errors.loc_name.message}</FormHelperText>}
        </div>

        <div className="my-4">
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </div>





      </form>
    </div>
  )
}