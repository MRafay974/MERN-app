import { useState } from "react";
import { handleError, handleSuccess } from '../utils';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function Login() {
  const navigate=useNavigate()


    const [loginupInfo,setloginInfo]=useState({
        email:"",
        password:""
    })

    async function handleLogin(e)  {
        e.preventDefault();
        const {  email, password } = loginupInfo;
        if ( !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginupInfo)
            });
            const result = await response.json();
            const { success, message, jwtTokenn,name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem("Token",jwtTokenn)
                localStorage.setItem("UserLoggedIn",name)
                setTimeout(() => {
                    navigate('/home')
                }, 3000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

   function handleChange(e){

    const {name,value}=e.target
    const copyloginInfo = { ...loginupInfo };
    copyloginInfo[name] = value;
    console.log(copyloginInfo)
    setloginInfo(copyloginInfo);

   }


    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                         onChange={handleChange}

                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={loginupInfo.email}

                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                      onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={loginupInfo.password}

                    />
                </div>
                <button type="submit">Log In</button>
                <span>Don't have an account ?
                    <Link to="/signup">Sign Up</Link>
                </span>
            </form>
              <ToastContainer/>
        </div>
    );
}