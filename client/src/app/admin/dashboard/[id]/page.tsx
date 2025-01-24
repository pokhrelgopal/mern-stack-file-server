import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ApplicationPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <p className="text-lg">Application ID: {id}</p>
    </div>
  );
}
