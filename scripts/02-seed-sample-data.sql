-- Seed sample data for TDC Ghana Ltd website
-- This script adds initial content for development and testing

-- Insert sample news articles
INSERT INTO news (title, content, excerpt, published, featured) VALUES
('TDC Ghana Launches New Affordable Housing Initiative', 
 'Tema Development Corporation is proud to announce the launch of our new affordable housing initiative aimed at providing quality homes for middle-income families in the Greater Accra Region. This comprehensive program will deliver over 500 housing units across three strategic locations within the next 24 months.

The initiative focuses on sustainable development practices, incorporating modern amenities while maintaining affordability. Each housing unit will feature energy-efficient designs, proper waste management systems, and access to essential utilities including water, electricity, and internet connectivity.

"We are committed to addressing the housing deficit in Ghana by providing affordable, quality homes that meet international standards," said the Managing Director of TDC Ghana. The project will create numerous employment opportunities for local contractors, artisans, and suppliers, contributing to the economic development of the region.',
 'TDC Ghana announces new affordable housing initiative to deliver 500+ quality homes for middle-income families.',
 true, true),

('Infrastructure Development Update: New Road Networks', 
 'TDC Ghana continues to invest in critical infrastructure development across our operational areas. The latest phase of our road network expansion project has been completed, improving connectivity and accessibility for residents and businesses.

The newly constructed roads feature modern drainage systems, street lighting, and pedestrian walkways. These improvements will enhance the quality of life for residents while supporting economic activities in the area. The project employed local labor and materials, demonstrating our commitment to community development.

Future phases will include additional road networks, bridges, and public transportation facilities to create a comprehensive infrastructure ecosystem.',
 'New road networks completed as part of TDC Ghana''s ongoing infrastructure development program.',
 true, false),

('Community Engagement: TDC Ghana Partners with Local Schools', 
 'As part of our corporate social responsibility initiatives, TDC Ghana has partnered with five local schools to improve educational infrastructure and provide learning resources. This partnership includes the construction of new classrooms, computer labs, and library facilities.

The program will benefit over 2,000 students and demonstrates our commitment to education and community development. We believe that investing in education is investing in Ghana''s future, and we are proud to contribute to the academic success of our young people.',
 'TDC Ghana partners with local schools to improve educational infrastructure and support student learning.',
 true, false);

-- Insert sample housing projects
INSERT INTO housing_projects (name, description, location, price_range, bedrooms, bathrooms, square_footage, amenities, status, featured) VALUES
('Tema Gardens Estate', 
 'A modern residential development featuring contemporary 3-bedroom townhouses with spacious living areas, modern kitchens, and private gardens. Located in a serene environment with 24/7 security, recreational facilities, and easy access to major highways.',
 'Tema, Greater Accra Region',
 'GHS 250,000 - GHS 350,000',
 3, 2, 1200,
 ARRAY['24/7 Security', 'Recreational Center', 'Children''s Playground', 'Parking Space', 'Modern Kitchen', 'Private Garden'],
 'available', true),

('Accra Heights Apartments', 
 'Luxury apartment complex offering 2 and 3-bedroom units with panoramic city views. Features include swimming pool, gym, business center, and underground parking.',
 'East Legon, Accra',
 'GHS 180,000 - GHS 280,000',
 2, 2, 950,
 ARRAY['Swimming Pool', 'Gym', 'Business Center', 'Underground Parking', 'City Views', 'Elevator Access'],
 'available', true),

('Community Villas', 
 'Affordable family homes designed for comfort and functionality. Each villa features 4 bedrooms, spacious living areas, and is located within a gated community with shared amenities.',
 'Spintex, Accra',
 'GHS 320,000 - GHS 420,000',
 4, 3, 1500,
 ARRAY['Gated Community', 'Shared Pool', 'Community Center', 'Security', 'Large Compound', 'Modern Fixtures'],
 'available', false);

-- Insert sample land plots
INSERT INTO land_plots (plot_number, location, size_acres, price, description, zoning, utilities, status, featured) VALUES
('TDC-001', 'Tema Industrial Area', 2.5, 150000.00, 
 'Prime commercial land suitable for industrial development. Located in the heart of Tema Industrial Area with excellent access to the port and major transportation routes.',
 'Industrial', ARRAY['Electricity', 'Water', 'Sewerage', 'Internet'], 'available', true),

('TDC-002', 'Spintex Road', 1.2, 95000.00,
 'Residential plot perfect for family home construction. Located in a developing residential area with good road access and proximity to schools and shopping centers.',
 'Residential', ARRAY['Electricity', 'Water', 'Internet'], 'available', true),

('TDC-003', 'East Legon Extension', 0.8, 120000.00,
 'Premium residential plot in upscale neighborhood. Ideal for luxury home development with easy access to amenities and major roads.',
 'Residential', ARRAY['Electricity', 'Water', 'Sewerage', 'Internet', 'Street Lighting'], 'available', false);

-- Insert sample projects
INSERT INTO projects (name, description, location, project_type, status, start_date, completion_date, budget, featured) VALUES
('Tema Port Expansion Support Infrastructure', 
 'Development of supporting infrastructure for the Tema Port expansion including access roads, utilities, and commercial facilities. This project will enhance Ghana''s trade capabilities and economic growth.',
 'Tema Port Area',
 'Infrastructure',
 'in_progress',
 '2024-01-15',
 '2025-06-30',
 5500000.00,
 true),

('Affordable Housing Complex - Phase 1', 
 'Construction of 200 affordable housing units designed to address the housing needs of middle-income families. The project includes community facilities and green spaces.',
 'Ashaiman',
 'Residential',
 'in_progress',
 '2024-03-01',
 '2025-12-31',
 8200000.00,
 true),

('Commercial District Development', 
 'Development of a modern commercial district featuring office buildings, retail spaces, and service facilities to support business growth in the region.',
 'Tema New Town',
 'Commercial',
 'planning',
 '2024-07-01',
 '2026-03-31',
 12000000.00,
 false);

-- Insert sample downloads
INSERT INTO downloads (title, description, file_url, file_type, category, public) VALUES
('Housing Application Form', 
 'Official application form for TDC Ghana housing projects. Please complete all sections and submit with required documents.',
 '/downloads/housing-application-form.pdf',
 'pdf',
 'Forms',
 true),

('Land Purchase Agreement Template', 
 'Standard agreement template for land purchases. Review terms and conditions before signing.',
 '/downloads/land-purchase-agreement.pdf',
 'pdf',
 'Legal Documents',
 true),

('TDC Ghana Annual Report 2023', 
 'Comprehensive annual report detailing our achievements, financial performance, and future plans.',
 '/downloads/annual-report-2023.pdf',
 'pdf',
 'Reports',
 true),

('Development Guidelines', 
 'Guidelines and requirements for property development within TDC Ghana managed areas.',
 '/downloads/development-guidelines.pdf',
 'pdf',
 'Policies',
 true);
