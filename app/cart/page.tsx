"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <strong>{item.title}</strong> - ${item.price}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl mt-8">
            Total Price: $
            {cartItems.reduce((total, item) => total + item.price, 0)}
          </h2>
        </>
      )}
    </div>
  );
}
