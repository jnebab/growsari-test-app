import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Product from "@/components/Product";
import { Category } from "interfaces";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import useDebounce from "hooks/useDebounce";
import { productsActions } from "@/redux/products-slice";
import { cartSliceActions } from "@/redux/cart-slice";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    searchTerm: searchInput,
    cartItems,
  } = useSelector((state: RootStateOrAny) => ({
    ...state.products,
    ...state.cart,
  }));
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const searchTerm = useDebounce(searchText, 800);

  function handleAddToCart(product: any) {
    const isExist =
      cartItems.findIndex((item: any) => item.id === product.id) > -1;
    if (isExist) {
      dispatch(cartSliceActions.removeItemFromCart(product.id));
    } else {
      dispatch(cartSliceActions.addItemToCart(product));
    }
  }

  useEffect(() => {
    dispatch(productsActions.search(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      <Head>
        <title>Growsari | Home</title>
        <meta name="description" content="A simple shopping cart app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex flex-col items-center p-6">
        <div className="md:hidden w-full">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-full border border-neutral-300 placeholder:text-neutral-200 w-full"
            placeholder="Search"
          />
        </div>
        {searchInput && products?.length === 0 ? (
          <p className="my-4">{`No products found for '${searchInput}'`}</p>
        ) : null}
        {products?.length > 0 ? (
          <div className="w-full flex justify-between items-center px-2 mt-4">
            {!searchInput ? (
              <span>{`${products.length} products`}</span>
            ) : (
              <span>{`There are ${products.length} products found for '${searchInput}'.`}</span>
            )}
            <div>
              <select
                className="border border-neutral-300 rounded-full"
                value={priceFilter}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                  dispatch(productsActions.sort(e.target.value));
                }}
                placeholder="Select filter"
              >
                <option value="lowest">Price low to high</option>
                <option value="highest">Price high to low</option>
              </select>
            </div>
          </div>
        ) : null}
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {products.map((product: any) => (
            <Product
              key={product.id}
              product={product}
              onClick={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
