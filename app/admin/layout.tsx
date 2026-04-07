//@ts-nocheck
"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Link from "next/link";
import App from "next/app";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { useLogout } from "@/lib/hooks/useLogin";

const AdminLayout = ({ children }) => {
  const logoutMutation = useLogout();
  const handleLogout = (event) => {
    event.preventDefault();
    logoutMutation.mutate({});
  };
  return (
    <ProtectedRoutes>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="w-full">
          <div className="flex w-full h-16 items-center justify-between px-12 border-b-1 mb-8 shadow-[0_4px_2px_-3px_rgba(0,0,0,0.1)]">
            <Link href={"/"} className="text-xl font-bold">
              POS <span className="">DNEPAL</span>

            </Link>
            <div className="flex gap-8 items-center">
              <div>Settings</div>
              <div>User Profile</div>
              <button
                className="hover:cursor-pointer hover:bg-red-500 bg-red-300 px-6 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </ProtectedRoutes>
  );
};

export default AdminLayout;
