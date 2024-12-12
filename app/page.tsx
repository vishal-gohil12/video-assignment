"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Link from "next/link";
import ReactPlayer from "react-player";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState<Product | null>(null);
  const dispatch = useDispatch();

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleProgress = (state: any) => {
    const currentTime = state.playedSeconds;
    const productOffer = products.find(
      (product) => Math.abs(product.id - currentTime) < 1
    );
    if (productOffer) {
      setOverlay(productOffer);
      setTimeout(() => setOverlay(null), 3000);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-lg">
          Product List
        </h1>
        <Link className="text-2xl font-bold text-gray-800" href="/cart">
          Cart
        </Link>
      </div>
      <div className="relative mb-20">
        <ReactPlayer
          url="https://videos.pexels.com/video-files/4124024/4124024-uhd_2732_1440_25fps.mp4"
          playing
          controls
          width="100%"
          height="auto"
          onProgress={handleProgress}
        />
        {overlay && (
          <div className="absolute  bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm w-full z-10">
            <img
              src={overlay.image}
              alt={overlay.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover mb-4 mx-auto rounded"
            />
            <div className="text-center">
              <h2 className="font-bold text-sm sm:text-lg mb-2">
                {overlay.title}
              </h2>
              <p className="text-base sm:text-xl font-semibold text-gray-700 mb-4">
                ${overlay.price}
              </p>
              <button
                onClick={() => dispatch(addToCart(overlay))}
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 sm:py-1 sm:px-3 rounded-lg shadow-md hover:bg-blue-600 transition-all text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl hover:rotate-2"
          >
            <div className="absolute inset-0 opacity-20 rounded-xl"></div>
            <div className="relative flex flex-col items-center text-center z-10 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mb-4 rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                ${product.price}
              </p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
