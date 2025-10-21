export type News = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  is_published: boolean;
  published_at: string | null; // ISO datetime
  category_id: number | null;
  featured_image_path: string | null;
  read_time?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type Meta = {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
  sort: string;
  order: 'asc' | 'desc';
};

export type NewsResponse = {
  data: News[];
  meta: Meta;
};

export type ListParams = {
  page?: number;
  per_page?: number;
  search?: string;
  sort?: 'title' | 'published_at' | 'created_at';
  order?: 'asc' | 'desc';
};

export type CreateNewsPayload = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  is_published?: boolean;
  published_at?: string | null;
  category_id?: number | null;
  featured_image_path?: string | null;
  read_time?: number | null;
};

export type UpdateNewsPayload = Partial<CreateNewsPayload> & { id?: never };