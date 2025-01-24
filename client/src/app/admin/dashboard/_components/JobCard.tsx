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
    <div className="w-full bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <span className="px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
          {department}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <Box1 className="w-4 h-4" />
        <span className="text-sm">{storage}</span>
      </div>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          className="text-sm"
          onClick={onLearnMore}
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
