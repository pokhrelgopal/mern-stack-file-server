import React from "react";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { CheckCircle, Plus, Upload, X } from "lucide-react";
import Dropzone from "react-dropzone";
import { uploadFile } from "@/lib/api/requests/file.requests";
import {
  useMutation,
  useQueryClient,
  type InvalidateQueryFilters,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Spinner from "@/components/elements/spinner";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const FileTableHeader: React.FC<{ apiKey?: string }> = ({ apiKey }) => {
  const { showToast } = useToast();
  const [status, setStatus] = React.useState<"success" | "failed" | "none">(
    "none"
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadFile(formData, apiKey as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["application"] as InvalidateQueryFilters);
      setStatus("success");
    },
    onError: (error) => {
      setStatus("failed");
      showToast(error.message, "error");
    },
  });

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        showToast("File size exceeds 50 MB limit", "error");
        return;
      }

      mutate(file);
    }
  };

  return (
    <Stack justify="between">
      <div>
        <h3 className="text-xl font-bold">Files</h3>
        <p className="text-gray-500 text-sm">
          These are the files that are uploaded to your application.
        </p>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Upload File
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Upload File</SheetTitle>
            <SheetDescription>
              Upload a file to your application
            </SheetDescription>
          </SheetHeader>
          {isPending ? (
            <div className="h-60 mt-6 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer">
              <Spinner />
            </div>
          ) : (
            <div className="mt-6">
              <Dropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="h-60 border-dashed border-2 border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <Upload className="h-8 w-8 text-gray-400 mb-4" />
                      <p className="text-center text-sm text-gray-600">
                        Drag 'n' drop a file here, or click to select a file
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {status === "success" && !isPending && (
                <div className="mt-4 p-3 flex gap-2 items-center rounded-lg bg-green-100 text-green-900">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Updated Successfully.</span>
                </div>
              )}
              {status === "failed" && !isPending && (
                <div className="mt-4 p-3 flex gap-2 items-center rounded-lg bg-red-100 text-red-900">
                  <X className="h-5 w-5 mr-2" />
                  <span>Update Failed.</span>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Stack>
  );
};

export default FileTableHeader;
