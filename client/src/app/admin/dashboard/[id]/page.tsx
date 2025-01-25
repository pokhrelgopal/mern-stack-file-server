import { Suspense } from "react";
import ApplicationContainer from "./_components/ApplicationContainer";
import PageLoader from "@/components/elements/page-loader";

export default async function SingleApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <Suspense fallback={<PageLoader />}>
      <ApplicationContainer id={id} />
    </Suspense>
  );
}
