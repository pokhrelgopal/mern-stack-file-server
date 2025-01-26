import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

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
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateProfileType) =>
      updateProfile(data, user?.id as string),
    onSuccess: () => {
      showToast("Profile updated successfully.", "success");
      queryClient.invalidateQueries(["me"] as InvalidateQueryFilters);
    },
    onError: (error) => {
      showToast(error.message, "error");
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
