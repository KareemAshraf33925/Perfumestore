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
  const basket =useSelector((state:any)=>state.basket.basket);//get product
  const dispatch=useDispatch();//actions
  const router=useRouter()//next-rowter
  const totalPrice=basket.reduce((total:number,product:any)=>total+(product.salary*product.count),0)
  const[loading,setloading]=useState<boolean>(false);//loading state
  //to know the number of ptoducts in basket
  useEffect(()=>{
  if(basket.length >0){
  setloading(true)
  }
 },[] )
  return (
    //start-cart
    <div className="cart  ">
      <div className="container-fluid ">

        {loading ?(
           <div className="row ">
           <span className=' shop-cart'><ShoppingCartIcon/></span>
             <div className="products  ">
             {basket.map((product:any)=>(
                 <div className="product  "key={product.id}>
                 <img src={product.image} alt={product.name}  className='img'/>
                 <div className="name-salary-count ">
                     <p className="name text-xl">{product.name}</p>
                     <p className="slary text-lg">جنيه{product.salary * product.count}</p>
                     <div className="increase-decrease-amount ">
                         <button className="bg-black text-amber-50 py-1 px-7 rounded-md
                         border-none outline-none text-xl cursor-pointer" onClick={()=>dispatch(decrease(product.id))}>-</button>
                         <span className='text-2xl'>{product.count}</span>
                         <button className="bg-black text-amber-50 py-1 px-7 rounded-md
                         border-none outline-none text-xl cursor-pointer" onClick={()=>dispatch(increase(product.id))}>+</button>
                     </div>
                 </div>
                 <span className='text-2xl cursor-pointer clearProduct' onClick={()=>dispatch(removeProduct(product.id))}><ClearIcon/></span>
             </div>
             ))}
                 
                
             </div>
             <div className="order-product">
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
  //end-cart
}

export default CartShop
