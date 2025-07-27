// import MenuImg from '../../../assets/menu-icon.svg'
import UserImg from '../../../assets/userlogo.svg'
import LogoImg from '../../../assets/logo.svg'

import { useSelector } from "react-redux";

// import { useNavigate } from 'react-router-dom';

interface AuthStatus {
    authenticated: boolean;
    user:string
    userData?: {
        picture?: string; // Google profile image URL
        name?: string;
    };
    // add other properties if needed
}
interface RootState {
    auth: { authStatus: AuthStatus };
}

const Header = ()=>{
    // const navigate = useNavigate();
    // const handleLogoClick=()=>{
    //     console.log("to home")
    //     navigate("/")
    // }
    const authStatus = useSelector((state: RootState) => state.auth.authStatus);

    return(
        <div  className='flex relative border-gray-500'>
            {/* <div onClick={handleLogoClick} className='cursor-pointer '>
            <img src={MenuImg} className='w-[20px] m-4 cursor-pointer' alt="" onClick={handleLogoClick} />
            </div> */}

            {/* <img src={LogoImg} className="w-50"alt="" /> */}
            <div className="flex items-center p-4 ml-3"> 
            <img src={LogoImg} className="w-8 h-8 " alt="Logo" />
                <h1 className="text-2xl  ml-2">Classroom</h1> 
            </div>

            <div className='absolute right-10 m-2.5'>
                {authStatus.userData?.name || authStatus.user}
            </div>

            <div className="absolute right-0 m-2.5">
                {authStatus.userData?.picture ? (
                    <img 
                        src={authStatus.userData.picture} 
                        className="w-[30px] h-[30px] rounded-full object-cover"
                        alt="User profile"
                        referrerPolicy="no-referrer" // Needed to prevent 403 errors with Google images
                    />
                ) : (
                    <img 
                        src={UserImg} 
                        className="w-[40px] h-[40px] rounded-full"
                        alt="Default user" 
                    />
                )}
            </div>
        </div>
    )

}

export default Header