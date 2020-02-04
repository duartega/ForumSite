const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("user_id", action.payload.u_id);
        localStorage.setItem("first_name", action.payload.first_name);
        localStorage.setItem("last_name", action.payload.last_name);
        localStorage.setItem("email_address", action.payload.email_address);
        localStorage.setItem("dark_mode_active", action.payload.dark_mode_active);
      return {
        ...state,
        isAuthenticated: true,
        u_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email_address: action.payload.email_address,
        dark_mode_active: action.payload.dark_mode_active
        };
    case "LOGOUT":
        localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};