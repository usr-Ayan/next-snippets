import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import prisma from "@/lib/prisma"; // Adjust the import path as necessary
import { redirect } from 'next/navigation';

function CreateSnippetPage() {

    async function createSnippet(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const code = formData.get("code") as string;
            
        const snippet=await prisma.snippet.create({
            data:{
                title,
                code
            }
        });
        console.log("Snippet created:", snippet);
        redirect('/'); // Redirect to the home page after creation
    }




  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Create Snippet</h1>
      <form className="space-y-4" action={createSnippet} >
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input type="text" name="title" id="title" placeholder="Enter snippet title" required />
        </div>
        
       

        <div>
          <label className="block text-sm font-medium mb-2">Code</label>
          <Textarea placeholder="Enter your code snippet" rows={10} name="code" id='code' required/>
        </div>

        <Button type="submit">Create Snippet</Button>
        
      </form>
    
    </div>
    
  )
}

export default CreateSnippetPage;