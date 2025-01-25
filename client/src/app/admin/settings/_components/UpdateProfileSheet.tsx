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

type Props = {};

const UpdateProfileSheet = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit = (data: UpdateProfileType) => {
    console.log("Form submitted successfully:", data);
  };
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
          <SheetTitle>Update profile</SheetTitle>
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
          <Input
            label="Email"
            id="email"
            placeholder="Enter email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <Stack justify={"start"}>
            <Button size={"lg"} type="submit" className="w-fit">
              Save
            </Button>
          </Stack>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProfileSheet;
