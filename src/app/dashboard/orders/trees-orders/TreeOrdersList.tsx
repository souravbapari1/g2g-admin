"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TreeOrdersTable() {
  return (
    <Table className="overflow-auto">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>

          <TableHead>Indv/Comp</TableHead>
          <TableHead>Date Of Project</TableHead>
          <TableHead>Project Name</TableHead>

          <TableHead>Trees</TableHead>
          <TableHead>Amount (OMR)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Assigned To</TableHead>
          <TableHead>Mapping Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Add rows here */}
        <TableRow>
          <TableCell>001</TableCell>
          <TableCell>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Sourav</TooltipTrigger>
                <TooltipContent>
                  <p>sourav0w@gmail.com</p>
                  <p>+91 1234567890</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>

          <TableCell>Individual</TableCell>
          <TableCell>2024-10-15</TableCell>
          <TableCell>Green Energy Project</TableCell>

          <TableCell>50</TableCell>
          <TableCell>1000 OMR</TableCell>
          <TableCell>Active</TableCell>
          <TableCell className="text-center">
            <Select>
              <SelectTrigger className="w-[140px] mx-auto">
                <SelectValue placeholder="User 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">User 1</SelectItem>
                <SelectItem value="dark">User 2</SelectItem>
                <SelectItem value="system">User 3</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>Mapped</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>002</TableCell>
          <TableCell>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Sourav</TooltipTrigger>
                <TooltipContent>
                  <p>sourav0w@gmail.com</p>
                  <p>+91 1234567890</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>

          <TableCell>Company</TableCell>
          <TableCell>2024-09-25</TableCell>
          <TableCell>Forest Conservation</TableCell>

          <TableCell>100</TableCell>
          <TableCell>2000 OMR</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell className="text-center">
            <Select>
              <SelectTrigger className="w-[140px] mx-auto">
                <SelectValue placeholder="User 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">User 1</SelectItem>
                <SelectItem value="dark">User 2</SelectItem>
                <SelectItem value="system">User 3</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
