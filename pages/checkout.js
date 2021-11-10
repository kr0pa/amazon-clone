import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

function Checkout() {
  const basketData = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);
  const { data: session } = useSession();

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-2xl border-b pb-4">
              {!basketData.length ? "Koszyk jest pusty..." : "Twój koszyk:"}
            </h1>

            {basketData?.map((item, i) => {
              const {
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                hasPrime,
              } = item;

              return (
                <CheckoutProduct
                  key={i}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                  hasPrime={hasPrime}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {basketData?.length > 0 && (
            <>
              <div className="flex whitespace-nowrap">
                <p>{`Koszt(${basketData?.length} rzeczy):`}</p>
                <p className="font-bold ml-2">
                  <Currency quantity={totalPrice} currency="GBP" />
                </p>
              </div>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "p-2 w-full bg-gradient-to-b border from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Zaloguj się" : "Przejdź do płatności"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
