import React from 'react'
import { Button } from "@/components/ui/button";
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import NotFound from '@/app/not-found';

interface SnippetDetailPageProps {
  params: { id: string }
}

export default async function SnippetDetailPage(props: SnippetDetailPageProps) {
  const { params } = await props;
  const id = Number(params.id);

  // Fetch the snippet from the database
  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return <NotFound />;
    
  }

  // a function to delete the snippet
  async function deleteSnippet() {
    "use server";
    await prisma.snippet.delete({
      where: { id },
    });
    redirect('/'); // Redirect to the home page after deletion
  }

  return (
    <div>
      {/* show the detail of the snippet */}
      <div>
        <p className="text-sm text-gray-500">ID: {snippet.id}</p>
        {/* show the title and code of the snippet */}
        <h1 className="font-bold text-2xl mb-4">{snippet.title}</h1>
        <pre className="bg-gray-100 p-2 rounded mb-4">{snippet.code}</pre>
        <Link href={`/`}>
          <Button>Back</Button>
        </Link>
        <Link href={`/snippets/${id}/edit`} className='ml-2'>
          <Button>Edit</Button>
        </Link>
        <Button variant="destructive" className="ml-2" onClick={deleteSnippet} >Delete</Button>
      </div>
    </div>
  );
}