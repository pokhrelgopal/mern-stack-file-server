import { Button } from "@/components/ui/button";
import { Box1 } from "iconsax-react";
import { ArrowRight } from "lucide-react";

interface JobCardProps {
  title?: string;
  description?: string;
  storage?: string;
  type?: string;
  department?: string;
  onLearnMore?: () => void;
}

export default function JobCard({
  title = "CareerHub",
  description = "https://www.example.com",
  storage = "2.3 MB",
  department = "Free Tier",
  onLearnMore,
}: JobCardProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <span className="px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full">
          {department}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex gap-6 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <Box1 className="w-4 h-4 stroke-accent-foreground" />
          <span>{storage}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant={"secondary"}
          className="rounded-full"
          onClick={onLearnMore}
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
