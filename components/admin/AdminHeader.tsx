"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useSidebarContext } from './SidebarContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface AdminHeaderProps {
  user: any;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-700 lg:hidden"
      >
        <span className="text-xl">☰</span>
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <div className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src="/tdc_logo.png"
            width={32}
            height={32}
            alt="TDC Ghana"
            className="rounded"
          />
        </div>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="font-medium text-gray-600 dark:text-gray-400">TDC Ghana Management System</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search..."
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-50 py-3 pl-12 pr-5 outline-none transition-colors focus-visible:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:border-blue-400"
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Image
                src="/placeholder-user.jpg"
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">Admin User</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}