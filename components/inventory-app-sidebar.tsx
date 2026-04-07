//@ts-nocheck
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

import { Package } from "lucide-react";
import { MdCategory } from "react-icons/md";

const inventoryItems = [
  {
    title: "Product",
    url: "/admin/product",
    icon: Package,
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: MdCategory
  },
  {
    title: "Stocks",
    url: "/admin/stocks",
    icon: MdCategory
  },
  {
    title: "Brands",
    url: "/admin/brand",
    icon: MdCategory
  }
];

const InventorySectionSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Inventory</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {inventoryItems.map((item) => {
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

export default InventorySectionSidebar;
