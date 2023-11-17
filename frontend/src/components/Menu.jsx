import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";

// import {AiOutlineMail ,AiOutlineInstagram} from "react-icons/ai"

const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`md:hidden z-100 sticky top-10 gap-9 flex flex-col justify-center w-screen transition ease transform items-center h-screen bg-white ${
        !isOpen && "hidden "
      }`}
    >
        <div
          id="searchBox"
          className="relative flex items-center text-gray-400 focus-within:text-gray-600 "
        >
          <input
            className="bg-[#F5F7F9] px-4 py-1.5  rounded-xl outline-none border border-gray-600 placeholder:text-gray-400 focus-within:placeholder:text-gray-600"
            type="text"
            name="search"
            id=""
            placeholder="Search Product"
          />
          <Search className="absolute h-7 w-7 right-2  cursor-pointer" />
        </div>
      <div className="flex flex-col gap-10 ">
        <Link to={"/"} className="">
          Home
        </Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="flex gap-12">
        <div id="Account" className="flex items-center">
          <User className="h-7 w-7" />
          <span>Account</span>
        </div>
        <div id="Cart" className="flex items-center">
          <ShoppingCart className="h-7 w-7" />
          <span>Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
