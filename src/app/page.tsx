import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {



  const snippets = await prisma.snippet.findMany();
    

    // Fetch snippets from the database

  return (
    <div>
      <h1 className="font-bold text-2xl">Home</h1>
      <div  className="flex items-center justify-between mb-4" >
        <div className="text-lg font-semibold">
          Snippets
        </div>
        <Link href={'/snippets/new'}><Button>New</Button></Link>
      </div>

      {/* all snippets will be listed here */}
      <div>
      {
        snippets.map((snippet)=>(
          //every snippet title and a button to view the snippet
          <div key={snippet.id} className="border-1 p-4 mb-2 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{snippet.title}</h2>
            <Link href={`/snippets/${snippet.id}`}>
              <Button variant='link' className="mt-2">View</Button>
            </Link>
          </div>
          

        ))
          

      }
      </div>



    </div>
    
  );
}

