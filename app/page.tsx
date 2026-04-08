//@ts-nocheck
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex w-full h-16 items-center justify-between px-12">
        <div className="text-xl font-bold">
          POS <span className="">DNEPAL</span>
        </div>
        <div className="flex gap-8">
          <Link href="/admin">Admin Dashboard</Link>
        </div>
      </div>
      <div>hello</div>
    </div>
  );
}
