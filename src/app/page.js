"use client";

import { useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  

  const router = useRouter();
  useEffect(() => {
    
    router.push("/dashboard", {replace: true});
  }, [])
  
  return (
    <main className="flex justify-center items-center min-h-screen bg-white p-6 max-w-xl mx-auto">
      LOADING...
    </main>
  );
}
