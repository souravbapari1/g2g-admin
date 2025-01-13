import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ClubGalleryCategory() {
  return (
    <div className="grid grid-cols-6 gap-5 mt-5">
      {Array(16)
        .fill(0)
        .map((_, index) => (
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <Link href="/dashboard/clubs/1/gallery/hh" className="w-full">
                <Image
                  src="https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg"
                  alt="Enhance After"
                  width={1400}
                  height={1300}
                  className="w-full h-44 object-cover"
                />
              </Link>
            </CardHeader>
            <CardContent className="text-center pt-6">
              <p className="text-base font-bold  text-gray-900">
                Enhance After
              </p>
              <p className="mt-1 text-sm text-gray-500">02/11/2023</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center gap-5 w-full">
              <Link href="/admin/dashboard/clubs/1" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Edit
                </Button>
              </Link>
              <Link href="/admin/dashboard/clubs/1" className="w-full">
                <Button variant="destructive" size="sm" className="w-full">
                  Delete
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default ClubGalleryCategory;
