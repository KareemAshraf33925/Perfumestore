"use client"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import"../styles/cartshop.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increase,decrease,removeProduct } from '@/store/BasketSlice';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const CartShop = () => {
  const basket =useSelector((state:any)=>state.basket.basket);
  const dispatch=useDispatch();
  const router=useRouter()
  const totalPrice=basket.reduce((total:number,product:any)=>total+(product.salary*product.count),0)
  const[loading,setloading]=useState<boolean>(false);
  useEffect(()=>{
  if(basket.length >0){
  setloading(true)
  }
 },[] )
  return (
    <div className="cart  pt-28 pb-28   h-dvh">
      <div className="container-fluid w-full flex justify-center items-center h-full">
        {loading ?(
           <div className="row bg-amber-50 w-3/4 rounded-md h-full flex justify-start items-start flex-col shadow-2xl p-2">
           <span className='block m-5 shop-cart'><ShoppingCartIcon/></span>
             <div className="products p-8 overflow-auto h-2/3 w-full bg-white">
             {basket.map((product:any)=>(
                 <div className="product flex justify-between items-center my-5 "key={product.id}>
                 <img src={product.image} alt={product.name} style={{width:"200px",height:"150px"}}/>
                 <div className="name-salary-count flex justify-start items-start flex-col gap-2.5">
                     <p className="name text-xl">{product.name}</p>
                     <p className="slary text-lg">جنيه{product.salary * product.count}</p>
                     <div className="increase-decrease-amount flex justify-center items-center gap-5">
                         <button className="bg-black text-amber-50 py-1 px-7 rounded-md
                         border-none outline-none text-xl cursor-pointer" onClick={()=>dispatch(decrease(product.id))}>-</button>
                         <span className='text-2xl'>{product.count}</span>
                         <button className="bg-black text-amber-50 py-1 px-7 rounded-md
                         border-none outline-none text-xl cursor-pointer" onClick={()=>dispatch(increase(product.id))}>+</button>
                     </div>
                 </div>
                 <span className='text-2xl cursor-pointer' onClick={()=>dispatch(removeProduct(product.id))}><ClearIcon/></span>
             </div>
             ))}
                 
                
             </div>
             <div className="order-product flex justify-between  items-center  w-full px-8 mt-5">
                 <button className="bg-black text-amber-50 cursor-pointer capitalize py-2 px-12 rounded-md border-none outline-none"
                 onClick={()=>router.push("/order")}
                 >order</button>
                 <div className="totalSalary text-xl">
                     <p>ToTaL_SaLary:جنيه{totalPrice}</p>
                 </div>
             </div>
         </div>
        ):(<span className="loader"></span>)}
       
        
      </div>
     
    </div>
  )
}

export default CartShop
