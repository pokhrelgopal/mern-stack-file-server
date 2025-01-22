"use client";

import { CustomDialog } from "@/components/elements/custom-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname must not exceed 40 characters"),
  email: z.string().email("Invalid email address"),
});
type UpdateProfileType = z.infer<typeof updateProfileSchema>;

const UpdateProfile = () => {
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
    <div className="bg-white p-4 rounded flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">Profile</h3>
        <div className="flex gap-3">
          <p className="text-sm">pokhrelgopal27@gmail.com</p>
          <Badge className="text-xs" variant="success">
            Primary Email
          </Badge>
        </div>
      </div>

      <CustomDialog
        className="p-8"
        title="Update Profile"
        onClose={() => {}}
        trigger={
          <Button variant="secondary">
            <Edit size={16} />
            Update Profile
          </Button>
        }
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex justify-end">
            <Button size={"lg"} type="submit" className="w-fit">
              <Edit size={16} />
              Update Profile
            </Button>
          </div>
        </form>
      </CustomDialog>
    </div>
  );
};

export default UpdateProfile;
