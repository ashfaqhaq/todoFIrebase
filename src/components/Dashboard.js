/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useRef} from 'react'
import {db} from "../firebase/firebase"
import { useAuth } from "../context/AuthContext"
function Dashboard() {

  const inputRef = useRef(null);
   
    const { currentUser,logout } = useAuth()
   
   

    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState("")
    
    useEffect(() => {
      getTodos();
     
    }, [])
  
    async function getTodos() {
        const notesRef =db.collection("users").doc(currentUser.uid);
        // console.log(await notesRef.get())
        notesRef.collection("todos").onSnapshot(function (querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          todo: doc.data().todo,
          inProgress: doc.data().inProgress
        }))
        )
      })
      
    }
  function handleChange(e){
    setTodoInput(e.target.value)
  }


  function deleteTodo(id){
    const notesRef =db.collection("users").doc(currentUser.uid);
    // console.log(await notesRef.get())
    notesRef.collection("todos").doc(id).delete();
}
   async function handleSubmit(e) {
      e.preventDefault();
 
      const notesRef= db.collection("users").doc(currentUser.uid);
    await  notesRef.collection("todos").add({
        inProgress: true,
        todo: todoInput,
      });
      setTodoInput('');
      // inputRef.current ='';
    }
    
        return (
        <>
        
        <div className="my-10 mx-10" >
         <h1 className="font-bold"> Add a note</h1>  
         <form onSubmit ={handleSubmit} >
         <input className="shadow appearance-none border rounded w-6/12 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
         ref={inputRef}
         value={todoInput}
         onChange={handleChange}
          />

         
           <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto my-20 py-2 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                           Save
      </button>
      </form>
     {todoInput?todoInput:null}

        </div>
        <div className="flex flex-wrap">
         
        {todos?.map((item)=>(<div className="w-4/12">
           
           <div className="mx-2">
       <div  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                   <div className="mb-4">
                       <p className="block text-gray-700 text-sm font-bold mb-2">
                       {item.todo}
     </p>
                   </div>
                   <div className="mb-6">
                       <p className="block text-gray-700 text-sm font-bold mb-2" for="password">
                           Edit
     </p>
                       {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                   </div>
                   <div className="flex items-center justify-between">
                       <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>{deleteTodo(item.id)}}>
                          Delete
     </button>
                     
    
                   </div>
               </div>

               </div></div>
      
      
       ))}
        </div>
       
        
        </>

    )
}

export default Dashboard
