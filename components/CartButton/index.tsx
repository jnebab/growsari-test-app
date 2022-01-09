import { useRouter } from "next/router";

interface CartButtonProps {
  itemCount: number;
}

export default function CartButton({ itemCount = 0 }: CartButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="bg-green-600 text-white px-4 py-1 rounded-full flex justify-between items-center w-[100px] shadow-md"
    >
      <span>Cart</span>
      <span className="text-white rounded-full">{itemCount}</span>
    </button>
  );
}
