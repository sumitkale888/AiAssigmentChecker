import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


interface AuthStatus {
    authenticated: boolean;
    // add other properties if needed
}

interface RootState {
    auth: { authStatus: AuthStatus };
}

const UseProtectedPage = () => {
    const authInfo = useSelector((state: RootState) => state.auth.authStatus);
    // const navigate = useNavigate();

    // const navigate = useNavigate();
    useEffect(()=>{
console.log('authInfo',authInfo)
if(authInfo.authenticated ==false){
//  navigate("/auth/signin")
console.log('you are directed to /auth/signin')
}
    },[])   
 

    return(
        <div>
        </div>
    )
}

export default UseProtectedPage