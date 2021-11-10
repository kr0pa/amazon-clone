import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

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

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <div>
        <Image src={image} width={120} height={120} objectFit="contain" />
      </div>

      <div className="col-span-3 mx-5 space-y-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-4 text-yellow-400" />
            ))}
        </p>

        <p className="text-xs font-semibold">{description}</p>

        <p className="font-bold">
          <Currency quantity={price} currency="GBP" />
        </p>

        <div className="flex items-center">
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

      <div className="flex flex-col justify-center">
        <button
          onClick={addItemToBasket}
          className="mb-2 p-2 bg-gradient-to-b from-yellow-200 to-yellow-400 font-extrabold border border-yellow-300 text-xs w-full rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500"
        >
          Dodaj do koszyka
        </button>

        <button
          onClick={removeItemFromBasket}
          className="p-2 bg-gradient-to-b from-yellow-200 to-yellow-400 font-extrabold border border-yellow-300 text-xs w-full rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500"
        >
          Usuń z koszyka
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
