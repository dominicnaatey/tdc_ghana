
const API_BASE_URL = "https://admin.eurochamghana.eu";

async function testOldNews() {
  console.log('Testing access to old news article...');
  
  // 1. Test fetching specific ID (1)
  console.log('\n--- Test 1: GET /api/v1/posts/1 ---');
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/posts/1`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    if (res.ok) {
        const data = await res.json();
        console.log(`Success! Title: "${data.title}" (ID: ${data.id})`);
    } else {
        const text = await res.text();
        console.log('Error body:', text);
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }

  // 2. Test searching for the old slug
  const oldSlug = "agi-tema-branch-and-tdc-ghana-forge-strong-partnership-for-tema-development";
  console.log(`\n--- Test 2: GET /api/v1/posts?search=${oldSlug} ---`);
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/posts?search=${encodeURIComponent(oldSlug)}&per_page=100`);
    console.log(`Status: ${res.status} ${res.statusText}`);
    if (res.ok) {
        const data = await res.json();
        console.log(`Results count: ${data.data?.length}`);
        const match = data.data?.find(n => n.slug === oldSlug);
        if (match) {
            console.log('Success! Found in search results.');
        } else {
            console.log('Failed! Not found in search results.');
            if (data.data?.length > 0) {
                console.log('First result:', data.data[0].slug);
            }
        }
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

testOldNews();
