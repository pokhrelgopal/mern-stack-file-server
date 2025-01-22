import { CustomAlertDialog } from "@/components/elements/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";

const DeleteProfile = () => {
  return (
    <div className="bg-white p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">Danger Zone</h3>
        <div className="flex gap-3">
          <p className="text-gray-500 text-sm">
            Delete your account and all its associated data.
          </p>
        </div>
      </div>
      <CustomAlertDialog
        title="Delete Account"
        description="Are you sure you want to delete your account? This action is irreversible."
        onAction={() => {
          console.log("Account deleted");
        }}
        trigger={
          <Button variant="destructive" className="mt-4">
            <Trash size={16} />
            Delete Account
          </Button>
        }
        cancelText="Cancel"
        actionText="Delete Account"
      />
    </div>
  );
};

export default DeleteProfile;
