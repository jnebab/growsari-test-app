import { ProductItem } from "interfaces";
import { RootStateOrAny, useSelector } from "react-redux";

interface ProductProps {
  product: ProductItem;
  onClick: (id: string | number) => void;
}

export default function Product({ product, onClick }: ProductProps) {
  const cartItems = useSelector(
    (state: RootStateOrAny) => state.cart.cartItems
  );
  const productName = product.display_name.split("-")[0];
  const productSize = product.display_name.split("-")[1];

  const isProductInCart =
    cartItems.findIndex((item: any) => item.id === product.id) > -1;

  return (
    <div className="relative w-[280px] flex shadow-md border border-neutral-100 rounded-md flex-col justify-between p-6">
      <div className="w-52 h-52 bg-green-50 rounded-full mb-2 mx-auto" />
      <h4 className="lg:text-left mb-0 w-full text-neutral-700">
        {productName}
      </h4>
      <div className="w-full flex">
        <div className="flex flex-col items-start mr-2 flex-auto">
          <div className="text-neutral-400 text-xs">
            <p>{productSize}</p>
            <p className="mb-4">{product.category}</p>

            <p className="font-semibold text-base text-green-600">
              PHP {Number(product.price).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start absolute right-4 bottom-4">
          <button
            onClick={() => onClick(product.id)}
            className={`${
              isProductInCart
                ? "bg-white border border-orange-500 text-orange-500"
                : "bg-green-600"
            } shadow-md px-6 py-1  rounded-full text-white h-10 text-sm`}
          >
            {`${isProductInCart ? "Remove" : "Add to Cart"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
