"use client";

import { useNews } from '@/lib/hooks/use-admin-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Star, Edit, Eye, Calendar } from 'lucide-react';
import Image from 'next/image';

export function FeaturedContent() {
  const { news, loading, error } = useNews({ featured: true, limit: 3 });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Featured Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Star className="h-5 w-5" />
            Featured Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading featured content: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Featured Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        {news.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No featured content yet</p>
            <Button variant="outline" className="mt-4">
              Create Featured Article
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((article) => (
              <div
                key={article.id}
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-32 bg-gray-200 dark:bg-gray-700">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Star className="h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={article.published ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.created_at && formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-2 w-2 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {news.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full">
              Manage All Content
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}