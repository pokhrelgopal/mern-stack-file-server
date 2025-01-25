import { CustomAlertDialog } from "@/components/elements/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import React from "react";

type Props = {
  applicationId: string;
};

const DangerContainer = ({ applicationId }: Props) => {
  const handleDeleteApplication = () => {};
  return (
    <Card className="h-fit mt-4 p-5 shadow-neutral-100 border-gray-100 w-full">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <AlertCircle className="h-6 w-6 text-red-600" strokeWidth={1} />
        <span>Danger Zone</span>
      </h3>
      <p className="mt-1 text-gray-500">
        The following actions are destructive and they can never ever be
        reversed.
      </p>

      <CustomAlertDialog
        trigger={
          <Button className="mt-4 w-fit" variant="destructive">
            Delete Application
          </Button>
        }
        title="Are you sure ?"
        description="Are you sure you want to delete this application ? This action cannot be undone."
        onAction={handleDeleteApplication}
        cancelText="Cancel"
        actionText="Delete"
      />
    </Card>
  );
};

export default DangerContainer;
