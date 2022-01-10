import CartItem from "@/components/CartItem";
import Head from "next/head";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

export default function Cart() {
  const router = useRouter();
  const cartItems = useSelector(
    (state: RootStateOrAny) => state.cart.cartItems
  );

  let totalAmount = 0;

  if (cartItems?.length > 0) {
    cartItems.forEach((item: any) => {
      totalAmount += item.price;
    });
  }

  return (
    <>
      <Head>
        <title>Growsari | Shopping Cart </title>
        <meta name="description" content="A simple shopping cart app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full md:w-[60%] md:mx-auto text-center p-6 relative">
        {cartItems?.length === 0 ? (
          <div className="flex flex-col w-full items-center">
            <p className="text-neutral-400 mb-4">
              You do not have any items added yet.
            </p>
            <button
              className="px-4 py-1 rounded-full text-green-600 flex items-center"
              onClick={() => router.push("/")}
            >
              <BiArrowBack /> <span className="ml-1">Browse our products</span>
            </button>
          </div>
        ) : null}
        {cartItems?.length > 0 ? (
          <div>
            <div className="overflow-y-auto overflow-x-hidden pb-14 md:pb-20">
              {cartItems.map((item: any) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
            <div className="-ml-6 fixed bg-white w-full md:w-[60%] bottom-0 border-t border-neutral-200 py-4 md:py-6 flex flex-col lg:flex-row justify-between items-center ">
              <div className="mb-4">
                <span>Amount to Pay </span>
                <span className="font-bold">
                  PHP {Number(totalAmount).toFixed(2)}
                </span>
              </div>
              <div className="md:flex">
                <button
                  className="px-4 py-1 rounded-full hover:text-green-600 "
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </button>
                <button className="px-4 py-1 bg-green-600 text-white rounded-full hover:shadow-md">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
