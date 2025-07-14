import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const useProtectedPage=()=>{
    const navigate = useNavigate();
    useEffect(()=>{
console.log(navigate)
    },[])   
 

    return(
        <div></div>
    )
}

export default useProtectedPage