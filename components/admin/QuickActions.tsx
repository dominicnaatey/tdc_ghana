"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  FileText, 
  Home, 
  MapPin, 
  Download, 
  MessageSquare,
  Settings,
  Users
} from 'lucide-react';

export function QuickActions() {
  const quickActions = [
    {
      title: 'Add News Article',
      description: 'Create a new news article',
      icon: FileText,
      href: '/admin/news/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'New Housing Project',
      description: 'Add a housing project',
      icon: Home,
      href: '/admin/housing/new',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Add Land Plot',
      description: 'List a new land plot',
      icon: MapPin,
      href: '/admin/land/new',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Manage Downloads',
      description: 'Upload new documents',
      icon: Download,
      href: '/admin/downloads',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'View All Inquiries',
      description: 'Manage contact inquiries',
      icon: MessageSquare,
      href: '/admin/inquiries',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      title: 'User Management',
      description: 'Manage admin users',
      icon: Users,
      href: '/admin/users',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 justify-start hover:bg-gray-50 dark:hover:bg-gray-800"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg ${action.color} text-white flex-shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}