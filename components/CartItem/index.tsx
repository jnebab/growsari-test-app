import { cartSliceActions } from "@/redux/cart-slice";
import { ProductItem } from "interfaces";
import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

interface CartItemProps {
  item: ProductItem;
}
export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  function handleRemoveItem() {
    dispatch(cartSliceActions.removeItemFromCart(item.id));
  }

  return (
    <div className="text-left py-6 px-4 border border-neutral-100 my-4 shadow-md rounded-md flex justify-between items-center">
      <div className="flex items-center">
        <div className="hidden md:block w-20 h-20 bg-green-50 rounded-full mr-4" />
        <div className="flex flex-col mr-4">
          <span className="font-bold text-sm lg:text-base">
            {item.display_name.split("-")[0]}
          </span>
          <span className="text-neutral-400 text-sm lg:text-base">
            {item.display_name.split("-")[1]}
          </span>
          <span className="text-sm md:text-lg">
            PHP {Number(item.price).toFixed(2)}
          </span>
        </div>
      </div>

      <span>
        <button
          onClick={handleRemoveItem}
          className="bg-white border border-green-600 text-green-600 hover:opacity-50 p-2 md:px-4 md:py-1 rounded-full"
        >
          <span className="hidden md:block">Remove</span>
          <span className="md:hidden">
            <FaTrashAlt />
          </span>
        </button>
      </span>
    </div>
  );
}
