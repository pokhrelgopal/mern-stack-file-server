"use client";

import { Badge } from "@/components/ui/badge";
import UpdateProfileSheet from "./UpdateProfileSheet";
import React from "react";

const UpdateProfile = () => {
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
      <UpdateProfileSheet />
    </div>
  );
};

export default UpdateProfile;
