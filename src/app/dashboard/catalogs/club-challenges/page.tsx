import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Club Challenges">
        <Link href="/dashboard/catalogs/club-challenges/new">
          <Button variant="outline" size="sm">
            Add New
          </Button>
        </Link>
      </WorkHeader>
      <div className="tableWrapper">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Challenges</th>
              <th>Main Color</th>
              <th>Sub Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Image
                  src="https://www.adu.ac.ae/ResourcePackages/AbuDhabiUniversitySDGs/assets/imgs/adu-sdg/icons/sdg-3.jpg"
                  alt="Image"
                  width={100}
                  height={100}
                  className="h-10 w-10 object-contain"
                />
              </td>
              <td>Club Challenge 1</td>
              <td>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Badge variant="secondary" className="text-xs" key={i}>
                      Change 1
                    </Badge>
                  ))}
                </div>
              </td>
              <td>
                <p
                  style={{ backgroundColor: "#5a8ef7" }}
                  className="text-current p-2  text-center"
                >
                  #5a8ef7
                </p>
              </td>
              <td>
                <p
                  style={{ backgroundColor: "#88bf49" }}
                  className="text-current p-2  text-center"
                >
                  #00FF00
                </p>
              </td>
              <td>
                <Link href="/dashboard/catalogs/club-challenges/new">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" className="ml-4">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </WorkSpace>
  );
}

export default page;
