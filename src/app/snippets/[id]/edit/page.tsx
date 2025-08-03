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
//iha hum chahte tho the ki monaco editor lae or server side code chalake code and title fetch karke
//usko edit karne de, lekin monaco bas client side pe hi kaam karta hai to humne 
//iha bus code or title fetch kiya  or EditSnippetForm  nam ke client component banaya jisme
//monaco editor use kiya or usme code or title ko as a props pass kiya
//EditSnippetForm me humne server action use kiya saveSnippet ko call karne ke
//or save bhi to ab uha karna tha per EditSnippetForm client component hai to directly
//server side code nahi chala sakte, isliye server action use kiya
//ak alag folder banake usme saveSnippet function banaya
//or usko import karke use kiya EditSnippetForm me or usko call kiya using title and code