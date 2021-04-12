/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import {db} from "../firebase/firebase"
import { useAuth } from "../context/AuthContext"
function Dashboard() {


    const { currentUser } = useAuth()
   
    function toggleInProgress(item) {
      notesRef.collection("todos").doc(item.id).update({
          inProgress: !item.inProgress
      })
  }


    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState("")
    const notesRef= db.collection("users").doc(currentUser.uid);
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
    notesRef.collection("todos").doc(id).delete();
}
   async function handleSubmit(e) {
      e.preventDefault();
 
     
    await  notesRef.collection("todos").add({
        inProgress: true,
        todo: todoInput,
      });
      setTodoInput('');
    
    }
    
        return (
        <>
        
        <div className="my-10 mx-10" >
         <h1 className="font-bold"> Add a todo</h1>  
         <form onSubmit ={handleSubmit} >
         <input className="shadow appearance-none border rounded w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
       
         value={todoInput}
         onChange={handleChange}
          />

         
           <button  className="bg-green-500 hover:bg-green-700 text-white font-bold mx-4 my-20 py-2 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                           Add
      </button>
      </form>
    

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
                  
                   <div className="flex items-center justify-between">
                      
     <p className="block text-blue-400 text-sm  mb-2">
                          {item.inProgress?"In Progress":"Completed"}
     </p>
     <div>
     <button  className="mx-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>{toggleInProgress(item)}}>

     {item.inProgress?<i class="fas fa-check-circle"></i>:"Mark Undone?"}    
</button>
     <button  className="mx-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>{deleteTodo(item.id)}}>
                        <i className="fas fa-trash" />
     </button>
     
                   </div>
                   </div>
               </div>

               </div></div>
      
      
       ))}
        </div>
       
        
        </>

    )
}

export default Dashboard
