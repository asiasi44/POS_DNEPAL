"use client";

import { ProductFormType } from "@/lib/clientSchema/product/schema";
import { useCheckoutProducts } from "@/lib/hooks/useCheckout";
import { useState } from "react";
import { toast } from "react-toastify";
import InvoiceModal from "./InvoiceModal";

type CartItem = {
  product: ProductFormType;
  quantity: number;
};

type InvoiceData = {
  sale: any;
  company: any;
  user: any;
};

export default function CartPanel({
  cart,
  addToCart,
  removeFromCart,
  discount,
  setDiscount,
}: {
  cart: CartItem[];
  addToCart: (product: ProductFormType) => void;
  removeFromCart: (productId: string) => void;
  discount: number;
  setDiscount: (v: number) => void;
}) {
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const checkoutProductsMutation = useCheckoutProducts();
  const vatRate = 13;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0,
  );

  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const vatAmount = (afterDiscount * vatRate) / 100;
  const finalTotal = afterDiscount + vatAmount;

  const checkoutProducts = () => {
    checkoutProductsMutation.mutate(
      {
        cart,
        subtotal,
        discount,
        vat: vatRate,
        total: finalTotal,
      },
      {
        onSuccess: (response) => {
          toast.success("Successfully checked out");
          if (response.data) {
            setInvoiceData(response.data);
            setShowInvoice(true);
          }
        },
      },
    );
  };
  return (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        invoiceData={invoiceData}
      />

      <div className="flex-1 overflow-auto space-y-2">
        {cart.length === 0 && (
          <div className="text-gray-400">Cart is empty</div>
        )}

        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <div className="font-medium">{item.product.name}</div>
              <div className="text-sm text-gray-500">
                Rs. {item.product.sellingPrice} x {item.quantity}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => removeFromCart(item.product.id!)}
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => addToCart(item.product)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BILL */}
      <div className="border-t pt-4 mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Discount (%)</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-20 border p-1 rounded"
          />
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>- Rs. {discountAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t pt-2">
          <span>After Discount</span>
          <span>Rs. {afterDiscount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>VAT (13%)</span>
          <span>+ Rs. {vatAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Total</span>
          <span>Rs. {finalTotal.toFixed(2)}</span>
        </div>

        <button
          className="w-full mt-3 bg-green-600 text-white py-2 rounded"
          onClick={checkoutProducts}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
