"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="FSW FOODS"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>

            {data?.user ? (
              <>
                <div className="flex justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={data?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {data?.user?.name?.split(" ")[0][0]}.{" "}
                        {data?.user?.name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-left">
                      <h3 className="block font-semibold">
                        {data?.user?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {data?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between pt-10">
                  <h2 className="font-semibold">Faça seu login</h2>
                  <Button size={"icon"} onClick={handleSignInClick}>
                    <LogInIcon />
                  </Button>
                </div>
              </>
            )}
          </SheetHeader>

          <div className="space-y-2">
            <div className="py-6">
              <Separator />
            </div>
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-xs font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-xs font-normal"
                  asChild
                >
                  <Link href={"/my-orders"}>
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-xs font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes</span>
                </Button>
              </>
            )}
          </div>

          {data?.user && (
            <>
              <div className="py-6">
                <Separator />
              </div>
              <Button
                variant={"ghost"}
                className="w-full justify-start space-x-3 rounded-full text-xs font-normal"
                onClick={handleSignOutClick}
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
