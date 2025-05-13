"use client"
import"../styles/signup.css"
import { useForm, SubmitHandler } from "react-hook-form";
import {z} from"zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newuser} from "../../firebase/auth";
import EmailIcon from '@mui/icons-material/Email';
import {signIngoogle} from"../../firebase/auth";
import Link from "next/link";
// type of date
type Signupprops={
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    confirmpassword :string;
}
// creat acount
const Signup =() => {
    const onSubmit:SubmitHandler< Signupprops>=async(data)=>{
      try{
        await newuser(data.email, data.password);
     
      }catch(error){
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
     
    }
    // login with gamil
    const loginGoogle= async()=>{
      try{
        await signIngoogle()
      }catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }else{
          console.error("error in message")
        }
      }
    }
    const Loginschema=z.object({
        firstname:z.string().min(4,{message:"The Char More Than 3 characters"}),
        lastname:z.string().min(4,{message:"The Char More Than 3 characters"}),
       email:z.string().min(8,{message:"The Char More Than 7 characters"}).email({message:"The Email In Vaild"}),
       password:z.string().min(8,{message:"The Passward Must Be More Than 7  characters"}),
      confirmpassword:z.string().min(8,{message:"The Passward Must Be More Than 7  characters"}),
    }).refine((confirm)=>confirm.confirmpassword === confirm.password,{
        message:"The password Not Couple",
        path:["confirmpassword"]
    })
    const {register,handleSubmit,formState:{errors}}=useForm< Signupprops>({
        mode:"onBlur",
        resolver:zodResolver(Loginschema)
    })
   
  return (
    <div className=" w-full flex justify-center items-center h-dvh my-20
    sm:my-32
    md:my-28
    lg:my-20
    ">
        
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-start items-start flex-col border-0  bg-amber-50 w-3/4 mt-12  shadow-xl rounded-md p-4" >
      <div className="gmail">
       <button className=" btn-gmail " onClick={loginGoogle} type="button">
       <EmailIcon/>
       <p>Login With Gmail</p>
       </button>
       </div>
      <input type="text" placeholder="FirstName" {...register("firstname")}  className="py-3 w-full my-3 border-0  outline-0 px-2 "
        style={{boxShadow: "inset 20px 20px 10px 20px white"}}/>
        {errors.firstname && (
                    <span className="text-red-500 block ml-2">{errors.firstname.message}</span>
                )}
                 <input type="text" placeholder="LastName" {...register("lastname")}  className="py-3 w-full my-3 border-0  outline-0 px-2 "
                   style={{boxShadow: "inset 20px 20px 10px 20px white"}}/>
        {errors.lastname && (
                    <span className="text-red-500 block ml-2">{errors.lastname.message}</span>
                )}
        <input type="text" placeholder="Email" {...register("email")}  className="py-3 w-full my-3 border-0  outline-0 px-2"
          style={{boxShadow: "inset 20px 20px 10px 20px white"} }/>
        {errors.email && (
                    <span className="text-red-500 block ml-2">{errors.email.message}</span>
                )}
        <input type="password" placeholder="Password" {...register("password")} className="py-3 w-full my-3 border-0  outline-0 px-2 "
        style={{boxShadow:" inset 20px 20px 10px 20px white"}}/>
        {errors.password && (
                    <span className="text-red-500 block ml-2">{errors.password.message}</span>
                )}
                 <input type="password" placeholder="ConfirmPassword" {...register("confirmpassword")} className="py-3 w-full my-3 border-0  outline-0 px-2"
                 style={{boxShadow:" inset 20px 20px 10px 20px white"}}/>
        {errors.confirmpassword && (
                    <span className="text-red-500 block ml-2 ">{errors.confirmpassword.message}</span>
                )}
        <Link href={"/login"}className="my-3 w-full  " style={{textDecoration:"underline"}}>Sign In</Link>
        <button type="submit" className="py-2 w-1/3 bg-black text-white my-3  cursor-pointer text-xl rounded-md ">submit</button>
      </form>
    </div>
  )
}

export default Signup
