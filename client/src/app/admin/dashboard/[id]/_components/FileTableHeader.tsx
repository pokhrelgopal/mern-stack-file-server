import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Plus } from "lucide-react";
import React from "react";

const FileTableHeader = () => {
  return (
    <Stack justify={"between"}>
      <div>
        <h3 className="text-xl font-bold">Files</h3>
        <p className="text-gray-500 text-sm">
          These are the files that are uploaded to your application.
        </p>
      </div>
      <Button>
        <Plus className="h-5 w-5" />
        Upload File
      </Button>
    </Stack>
  );
};

export default FileTableHeader;
