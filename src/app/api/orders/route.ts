import { NextRequest, NextResponse } from "next/server";
import { getProductById, saveOrder, generateOrderId, getOrders } from "@/lib/db";
import type { Order, OrderItem, DeliverySlot, PaymentMethod } from "@/types";

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 150;

interface OrderPayload {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: { productId: string; quantity: number }[];
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
}

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  let payload: OrderPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { customer, items, deliverySlot, paymentMethod } = payload;

  if (!customer?.fullName || !customer?.phone || !customer?.address || !customer?.city) {
    return NextResponse.json(
      { error: "Missing required customer details" },
      { status: 400 }
    );
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const orderItems: OrderItem[] = [];
  let subtotal = 0;

  for (const line of items) {
    const product = await getProductById(line.productId);
    if (!product) continue;
    const quantity = Math.max(1, Math.min(50, Math.floor(line.quantity)));
    const lineTotal = product.price * quantity;
    subtotal += lineTotal;
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  if (orderItems.length === 0) {
    return NextResponse.json({ error: "No valid items in cart" }, { status: 400 });
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const order: Order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      fullName: customer.fullName,
      email: customer.email ?? "",
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      notes: customer.notes ?? "",
    },
    items: orderItems,
    deliverySlot: deliverySlot ?? "morning",
    paymentMethod: paymentMethod ?? "cod",
    subtotal,
    deliveryFee,
    total,
    status: "received",
  };

  await saveOrder(order);

  return NextResponse.json({ order }, { status: 201 });
}
