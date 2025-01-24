import DashboardPage from "./_components/DashboardPage";
import { Suspense } from "react";
import PageLoader from "@/components/elements/page-loader";

export default function Dashboard() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  );
}
