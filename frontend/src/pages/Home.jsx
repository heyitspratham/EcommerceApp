import { Mouse } from "lucide-react";
import React, { Fragment, useState, useEffect } from "react";
import Product from "../components/Product";
import Hamburger from "hamburger-react";
import logo from "../assets/logo2.png";
import Menu from "../components/Menu";
import MetaData from "../components/MetaData";
import { getProducts } from "../features/productFeatures/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {products, loading, error, productsCount} = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if(error){
        alert.error(error)

    }
    //  
    dispatch(getProducts());
    // console.log(products);
  }, [dispatch]);

  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Shop On" />
          <div className="md:hidden flex p-2 justify-between items-center">
            <div className="flex items-center text-[#8241F6] font-serif  text-3xl">
              <img className=" w-16" src={logo} alt="" />
              <span>Shop On</span>
            </div>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          <Menu isOpen={isOpen} />
          <div
            id="banner"
            className=" text-white bg-gradient-to-r clipPath from-[#635dc0] gap-5 md:gap-24 overflow-auto to-[#3027ae] ]  h-[100vmin] flex flex-col justify-center items-center  "
          >
            <p className="md:text-4xl text-2xl -translate-y-20 md:-translate-y-40">
              Welcome to Shop On
            </p>
            <h1 className="md:text-6xl text-4xl -translate-y-20 md:-translate-y-40">
              FIND AMAZING PRODUCTS BELOW
            </h1>
            <a href="#container" className="hidden md:block">
              <button className="flex  -translate-y-40 bg-white text-black px-5 py-3 rounded-lg">
                Scroll <Mouse />
              </button>
            </a>
          </div>

          <h2
            id="container"
            className="text-3xl w-[20vmax] text-center mx-auto my-5 border-b-2 text-[2vmax] border-[#15151580]"
          >
            Feature Products
          </h2>

          <div className="flex flex-wrap items-center justify-center w-[80vw] my-[2vmax] mx-auto">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
