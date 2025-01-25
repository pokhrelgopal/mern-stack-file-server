import React from "react";
import { CustomDialog } from "@/components/elements/custom-dialog";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Plus } from "lucide-react";
import Dropzone from "react-dropzone";

const FileTableHeader = ({ apiKey }: { apiKey?: string }) => {
  if (apiKey) return;
  return (
    <Stack justify={"between"}>
      <div>
        <h3 className="text-xl font-bold">Files</h3>
        <p className="text-gray-500 text-sm">
          These are the files that are uploaded to your application.
        </p>
      </div>

      <CustomDialog
        trigger={
          <Button>
            <Plus className="h-5 w-5" />
            Upload File
          </Button>
        }
        title="Upload File"
      >
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                className="h-60 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-lg"
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <Stack justify="end">
          <Button loading={false} loadingText="Uploading" className="mt-3">
            Upload
          </Button>
        </Stack>
      </CustomDialog>
    </Stack>
  );
};

export default FileTableHeader;
