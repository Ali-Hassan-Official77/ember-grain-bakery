import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase().trim();

  let products = await getProducts();

  if (category && category !== "All") {
    products = products.filter((p) => p.category === category);
  }

  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.tagline.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ products });
}
