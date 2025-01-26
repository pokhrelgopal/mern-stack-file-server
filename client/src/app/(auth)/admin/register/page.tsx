import PageLoader from "@/components/elements/page-loader";
import React, { Suspense } from "react";
import RegisterPage from "./_components/RegisterPage";

const page = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  );
};

export default page;
