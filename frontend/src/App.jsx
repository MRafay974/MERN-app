import { Route, Routes,Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import "./index.css"
import { useEffect ,useState} from "react"
import RefrshHandler from "./refreshHandler"



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function PrivateRoute({element}){
    return isAuthenticated ? element : <Navigate to="/login" />

  }

  return (
      <div>

     <RefrshHandler  setIsAuthenticated={setIsAuthenticated}/>

   <Routes>
    <Route path="/" element={ <Login/> } ></Route>
    <Route path="/login" element={<Login/>}  ></Route>
    <Route path="/signup" element={<SignUp/>} ></Route>
    <Route path="/home" element={<PrivateRoute element={<Home/>}/>} ></Route>
   </Routes>
   </div>
  )
}

export default App
