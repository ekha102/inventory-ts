'use client'

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthUserType, AuthStateType } from "../auth-types"
import axiosInstance, { endpoints } from "@/services/axios";
import { AuthContext } from "./auth-context";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN", 
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
}

// Create the payload for structure enum to able get the data type in payload. It will use for generic type function below:
type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType
  };
  [Types.LOGIN]: {
    user: AuthUserType
  };
  [Types.REGISTER]: {
    user: AuthUserType
  }
  [Types.LOGOUT] : undefined
}

// Created AuthStateType type data from other file and create inital for the state
const initialState: AuthStateType = {
  user: null,     // First time login, the user is not login
  loading: true   // First login is true, when user is login then the loading is false
}


// [The code below in the seperate]

// Generic Type: Dynamic data type access into function for any type.
// T is used for type: T is presenting for payload object and extend to the object of payload
// Used the {[index: string]: any} to loop into each payload.
// Any is used for any data pass into the payload
type ActionMapType<T extends {[index: string]: any}> = {
  //In the body part
  [Key in keyof T]: T[Key] extends undefined ? {
    type: Key
  } : {
    type: Key;
    payload: T[Key]
  }
}

// Generic Type:
// <Payload> is accept all the data type (object)
type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]


const reducer = (state: AuthStateType, action: ActionsType) => {
    if(action.type === Types.INITIAL) {
      return {
        loading: false,
        user: action.payload.user
      }
    }

    if(action.type === Types.LOGIN) {
      return {
        ...state,
        user: action.payload.user
      }
    }

    if(action.type === Types.REGISTER) {
      return {
        ...state,
        user: action.payload.user
      }
    }

    if(action.type === Types.LOGOUT) {
      return {
        ...state,
        user: null
      }
    }

    return state
}

// session
const  STORAGE_KEY = 'accessToken'

type Props = {
  children: React.ReactNode
}

// Move this to respective folder
const setSession = (accessToken: string | null) => {
  if(accessToken) {
    sessionStorage.setItem('accessToken', accessToken)

    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`

    // Create JWT function below:


  // If the accessToken has been removed then delete the acessToken and replace the pathname of URL:
  } else {
    sessionStorage.removeItem('accessToken');
    
    delete axiosInstance.defaults.headers.Authorization

  }
}

/* Create the AuthProvider function to get the user access token from machine. If the user has access token then accept to server else user need to login again. */
export function AuthProvider ({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Check user has login else not login
  //useCallBack: function called one time and same with useEffect.
  //useMemo: Calculate of the login
  // User access to page login for function below:
  const initialize = useCallback(async () => {
    try {
      // Lấy accessToken ở trong pc lên:
      const accessToken = sessionStorage.getItem(STORAGE_KEY)

      console.log(123);
      
      // User has already login
      if (accessToken) {
      
        setSession(accessToken)

        const res = await axiosInstance.get(endpoints.auth.me)

        const {data: {user} } = res.data

        // Get the accessToken to dispatch into the server
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            }
          }
        })
        
      // User has not login
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null
          }
        })
      }
    
    // Catch if the user is failed or something wrong
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null
        }
      })
    }
  },[])

  // Call for everytime to re-run
  useEffect(() => {
    initialize()
  }, [initialize])


  // Login function: recommend to use the useCallBack
  const login = useCallback(async (username: string, password: string) => {
    const data = {
      username, password
    }

    const res = await axiosInstance.post(endpoints.auth.login, data);
    const {data: {accessToken, user}} = res.data;
    
    setSession(accessToken)
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken
        }
      }
    })
  }, [])


  // Register
  const register = useCallback(async (username: string, password: string) => {
    const data = {
      username, password
    }

    const res = await axiosInstance.post(endpoints.auth.register, data)

    const {data: { user, accessToken }} = res.data
    // Enhance: user need to verify by email or push them into the login again.
    sessionStorage.setItem(STORAGE_KEY, accessToken)

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken
        }
      }
    })
    
  }, [])

  // Logout
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
      
    })
  }, [])

  const checkAuthenticated = 1 ? 'authenticated' : 'unauthenticated'
  // const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = false ? 'loading': checkAuthenticated
  // const status = state.loading ? 'loading': checkAuthenticated;
  

  // [??] How does the memo in this?
  const memoizedValue = useMemo(() => ({
    user: state.user,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
    unauthenticated: status === 'unauthenticated',

    login,
    register,
    logout
  }), [status, state.user, login, register, logout])

  // [??]
  return <AuthContext.Provider value={memoizedValue} >{children}</AuthContext.Provider>
  
}