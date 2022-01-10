import { useRouter } from "next/router";
import { FaShoppingCart, FaCartPlus } from "react-icons/fa";

interface CartButtonProps {
  itemCount: number;
}

export default function CartButton({ itemCount = 0 }: CartButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="bg-green-600 text-white px-4 py-1 rounded-full flex justify-between items-center w-[75px] shadow-md"
    >
      <span>{itemCount > 0 ? <FaCartPlus /> : <FaShoppingCart />}</span>
      <span className="text-white rounded-full">{itemCount}</span>
    </button>
  );
}
