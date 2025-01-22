"use client";

import { CustomAlertDialog } from "@/components/elements/alert-dialog";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/ui/stack";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function page() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <>
      <Buttons />
      <main className="p-10">
        <CustomAlertDialog
          trigger={<Button variant={"secondary"}>Open Dialog</Button>}
          title="Are you sure ?"
          description="Are you sure that you want to perform this action ? This action cannot be undone."
          onAction={() => {}}
          cancelText="Cancel"
          actionText="Action"
        />

        <div className="w-96 my-10">
          <div>
            <Input label="Email Address" errorMessage={errorMessage} />
          </div>
          <Button
            onClick={() => {
              if (errorMessage) {
                setErrorMessage("");
                return;
              }
              setErrorMessage("This is an error message.");
            }}
            size={"lg"}
            className="inlie-block mt-4"
            variant={"default"}
          >
            Trigger Error
          </Button>
        </div>

        <Stack className="my-16" justify={"start"}>
          <Button className="w-fit" variant={"secondary"}>
            Cancel
          </Button>
          <Button
            loading={true}
            loadingText="Loading"
            className="w-fit"
            variant={"destructive"}
          >
            Delete
          </Button>
        </Stack>
        <div>
          <FileInput
            label="Upload File"
            buttonTitle="Choose File"
            errorMessage={errorMessage}
            onChange={(e) => {
              console.log(e.target.files);
            }}
          />
        </div>
      </main>
    </>
  );
}

function Buttons() {
  const { showToast } = useToast();
  return (
    <main className="p-10 flex gap-2">
      <Button
        size={"lg"}
        type="button"
        onClick={() => {
          showToast("This is success toast.", "success");
        }}
      >
        Success
      </Button>
      <Button
        type="button"
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          showToast("This is error toast.", "error");
        }}
      >
        Error
      </Button>
      <Button
        variant={"subtle"}
        type="button"
        onClick={() => {
          showToast("Mail sent.", "success");
        }}
      >
        <Mail strokeWidth={1} size={20} />
        Send Mail
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        onClick={() => {
          showToast("This is info toast.", "info");
        }}
      >
        Information
      </Button>
    </main>
  );
}
