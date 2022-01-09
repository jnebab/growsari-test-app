import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import Product from "@/components/Product";
import { Category } from "interfaces/category";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>();
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
    const cats = products.map((p: any) => p.category);
    const uniqueCategories = Array.from(new Set(cats));
    const newCategories = uniqueCategories.map((cat: any) => ({
      label: cat,
      value: cat.replace(" ", "-").toLowerCase(),
    }));
    const allOption = {
      label: "All",
      value: "",
    };
    setCategories([...newCategories, allOption]);
  }, [products]);

  useEffect(() => {
    dispatch(productsActions.search(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="A simple shopping cart app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
        {searchInput && products?.length > 0 ? (
          <p className="text-neutral-500 text-base">{`There are ${products.length} products found for '${searchInput}'.`}</p>
        ) : null}
        {searchInput && products?.length === 0 ? (
          <p>{`No products found for '${searchInput}'`}</p>
        ) : null}
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6">
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
