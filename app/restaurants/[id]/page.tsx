import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "../../_components/delivery-info";
import ProductList from "../../_components/product-list";
import CartBanner from "./_components/cart-banner";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className=" relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 py-5 pt-5">
        {/* TITULO */}
        <div className=" flex items-center gap-[0.375rem] px-5">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[2px] rounded-full bg-foreground px-2 py-[3px] text-white">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div
        className="mt-3 flex  gap-4 
      overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden"
      >
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-sm text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* TODO Mostrar produtos mais pedidos */}
        <h2 className="px-5 font-semibold">Mais pedido</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          {/* TODO Mostrar produtos mais pedidos */}
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
