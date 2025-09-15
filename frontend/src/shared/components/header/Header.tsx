// import MenuImg from '../../../assets/menu-icon.svg'
import UserImg from '../../../assets/userlogo.svg'
import LogoImg from '../../../assets/logo.svg'
import HamburgerIcon from './HamburgerIcon';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

interface AuthStatus {
    authenticated: boolean;
    user:string
    userData?: {
        picture?: string; // Google profile image URL
        name?: string;
    };
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
    const location = useLocation();
    const isTeacherRoute = location.pathname.includes('/teacher');
    const authStatus = useSelector((state: RootState) => state.auth.authStatus);

    return(
         <div className='flex relative border-gray-500 items-center py-6'>
            {/* Hamburger Icon */}
            <HamburgerIcon />

            {/* Spacer between hamburger and logo */}
            <div className="ml-4 flex items-center"> 
                <img src={LogoImg} className="w-8 h-8" alt="Logo" />
                <h1 className="text-2xl ml-2">Classroom</h1> 
            </div>

            {/* Username greeting on right */}
            <div className='absolute right-15 m-2.5 text-gray-500 font-semibold pt-0 '>
                Hi! {authStatus.userData?.name || authStatus.user}
                {/* {localStorage} */}
            </div>

            {/* User profile image on far right */}
            <div className="absolute right-4 m-2.5">
            <Link to={isTeacherRoute ? "/teacherprofile" : "/studentprofile"}>

                {authStatus.userData?.picture ? (
                    <img 
                        src={authStatus.userData.picture} 
                        className="w-[30px] h-[30px] rounded-full object-cover"
                        alt="User profile"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <img 
                        src={UserImg} 
                        className="w-[40px] h-[40px] rounded-full"
                        alt="Default user" 
                    />
                )}
               
            </Link>
            </div>
        </div>
    )

}

export default Header