import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import SuperAdminSectionSidebar from "./superadmin-app-sidebar";
import MainSectionSidebar from "./main-app-sidebar";
import InventorySectionSidebar from "./inventory-app-sidebar";
import { useGetCurrentUser } from "@/lib/hooks/useLogin";
import CompanyAdminAppSidebar from "./companyadmin-app-sidebar";

export function AppSidebar() {
  const { data: currentUser } = useGetCurrentUser();
  if (currentUser?.role === "SUPER_ADMIN") {
    console.log("hello i am superadmin");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <MainSectionSidebar />
      </SidebarHeader>
      <SidebarContent>
        {currentUser?.role === "SUPER_ADMIN" ? (
          <SuperAdminSectionSidebar />
        ) : (
          ""
        )}
        {currentUser?.role === "COMPANY_ADMIN" ? (
          <CompanyAdminAppSidebar />
        ) : (
          ""
        )}
        <InventorySectionSidebar />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
