import {useState} from 'react'
import {loginUser} from '../Services/authService'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import { useDispatch } from 'react-redux';
import {login} from '../store/authSlice';

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form , setForm] = useState({
        email : '',
        password:''
    });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async() => {
        try {
            const res = await loginUser(form); // api call made here and got the token and user
            localStorage.setItem("token",res.data.token); // now localstorage sets the token value 
            dispatch(login(res.data.user)); // this just stores the user data now ,stored the user info in redux after login via dispatch 
            navigate('/dashboard');
            alert("logged in successfully");

        } catch (error) {
            alert("Login failed");
            console.error(error);
        }
    };
//     const handleSubmit = async () => {
//   try {
//     const res = await loginUser(form);
//     localStorage.setItem("token", res.data.token);
//     dispatch(login(res.data.user));
//     console.log("About to navigate...");
//     navigate("/dashboard"); // ✅ this must be hit
//   } catch (error) {
//     console.error("Login failed", error);
//   }
// };


    return (
    <div>
        <LoginForm
            form ={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    </div>
    );

}

export default Login;