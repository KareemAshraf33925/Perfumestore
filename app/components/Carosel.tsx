"use client"
import"../styles/carosel.css";
import Desktop from "../assets/desktop.png"
import Image from "next/image";
function Carosel() {
  return (
    <div className="flex justify-center items-center" style={{backgroundColor:" #fffbeb"}}>
      <div className="header-banner">
        <div className="info">
          <h1 className="capitalize text-4xl">New Perfume</h1>
          <h3 className="capitalize text-2xl">Discover new scents<br/> perfect for any occasion!</h3>
          <button className="text-black py-3 px-10 cursor-pointer mt-8 rounded-md text-2xl border-3 border-black outline-none">Shoping Now</button>
        </div>
        <Image src={Desktop} alt="parums" priority className="h-96" width={320}/>
      </div>
    </div>
  );
}

export default Carosel;
