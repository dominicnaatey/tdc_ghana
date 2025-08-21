export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'published' | 'draft';
  category: string;
  author: string;
  read_time: number;
  published_at: string;
  featured: boolean;
}

export const sampleNews: NewsArticle[] = [
  {
    id: 1,
    title: "TDC Ghana Unveils Revolutionary Smart City Initiative",
    slug: "tdc-ghana-unveils-revolutionary-smart-city-initiative",
    content: `<h2>Transforming Urban Living Through Technology</h2>
    <p>Tema Development Corporation (TDC) Ghana is proud to announce the launch of our groundbreaking Smart City Initiative, a comprehensive program designed to revolutionize urban living in the Greater Accra Region. This ambitious project represents a significant leap forward in our commitment to sustainable development and technological innovation.</p>
    
    <h3>Key Features of the Smart City Initiative</h3>
    <p>Our Smart City Initiative encompasses several cutting-edge technologies and sustainable practices:</p>
    <ul>
    <li><strong>IoT Infrastructure:</strong> Implementation of Internet of Things (IoT) sensors throughout the city to monitor traffic, air quality, and energy consumption in real-time.</li>
    <li><strong>Smart Energy Grid:</strong> Integration of renewable energy sources with intelligent distribution systems to optimize power consumption and reduce carbon footprint.</li>
    <li><strong>Digital Governance:</strong> Launch of digital platforms for citizen services, making government interactions more efficient and transparent.</li>
    <li><strong>Intelligent Transportation:</strong> Development of smart traffic management systems and promotion of electric vehicle adoption.</li>
    </ul>
    
    <h3>Community Impact and Benefits</h3>
    <p>The Smart City Initiative will directly benefit over 500,000 residents by improving quality of life, reducing environmental impact, and creating new economic opportunities. We estimate the creation of over 2,000 direct jobs and 5,000 indirect employment opportunities.</p>
    
    <p>"This initiative represents our vision for the future of urban development in Ghana," said the Managing Director of TDC Ghana. "We are not just building infrastructure; we are creating intelligent, sustainable communities that will serve as a model for the entire West African region."</p>
    
    <h3>Implementation Timeline</h3>
    <p>The project will be implemented in three phases over the next five years, with the first phase focusing on core infrastructure development and pilot programs in select neighborhoods. Community engagement and stakeholder consultation will remain central to our approach throughout the implementation process.</p>`,
    excerpt: "TDC Ghana launches ambitious Smart City Initiative to transform urban living through IoT, renewable energy, and digital governance solutions.",
    featured_image: "/carousel/tdcaffd2.jpg",
    status: "published",
    category: "Innovation",
    author: "Dr. Sarah Mensah, Chief Technology Officer",
    read_time: 8,
    published_at: "2024-01-20T09:00:00Z",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Housing: TDC Ghana's Green Building Revolution",
    slug: "sustainable-housing-tdc-ghana-green-building-revolution",
    content: `<h2>Leading the Way in Eco-Friendly Construction</h2>
    <p>As climate change concerns continue to grow globally, TDC Ghana is taking decisive action by pioneering sustainable housing solutions that prioritize environmental responsibility without compromising on quality or affordability.</p>
    
    <h3>Our Green Building Standards</h3>
    <p>Every new TDC Ghana housing project now incorporates:</p>
    <ul>
    <li><strong>Solar Energy Systems:</strong> Rooftop solar panels providing up to 70% of household energy needs</li>
    <li><strong>Rainwater Harvesting:</strong> Integrated systems for collecting and purifying rainwater for domestic use</li>
    <li><strong>Energy-Efficient Design:</strong> Optimized building orientation and natural ventilation to reduce cooling costs</li>
    <li><strong>Sustainable Materials:</strong> Use of locally-sourced, eco-friendly building materials</li>
    <li><strong>Waste Management:</strong> Built-in composting and recycling facilities</li>
    </ul>
    
    <h3>Economic and Environmental Benefits</h3>
    <p>Our green building approach delivers significant long-term savings for homeowners, with average utility cost reductions of 40-60%. Additionally, these homes have a 50% lower carbon footprint compared to conventional construction.</p>
    
    <p>The initiative has already attracted international recognition, with the Ghana Green Building Council awarding TDC Ghana the "Sustainable Developer of the Year" award for our innovative approach to eco-friendly housing.</p>
    
    <h3>Future Expansion Plans</h3>
    <p>Building on the success of our pilot projects, TDC Ghana plans to expand green building standards to all new developments by 2025, making sustainable housing the norm rather than the exception in Ghana's real estate sector.</p>`,
    excerpt: "TDC Ghana revolutionizes housing with sustainable building practices, incorporating solar energy, rainwater harvesting, and eco-friendly materials.",
    featured_image: "/carousel/hf1.jpg",
    status: "published",
    category: "Sustainability",
    author: "Eng. Kwame Asante, Head of Sustainable Development",
    read_time: 6,
    published_at: "2024-01-18T14:30:00Z",
    featured: true
  },
  {
    id: 3,
    title: "Community Partnership Program: Empowering Local Businesses",
    slug: "community-partnership-program-empowering-local-businesses",
    content: `<h2>Building Stronger Communities Through Strategic Partnerships</h2>
    <p>TDC Ghana's Community Partnership Program represents our commitment to fostering economic growth and social development within the communities we serve. This comprehensive initiative focuses on empowering local businesses, supporting education, and promoting sustainable community development.</p>
    
    <h3>Program Components</h3>
    <p>Our multi-faceted approach includes:</p>
    
    <h4>Business Development Support</h4>
    <ul>
    <li>Microfinance partnerships providing low-interest loans to local entrepreneurs</li>
    <li>Business mentorship programs connecting experienced professionals with emerging businesses</li>
    <li>Skills training workshops in areas such as digital marketing, financial management, and customer service</li>
    <li>Market access facilitation through TDC Ghana's extensive network</li>
    </ul>
    
    <h4>Educational Initiatives</h4>
    <ul>
    <li>Scholarship programs for outstanding students from partner communities</li>
    <li>Infrastructure development in local schools</li>
    <li>Technology labs and computer literacy programs</li>
    <li>Vocational training centers offering practical skills development</li>
    </ul>
    
    <h3>Success Stories</h3>
    <p>Since launching the program in 2023, we have supported over 200 local businesses, created more than 1,500 jobs, and provided educational support to over 3,000 students. Notable success stories include:</p>
    
    <p><strong>Akosua's Catering Services:</strong> Started with a GHS 5,000 loan, now employs 15 people and serves major corporate clients.</p>
    
    <p><strong>Tema Tech Hub:</strong> A community-driven technology center that has trained over 500 young people in digital skills.</p>
    
    <h3>Looking Forward</h3>
    <p>TDC Ghana plans to expand the Community Partnership Program to reach 50 additional communities by 2025, with a target of supporting 1,000 new businesses and providing educational opportunities to 10,000 more students.</p>`,
    excerpt: "TDC Ghana's Community Partnership Program empowers local businesses through microfinance, mentorship, and skills training, creating lasting economic impact.",
    featured_image: "/carousel/cc1.jpg",
    status: "published",
    category: "Community",
    author: "Mrs. Abena Osei, Community Relations Manager",
    read_time: 7,
    published_at: "2024-01-15T11:15:00Z",
    featured: false
  },
  {
    id: 4,
    title: "Digital Transformation: TDC Ghana's New Customer Portal",
    slug: "digital-transformation-tdc-ghana-new-customer-portal",
    content: `<h2>Revolutionizing Customer Experience Through Technology</h2>
    <p>In our continuous effort to enhance customer satisfaction and streamline service delivery, TDC Ghana is excited to announce the launch of our comprehensive digital customer portal. This innovative platform represents a significant milestone in our digital transformation journey.</p>
    
    <h3>Portal Features and Capabilities</h3>
    <p>The new customer portal offers a wide range of features designed to make interactions with TDC Ghana more convenient and efficient:</p>
    
    <h4>Property Management</h4>
    <ul>
    <li>Real-time property search with advanced filtering options</li>
    <li>Virtual property tours using 360-degree photography</li>
    <li>Online application submission and document upload</li>
    <li>Payment processing and transaction history</li>
    <li>Maintenance request submission and tracking</li>
    </ul>
    
    <h4>Account Management</h4>
    <ul>
    <li>Comprehensive dashboard showing all customer interactions</li>
    <li>Document storage and retrieval system</li>
    <li>Automated notifications and reminders</li>
    <li>Direct communication channels with customer service</li>
    </ul>
    
    <h3>Enhanced Security and Privacy</h3>
    <p>Security is paramount in our digital platform. The portal features:</p>
    <ul>
    <li>Multi-factor authentication for secure access</li>
    <li>End-to-end encryption for all data transmission</li>
    <li>Regular security audits and updates</li>
    <li>GDPR-compliant data handling practices</li>
    </ul>
    
    <h3>Customer Feedback and Continuous Improvement</h3>
    <p>Early feedback from beta users has been overwhelmingly positive, with 95% of users rating the platform as "excellent" or "very good." Based on user suggestions, we continue to add new features and improvements monthly.</p>
    
    <p>"The new portal has transformed how we interact with our customers," said our Head of Digital Services. "What used to take days can now be accomplished in minutes, and our customers appreciate the convenience and transparency."</p>`,
    excerpt: "TDC Ghana launches comprehensive digital customer portal featuring property management, virtual tours, and enhanced security for improved customer experience.",
    featured_image: "/carousel/ho1.jpg",
    status: "published",
    category: "Technology",
    author: "Mr. Joseph Nkrumah, Head of Digital Services",
    read_time: 5,
    published_at: "2024-01-12T16:45:00Z",
    featured: false
  },
  {
    id: 5,
    title: "Infrastructure Development: New Road Networks Transform Connectivity",
    slug: "infrastructure-development-new-road-networks-transform-connectivity",
    content: `<h2>Enhancing Regional Connectivity Through Strategic Infrastructure</h2>
    <p>TDC Ghana's latest infrastructure development project marks a significant achievement in our mission to improve regional connectivity and economic development. The completion of our new road network system represents an investment of over GHS 50 million and will benefit thousands of residents and businesses.</p>
    
    <h3>Project Scope and Impact</h3>
    <p>The comprehensive road development project includes:</p>
    <ul>
    <li><strong>Primary Arterial Roads:</strong> 25 kilometers of new four-lane highways connecting major commercial centers</li>
    <li><strong>Secondary Distribution Roads:</strong> 40 kilometers of two-lane roads serving residential and mixed-use areas</li>
    <li><strong>Pedestrian Infrastructure:</strong> Sidewalks, crosswalks, and pedestrian bridges for safe foot traffic</li>
    <li><strong>Cycling Lanes:</strong> Dedicated bicycle paths promoting sustainable transportation</li>
    <li><strong>Smart Traffic Systems:</strong> Intelligent traffic lights and monitoring systems</li>
    </ul>
    
    <h3>Economic Benefits</h3>
    <p>The new road networks are expected to:</p>
    <ul>
    <li>Reduce travel time by up to 40% for daily commuters</li>
    <li>Lower transportation costs for businesses by 25%</li>
    <li>Attract new investments worth over GHS 200 million</li>
    <li>Create approximately 3,000 direct and indirect jobs</li>
    <li>Increase property values in connected areas by 15-20%</li>
    </ul>
    
    <h3>Environmental Considerations</h3>
    <p>Environmental sustainability was a key consideration throughout the project. We implemented:</p>
    <ul>
    <li>Eco-friendly construction materials and methods</li>
    <li>Comprehensive drainage systems to prevent flooding</li>
    <li>Tree planting initiatives along all new roads</li>
    <li>Wildlife corridors to protect local ecosystems</li>
    </ul>
    
    <p>The project has received commendation from the Ministry of Roads and Highways for its innovative approach to sustainable infrastructure development.</p>`,
    excerpt: "TDC Ghana completes major road network project worth GHS 50 million, improving regional connectivity and creating thousands of jobs.",
    featured_image: "/carousel/tl1.jpg",
    status: "published",
    category: "Infrastructure",
    author: "Eng. Patricia Adjei, Head of Infrastructure",
    read_time: 6,
    published_at: "2024-01-10T08:20:00Z",
    featured: true
  },
  {
    id: 6,
    title: "Annual Housing Fair 2024: Showcasing Affordable Living Solutions",
    slug: "annual-housing-fair-2024-showcasing-affordable-living-solutions",
    content: `<h2>Bringing Communities Together Through Housing Innovation</h2>
    <p>TDC Ghana's Annual Housing Fair 2024 was a resounding success, attracting over 10,000 visitors and showcasing our latest affordable housing solutions. The three-day event highlighted our commitment to making quality housing accessible to all Ghanaians.</p>
    
    <h3>Fair Highlights</h3>
    <p>This year's housing fair featured:</p>
    <ul>
    <li><strong>Model Home Tours:</strong> Visitors experienced our latest housing designs firsthand</li>
    <li><strong>Financing Workshops:</strong> Educational sessions on home ownership and mortgage options</li>
    <li><strong>Technology Demonstrations:</strong> Showcasing smart home features and energy-efficient systems</li>
    <li><strong>Community Engagement:</strong> Interactive sessions with local leaders and residents</li>
    <li><strong>Cultural Performances:</strong> Celebrating Ghanaian heritage and community spirit</li>
    </ul>
    
    <h3>New Product Launches</h3>
    <p>The fair served as the launch platform for several new initiatives:</p>
    <ul>
    <li>The "First Home" program offering zero down payment options for first-time buyers</li>
    <li>Eco-friendly housing units with 80% renewable energy integration</li>
    <li>Flexible payment plans tailored to different income levels</li>
    <li>Community-centered developments with shared amenities</li>
    </ul>
    
    <h3>Visitor Feedback and Impact</h3>
    <p>The overwhelming response from visitors was extremely positive, with 87% expressing strong interest in TDC Ghana housing projects. Over 2,500 visitors registered for follow-up consultations, and we received more than 800 preliminary applications during the event.</p>
    
    <p>"The housing fair exceeded our expectations," commented our Sales Director. "It's clear that there's tremendous demand for quality, affordable housing, and we're committed to meeting that need."</p>
    
    <h3>Looking Ahead</h3>
    <p>Based on the success of this year's fair, TDC Ghana plans to expand the event in 2025, with additional locations and extended programming to reach even more potential homeowners across Ghana.</p>`,
    excerpt: "TDC Ghana's Annual Housing Fair 2024 attracts 10,000+ visitors, showcasing affordable housing solutions and launching new homeownership programs.",
    featured_image: "/carousel/hf2.jpg",
    status: "published",
    category: "Events",
    author: "Mr. Daniel Oppong, Sales Director",
    read_time: 4,
    published_at: "2024-01-08T10:00:00Z",
    featured: false
  }
];

// Helper functions
export function getPublishedNews() {
  return sampleNews.filter(article => article.status === 'published');
}

export function getFeaturedNews() {
  return sampleNews.filter(article => article.featured && article.status === 'published');
}

export function getNewsBySlug(slug: string) {
  return sampleNews.find(article => article.slug === slug && article.status === 'published');
}

export function getRelatedNews(currentId: number, category: string, limit: number = 3) {
  return sampleNews
    .filter(article => 
      article.id !== currentId && 
      article.category === category && 
      article.status === 'published'
    )
    .slice(0, limit);
}

export function getNewsByCategory(category: string) {
  return sampleNews.filter(article => 
    article.category === category && article.status === 'published'
  );
}