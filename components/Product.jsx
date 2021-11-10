import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import New from "./New";

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();

  const truncate = (string, n) => {
    return <p>{string.substring(0, n)}...</p>;
  };

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="flex flex-col justify-between z-30 h-96 bg-white m-4 cursor-default flex-grow">
      <New />

      <div>
        <div className="flex justify-end mb-3 mr-2 mt-1">
          <p className="text-xs text-gray-400 font-medium">{category}</p>
        </div>

        <div className="flex justify-center">
          <Image width={140} height={140} src={image} objectFit="contain" />
        </div>

        <div className="ml-8 mt-1 font-bold text-sm w-3/4">
          <h3>{title.length > 30 ? truncate(title, 30) : title}</h3>
        </div>

        <div className="flex ml-8">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-4 text-yellow-400" />
            ))}
        </div>

        <div className="text-xs font-semibold ml-8 mr-8 mt-1">
          <h3>
            {description.length > 88 ? truncate(description, 75) : description}
          </h3>
        </div>

        <div className="font-bold mt-1 ml-8">
          <Currency quantity={price} currency="GBP" />
        </div>

        <div className="flex items-center ml-8">
          {hasPrime && (
            <>
              <img
                className="w-12"
                src="https://links.papareact.com/fdw"
                alt=""
              />
              <p className="ml-1 text-xs text-gray-400 font-bold">
                FREE Next-day Delivery!
              </p>
            </>
          )}
        </div>
      </div>

      <div className="ml-8 mr-8 mb-2">
        <button
          onClick={addItemToBasket}
          className="p-2 bg-gradient-to-b from-yellow-200 to-yellow-400 font-extrabold border border-yellow-300 text-xs w-full rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}

export default Product;
