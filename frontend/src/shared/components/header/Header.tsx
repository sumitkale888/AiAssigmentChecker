import MenuImg from '../../../assets/menu-icon.svg'
import UserImg from '../../../assets/user-svgrepo-com.svg'
import LogoImg from '../../../assets/CloneFlow.svg'

import { useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom';

interface AuthStatus {
    authenticated: boolean;
    user:String
    // add other properties if needed
}
interface RootState {
    auth: { authStatus: AuthStatus };
}

const Header = ()=>{
    const navigate = useNavigate();
    const handleLogoClick=()=>{
        console.log("to home")
        navigate("/")
    }
    const authStatus = useSelector((state: RootState) => state.auth.authStatus);

    return(
        <div  className='flex relative shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)]'>
            <div onClick={handleLogoClick} className='cursor-pointer '>
            <img src={MenuImg} className='w-[20px] m-4 cursor-pointer' alt="" onClick={handleLogoClick} />
            </div>
            <img src={LogoImg} alt="" />
            <div className='absolute  right-10 m-2.5'>  {authStatus.user}</div>
            <img src={UserImg} className='w-[30px] ml-[100px] absolute  right-0 m-2.5' alt="" />
        </div>
    )

}

export default Header