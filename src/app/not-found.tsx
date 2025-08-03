import Link from 'next/link'
import { Button } from '@/components/ui/button'
 
export default function NotFound() {
  return (
 
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <p className="text-lg mb-6">Could not find the requested resource.</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}