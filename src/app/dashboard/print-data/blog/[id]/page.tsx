import PrintMe from "@/app/dashboard/academy/join-requests/view/[id]/PrintMe";
import apolloClient, { strApi } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import React from "react";
interface Data {
  blogPost: BlogPost;
}

interface BlogPost {
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
  const blog = await apolloClient.query<Data>({
    query: gql`
      query BlogPost($documentId: ID!) {
        blogPost(documentId: $documentId) {
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
      <h1>{blog.data?.blogPost.title}</h1>
      <p>{blog.data?.blogPost.description}</p>
      <Image
        src={strApi + blog.data?.blogPost.previewImage.url}
        alt={blog.data?.blogPost.title}
        width={1000}
        height={500}
      />
      <div dangerouslySetInnerHTML={{ __html: blog.data?.blogPost.content }} />
    </div>
  );
}

export default page;
