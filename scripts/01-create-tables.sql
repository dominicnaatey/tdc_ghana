-- Create tables for TDC Ghana Ltd website
-- This script sets up the core database structure

-- News and announcements table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Housing projects table
CREATE TABLE IF NOT EXISTS housing_projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  price_range VARCHAR(100),
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_footage INTEGER,
  amenities TEXT[],
  images TEXT[],
  status VARCHAR(50) DEFAULT 'available', -- available, sold_out, coming_soon
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Land plots table
CREATE TABLE IF NOT EXISTS land_plots (
  id SERIAL PRIMARY KEY,
  plot_number VARCHAR(50) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  size_acres DECIMAL(10,2),
  size_sqft INTEGER,
  price DECIMAL(12,2),
  description TEXT,
  zoning VARCHAR(100),
  utilities TEXT[],
  images TEXT[],
  status VARCHAR(50) DEFAULT 'available', -- available, reserved, sold
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Development projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  project_type VARCHAR(100), -- residential, commercial, infrastructure
  status VARCHAR(50) DEFAULT 'planning', -- planning, in_progress, completed
  start_date DATE,
  completion_date DATE,
  budget DECIMAL(15,2),
  images TEXT[],
  documents TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloads/documents table
CREATE TABLE IF NOT EXISTS downloads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50), -- pdf, doc, xlsx, etc.
  file_size INTEGER, -- in bytes
  category VARCHAR(100), -- forms, reports, policies, etc.
  download_count INTEGER DEFAULT 0,
  public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  inquiry_type VARCHAR(100), -- general, housing, land, project
  status VARCHAR(50) DEFAULT 'new', -- new, in_progress, resolved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_housing_status ON housing_projects(status);
CREATE INDEX IF NOT EXISTS idx_housing_featured ON housing_projects(featured);
CREATE INDEX IF NOT EXISTS idx_plots_status ON land_plots(status);
CREATE INDEX IF NOT EXISTS idx_plots_featured ON land_plots(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_downloads_category ON downloads(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON contact_inquiries(status, created_at DESC);
