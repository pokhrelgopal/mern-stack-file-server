"use client";

import React, { Suspense } from "react";
import LoginForm from "./_components/LoginForm";
import OtpForm from "./_components/OtpForm";
import PageLoader from "@/components/elements/page-loader";

const Page = () => {
  const [showOtpForm, setShowOtpForm] = React.useState(false);
  return (
    <Suspense fallback={<PageLoader />}>
      {showOtpForm ? (
        <OtpForm />
      ) : (
        <LoginForm setShowOtpForm={setShowOtpForm} />
      )}
    </Suspense>
  );
};

export default Page;
