import React, { useEffect, useState } from 'react'

const Home = () => {

    const [todos,setTodos] = useState([]);
    const [error, setError] = useState(null);

    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        const fetchtodos = async() =>{
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:4001/todo/fetch",{
                    withCredentials:true
                })
                setTodos(response.data);
                setError(null);
            } catch (error) {
                setError("Failed to fetch todo");
            } finally{
                setLoading(false); 
            }
        }
    })

  return (
    <div>
      Home
    </div>
  )
}

export default Home
