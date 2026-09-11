"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import InputError from "../Input/InputError";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return RQ;
  },
  { ssr: false, loading: () => <div>Loading editor...</div> },
);

const RichTextEditor = ({ value, onChange, error, label = "Description" }) => {
  // Define toolbar modules and formats for the editor
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    [],
  );

  const formats = ["header", "bold", "italic", "underline", "link", "list"];

  return (
    <div className="mt-4 rich-text-editor-wrapper">
      <label htmlFor="description" className="label label-text text-text">
        {label}
      </label>
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: error ? "#f87171" : "rgb(var(--border-color))",
          background: "rgb(var(--color-secondary))",
        }}
        id="description"
      >
        <ReactQuill
          theme="snow"
          value={value || ""}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Enter product description..."
        />
      </div>
      {error && <InputError>{error}</InputError>}

      <style jsx global>{`
        .rich-text-editor-wrapper .ql-toolbar {
          background-color: rgb(var(--color-secondary)) !important;
          border: none !important;
          border-bottom: 1px solid rgb(var(--border-color)) !important;
          padding: 8px 0 !important;
        }

        .rich-text-editor-wrapper .ql-container {
          background-color: rgb(var(--color-secondary)) !important;
          border: none !important;
          font-family: inherit;
        }

        .rich-text-editor-wrapper .ql-editor {
          background-color: rgb(var(--color-secondary));
          color: rgb(var(--color-text));
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          padding: 12px;
          line-height: 1.6;
        }

        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: rgba(var(--color-text), 0.4);
          left: 12px;
        }

        .rich-text-editor-wrapper .ql-toolbar button {
          color: rgb(var(--color-text));
          width: 25px;
          height: 25px;
          padding: 0;
          margin: 4px 2px;
        }

        .rich-text-editor-wrapper .ql-toolbar button:hover {
          color: #3b82f6;
        }

        .rich-text-editor-wrapper .ql-toolbar button.ql-active {
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
        }

        .rich-text-editor-wrapper
          .ql-toolbar.ql-snow
          .ql-picker.ql-expanded
          .ql-picker-options {
          background-color: rgb(var(--color-secondary)) !important;
          border: 1px solid rgb(var(--border-color)) !important;
          border-radius: 4px;
        }

        .rich-text-editor-wrapper .ql-toolbar.ql-snow .ql-stroke {
          stroke: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-toolbar.ql-snow .ql-fill {
          fill: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-toolbar.ql-snow .ql-picker-label {
          color: rgb(var(--color-text)) !important;
        }

        .rich-text-editor-wrapper .ql-toolbar button:hover .ql-stroke {
          stroke: #3b82f6;
        }

        .rich-text-editor-wrapper .ql-toolbar button:hover .ql-fill,
        .rich-text-editor-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #3b82f6;
        }

        .rich-text-editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #3b82f6;
        }

        .rich-text-editor-wrapper .ql-picker-item {
          color: rgb(var(--color-text)) !important;
        }

        .rich-text-editor-wrapper .ql-picker-item.ql-selected {
          color: #3b82f6 !important;
          background-color: rgba(59, 130, 246, 0.1) !important;
        }

        .rich-text-editor-wrapper .ql-picker-item:hover {
          color: #3b82f6 !important;
        }

        /* Editor content styles */
        .rich-text-editor-wrapper .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          color: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          color: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
          color: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-editor ul {
          margin: 0.5em 0 0.5em 1.5em;
          list-style-type: disc;
        }

        .rich-text-editor-wrapper .ql-editor ol {
          margin: 0.5em 0 0.5em 1.5em;
          list-style-type: decimal;
        }

        .rich-text-editor-wrapper .ql-editor li {
          margin-bottom: 0.25em;
          color: rgb(var(--color-text));
        }

        .rich-text-editor-wrapper .ql-editor a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .rich-text-editor-wrapper .ql-editor strong {
          font-weight: bold;
        }

        .rich-text-editor-wrapper .ql-editor em {
          font-style: italic;
        }

        .rich-text-editor-wrapper .ql-editor u {
          text-decoration: underline;
        }

        .rich-text-editor-wrapper .ql-editor p {
          color: rgb(var(--color-text));
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
