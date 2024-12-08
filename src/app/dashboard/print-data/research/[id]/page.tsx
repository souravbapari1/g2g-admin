import PrintMe from "@/app/dashboard/academy/join-requests/view/[id]/PrintMe";
import apolloClient, { strApi } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import React from "react";
interface Data {
  researchPost: ResearchPost;
}

interface ResearchPost {
  title: string;
  description: string;
  content: string;
  previewImage: PreviewImage;
}

interface PreviewImage {
  url: string;
}

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  const research = await apolloClient.query<Data>({
    query: gql`
      query ResearchPost($documentId: ID!) {
        researchPost(documentId: $documentId) {
          documentId
          title
          description
          content
          previewImage {
            url
          }
        }
      }
    `,
    variables: {
      documentId: params.id,
    },
  });
  return (
    <div className="content pt-10 ">
      <PrintMe />
      <h1>{research.data?.researchPost.title}</h1>
      <p>{research.data?.researchPost.description}</p>
      <Image
        src={strApi + research.data?.researchPost.previewImage.url}
        alt={research.data?.researchPost.title}
        width={1000}
        height={500}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: research.data?.researchPost.content,
        }}
      />
    </div>
  );
}

export default page;
