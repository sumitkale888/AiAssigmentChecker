import MenuImg from '../../../assets/menu-icon.svg'
import UserImg from '../../../assets/user-svgrepo-com.svg'
import LogoImg from '../../../assets/CloneFlow.svg'

const Header = ()=>{

    return(
        <div className='flex relative shadow-[0_4px_2px_-2px_rgba(0,0,0,0.3)]'>
            <img src={MenuImg} className='w-[20px] m-4 ' alt="" />
            <img src={LogoImg} alt="" />
            <img src={UserImg} className='w-[30px] ml-[100px] absolute  right-0 m-2.5' alt="" />
        </div>
    )

}

export default Header