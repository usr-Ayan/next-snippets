import React from "react";
import prisma from "@/lib/prisma";
import EditSnippetForm from "@/components/EditSnippetForm";
import NotFound from "@/app/not-found";

interface EditSnippetPageProps {
  params: { id: string }
}

export default async function EditSnippetPage({ params }: EditSnippetPageProps) {
  const id = Number(params.id);

  // Fetch the snippet from the database
  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return <NotFound />;
  }

  return (
    <EditSnippetForm id={String(snippet.id)} title={snippet.title} code={snippet.code} />
  );
}