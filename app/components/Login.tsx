 "use client"
import"../styles/login.css"
 import { useForm, SubmitHandler } from "react-hook-form";
import {z} from"zod";//zod validation 
import { zodResolver } from "@hookform/resolvers/zod";
import {login} from"../../firebase/auth";
import {signIngoogle} from"../../firebase/auth";
import EmailIcon from '@mui/icons-material/Email';
import { useRouter } from "next/navigation"; 
import Link from "next/link";
type Loginprops={
    email:string;
    password:string;
}
const Login = () => {
  const router=useRouter();
    const onSubmit:SubmitHandler<Loginprops>=async(data)=>{
      try{
        await login(data.email,data.password)//sing email
        router.push("/")//move to home
    
    }catch(error){
      if(error instanceof Error){
        console.error(error.message)
      }else{
        console.error("error in message")
      }
    }
  } 
// //////
  const loginGoogle= async()=>{
    try{
      await signIngoogle(); //sign with google
      router.push("/")//move to home
    }catch(error){
      if(error instanceof Error){
          console.log(error.message) 
      }else{
        console.error("error in message")
      }
    }
  }
 
 
    const Loginschema=z.object({
       email:z.string().min(8,{message:"The Char More Than 7 characters"}).email({message:"The Email In Vaild"}),
       password:z.string().min(8,{message:"The Passward Must Be More Than 7  characters"}),
    })//login schema
    const {register,handleSubmit,formState:{errors}}=useForm<Loginprops>({
        mode:"onBlur",
        resolver:zodResolver(Loginschema)
    })//form hook
   
  return (
    // start header
    <div className=" w-full flex justify-center items-center h-dvh">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-start items-start flex-col  bg-amber-50 w-3/4 mt-12 
      shadow-xl rounded-md p-4" >
       <div className="gamil">
       <button className="btn-gamil" onClick={loginGoogle} type="button">
       <EmailIcon />
       <p>
       Login With Gmail
       </p>
       </button>
       
       </div>
        <input type="text" placeholder="Email" {...register("email")}  className="py-3 w-full my-3 px-2  outline-0  border-0
        "  style={{boxShadow: "inset 20px 20px 10px 20px white"}}/>
        {errors.email && (
                    <span className="text-red-500 block ml-2">{errors.email.message}</span>
                )}
        <input type="password" placeholder="Password" {...register("password")} className="py-3 w-full my-3  outline-0  border-0"
          style={{boxShadow: "inset 20px 20px 10px 20px white"}}/>
        {errors.password && (
                    <span className="text-red-500 block ml-2">{errors.password.message}</span>
                )}
                {/* move to register page */}
                <Link href={"/signup"} className="my-3 w-full" style={{textDecoration:"underline"}}>Sign Up</Link>
                {/*submit data to login */}
        <button type="submit" className="py-2 w-1/3 bg-black text-white my-3 ml-1 cursor-pointer text-xl rounded-md ">submit</button>
      </form>
    </div>
    // end-header
  )
}

export default Login
