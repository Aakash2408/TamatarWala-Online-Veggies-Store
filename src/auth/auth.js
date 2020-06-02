const axios=require('axios');
const SERVER = process.env.REACT_APP_SERVER;

export const authLogin=async(data)=>{
    if (data) {
       
    const user= await    axios.post(`${SERVER}/api/user/login`,
            JSON.stringify(data)
            
        ,{
            headers:{
                "Content-type":"application/json",
            }
        })
    
        return user;
    }
}
export const authSignup =async data => {
    console.log("signup ",data);
    
    
    
    
        if (data) {
       
    const user= await    axios.post(`${SERVER}/api/user/register`,
            JSON.stringify(data)
            
        ,{
            headers:{
                "Content-type":"application/json",
            }
        })
    
        return user;
    }
    
    
};
export const updateProfile = async (data) => {
  console.log("signup ", data);

  if (data) {
    const user = await axios.post(
      `${SERVER}/api/user/update`,
      JSON.stringify(data),

      {
        headers: {
          "Content-type": "application/json",
          "token":localStorage.getItem("jwt")
        },
      }
    );

    return user;
  }
};
export const isAuthenticated=()=>{

    if (
      localStorage.getItem("jwt") &&
      localStorage.getItem("logged") === "true" &&
      window !== undefined
    ) {
      return true;
    } else {
      return false;
    }
}
