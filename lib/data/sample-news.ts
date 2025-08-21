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
    title: "TDC Rent Payment made Easy - Pay through Mobile Phone",
    slug: "tdc-rent-payment-made-easy-pay-through-mobile-phone",
    content: `<h2>TDC Rent Payment made Easy - Pay through Mobile Phone</h2>
    
    <p>TDC Development Company Limited, in collaboration with GT Bank Ghana Limited, has made it very easy to have your ground rent, house rent and shop rent paid.</p>
    
    <p>All you need to do is dial the short code <strong>*737*46#</strong> on your mobile phone and follow the prompts to pay your rent.</p>
    
    <p>Alternatively, you can:</p>
    <ul>
    <li>Visit myghpay.com and pay with your bank debit or credit card,</li>
    <li>Pay by AirtelTigo Money, MTN Mobile Money or Vodafone Cash,</li>
    <li>Pay through your GT Bank Account.</li>
    </ul>
    
    <p>For further enquiries, kindly contact:</p>
    <div class="bg-gray-50 p-4 rounded-lg my-4">
    <p><strong>Lionel (GT Bank)</strong><br>
    Phone: <a href="tel:0501449481" class="text-blue-600 hover:underline">0501 449 481</a></p>
    </div>
    
    <img src="/news/news1/GT Bank Payment_full.jpg" alt="GT Bank Payment Full Details" class="w-full h-auto rounded-lg mt-6" />`,
    excerpt: "TDC Ghana partners with GT Bank to make rent payments easier through mobile phone, offering multiple convenient payment options including mobile money and online platforms.",
    featured_image: "/news/news1/GT Bank Payment_intro.jpg",
    status: "published",
    category: "Services",
    author: "TDC Ghana Communications Team",
    read_time: 3,
    published_at: "2024-01-25T10:00:00Z",
    featured: true
  },
  {
    id: 2,
    title: "Community 26 Kpone Affordable Housing Project",
    slug: "community-26-kpone-affordable-housing-project",
    content: `<p>TDC Ghana Ltd, is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale.</p>`,
    excerpt: "",
    featured_image: "/news/news2/Picture1.jpg",
    status: "published",
    category: "Housing",
    author: "TDC Ghana Sales Team",
    read_time: 3,
    published_at: "2024-01-24T14:00:00Z",
    featured: true
  },
  {
    id: 3,
    title: "Commendation from the Bussa Ethnic Community",
    slug: "commendation-from-the-bussa-ethnic-community",
    content: `<p>A delegation from the Bussa Ethnic community in Tema, led by Chief Gibril Mahmoud Bancey III, paid a visit to the Managing Director of TDC Ghana Ltd, Mr. Courage K. M. Nunekpeku. The delegation came to commend him on his support to their community and on his appointment as Managing Director.</p>
    
    <p>In a moving display of appreciation, the delegation offered special prayers for the Managing Director's success.</p>
    <p>Mr. Nunekpeku expressed his gratitude for the visit and invited the delegation to continue offering guidance and counsel as he works to elevate the image of Tema.</p>
    <img src="/news/news3/Picture2.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news3/Picture3.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news3/Picture4.jpg" class="w-full h-auto rounded-lg mt-6" />`,
    excerpt: "",
    featured_image: "/news/news3/Picture1.jpg",

    status: "published",
    category: "Innovation",
    author: "Dr. Sarah Mensah, Chief Technology Officer",
    read_time: 8,
    published_at: "2024-01-20T09:00:00Z",
    featured: true
  },
  {
    id: 4, 
    title: "TDC Ghana Ltd Joins in Honoring Workers at 2025 May Day Celebration",
    slug: "tdc-ghana-ltd-joins-in-honoring-workers-at-2025-may-day-celebration",
    content: `<p>TDC Ghana Ltd participated in the 2025 May Day Celebration, held at the historic Black Star Square, to commemorate and appreciate the invaluable contributions of workers.</p>
    
    <img src="/news/news4/Picture2.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news4/Picture3.jpg" class="w-full h-auto rounded-lg mt-6" />`,
    excerpt: "",
    featured_image: "/news/news4/Picture1.jpg",
    status: "published",
    category: "Sustainability",
    author: "Eng. Kwame Asante, Head of Sustainable Development",
    read_time: 6,
    published_at: "2024-01-18T14:30:00Z",
    featured: true
  },
  {
    id: 5,
    title: "TDC Ghana Ltd Backs Plan B FM Community Soccer Gala",
    slug: "tdc-ghana-ltd-backs-plan-b-fm-community-soccer-gala",
    content: `<p>A delegation from FreeMinds Communication Limited, owners of Plan B FM, recently paid a visit to TDC Ghana Ltd to seek their support for an upcoming Community Soccer Gala. The team expressed interest in the company's participation in their educational programs to raise awareness about their activities and foster cooperation among Tema residents to build a better city.</p>
    <p>Leading the delegation, Chief Executive Madam Comfort Aniagyei highlighted the importance of a partnership between Plan B FM and TDC Ghana Ltd. She noted that TDC's reputation as a leading institution in creating and managing sustainable urban settlements would be further enhanced through a mutually beneficial partnership with Plan B FM.</p>
    <p>In response, the Managing Director of TDC Ghana Ltd commended Plan B FM for their good work and pledged to partner with them on developmental programs aimed at promoting good living in Tema.`,
    excerpt: "",
    featured_image: "/news/news5/Picture1.jpg",
    status: "published",
    category: "Infrastructure",
    author: "Eng. Patricia Adjei, Head of Infrastructure",
    read_time: 6,
    published_at: "2024-01-10T08:20:00Z",
    featured: true
  },
  {
    id: 6,
    title: "AGI Tema Branch and TDC Ghana Forge Strong Partnership for Tema Development",
    slug: "agi-tema-branch-and-tdc-ghana-forge-strong-partnership-for-tema-development",
    content: `On Monday, 28 April 2025, the Tema branch of the Association of Ghana Industries (AGI) paid a courtesy call on Mr. Courage K. M. Nunekpeku, Managing Director of TDC Ghana Ltd. Led by AGI Tema Chair Dr. Eddie Akwetey, the six-member delegation explored opportunities for mutual engagement to the benefit of AGI members operating in Tema and on TDC’s estates.
    <p>Dr. Akwetey appealed to TDC to tap into AGI’s expertise as a catalyst for Tema’s development, stressing the value of closer collaboration. In turn, Mr. Nunekpeku commended AGI for initiating what he described as a “fruitful relationship” and urged members to meet their ground-rent obligation.</p>
    <p>Looking ahead, Mr. Nunekpeku announced plans to convene a broad stakeholder forum—co-hosted by TDC and the Tema Metropolitan Assembly—to devise a permanent solution to the city’s sewage challenges.</p> `,
    
    excerpt: "",
    featured_image: "/news/news6/Picture1.jpg",
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