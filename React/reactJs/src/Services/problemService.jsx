// problemservice.jsx
import axios from 'axios';

const API_URL = 'https://localhost:5000';
const API_URL_COMPILER = 'https://localhost:8000';

const instance = axios.create({
  baseURL: `${API_URL}/api`,
});

const compilerInstance = axios.create({
  baseURL: API_URL_COMPILER,
});

export const fetchProblems = () => instance.get('/problems');
export const fetchProblemById = (id) => instance.get(`/problems/${id}`);

export const codeExec = async (code, input,language) => {
  const payload = { code,input,language };
  return await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
};
