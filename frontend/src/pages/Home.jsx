import { useEffect ,useState} from "react"
import { ToastContainer } from "react-toastify"
import {useNavigate} from "react-router-dom"
import { handleError, handleSuccess } from "../utils"



export default function Home(){
    const navigator=useNavigate()

    const [loggedIn,setloggedIn]=useState('')
    const [products,setProducts]=useState()

    useEffect(()=>{
        setloggedIn( localStorage.getItem("UserLoggedIn")) 
    },[])

    function handleLogout(){
     localStorage.removeItem("Token")
     localStorage.removeItem("UserLoggedIn")
     handleSuccess("Successfully Logged out")
     setTimeout(() => {
        navigator("/login")
     }, 2000);
       
    }


     async function fetchProducts(){
        try{

            const url="http://localhost:8080/products"
            const header={
                headers:{
                    'authorization':localStorage.getItem('Token')
                }
            }
            const response=await fetch(url,header)
            const data= await response.json()
            console.log(data)
            setProducts(data)
        }catch(error){
              handleError(error)
        }
     }

     useEffect(()=>{
        fetchProducts()
     },[])



    return (
             <div>
                  <h1>{loggedIn} </h1>
                  <button onClick={handleLogout}>Logged Out</button>
                <div>
                    {
                        products && products.map((item,index)=>(
                            <ul key={index}>
                            <span>{item.name} : {item.price}</span>

                            </ul>
                        ))
                    }

                </div>
                   


                  <ToastContainer/>
             </div>
    )
    
  


}



