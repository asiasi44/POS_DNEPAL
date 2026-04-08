import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { PersonStanding } from "lucide-react";

const superAdminItems = [
  {
    title: "Staffs",
    url: "/admin/staffs",
    icon: PersonStanding,
  },
];

const CompanyAdminAppSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Company Admin</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {superAdminItems.map((item) => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 w-full"
                  >
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default CompanyAdminAppSidebar;
