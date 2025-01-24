import React from "react";
import { Key, Calendar, Database } from "lucide-react";
import { Application } from "@/types/application.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
type Props = {
  application: Application;
};

const ApplicationCard = ({ application: app }: Props) => {
  return (
    <Card key={app.id}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{app.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-sm">
              Created: {new Date(app.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            <span className="text-sm">
              Storage Used: {app.totalStorageUsed} bytes
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Manage Application
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
