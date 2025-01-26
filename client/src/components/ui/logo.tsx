import { cn } from "@/utils/tw-merge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps & React.SVGProps<SVGSVGElement>) => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className={cn("cursor-pointer", props.className)}
      />
    </Link>
  );
};

export default Logo;
