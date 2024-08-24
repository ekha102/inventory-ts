import { AppBar, Button, Dialog, FormHelperText, IconButton, List, ListItemButton, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { IStoreCreate } from './typeStores';
import { createStore } from '@/services/stores';
import { mutate } from 'swr';
import { endpoints } from '@/services/axios';
import { useRouter } from "next/navigation";

interface IStores {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateStore({ open, setOpen }: IStores) {

  const router = useRouter();

  const formInput = Yup.object().shape({
    store_name: Yup.string().required("Item name must be required."),
  })


  const { control, register, formState:{errors},  handleSubmit } = useForm({
    defaultValues: {
      store_name: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",

  });

  const onSubmit = async (values: IStoreCreate) => {
    // console.log(values);
    try {
      await createStore(values);
      mutate(endpoints.stores);
      setOpen(false);
    } catch (error) {
      
    }
    

  }
  

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Store
            </Typography>

            <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
              save
            </Button>

          </Toolbar>
        </AppBar>
        <List>
          {/* Form place here  */}
          <div className='ms-4'>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="mt-1 mb-3">
              <Controller
                control={control}
                name="store_name"
                render={({ field, fieldState: {error} }) => {
                  return (
                    <TextField id="outlined-basic" label="Store Name" variant="outlined" {...field} error={!!error} {...register("store_name")}/>
                  );
                }} />
                {errors.store_name && <FormHelperText error>{errors.store_name.message}</FormHelperText>}
              </div>

              <div className="mt-4">
                <Button type="submit" variant="contained" color="primary">Submit</Button>
              </div>
            </form>
          </div>

          
        </List>
      </Dialog>

    </>
  );
}