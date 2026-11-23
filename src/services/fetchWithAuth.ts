function isTokenExpired(token:string): boolean {
    try{
        const payload = JSON.parse(atob(token.split('.')[1]));

        if(!payload.exp){
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime + 10 > payload.exp;
    }catch(error){
        console.error("Error decoding token:", error);
        return true;
    }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response>   {
   const token = localStorage.getItem("token");

   if(!token){
    localStorage.removeItem("token");
    window.location.href = "/";
    throw new Error("No authentication token found")
   }

   if(isTokenExpired(token)){
    localStorage.removeItem("token");
    window.location.href = "/";
    throw new Error("Authentication token has expired")
   }


const header = {
    ...options.headers,
    "Authorization": `Bearer ${token}`,
}

const response = await fetch(url, {
    ...options,
    headers: header
})

if(response.status === 401){
    localStorage.removeItem("token");
    window.location.href = "/";
    throw new Error("Unauthorized access - invalid token")
}
return response;
}