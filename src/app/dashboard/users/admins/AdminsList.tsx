import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Delete, DeleteIcon, Trash2 } from "lucide-react";

const users = [
  {
    image: "https://example.com/path-to-image1.jpg",
    name: "Sourav Bapari",
    gender: "Male",
    country: "India",
    city: "Kolkata",
    email: "sourav0w@gmail.com",
    phone: "1234567890",
  },
  {
    image: "https://example.com/path-to-image2.jpg",
    name: "John Doe",
    gender: "Male",
    country: "USA",
    city: "New York",
    email: "john@example.com",
    phone: "0987654321",
  },
  {
    image: "https://example.com/path-to-image3.jpg",
    name: "Jane Smith",
    gender: "Female",
    country: "UK",
    city: "London",
    email: "jane.smith@example.com",
    phone: "1122334455",
  },
  {
    image: "https://example.com/path-to-image4.jpg",
    name: "Alice Johnson",
    gender: "Female",
    country: "Canada",
    city: "Toronto",
    email: "alice.johnson@example.com",
    phone: "9988776655",
  },
  {
    image: "https://example.com/path-to-image5.jpg",
    name: "Bob Lee",
    gender: "Male",
    country: "Australia",
    city: "Sydney",
    email: "bob.lee@example.com",
    phone: "4433221100",
  },
  {
    image: "https://example.com/path-to-image6.jpg",
    name: "Emily Davis",
    gender: "Female",
    country: "Germany",
    city: "Berlin",
    email: "emily.davis@example.com",
    phone: "5566778899",
  },
  {
    image: "https://example.com/path-to-image7.jpg",
    name: "Michael Brown",
    gender: "Male",
    country: "USA",
    city: "San Francisco",
    email: "michael.brown@example.com",
    phone: "6677889900",
  },
  {
    image: "https://example.com/path-to-image8.jpg",
    name: "Chloe Wilson",
    gender: "Female",
    country: "France",
    city: "Paris",
    email: "chloe.wilson@example.com",
    phone: "7788990011",
  },
  {
    image: "https://example.com/path-to-image9.jpg",
    name: "David Kim",
    gender: "Male",
    country: "South Korea",
    city: "Seoul",
    email: "david.kim@example.com",
    phone: "8899001122",
  },
  {
    image: "https://example.com/path-to-image10.jpg",
    name: "Olivia Martinez",
    gender: "Female",
    country: "Spain",
    city: "Madrid",
    email: "olivia.martinez@example.com",
    phone: "9911223344",
  },
];

export function AdminList() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 ">
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Email Id</TableHead>
          <TableHead>Phone No</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell className="w-[100px]">
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
