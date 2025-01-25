import { Card } from "@/components/ui/card";
import { kbToGb } from "@/utils/convert";
import { Database } from "lucide-react";
import React from "react";

interface Props {
  totalStorage?: number;
}

const TotalStorage: React.FC<Props> = ({ totalStorage = 0 }) => {
  const totalStorageGb = kbToGb(totalStorage);

  return (
    <Card className="h-full flex flex-col justify-between p-5 shadow-neutral-100 border-gray-100 w-full">
      <div className="w-fit rounded-full bg-green-100 p-3">
        <Database className="h-10 w-10" strokeWidth={1} />
      </div>
      <p className="mt-3">
        <span className="text-2xl font-bold">{totalStorageGb}</span> GB Occupied
      </p>
    </Card>
  );
};

export default TotalStorage;
