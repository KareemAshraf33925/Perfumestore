import { createUserWithEmailAndPassword,signInWithEmailAndPassword 
  ,signOut ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {auth} from"../firebase/firebase.config"
// creat account

export const newuser =async(email:string,password:string):Promise<any>=>{
  try{
      const newUser=await createUserWithEmailAndPassword(auth,email,password);
      return newUser.user;
  }catch(error){
    throw error;
  }
}
// login in app
export const login=async(email:string,password:string)=>{
  try{
  const loginUser= await signInWithEmailAndPassword(auth,email,password);
  return loginUser.user
  }catch(error){
    throw error;
  }
}
// login-with google
export const signIngoogle= async()=>{
  const provider= new GoogleAuthProvider();
  try{
    
    const signIn=await signInWithPopup(auth,provider);
    return signIn.user;
  }catch(error){
    throw error
  }
}
// log out
export const Signout=async()=>{
  try{
     await signOut(auth);
  }catch(error){
    throw error
  }
}
