const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
        localStorage.setItem("first_name", JSON.stringify(action.payload.first_name));
        localStorage.setItem("last_name", JSON.stringify(action.payload.last_name));
        localStorage.setItem("email_address", JSON.stringify(action.payload.email_address));
      return {
        ...state,
        isAuthenticated: true,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email_address: action.payload.email_address
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