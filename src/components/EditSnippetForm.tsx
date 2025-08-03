"use client";
import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { saveSnippet } from "@/actions";
import { useRouter } from "next/navigation";

//here we cannot execute server side code directly,
//so we use a server action to save the snippet
//the only differnce between server action in client component and api call in client component is that
//for server action you import the function directly and call it,using parameters
//for api call you use fetch or axios to call the api endpoint
function EditSnippetForm({
    id,
    title,
    code,
}: {
    id: string;
    title: string;
    code: string;
}) {
    const [snippetCode, setCode] = useState(code);
    const [snippetTitle, setTitle] = useState(title);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await saveSnippet(Number(id), snippetCode);
            router.push(`/snippets/${id}`); // Redirect to the snippet detail page after saving

        } catch (error) {
            console.error("Error saving snippet:", error);
            alert("Failed to save snippet. Please try again.");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <h2 className="block mb-1 font-medium">{snippetTitle}</h2>
                
            </div>
            <div>
                <label className="block mb-1 font-medium">Code</label>
                <MonacoEditor
                    height="400px"
                    language="javascript"
                    theme="vs-dark"
                    value={snippetCode}
                    onChange={(value) => setCode(value || "")}
                />
            </div>
            <Button type="submit">Save Snippet</Button>
        </form>
    );
}

export default EditSnippetForm;