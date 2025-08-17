-- Enable Row Level Security (RLS) for Supabase
-- This script sets up security policies for the TDC Ghana website

-- Enable RLS on all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE housing_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published news" ON news
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view available housing projects" ON housing_projects
  FOR SELECT USING (true);

CREATE POLICY "Public can view available land plots" ON land_plots
  FOR SELECT USING (true);

CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public can view public downloads" ON downloads
  FOR SELECT USING (public = true);

-- Allow anyone to insert contact inquiries
CREATE POLICY "Anyone can submit contact inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Admin policies (will be updated when auth is implemented)
-- For now, allow authenticated users full access to manage content
CREATE POLICY "Authenticated users can manage news" ON news
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage housing projects" ON housing_projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage land plots" ON land_plots
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage downloads" ON downloads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view all inquiries" ON contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update inquiry status" ON contact_inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');
