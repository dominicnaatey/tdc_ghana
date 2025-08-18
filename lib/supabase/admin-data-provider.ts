import { createClient } from './client'
import { createServerClient } from './server'

export interface NewsItem {
  id?: number
  title: string
  content: string
  excerpt?: string
  image_url?: string
  published: boolean
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface HousingProject {
  id?: number
  name: string
  description: string
  location: string
  price_range?: string
  bedrooms?: number
  bathrooms?: number
  square_footage?: number
  amenities?: string[]
  images?: string[]
  status: 'available' | 'sold_out' | 'coming_soon'
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface LandPlot {
  id?: number
  plot_number: string
  location: string
  size_acres?: number
  size_sqft?: number
  price?: number
  description?: string
  zoning?: string
  utilities?: string[]
  images?: string[]
  status: 'available' | 'reserved' | 'sold'
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface Project {
  id?: number
  name: string
  description: string
  location: string
  project_type?: string
  status: 'planning' | 'in_progress' | 'completed'
  start_date?: string
  completion_date?: string
  budget?: number
  images?: string[]
  documents?: string[]
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface Download {
  id?: number
  title: string
  description?: string
  file_url: string
  file_type?: string
  file_size?: number
  category?: string
  download_count: number
  public: boolean
  created_at?: string
  updated_at?: string
}

export interface ContactInquiry {
  id?: number
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  inquiry_type?: string
  status: 'new' | 'in_progress' | 'resolved'
  created_at?: string
  updated_at?: string
}

class AdminDataProvider {
  private supabase

  constructor(isServer = false) {
    this.supabase = isServer ? createServerClient() : createClient()
  }

  // News operations
  async getNews(filters?: { published?: boolean; featured?: boolean; limit?: number }) {
    let query = this.supabase.from('news').select('*').order('created_at', { ascending: false })
    
    if (filters?.published !== undefined) {
      query = query.eq('published', filters.published)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as NewsItem[]
  }

  async getNewsById(id: number) {
    const { data, error } = await this.supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as NewsItem
  }

  async createNews(news: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('news')
      .insert([news])
      .select()
      .single()
    
    if (error) throw error
    return data as NewsItem
  }

  async updateNews(id: number, updates: Partial<NewsItem>) {
    const { data, error } = await this.supabase
      .from('news')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as NewsItem
  }

  async deleteNews(id: number) {
    const { error } = await this.supabase
      .from('news')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Housing Projects operations
  async getHousingProjects(filters?: { status?: string; featured?: boolean; limit?: number }) {
    let query = this.supabase.from('housing_projects').select('*').order('created_at', { ascending: false })
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as HousingProject[]
  }

  async getHousingProjectById(id: number) {
    const { data, error } = await this.supabase
      .from('housing_projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as HousingProject
  }

  async createHousingProject(project: Omit<HousingProject, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('housing_projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data as HousingProject
  }

  async updateHousingProject(id: number, updates: Partial<HousingProject>) {
    const { data, error } = await this.supabase
      .from('housing_projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as HousingProject
  }

  async deleteHousingProject(id: number) {
    const { error } = await this.supabase
      .from('housing_projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Land Plots operations
  async getLandPlots(filters?: { status?: string; featured?: boolean; limit?: number }) {
    let query = this.supabase.from('land_plots').select('*').order('created_at', { ascending: false })
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as LandPlot[]
  }

  async getLandPlotById(id: number) {
    const { data, error } = await this.supabase
      .from('land_plots')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as LandPlot
  }

  async createLandPlot(plot: Omit<LandPlot, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('land_plots')
      .insert([plot])
      .select()
      .single()
    
    if (error) throw error
    return data as LandPlot
  }

  async updateLandPlot(id: number, updates: Partial<LandPlot>) {
    const { data, error } = await this.supabase
      .from('land_plots')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as LandPlot
  }

  async deleteLandPlot(id: number) {
    const { error } = await this.supabase
      .from('land_plots')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Projects operations
  async getProjects(filters?: { status?: string; featured?: boolean; limit?: number }) {
    let query = this.supabase.from('projects').select('*').order('created_at', { ascending: false })
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as Project[]
  }

  async getProjectById(id: number) {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Project
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data as Project
  }

  async updateProject(id: number, updates: Partial<Project>) {
    const { data, error } = await this.supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Project
  }

  async deleteProject(id: number) {
    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Downloads operations
  async getDownloads(filters?: { category?: string; public?: boolean; limit?: number }) {
    let query = this.supabase.from('downloads').select('*').order('created_at', { ascending: false })
    
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.public !== undefined) {
      query = query.eq('public', filters.public)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as Download[]
  }

  async getDownloadById(id: number) {
    const { data, error } = await this.supabase
      .from('downloads')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Download
  }

  async createDownload(download: Omit<Download, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('downloads')
      .insert([download])
      .select()
      .single()
    
    if (error) throw error
    return data as Download
  }

  async updateDownload(id: number, updates: Partial<Download>) {
    const { data, error } = await this.supabase
      .from('downloads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Download
  }

  async deleteDownload(id: number) {
    const { error } = await this.supabase
      .from('downloads')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  async incrementDownloadCount(id: number) {
    const { data, error } = await this.supabase
      .from('downloads')
      .update({ download_count: this.supabase.raw('download_count + 1') })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Download
  }

  // Contact Inquiries operations
  async getContactInquiries(filters?: { status?: string; inquiry_type?: string; limit?: number }) {
    let query = this.supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false })
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.inquiry_type) {
      query = query.eq('inquiry_type', filters.inquiry_type)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as ContactInquiry[]
  }

  async getContactInquiryById(id: number) {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as ContactInquiry
  }

  async createContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .insert([inquiry])
      .select()
      .single()
    
    if (error) throw error
    return data as ContactInquiry
  }

  async updateContactInquiry(id: number, updates: Partial<ContactInquiry>) {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as ContactInquiry
  }

  async deleteContactInquiry(id: number) {
    const { error } = await this.supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Dashboard statistics
  async getDashboardStats() {
    const [newsCount, housingCount, landCount, projectCount, inquiryCount] = await Promise.all([
      this.supabase.from('news').select('id', { count: 'exact', head: true }),
      this.supabase.from('housing_projects').select('id', { count: 'exact', head: true }),
      this.supabase.from('land_plots').select('id', { count: 'exact', head: true }),
      this.supabase.from('projects').select('id', { count: 'exact', head: true }),
      this.supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
    ])

    const recentInquiries = await this.getContactInquiries({ status: 'new', limit: 5 })
    const featuredNews = await this.getNews({ featured: true, limit: 3 })
    const activeProjects = await this.getProjects({ status: 'in_progress', limit: 5 })

    return {
      totalNews: newsCount.count || 0,
      totalHousingProjects: housingCount.count || 0,
      totalLandPlots: landCount.count || 0,
      totalProjects: projectCount.count || 0,
      totalInquiries: inquiryCount.count || 0,
      recentInquiries,
      featuredNews,
      activeProjects
    }
  }
}

export default AdminDataProvider