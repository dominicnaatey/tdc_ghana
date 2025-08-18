import { useState, useEffect } from 'react'
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

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const data = await adminDataProvider.getNews(filters)
        setNews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [filters?.published, filters?.featured, filters?.limit])

  return { news, loading, error, refetch: () => fetchNews() }
}

export function useHousingProjects(filters?: { status?: string; featured?: boolean; limit?: number }) {
  const [projects, setProjects] = useState<HousingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await adminDataProvider.getHousingProjects(filters)
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch housing projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [filters?.status, filters?.featured, filters?.limit])

  return { projects, loading, error, refetch: () => fetchProjects() }
}

export function useLandPlots(filters?: { status?: string; featured?: boolean; limit?: number }) {
  const [plots, setPlots] = useState<LandPlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlots() {
      try {
        setLoading(true)
        const data = await adminDataProvider.getLandPlots(filters)
        setPlots(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch land plots')
      } finally {
        setLoading(false)
      }
    }

    fetchPlots()
  }, [filters?.status, filters?.featured, filters?.limit])

  return { plots, loading, error, refetch: () => fetchPlots() }
}

export function useContactInquiries(filters?: { status?: string; inquiry_type?: string; limit?: number }) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInquiries() {
      try {
        setLoading(true)
        const data = await adminDataProvider.getContactInquiries(filters)
        setInquiries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch inquiries')
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [filters?.status, filters?.inquiry_type, filters?.limit])

  return { inquiries, loading, error, refetch: () => fetchInquiries() }
}

export function useDashboardStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const data = await adminDataProvider.getDashboardStats()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error, refetch: () => fetchStats() }
}