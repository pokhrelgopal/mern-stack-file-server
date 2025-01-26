import PageLoader from "@/components/elements/page-loader";
import React, { Suspense } from "react";
import OnboardingPage from "./_components/OnboardingPage";

const Onboarding = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <OnboardingPage />
    </Suspense>
  );
};

export default Onboarding;
