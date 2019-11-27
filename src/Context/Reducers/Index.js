const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("user_id", JSON.stringify(action.payload.user_id));
      return {
        ...state,
        isAuthenticated: true,
        user_id: action.payload.user_id,
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