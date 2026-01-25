import fetch from 'node-fetch';

const API_BASE_URL = "https://admin.eurochamghana.eu";

async function testApi() {
  console.log('Fetching news list...');
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/posts?per_page=50&sort=published_at&order=desc`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    console.log(`Found ${data.data.length} articles.`);
    
    const slugMap = {};
    data.data.forEach(a => {
        if (a.slug) {
            slugMap[a.slug] = a.id;
            console.log(`- ${a.id}: ${a.slug}`);
        }
    });
    
    console.log('Map generated:', slugMap);
    
    // Test a specific slug that was failing
    const targetSlug = "tdc-ghana-ltd-commences-2026-with-prayer-and-thanksgiving";
    console.log(`Looking for ID for slug: ${targetSlug}`);
    
    // Normalize and search
    const norm = targetSlug.toLowerCase();
    const foundId = slugMap[targetSlug] || Object.entries(slugMap).find(([k,v]) => k.toLowerCase() === norm)?.[1];
    
    if (foundId) {
        console.log(`SUCCESS: Found ID ${foundId} for slug ${targetSlug}`);
    } else {
        console.log(`FAILURE: Could not find ID for slug ${targetSlug}`);
    }
    
  } catch (err) {
    console.error('Error:', err);
  }
}

testApi();
