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
    id: 59,
    title: "TDC Ghana Ltd Commences 2026 with Prayer and Thanksgiving",
    slug: "tdc-ghana-ltd-commences-2026-with-prayer-and-thanksgiving",
    content: `<p>TDC Ghana Ltd has held a prayer and thanksgiving session to usher in the new working year, 2026. The event, held at the company’s head office in Tema, brought together Management and Staff to thank God for a successful 2025 and to seek divine guidance for the year ahead.</p>
    <p>The Managing Director, Mr. Courage K. M. Nunekpeku, in his address, commended the staff for their hard work and dedication in the previous year, which saw the company achieving significant milestones. He urged them to continue to work with zeal and commitment to ensure that the company achieves its mandate of planning, developing and managing the Tema Acquisition Area.</p>
    <p>He also expressed gratitude to the Board of Directors, Clients, Contractors, and all partners of the company.</p>
    <p>Prophet Daniel Amoateng of Power of Worship International Ministries delivered an exhortation on spiritual growth, unity at the workplace, personal development, goal-setting, and perseverance. He encouraged staff to work in harmony and support one another for collective success.</p>
    <p>In his remarks, the Managing Director expressed appreciation to the Prophet and all participants, and encouraged staff to prioritize their health, regular medical check-ups, discipline, punctuality, and productivity. He also highlighted key ongoing and upcoming projects for 2026, including the Kaisei Flats, Oxygen City Project in Ho, and the planned Community 28 development in Kumasi, urging staff to demonstrate commitment and dedication towards achieving the company's strategic goals.</p>
    <p>The session ended with prayers and a renewed call for staff to remain spiritually grounded, disciplined, and united as TDC works to deliver excellence in the year 2026 and beyond.</p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/a38ac296-4000-406e-8e18-29191d15df93.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/24a7be59-9c0d-4b53-872d-81f7e0e51efd.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/5ffe0b13-3387-4ac2-a017-58e5845b119d.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/47540c20-c0f2-41b1-bf36-7d792b8155c7.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/f483536d-7a1f-40a7-9d2f-8995a29b52f7.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/d7cbb69c-7658-4bf0-abeb-3911f6568c99.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/78589b8d-a378-4f2d-8503-2d335b58b675.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/1697470f-18db-4cad-ac2c-5b07c1a3e38b.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/7ab389f1-d12e-41fd-8f41-0e295b6df494.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/6edc01d5-01ab-4f9a-86e3-c8bbe2b95663.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/fa62109e-6c09-4404-8ada-2d460d152d07.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/1fc390e1-865f-4502-949d-bc3ba8ac6153.jpeg" alt=""></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/8e0648ac-473e-4e2b-a104-0d71e2d1a098.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/ccd824fe-ec39-43f4-ad7f-97cd33fa52f9.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/253078bb-d1c3-4248-9f02-ebe16367bcf6.jpeg" alt=""></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/b6142a13-6701-4531-9b0d-d65d6f4ce73a.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/8abf4d73-6ca2-4286-9df7-e88b10b6cfb5.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/27544641-02d9-40ba-a8d1-7755bfb51cda.jpeg" alt=""></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/762c7b8c-0135-4f34-b861-686990bfb2ff.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/40107069-5622-4c5c-9b2f-d87bed3c5373.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/b0352267-f7cb-44f4-bfec-b762316aef4b.jpeg" alt=""></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/4e09fdba-d8b1-4f23-b46c-3528353c627f.jpeg" alt="" width="1358" height="905"></p>
    <p>&nbsp;</p>
    <p><img src="/storage/editor/2026/01/171e9620-a1da-421e-b138-c84755066360.jpeg" alt="" width="1358" height="905"></p>`,
    excerpt: "TDC Ghana Ltd has held a prayer and thanksgiving session to usher in the new working year, 2026. The event brought together Management and Staff to thank God for a successful 2025.",
    featured_image: "posts/7H4CwhQmGvqrJzQ3KQt0w3ZDYgcAsgzp0QujUWqG.jpg",
    status: "published",
    category: "Events",
    author: "TDC Ghana Communications",
    read_time: 5,
    published_at: "2026-01-05T10:30:00Z",
    featured: true
  },
  {
    id: 1,
    title: "AGI Tema Branch and TDC Ghana Forge Strong Partnership for Tema Development",
    slug: "agi-tema-branch-and-tdc-ghana-forge-strong-partnership-for-tema-development",
    content: `On Monday, 28 April 2025, the Tema branch of the Association of Ghana Industries (AGI) paid a courtesy call on Mr. Courage K. M. Nunekpeku, Managing Director of TDC Ghana Ltd. Led by AGI Tema Chair Dr. Eddie Akwetey, the six-member delegation explored opportunities for mutual engagement to the benefit of AGI members operating in Tema and on TDC’s estates.
    <p>Dr. Akwetey appealed to TDC to tap into AGI’s expertise as a catalyst for Tema’s development, stressing the value of closer collaboration. In turn, Mr. Nunekpeku commended AGI for initiating what he described as a “fruitful relationship” and urged members to meet their ground-rent obligation.</p>
    <p>Looking ahead, Mr. Nunekpeku announced plans to convene a broad stakeholder forum—co-hosted by TDC and the Tema Metropolitan Assembly—to devise a permanent solution to the city’s sewage challenges.</p> `,
    
    excerpt: "On Monday, 28 April 2025, the Tema branch of the Association of Ghana Industries (AGI) paid a courtesy call on Mr. Courage K. M. Nunekpeku, Managing Director of TDC Ghana Ltd.",
    featured_image: "/news/news6/Picture1.jpg",
    status: "published",
    category: "Events",
    author: "Mr. Daniel Oppong, Sales Director",
    read_time: 4,
    published_at: "2024-01-08T10:00:00Z",
    featured: false
  },
  {
    id: 2,
    title: "TDC Ghana Ltd Backs Plan B FM Community Soccer Gala",
    slug: "tdc-ghana-ltd-backs-plan-b-fm-community-soccer-gala",
    content: `<p>A delegation from FreeMinds Communication Limited, owners of Plan B FM, recently paid a visit to TDC Ghana Ltd to seek their support for an upcoming Community Soccer Gala. The team expressed interest in the company's participation in their educational programs to raise awareness about their activities and foster cooperation among Tema residents to build a better city.</p>
    <p>Leading the delegation, Chief Executive Madam Comfort Aniagyei highlighted the importance of a partnership between Plan B FM and TDC Ghana Ltd. She noted that TDC's reputation as a leading institution in creating and managing sustainable urban settlements would be further enhanced through a mutually beneficial partnership with Plan B FM.</p>
    <p>In response, the Managing Director of TDC Ghana Ltd commended Plan B FM for their good work and pledged to partner with them on developmental programs aimed at promoting good living in Tema.`,
    excerpt: "A delegation from FreeMinds Communication Limited, owners of Plan B FM, recently paid a visit to TDC Ghana Ltd to seek their support for an upcoming Community Soccer Gala. The team expressed interest in the company's participation in their educational programs to raise awareness about their activities and foster cooperation among Tema residents to build a better city.",
    featured_image: "/news/news5/Picture1.jpg",
    status: "published",
    category: "Infrastructure",
    author: "Eng. Patricia Adjei, Head of Infrastructure",
    read_time: 6,
    published_at: "2024-01-10T08:20:00Z",
    featured: true
  },
  {
    id: 3, 
    title: "TDC Ghana Ltd Joins in Honoring Workers at 2025 May Day Celebration",
    slug: "tdc-ghana-ltd-joins-in-honoring-workers-at-2025-may-day-celebration",
    content: `<p>TDC Ghana Ltd participated in the 2025 May Day Celebration, held at the historic Black Star Square, to commemorate and appreciate the invaluable contributions of workers.</p>
    
    <img src="/news/news4/Picture2.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news4/Picture3.jpg" class="w-full h-auto rounded-lg mt-6" />`,
    excerpt: "TDC Ghana Ltd participated in the 2025 May Day Celebration, held at the historic Black Star Square, to commemorate and appreciate the invaluable contributions of workers.",
    featured_image: "/news/news4/Picture1.jpg",
    status: "published",
    category: "Sustainability",
    author: "Eng. Kwame Asante, Head of Sustainable Development",
    read_time: 6,
    published_at: "2024-01-18T14:30:00Z",
    featured: true
  },
  {
    id: 4,
    title: "Commendation from the Bussa Ethnic Community",
    slug: "commendation-from-the-bussa-ethnic-community",
    content: `<p>A delegation from the Bussa Ethnic community in Tema, led by Chief Gibril Mahmoud Bancey III, paid a visit to the Managing Director of TDC Ghana Ltd, Mr. Courage K. M. Nunekpeku. The delegation came to commend him on his support to their community and on his appointment as Managing Director.</p>
    
    <p>In a moving display of appreciation, the delegation offered special prayers for the Managing Director's success.</p>
    <p>Mr. Nunekpeku expressed his gratitude for the visit and invited the delegation to continue offering guidance and counsel as he works to elevate the image of Tema.</p>
    <img src="/news/news3/Picture2.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news3/Picture3.jpg" class="w-full h-auto rounded-lg mt-6" />
    <img src="/news/news3/Picture4.jpg" class="w-full h-auto rounded-lg mt-6" />`,
    excerpt: "A delegation from the Bussa Ethnic community in Tema, led by Chief Gibril Mahmoud Bancey III, paid a visit to the Managing Director of TDC Ghana Ltd.",
    featured_image: "/news/news3/Picture1.jpg",

    status: "published",
    category: "Innovation",
    author: "Dr. Sarah Mensah, Chief Technology Officer",
    read_time: 8,
    published_at: "2024-01-20T09:00:00Z",
    featured: true
  },
  {
    id: 5,
    title: "Community 26 Kpone Affordable Housing Project",
    slug: "community-26-kpone-affordable-housing-project",
    content: `<p>TDC Ghana Ltd, is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale.</p>`,
    excerpt: "TDC Ghana Ltd, is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale.",
    featured_image: "/news/news2/Picture1.jpg",
    status: "published",
    category: "Housing",
    author: "TDC Ghana Sales Team",
    read_time: 3,
    published_at: "2024-01-24T14:00:00Z",
    featured: true
  },
  {
    id: 6,
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
  const norm = slug.trim().toLowerCase();
  return sampleNews.find(article => article.slug.trim().toLowerCase() === norm && article.status === 'published') ?? null;
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
