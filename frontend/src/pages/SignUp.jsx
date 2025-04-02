import { useState } from "react";
import { handleError, handleSuccess } from '../utils';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function SignUp() {
  const navigate=useNavigate()


    const [signupInfo,setsignupInfo]=useState({
        name:"",
        email:"",
        password:""
    })

    async function handleSignup(e)  {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `https://mern-app-three-lime.vercel.app/auth/signUp`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
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
    console.log(name,value)
    const copySignupInfo = { ...signupInfo };
     copySignupInfo[name] = value;
     console.log(copySignupInfo)
    setsignupInfo(copySignupInfo);

   }


    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label >Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name..."
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                         onChange={handleChange}

                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={signupInfo.email}

                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                      onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={signupInfo.password}

                    />
                </div>
                <button type="submit">Sign Up</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    );
}
