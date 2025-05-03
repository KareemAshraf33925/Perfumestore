"use client"
import"../styles/carosel.css";
import Desktop from "../assets/desktop.png"
import Image from "next/image";
function Carosel() {
  return (
    <div>
      <div className="header-banner bg-amber-50 flex justify-center 
        items-center flex-row
        gap-x-28 flex-wrap
        h-dvh
        mt-10
        sm:flex-col-reverse  sm:mt-32 sm:gap-x-1
        md:flex-row md:gap-x-5 md:mt-20
        lg:flex-row lg:gap-x-28 lg:mt-10">
        <div className="info">
          <h1 className="capitalize text-4xl">New Perfume</h1>
          <h3 className="capitalize text-2xl">Discover new scents<br/> perfect for any occasion!</h3>
          <button className="text-black py-3 px-10 cursor-pointer mt-8 rounded-md text-2xl border-3 border-black outline-none">Shoping Now</button>
        </div>
        <Image src={Desktop} alt="parums" priority className="h-96"/>
      </div>
    </div>
  );
}

export default Carosel;
