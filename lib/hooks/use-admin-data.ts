import { useState, useEffect, useCallback } from 'react'
import AdminDataProvider, { 
  NewsItem, 
  HousingProject, 
  LandPlot, 
  Project, 
  Download, 
  ContactInquiry 
} from '../supabase/admin-data-provider'

const adminDataProvider = new AdminDataProvider()

export function useAdminData() {
  return adminDataProvider
}

export function useNews(filters?: { published?: boolean; featured?: boolean; limit?: number }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminDataProvider.getNews(filters)
      setNews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }, [filters?.published, filters?.featured, filters?.limit])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { news, loading, error, refetch: fetchNews }
}

export function useHousingProjects(filters?: { status?: string; featured?: boolean; limit?: number }) {
  const [projects, setProjects] = useState<HousingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminDataProvider.getHousingProjects(filters)
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch housing projects')
    } finally {
      setLoading(false)
    }
  }, [filters?.status, filters?.featured, filters?.limit])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { projects, loading, error, refetch: fetchProjects }
}

export function useLandPlots(filters?: { status?: string; featured?: boolean; limit?: number }) {
  const [plots, setPlots] = useState<LandPlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlots = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminDataProvider.getLandPlots(filters)
      setPlots(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch land plots')
    } finally {
      setLoading(false)
    }
  }, [filters?.status, filters?.featured, filters?.limit])

  useEffect(() => {
    fetchPlots()
  }, [fetchPlots])

  return { plots, loading, error, refetch: fetchPlots }
}

export function useContactInquiries(filters?: { status?: string; inquiry_type?: string; limit?: number }) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminDataProvider.getContactInquiries(filters)
      setInquiries(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiries')
    } finally {
      setLoading(false)
    }
  }, [filters?.status, filters?.inquiry_type, filters?.limit])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  return { inquiries, loading, error, refetch: fetchInquiries }
}

export function useDashboardStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const data = await adminDataProvider.getDashboardStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}