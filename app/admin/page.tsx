"use client";

import { OverviewCardsGroup } from '@/components/admin/OverviewCardsGroup';
import { RecentInquiries } from '@/components/admin/RecentInquiries';
import { QuickActions } from '@/components/admin/QuickActions';
import { FeaturedContent } from '@/components/admin/FeaturedContent';

export default function AdminPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your TDC Ghana admin dashboard
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCardsGroup />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Inquiries - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentInquiries />
        </div>
        
        {/* Quick Actions - Takes 1 column */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Featured Content */}
      <FeaturedContent />
    </div>
  );
}
