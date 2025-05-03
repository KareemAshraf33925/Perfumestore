"use client";
import"../styles/products.css";
import axios from "axios";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// hover details 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {useDispatch} from "react-redux"
import { addProduct } from "../../store/BasketSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
interface Product{
    id:string;
    name:string;
    description:string;
    salary?:string;
    image?:string;
    count?:number;
}
const Products = () => {
    const [products,setproducts] =useState<Product[] >( [] );
    const [loading,setloading]=useState<boolean>(false)
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                    const response =await axios.get<{[key:string]:Omit<Product,"id">}>("https://authproject-d4e28-default-rtdb.firebaseio.com/users.json");
                   const allProducts:Product[]=response.data
                   ?Object.entries(response.data).map(([id,product])=>({id,...product})) : [];
                   setloading(true)
                   setproducts(allProducts);
            }catch(error){
                console.error(error)
            }
        }
        fetchProduct()
    },[])
  return (
    <div className="my-20 flex justify-start items-start flex-col gap-7">
    <h2 className="capitalize text-2xl ml-10">shoping< ShoppingCartIcon/></h2>
   
    <div className=" flex justify-center items-center flex-row flex-wrap gap-14 ml-14  ">
      
      {loading ?(products.map((product:Product)=>(
             
             <Card sx={{ maxWidth: 345  }} key={product.id}>
      <CardMedia/>
      {/* --- */}
      <HoverCard>
      <HoverCardTrigger asChild>
        
        <img src={product.image} alt={product.name}  className="h-80 cursor-pointer w-full object-cover"/>
      
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-amber-50 cursor-pointer">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={product.image} />
            <AvatarFallback>{product.name}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{product.name}</h4>
            <p className="text-sm">
            {product.description}
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                جنيه {product.salary}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
      {/* --- */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <span className="text-xl font-bold text-gray-900 ">جنيه{product.salary}</span>
        <span className="stars flex gap-x-1">
                   <StarIcon className="text-yellow-300"/>
                   <StarIcon className="text-yellow-300"/>
                   <StarIcon className="text-yellow-300"/>
                   <StarIcon className="text-yellow-300"/>
                   <StarIcon className="text-yellow-300"/>
        </span>
        </Typography>
      </CardContent>
      <CardActions>
     <button className="rounded-lg px-5 py-2.5 text-center text-lg font-medium text-black border-2 border-black cursor-pointer outlinenone" 
     onClick={()=>dispatch(addProduct({...product, salary: Number(product.salary) || 0, image: product.image || ''}))}> 
       Add to cart
      </button>
      </CardActions>
    </Card>
                 
        ))):(<span className="loader"></span>) }
       
       
    
    </div>
    </div>
  )
}

export default Products
