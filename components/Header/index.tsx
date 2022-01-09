import productsSlice, { productsActions } from "@/redux/products-slice";
import CartButton from "components/CartButton";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

export default function Header() {
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

  return (
    <header className="p-4">
      <nav className="flex justify-between items-center">
        <h1>Growsari</h1>
        <div className="flex-1 mx-4 hidden md:flex md:max-w-lg">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="rounded-full border border-neutral-300 placeholder:text-neutral-200 w-full"
            placeholder="Search"
          />
        </div>
        <CartButton itemCount={cartItemsCount} />
      </nav>
    </header>
  );
}
