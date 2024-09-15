"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { IRegisterForm } from "./type-regsiter-form";
import { createUserAccount } from "@/services/register";


export default function RegisterForm() {

  const router = useRouter();


  const formInput = Yup.object().shape({
    full_name: Yup.string().required("Full name must be letter required."),
    username: Yup.string().required("Username must be required."),
    password: Yup.string().required("Password must be required.").min(5, 'The password is not longer enough'),
    //track_number: Yup.string().required("Can't be empty").matches(/^[0-9]+$/, "Must be only digits").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
  });

  const { control, register, formState: { errors }, handleSubmit } = useForm({
    // Add Default Values code below:
    defaultValues: {
      full_name: "",
      username: "",
      password: "",
    },
    // Add resolver code below:
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });


  const onSubmit = async (values: IRegisterForm) => {
    console.log(values);
    try {
      await createUserAccount(values);
      router.push("/login");
    } catch (error) {
      alert("Error add the account")
    }
    

  }





  return (
    <section className="flex flex-col items-center pt-6">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Create an
            account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>

              <Controller
                control={control}
                name="full_name"
                render={({ field }) => {
                  return (
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emelia Erickson" {...field} {...register("full_name")} />
                  );
                }}
              />
              {errors.full_name && <p className="text-red-500 text-xs italic">{errors.full_name.message}</p>}
            </div>

            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => {
                  return (
                    <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="emelia_erickson24" {...field} {...register("username")} />
                  );
                }}
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}


            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

              <Controller
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} {...register("password")} />
                  );
                }}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}


            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={() => { router.push("/login") }}>Login</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );


}