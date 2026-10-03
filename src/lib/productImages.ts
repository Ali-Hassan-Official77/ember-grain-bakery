import type { IconKey } from "@/types";

export const PRODUCT_IMAGES: Record<
  IconKey,
  string
> = {
  pretzel: "/products/brezel.png",
  croissant: "/products/croissant.png",
  berliner: "/products/berliner.png",

  // roll.png is currently being used for the baguette/loaf visual.
  loaf: "/products/roll.png",
  baguette: "/products/roll.png",

  cookie: "/products/cookie.png",
  cinnamonroll: "/products/rustic.png",
  cupcake: "/products/cupcake.png",
  tart: "/products/tart.png",
};

export const PRODUCT_IMAGE_ASPECT: Record<
  IconKey,
  number
> = {
  pretzel: 683 / 774,
  croissant: 652 / 793,
  berliner: 639 / 789,
  loaf: 518 / 882,
  baguette: 518 / 882,
  cookie: 648 / 887,
  cinnamonroll: 597 / 884,
  cupcake: 494 / 911,
  tart: 541 / 922,
};

export function getProductImage(
  icon: IconKey
) {
  return (
    PRODUCT_IMAGES[icon] ??
    "/products/brezel.png"
  );
}