export const handleLogout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "auth/logout" }); 
};
