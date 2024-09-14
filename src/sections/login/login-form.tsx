'use client'

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { ILoginForm } from "./type-login";
import { useRouter } from "next/navigation";


export default function LoginForm() {

  const router = useRouter();

  const formInput = Yup.object().shape({
    username: Yup.string().required("Username must be required."),
    password: Yup.string().required("Password must be required."),
  })

  const { control, register, formState: { errors }, handleSubmit, reset, setValue } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(formInput),
    mode: "onTouched",
  });

  const onSubmit = (values: ILoginForm) => {
    console.log(values);
  }



  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">

              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required {...field} {...register("username")} />
                    );
                  }} />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
              </div>


              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <input type="text" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...field} {...register("password")} />
                    );
                  }} />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
              </div>

      
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a onClick={()=>router.push("/register")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}