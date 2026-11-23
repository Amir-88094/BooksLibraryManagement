import React, { useEffect } from 'react'
import { fetchWithAuth } from '../../services/fetchWithAuth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProtectedPage = () => {
    const [response, setResponse] = React.useState<string | null>("Loading...");

    useEffect( () => {
      const fetchProtectedData = async () => {
        try{
          const res = await fetchWithAuth(`${BASE_URL}/api/protected`);
          const data = await res.text();
          setResponse(data);
        }catch(error){
         
          setResponse(`Error fetching protected data: ${error}`);
        }
      }
      fetchProtectedData();
    }, [])

  return (
    <div>
      <h1>Protected Page</h1>
        <p>{response}</p>
    </div>
  )
}
