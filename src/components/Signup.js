import React,{useState} from 'react'
import { useHistory } from 'react-router'
import { useAuth } from "../context/AuthContext"
import {Link} from'react-router-dom'
import {db} from "../firebase/firebase"
function Signup() {

     const [isLoading, setIsLoading] = useState(false)
     const [email, setEmail] = useState()
     const [password, setPassword] = useState()
     const {signup,currentUser} = useAuth()
     const history  = useHistory()

   async function handleSubmit(e){
       
        e.preventDefault();
        try{
           setIsLoading(true)
           await signup(email,password)
       const userRef =  await db.collection('users').doc(currentUser.uid);


        await userRef.set({
        userID: currentUser.uid
      }, { merge: true });
      
           alert("signup successfull")
           history.push("/")
        }
    catch(err){
        console.log(err);
        alert("Error occured")
        setIsLoading(false)
    }

      

     }
    return (
        <div className="flex justify-center mx-auto mt-40 mb-8 w-7/12">
           
            <div className="w-full max-w-xs">
            Signup h
                <form  onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
      </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
      </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"  onChange={(e)=>{setPassword(e.target.value)}}/>
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button disabled={isLoading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                           Sign up
      </button>
                        <Link to="/login"> <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                           Have an account? 
      </p> </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup
