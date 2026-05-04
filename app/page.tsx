//@ts-nocheck
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between px-12 py-6 border-b">
        <div>POS DNEPAL</div>
        <Link href={"/admin"}>Admin Dashbaord</Link>
      </div>
      <div>hello</div>
    </div>
  );
}
