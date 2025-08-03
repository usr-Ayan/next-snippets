'use client';

import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import NotFound from "@/app/not-found";
import Loader from "@/components/ui/loader";

function EditSnippetPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [code, setCode] = useState("// Start editing...");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        
        const res = await axios.get(`/api/snippets/${id}`);
        setTitle(res.data.title);
        setCode(res.data.code);
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          alert("Snippet not found!");
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSnippet();
  }, [id]);

  if (loading) return <Loader />;
  if (notFound) return <NotFound />;

  return (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault();
      try {
        await axios.put(`/api/snippets/${id}`, { title, code });
        router.push(`/snippets/${id}`);
      } catch (err) {
        alert("Failed to save snippet.");
      }
    }}>
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Code</label>
        <MonacoEditor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={value => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <Button type="submit">Save Snippet</Button>
    </form>
  );
}

export default EditSnippetPage;