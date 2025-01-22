import Logo from "@/components/ui/logo";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  return (
    <div className="h-screen w-full overflow-hidden relative flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-white via-indigo-50/70 to-blue-50" />

      <div className="absolute top-5 left-5 text-2xl font-semibold mb-12 z-10">
        <Logo />
      </div>

      <div className="z-10 bg-white p-10 rounded-lg max-h-full min-w-[420px] overflow-y-scroll scrollbar-hide flex items-center justify-center">
        {props.children}
      </div>

      <div className="absolute w-[400px] h-[400px] bg-green-100 rounded-full bottom-40 -right-20 blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-green-100 rounded-full -bottom-20 right-20  blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-100 rounded-full -bottom-40 right-[40%]  blur-[100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-100 rounded-full -bottom-40 left-0  blur-[100px]" />
    </div>
  );
};

export default AuthLayout;
