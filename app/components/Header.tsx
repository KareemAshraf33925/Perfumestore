"use client"
import Link from "next/link";
import { onAuthStateChanged,User } from "firebase/auth";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { Button } from "@/components/ui/button";
  import PersonIcon from '@mui/icons-material/Person';
  import SettingsIcon from '@mui/icons-material/Settings';
  import ListIcon from '@mui/icons-material/List';
  import EmailIcon from '@mui/icons-material/Email';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import LogoutIcon from '@mui/icons-material/Logout';
  import { Signout } from "../../firebase/auth";
import { useEffect, useState } from "react";
import Logo from"../assets/logo.png";
import Image from 'next/image';
import { useSelector } from "react-redux";
import {auth} from"../../firebase/firebase.config";
const Header = () => {
   const [user,setuser]= useState<boolean>(false);
   const [currentUser,setCurrentUser]= useState<User |null>();
   const basket=useSelector((state:any)=>state.basket.basket);
   
  //  get information user
   useEffect(()=>{
   
    const unSubscrib=onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user);
        setuser(false)
        
    })
    return ()=> unSubscrib();
   },[])
  //  log out from website
    const logOut=async()=>{
      try{  
      await Signout();
      setuser(true);
    
      }catch(error){
        if(error instanceof Error){
          console.error(error.message)
        }else{
          console.error("error im message");
        }
      }
    }
   

  return (
    <header className="flex justify-between items-center flex-wrap w-full shadow-2xl p-7 bg-amber-50
    fixed top-0 right-0 left-0 z-50 flex-row sm:flex-col sm:justify-center
    md:flex-row md:justify-between
    lg:flex-row lg:justify-between ">
       <div className='flex justify-center items-center gap-x-2'>
           <Image src={Logo} alt="logo" className='w-12 h-12'/>
            <h3 className="text-2xl capitalize text-black">perfumeStore</h3>
           </div>
        
        <ul className="items flex justify-center items-center gap-6">
            <li><Link href={"/"} className="capitalize text-xl text-black">Home</Link></li>
            <li>{!user ? ( <HoverCard >
                <HoverCardTrigger className="capitalize text-xl cursor-pointer text-black ">
               <PersonIcon className="text-black"/>  Account</HoverCardTrigger>
                <HoverCardContent className="flex flex-col justify-start items-start w-full bg-amber-50">
                Hellow {currentUser?.displayName}
                <hr/>
                <Link href={"/"}className="my-3 flex gap-2 text-black"><SettingsIcon className="text-black"/>Account Setting</Link>
                <Link href={"/order"}className="my-3 flex gap-2 text-black">< ListIcon className="text-black" />My Orders</Link>
                <hr />
                <Link href={"/"}className="my-3 flex gap-2 text-black">< EmailIcon className="text-black"/>Message</Link>
                <Link href={"/cartshop"}className="my-3 flex gap-2 text-black">< ShoppingCartIcon className="text-black"/>Cart</Link>
                <hr/>
                 <Link href={"/login"}className="my-3 flex gap-2 text-black"onClick={()=>logOut()} >< LogoutIcon className="text-black"/>Log out</Link>
                </HoverCardContent>
                </HoverCard>):(  <HoverCard>
                <HoverCardTrigger className="capitalize text-xl cursor-pointer text-black">
                <PersonIcon className="text-black"/>  Account
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col justify-start items-start w-full bg-amber-50 text-black">
                Welcome To ParfStore
                 <Link href={"/login"}className="my-3 w-full"><Button className="bg-amber-100 py-3  w-full cursor-pointer">Sign In</Button></Link>
                <hr/>
                <Link href={"/signup"}className="my-3 w-full"><Button className="bg-amber-100 py-3  w-full cursor-pointer">Sign Up</Button></Link>
                </HoverCardContent>
                </HoverCard>)}
            </li>
            <li className="relative"><Link href={"/cartshop"}className="my-3 flex gap-2">< ShoppingCartIcon className="text-black" />Cart</Link>
                  <span className="w-6 h-6 rounded-full bg-black absolute text-white text-center text-lg
                  -top-1 right-6 ">{basket.length}</span>
            </li>
        
        
        </ul>
        
               
    </header>
  )
}

export default Header
