"use client";
import React, { useState, useRef, memo, useEffect } from "react";
import JoditEditor, { IJoditEditorProps } from "jodit-react";

const TextEditor = ({
  defaultContent,
  onChange,
  className,
}: {
  defaultContent: string;
  onChange: (content: string) => void;
  className?: string;
}) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config: IJoditEditorProps["config"] = {
    height: 500,
    theme: "light",
    disablePlugins: "ai-assistant",
  };

  useEffect(() => {
    setContent(defaultContent);
  }, []);

  useEffect(() => {
    onChange(content);
  }, [content]);

  return (
    <JoditEditor
      className={className}
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
    />
  );
};

export default memo(TextEditor);
