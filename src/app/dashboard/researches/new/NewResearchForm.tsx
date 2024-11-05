"use client";

import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { extractErrors } from "@/request/actions";
import { createResearch } from "@/request/worker/researches/manageResearches";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function NewResearchForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [published, setPublished] = React.useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleStatusChange = (e: string) => {
    setStatus(e);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublishedChange = () => {
    setPublished(!published);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required");
      return false;
    }

    if (!description) {
      toast.error("Description is required");
      return false;
    }

    if (!keywords) {
      toast.error("Keywords is required");
      return false;
    }

    if (!slug) {
      toast.error("Slug is required");
      return false;
    }

    if (!status) {
      toast.error("Status is required");
      return false;
    }

    if (!image) {
      toast.error("Image is required");
      return false;
    }
    setLoading(true);
    try {
      const res = await createResearch({
        title,
        description,
        keywords,
        slug,
        status,
        content,
        public: published,
        image,
      });
      toast.success("Research created successfully");
      //resetStates
      setTitle("");
      setDescription("");
      setKeywords("");
      setSlug("");
      setStatus("");
      setImage(null);
      setPublished(false);
      setContent("");
      router.back();
    } catch (error: any) {
      console.log(error);
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="">
        <TextEditor
          defaultContent={content}
          onChange={(e) => {
            setContent(e);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <Label>Research Title</Label>
          <Input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="">
          <Label>Research Description</Label>
          <Textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <Label>Research Image</Label>
            <Input type="file" onChange={handleImageChange} />
          </div>
          <div className="">
            <Label>Research Keywords</Label>
            <Input
              type="text"
              value={keywords}
              onChange={handleKeywordsChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <Label>Research Slug</Label>
            <Input type="text" value={slug} onChange={handleSlugChange} />
          </div>
          <div className="">
            <Label>Research Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="restoration">Restoration</SelectItem>
                <SelectItem value="planting">Planting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4 mt-3">
          <Switch checked={published} onClick={handlePublishedChange} />
          <p>Publish</p>
        </div>
        <div className="w-full mt-6">
          <Button disabled={loading} onClick={handleSubmit}>
            Save Research
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewResearchForm;
