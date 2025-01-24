import React from "react";
import { Calendar, Database } from "lucide-react";
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
import { formatDate } from "date-fns";
import Link from "next/link";
type Props = {
  application: Application;
};

const ApplicationCard = ({ application: app }: Props) => {
  return (
    <Link href={`/admin/dashboard/${app.id}`}>
      <Card key={app.id}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{app.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {formatDate(new Date(app.createdAt), "dd MMM yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              <span className="text-sm">{app.totalStorageUsed} bytes</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Manage Application
            <ArrowRight className="w-5 h-5 ml-2 stroke-black" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ApplicationCard;
