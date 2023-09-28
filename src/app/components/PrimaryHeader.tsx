"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";
import Logo, { SmallLogo, BurgerSearch } from "@/components/ui/icons/logo";
import CustomLink from "@/components/ui/Link";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/icons/search";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavClose } from "@/components/ui/icons/dialogclose";

import { navItems } from "./list";

const PrimaryHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  const menuLinks = [
    {
      label: "Sports",
      link: "/sports",
      active: true,
    },
    {
      label: "In-Play",
      link: "/in-play",
    },
  ];
  const router = useRouter();
  const location = usePathname();
  return (
    <div className="mx-auto bg-brand-green">
      <Container className=" items-center h-[60px] justify-between hidden md:flex">
        <div className="ml-[20px]">
          <Logo />
        </div>
        <div className=" flex gap-[45px]">
          {menuLinks.map((link, index) => {
            return (
              <CustomLink
                key={index}
                href={link.link}
                className="text-white hover:text-brand-green-light text-sm leading-[0px]"
                activeClassName="underline underline-offset-[23px] decoration-brand-yellow decoration-2"
              >
                {link.label}
              </CustomLink>
            );
          })}
        </div>
        <div className="flex gap-6 items-center ">
          <div className="flex-shrink-0 h-4  w-4 hidden md:flex">
            <Search />
          </div>
          <div className="hidden md:flex">
            <Button>Join</Button>
          </div>
          <div className="flex-1 flex-shrink-0 mr-[20px] text-xs">
            <CustomLink
              href="/log-in"
              className="text-white w-10 flex-shrink-0 hover:text-brand-green-light"
            >
              Log In
            </CustomLink>
          </div>
        </div>
      </Container>
      <Container className=" items-center h-[50px] justify-between flex md:hidden text-sm">
        <div className="flex-shrink-0 h-4 flex ml-4 cursor-pointer">
          <BurgerSearch
            onClick={() => {
              setOpenNav(!openNav);
            }}
          />
        </div>
        <div className="flex text-white justify-between items-center h-full w-full">
          <div
            className={cn(
              "mx-4 cursor-pointer h-full flex text-white hover:text-brand-green-light items-center",
              location.includes("/sports")
                ? "border-b-2 border-solid border-[#FFDF1B]"
                : ""
            )}
            onClick={() => {
              router.push("/sports");
            }}
          >
            <SmallLogo />
          </div>
          <div className="flex gap-4 mr-5">
            <div className="mx-4 cursor-pointer">Join</div>
            <CustomLink
              href="/log-in"
              className="text-white hover:text-brand-green-light"
            >
              Log In
            </CustomLink>
          </div>
        </div>
      </Container>
      <div
        id="mySidenav"
        className={cn(
          "h-[100%] fixed z-50 top-0 left-0 bg-[#282828] ease-in-out duration-300 text-base overflow-hidden",
          openNav ? "w-[260px]" : "w-[0px]"
        )}
      >
        <div className="flex flex-col">
          <div className="ml-auto mt-2 mr-2 cursor-pointer">
            <NavClose
              onClick={() => {
                setOpenNav(false);
              }}
            />
          </div>
          <div className="flex flex-col overflow-auto h-[calc(100vh_-_36px)]">
            {navItems?.map((item, index) => {
              return (
                <CustomLink
                  key={index}
                  href={item.link}
                  className="text-sm"
                  activeClassName="text-sm font-[700]"
                  onClick={() => {
                    setOpenNav(false);
                  }}
                >
                  <div className="pl-5 h-[45px] flex items-center text-[#ddd] hover:bg-[#383838] hover:text-[#fff] cursor-pointer">
                    <div className="truncate">{item?.label}</div>
                  </div>
                </CustomLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
