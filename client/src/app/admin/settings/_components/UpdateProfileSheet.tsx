import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Stack } from "@/components/ui/stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileType } from "@/schemas/auth";
import { updateProfile } from "@/lib/api/requests/user.requests";
import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { User } from "@/types";

type Props = {
  user?: User;
};

const UpdateProfileSheet = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
    },
  });

  const queryClient = useQueryClient();
  const [status, setStatus] = React.useState<"success" | "failed" | "none">(
    "none"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProfileType) =>
      updateProfile(data, user?.id as string),
    onSuccess: () => {
      setStatus("success");
      queryClient.invalidateQueries(["me"] as InvalidateQueryFilters);
    },
    onError: () => {
      setStatus("failed");
    },
  });

  const onSubmit = (data: UpdateProfileType) => {
    mutate({ fullName: data.fullName });
  };

  React.useEffect(() => {
    reset({
      fullName: user?.fullName || "",
    });
  }, [user, reset]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Edit2 size={16} />
          Update Profile
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Profile</SheetTitle>
          <SheetDescription>Update your profile information</SheetDescription>
        </SheetHeader>
        <form
          className="flex flex-col gap-4 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Full Name"
            id="fullName"
            placeholder="Enter name"
            {...register("fullName")}
            errorMessage={errors.fullName?.message}
          />
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
          <Stack justify={"start"}>
            <Button
              loading={isPending}
              loadingText="Saving"
              size={"lg"}
              type="submit"
              className="w-fit"
            >
              Save
            </Button>
          </Stack>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProfileSheet;
