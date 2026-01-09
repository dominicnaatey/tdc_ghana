import fetch from 'node-fetch';

const API_BASE = 'https://admin.eurochamghana.eu';

async function testApi() {
  console.log('🔍 Testing API Connectivity...');
  console.log(`📡 Base URL: ${API_BASE}`);

  try {
    // 1. Fetch latest posts
    console.log('\n1️⃣ Fetching latest posts...');
    const response = await fetch(`${API_BASE}/api/posts?per_page=5`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Success! Found ${data.data?.length || 0} posts.`);
    
    if (data.data && data.data.length > 0) {
      const latest = data.data[0];
      console.log('📝 Latest Post:', {
        id: latest.id,
        title: latest.title,
        slug: latest.slug
      });

      // 2. Test Slug Search with the latest post's slug
      if (latest.slug) {
        console.log(`\n2️⃣ Testing search for slug: "${latest.slug}"...`);
        const searchResponse = await fetch(`${API_BASE}/api/posts?search=${encodeURIComponent(latest.slug)}`);
        const searchData = await searchResponse.json();
        
        const match = searchData.data?.find(n => n.slug === latest.slug);
        
        if (match) {
          console.log('✅ Slug search works! Item found.');
        } else {
          console.error('❌ Slug search FAILED. Item not found in search results.');
          console.log('Search results:', searchData.data?.map(n => ({ id: n.id, slug: n.slug })));
        }
      }
    } else {
      console.warn('⚠️ No posts returned from API.');
    }

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testApi();
