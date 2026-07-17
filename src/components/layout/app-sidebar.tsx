"use client";

import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { BanknoteIcon, CoinsIcon, LayoutDashboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItem = [
    {
        label: "Dashboard",
        icon: <LayoutDashboardIcon />,
        href: "/dashboard",
    },
    {
        label: "Transactions",
        icon: <BanknoteIcon />,
        href: "/dashboard/transaction",
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="gap-2 flex flex-row items-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard">
                                <CoinsIcon className="text-primary size-5!" />
                                <h1 className="text-2xl font-bold text-primary">Finance App</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItem.map((item) => (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.label}
                                    className={cn(
                                        "py-6 px-5 text-md",
                                        pathname === item.href
                                            ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-primary-foreground"
                                            : "",
                                    )}
                                >
                                    <Link href={item.href}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
