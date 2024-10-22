import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = {
  newRequests: [
    {
      image: "https://example.com/path-to-image9.jpg",
      applicantName: "John Doe",
      email: "john@example.com",
      companyName: "Example Co.",
      field: "Environment",
      dateOfApplication: "2024-10-20",
      status: "Pending",
    },
    {
      image: "https://example.com/path-to-image9.jpg",
      applicantName: "Alice Johnson",
      email: "alice@example.com",
      companyName: "Green Solutions",
      field: "Sustainability",
      dateOfApplication: "2024-10-21",
      status: "Accept",
    },
  ],
  sponsors: [
    {
      image: "https://example.com/path-to-image9.jpg",
      applicantName: "Jane Smith",
      email: "jane@example.com",
      companyName: "Eco Firm",
      field: "Recycling",
      dateOfApplication: "2024-10-19",
      approvedBy: "Admin",
      myBalance: 50.0,
      numberOfProjects: 3,
      numberOfPlantedTrees: 100,
      plasticOffsetKg: 200,
      amountOfPlasticOffset: 150.0,
      status: "Active",
    },
    {
      image: "https://example.com/path-to-image9.jpg",
      applicantName: "Mark Taylor",
      email: "mark@example.com",
      companyName: "Clean Earth",
      field: "Waste Management",
      dateOfApplication: "2024-10-18",
      approvedBy: "Admin",
      myBalance: 30.0,
      numberOfProjects: 2,
      numberOfPlantedTrees: 50,
      plasticOffsetKg: 100,
      amountOfPlasticOffset: 75.0,
      status: "Inactive",
    },
  ],
};

export function PartnersList() {
  return (
    <div className="text-nowrap">
      {/* New Requests Table */}
      <h1 className="text-3xl font-bold mb-5">New Requests</h1>
      <Table className=" overflow-auto">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Field</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.newRequests.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="w-[100px]">
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.applicantName[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.applicantName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.companyName}</TableCell>
              <TableCell>{user.field}</TableCell>
              <TableCell>{user.dateOfApplication}</TableCell>
              <TableCell className="w-[120px]">
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={user.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light"></SelectItem>
                    <SelectItem value="dark">Pending</SelectItem>
                    <SelectItem value="system">Active</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sponsors Table */}
      <h1 className="text-3xl font-bold mb-5 mt-10">Sponsors</h1>
      <Table className="overflow-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Field</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Planted Trees</TableHead>
            <TableHead>Plastic Offset</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.sponsors.map((sponsor) => (
            <TableRow key={sponsor.email}>
              <TableCell className="w-[100px]">
                <Avatar>
                  <AvatarImage src={sponsor.image} />
                  <AvatarFallback>{sponsor.applicantName[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{sponsor.applicantName}</TableCell>
              <TableCell>{sponsor.email}</TableCell>
              <TableCell>{sponsor.companyName}</TableCell>
              <TableCell>{sponsor.field}</TableCell>
              <TableCell>{sponsor.dateOfApplication}</TableCell>
              <TableCell>{sponsor.approvedBy}</TableCell>

              <TableCell>{sponsor.numberOfProjects}</TableCell>
              <TableCell>{sponsor.numberOfPlantedTrees} Kg</TableCell>
              <TableCell>{sponsor.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
