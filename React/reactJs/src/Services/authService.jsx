import axios from 'axios';

const API_URL = 'https://localhost:5000';

const instance = axios.create({
  baseURL: `${API_URL}/api` , // 👈 cleaner
});


export const registerUser = (RegistrationData) => {
  return instance.post('/register', RegistrationData);
};

export const loginUser = (LoginData) =>{
  return instance.post('/login',LoginData);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  return instance.get('/me',{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
};