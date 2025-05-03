import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from"../assets/logo.png";
import Image from 'next/image';
const Footer = () => {
  return (
      <footer className=" bg-amber-50">
        <div className="container-fluid">
            <div className="row flex justify-start items-start w-full h-full shadow-2xl p-7 gap-x-40 flex-wrap
            sm:gap-x-16
            md:gap-x-20
            lg:gap-x-40">
           <div className='flex justify-center items-center gap-x-2'>
           <Image src={Logo} alt="logo" className='w-12 h-12'/>
            <h3 className="text-2xl capitalize">perfumestore</h3>
           </div>
           <div className="items flex justify-center items-start gap-32 flex-wrap
           sm:gap-10
           md:gap-20
           lg:gap-32
           ">
            <ul className="items flex justify-start items-start flex-col gap-4">
                <li  className=" flex gap-2"><SettingsIcon/>Account Setting</li>
                <li  className=" flex gap-2">< ListIcon />My Orders</li>
            </ul>
            <ul className="items flex justify-start items-start flex-col gap-4">
            <li  className=" flex gap-2">< EmailIcon/>Message </li>
            <li  className=" flex gap-2">< ShoppingCartIcon />Cart</li>
            </ul>
          <ul  className="items flex justify-start items-start flex-col gap-4">
            <li  className=" flex gap-2"><PersonIcon />Sign In</li>
            <li  className=" flex gap-2"><PersonAddIcon  />Sign Up</li>
            </ul>
            <ul className="items flex justify-start items-start flex-col gap-4 ">
            <li  className=" flex gap-2">< LogoutIcon />Log out</li>
            <li className=" flex gap-2 cursor-pointer"><FacebookIcon/>
            <TwitterIcon/>
            <InstagramIcon />
            </li>
            </ul>
            </div>
            </div>
        </div>
      </footer>
  )
}

export default Footer
