


// Nếu người dùng kô có đăng nghập thì Null, có đăng nghập đẩy váo đăng nghập Record<string, any>
export type AuthUserType = null | Record<string, any>
// = {
//   firstName: 'fsdfsdf'
//   lastName: "fsdfsdfsd"
// }

// Create the JWT content for type data
export type JWTContextType = {
  user: AuthUserType
  loading: boolean;
  authenticated: boolean;
  // firstname, lastname, email
  unauthenticated: boolean;
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// Trạng thái sẻ đc login:
export type AuthStateType = {
  user: AuthUserType;
  loading: boolean
}




