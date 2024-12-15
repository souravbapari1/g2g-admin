// "use client";
// import { Button } from "@/components/ui/button";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
// import {
//   getPartner,
//   setStatusPartner,
// } from "@/request/worker/partnors/managePartners";
// import { updateUser } from "@/request/worker/users/manageUsers";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { useMutation, useQuery } from "react-query";
// import MyProjectsList from "./my-projects/MyProjects";

// function ViewPartnerData({
//   id,
//   userStatus,
// }: {
//   id: string;
//   userStatus: {
//     assignedProjects: number;
//     totalAmount: number;
//     totalOthersAmount: number;
//     totalTreeAmount: number;
//     totalTrees: number;
//   };
// }) {
//   const userData = useQuery({
//     queryKey: ["partnerData"],
//     queryFn: async () => {
//       return await getPartner(id);
//     },
//   });

// const update = useMutation({
//   mutationFn: async (id: string) => {
//     return await updateUser(id, {
//       isBlocked: !user?.isBlocked,
//     });
//   },
//   onSuccess: () => {
//     toast.dismiss();
//     toast.success("Status updated successfully");
//     userData.refetch();
//   },
//   onError: () => {
//     toast.dismiss();
//     toast.error("Something went wrong! Status not updated");
//   },
// });

//   if (userData.isLoading) {
//     return (
//       <div className="flex justify-center items-center w-full h-full">
//         <LoadingSpinner />
//       </div>
//     );
//   }
//   const user = userData.data;

//   return (
//     <div className="p-6 ">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Partner Details</h2>
//       {user ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* User Information Card */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Basic Information
//               </h3>
//               {user.isBlocked == false ? (
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => update.mutate(user.id)}
//                 >
//                   Set Inactive
//                 </Button>
//               ) : (
//                 <Button
//                   size="sm"
//                   variant="default"
//                   onClick={() => update.mutate(user.id)}
//                 >
//                   Set Active
//                 </Button>
//               )}
//             </div>
//             <div className="space-y-3">
//               <div>
//                 <h4 className="text-gray-500">Application Name</h4>
//                 <p className="text-gray-800">
//                   {` ${user.expand?.company?.mr_ms} ${user.expand?.company?.application_name}` ||
//                     "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-gray-500">User ID</h4>
//                 <p className="text-gray-800">{user.id || "N/A"}</p>
//               </div>
//               <div>
//                 <h4 className="text-gray-500">Account State</h4>
//                 <p className="text-gray-800">
//                   {user.isBlocked ? "InActive" : "Active"}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-gray-500">Email</h4>
//                 <p className="text-gray-800">{user.email || "N/A"}</p>
//               </div>
//               <div>
//                 <h4 className="text-gray-500">Mobile No</h4>
//                 <p className="text-gray-800">{user.mobile_no || "N/A"}</p>
//               </div>
//               <div>
//                 <h4 className="text-gray-500">User Type</h4>
//                 <p className="text-gray-800 uppercase ">
//                   {user.user_type || "N/A"}
//                 </p>
//               </div>

//               <div className="gris grid-cols-4 gap-5">
//                 {userStatus.assignedProjects != 0 && (
//                   <div>
//                     <h4 className="text-gray-500">Assigned Projects</h4>
//                     <p className="text-gray-800 uppercase ">
//                       {userStatus.assignedProjects || "N/A"}
//                     </p>
//                   </div>
//                 )}

//                 {userStatus.totalAmount != 0 && (
//                   <div>
//                     <h4 className="text-gray-500">Total Amount</h4>
//                     <p className="text-gray-800 uppercase ">
//                       {userStatus.totalAmount || "N/A"}
//                     </p>
//                   </div>
//                 )}

//                 {userStatus.totalTrees != 0 && (
//                   <div>
//                     <h4 className="text-gray-500">Total Trees</h4>
//                     <p className="text-gray-800 uppercase ">
//                       {userStatus.totalTrees || "N/A"}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Social Media Links */}

//               <div>
//                 <h4 className="text-gray-500">Social Media</h4>
//                 <div className="flex mt-2 gap-5">
//                   {user.twitter && (
//                     <Link
//                       href={user.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       Twitter
//                     </Link>
//                   )}
//                   {user.linkedin && (
//                     <Link
//                       href={user.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       LinkedIn
//                     </Link>
//                   )}
//                   {user.instagram && (
//                     <Link
//                       href={user.instagram}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       Instagram
//                     </Link>
//                   )}
//                   {user.youtube && (
//                     <Link
//                       href={user.youtube}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       YouTube
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Company Information Card */}
//           {user.expand?.company && (
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Company Information
//               </h3>
//               <div className="space-y-3">
//                 <div>
//                   <h4 className="text-gray-500">Company Name</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.company_name || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Industry Type</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.Industry_type || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Website</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.website || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Address</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.address || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Country</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.country || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Position</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.position || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-gray-500">Approved Status</h4>
//                   <p className="text-gray-800">
//                     {user.expand.company.approved_status || "N/A"}
//                   </p>
//                 </div>
//                 {user.expand.company.summery && (
//                   <div>
//                     <h4 className="text-gray-500">Company Summary</h4>
//                     <p className="text-gray-800">
//                       <p className="font-bold">
//                         Your Annual Bduget to acheive your Environmental and
//                         Social Goals / Marketing (OMR)
//                       </p>
//                       {user.expand.company.summery.annualBudget || "N/A"}
//                     </p>
//                     <p className="text-gray-800">
//                       <p className="font-bold">
//                         What are the most categories you are looking to consider
//                         ?
//                       </p>
//                       {user.expand.company.summery.categoriesConsider || "N/A"}
//                     </p>
//                     <p className="text-gray-800">
//                       <p className="font-bold">Other Comments:</p>
//                       {user.expand.company.summery.othersComment || "N/A"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="text-gray-600">No partner information found.</p>
//       )}

//       <div className="mt-10">
//         <MyProjectsList id={id} />
//       </div>
//     </div>
//   );
// }

// export default ViewPartnerData;

import React from "react";

function ViewPartnerData({
  id,
  userStatus,
}: {
  id: string;
  userStatus: {
    assignedProjects: number;
    totalAmount: number;
    totalOthersAmount: number;
    totalTreeAmount: number;
    totalTrees: number;
  };
}) {
  return <div className=""></div>;
}

export default ViewPartnerData;
