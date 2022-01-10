import productsSlice, { productsActions } from "@/redux/products-slice";
import CartButton from "components/CartButton";
import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(
    (state: RootStateOrAny) => state.cart.cartItems.length
  );
  const [searchText, setSearchText] = useState<string>("");
  const searchTerm = useDebounce(searchText, 800);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    dispatch(productsActions.search(searchTerm));
  }, [searchTerm]);

  const isCartPage = router.pathname.includes("cart");
  return (
    <header className="w-full md:w-[60%] md:mx-auto px-4 py-4">
      <nav className="flex justify-between items-center">
        <h1 className="font-heading">
          <span className="text-green-500">grow</span>
          <span className="text-orange-500">sari</span>
        </h1>

        {!isCartPage ? (
          <>
            <div className="flex-1 mx-4 hidden md:flex md:max-w-lg">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                className="rounded-full border border-neutral-300 placeholder:text-neutral-200 w-full"
                placeholder="Search"
              />
            </div>
            <CartButton itemCount={cartItemsCount} />{" "}
          </>
        ) : (
          <h2>Your Shopping Cart</h2>
        )}
      </nav>
    </header>
  );
}
