import { PaymentMethod } from "@/types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    name: "GoPay",
    type: "e-wallet",
    image: "/images/payment/gopay.svg",
    fee: 0,
  },
  {
    id: "pm2",
    name: "OVO",
    type: "e-wallet",
    image: "/images/payment/ovo.svg",
    fee: 0,
  },
  {
    id: "pm3",
    name: "DANA",
    type: "e-wallet",
    image: "/images/payment/dana.svg",
    fee: 0,
  },
  {
    id: "pm4",
    name: "ShopeePay",
    type: "e-wallet",
    image: "/images/payment/shopeepay.svg",
    fee: 0,
  },
  {
    id: "pm5",
    name: "LinkAja",
    type: "e-wallet",
    image: "/images/payment/linkaja.svg",
    fee: 1000,
  },
  {
    id: "pm6",
    name: "Bank BCA",
    type: "bank-transfer",
    image: "/images/payment/bca.svg",
    fee: 4000,
  },
  {
    id: "pm7",
    name: "Bank Mandiri",
    type: "bank-transfer",
    image: "/images/payment/mandiri.svg",
    fee: 4000,
  },
  {
    id: "pm8",
    name: "Bank BNI",
    type: "bank-transfer",
    image: "/images/payment/bni.svg",
    fee: 4000,
  },
  {
    id: "pm9",
    name: "Bank BRI",
    type: "bank-transfer",
    image: "/images/payment/bri.svg",
    fee: 4000,
  },
  {
    id: "pm10",
    name: "Alfamart",
    type: "retail",
    image: "/images/payment/alfamart.svg",
    fee: 5000,
  },
  {
    id: "pm11",
    name: "Indomaret",
    type: "retail",
    image: "/images/payment/indomaret.svg",
    fee: 5000,
  },
  {
    id: "pm12",
    name: "Credit/Debit Card",
    type: "credit-card",
    image: "/images/payment/card.svg",
    fee: 3000,
  },
];

export const getPaymentMethodById = (id: string): PaymentMethod | undefined => {
  return paymentMethods.find(pm => pm.id === id);
};

export const getPaymentMethodsByType = (type: PaymentMethod['type']): PaymentMethod[] => {
  return paymentMethods.filter(pm => pm.type === type);
};

export const getAllPaymentMethods = (): PaymentMethod[] => {
  return paymentMethods;
};