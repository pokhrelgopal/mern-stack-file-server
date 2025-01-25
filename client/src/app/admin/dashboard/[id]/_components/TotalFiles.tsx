import { Card } from "@/components/ui/card";
import { File } from "lucide-react";
import React from "react";
interface Props {
  fileCount?: number;
}
const TotalFiles = ({ fileCount = 0 }: Props) => {
  return (
    <Card className="h-full flex flex-col justify-between p-5 shadow-neutral-100 border-gray-100 w-full">
      <p className="w-fit rounded-full bg-green-100 p-3">
        <File className="h-10 w-10" strokeWidth={1} />
      </p>
      <p className="mt-3">
        <span className="text-2xl font-bold">{fileCount}</span> Files Uploaded
      </p>
    </Card>
  );
};

export default TotalFiles;
