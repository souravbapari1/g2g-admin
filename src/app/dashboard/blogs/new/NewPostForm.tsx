"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { extractErrors } from "@/request/actions";
import { createBlog } from "@/request/worker/blog/manageBlog";
import { set } from "date-fns";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";

const TextEditor = dynamic(() => import("@/components/text-editor"), {
  ssr: false,
});
function NewPostForm() {
  const { blogCategoryListGlobal } = useGlobalDataSetContext();
  const [blogImage, setBlogImage] = React.useState<File | null>();
  const [blogTitle, setBlogTitle] = React.useState<string>("");
  const [blogDescription, setBlogDescription] = React.useState<string>("");
  const [blogKeywords, setBlogKeywords] = React.useState<string>("");
  const [blogSlug, setBlogSlug] = useState<string>("");
  const [blogContent, setBlogContent] = React.useState<string>("");
  const [publish, setPublish] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setBlogImage(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBlogDescription(e.target.value);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogKeywords(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setBlogContent(content);
  };

  const handlePublishChange = () => {
    setPublish((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();
    if (!blogImage) {
      toast.error("Blog Image is required");
      return false;
    }

    if (!blogTitle) {
      toast.error("Blog Title is required");
      return false;
    }

    if (!blogDescription) {
      toast.error("Blog Description is required");
      return false;
    }

    if (!blogKeywords) {
      toast.error("Blog Keywords is required");
      return false;
    }

    if (!blogSlug) {
      toast.error("Blog Slug is required");
      return false;
    }

    if (!blogContent) {
      toast.error("Blog Content is required");
      return false;
    }

    if (!publish) {
      toast.error("Blog Publish is required");
      return false;
    }

    try {
      toast.loading("Creating Blog...");

      setLoading(true);
      const res = await createBlog({
        title: blogTitle,
        description: blogDescription,
        keywords: blogKeywords,
        content: blogContent,
        slug: blogSlug,
        image: blogImage,
        category: category,
        public: publish,
      });

      toast.dismiss();

      setLoading(false);
      toast.success("Blog created successfully");
      // clear all state

      setBlogImage(null);
      setBlogTitle("");
      setBlogDescription("");
      setBlogKeywords("");
      setBlogSlug("");
      setBlogContent("");
      setPublish(false);
    } catch (error: any) {
      toast.dismiss();

      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex justify-between items-center gap-5">
          <div className="w-full">
            <label>Blog Image</label>
            <Input
              className="mt-2 w-full"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full">
            <label>Blog Title</label>
            <Input
              className="mt-2 w-full"
              value={blogTitle}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        <div className="">
          <label>Blog Description</label>
          <Textarea
            className="mt-2"
            value={blogDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex justify-between items-center gap-5">
          <div className="w-full">
            <label>Blog Keywords</label>
            <Input
              className="mt-2"
              value={blogKeywords}
              onChange={handleKeywordsChange}
            />
          </div>
          <div className="w-full">
            <label>
              Blog Url Slug <small>(ex: title-of-post)</small>
            </label>
            <Input
              className="mt-2"
              value={blogSlug}
              onChange={(e) => setBlogSlug(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label>Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {blogCategoryListGlobal?.map((item) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="">
          <label className="mb-2 block">Blog Content</label>
          <TextEditor
            defaultContent={blogContent}
            onChange={handleContentChange}
          />
        </div>
        <div className="">
          <div className="flex justify-start items-center gap-5">
            <Switch checked={publish} onCheckedChange={handlePublishChange} />
            <p>Publish</p>
          </div>
        </div>
        <div className="mt-10 mb-10">
          <Button disabled={loading} type="submit">
            Save Blog Post
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewPostForm;
