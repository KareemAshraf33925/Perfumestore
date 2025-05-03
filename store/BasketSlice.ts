
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type propsIntialstate={
    basket:propsProduct[]
}
type propsProduct={
description:string;
id:string;
image:string;
name:string;
salary:number;
count?:number;
}
const initialState:propsIntialstate={
    basket: []
   
}
const Basketslice=createSlice({
  name:"addbasket",
  initialState,
  reducers:{
    addProduct:(state,action:PayloadAction<propsProduct>)=>{
      const Product=action.payload;
      const findProduct=state.basket.find((product:propsProduct)=>product.id ===Product.id)
      if(findProduct){
        findProduct.count=findProduct.count?findProduct.count+1:1;
      }else{
        state.basket.push({...Product,count:1});
      }
    
      
    },
    increase:(state,action:PayloadAction<string>)=>{
      const findProduct=state.basket.find((product:propsProduct)=>product.id === action.payload)
      if(findProduct){
        findProduct.count=findProduct.count?findProduct.count+1:1;
      }
      
    },
    decrease:(state,action:PayloadAction<string>)=>{
      const findProduct=state.basket.find((product:propsProduct)=>product.id === action.payload)
      if(findProduct){
         findProduct.count=findProduct.count?findProduct.count -1 :0;
      }
      
    },
    removeProduct:(state,action:PayloadAction<string>)=>{
      const findProduct=state.basket.find((product:propsProduct)=>product.id ===action.payload );
      if(findProduct){
        const stateFilter=state.basket.filter((product:propsProduct)=>product.id !==action.payload);
        state.basket=stateFilter;
      }
     
    },
    clearAll:(state)=>{
      state.basket=[];
      
    }
  },
})

export const { addProduct, increase, decrease, removeProduct,clearAll } = Basketslice.actions;
export default Basketslice.reducer;
