
const API_BASE_URL = "https://admin.eurochamghana.eu";
const OLD_ID = 1;
const OLD_SLUG = "agi-tema-branch-and-tdc-ghana-forge-strong-partnership-for-tema-development";

async function testEndpoint(name, url) {
  console.log(`\nTesting ${name}: ${url}`);
  try {
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            // Check if it looks like a single post or a list
            if (data.id === OLD_ID || (data.data && data.data.id === OLD_ID)) {
                console.log('SUCCESS! Found post by ID.');
                console.log('Title:', data.title || data.data.title);
            } else if (Array.isArray(data.data)) {
                 const match = data.data.find(p => p.id === OLD_ID || p.slug === OLD_SLUG);
                 if (match) {
                     console.log('SUCCESS! Found in list.');
                     console.log('Title:', match.title);
                 } else {
                     console.log('Not found in returned data.');
                     console.log('Returned data length:', data.data.length);
                 }
            } else {
                console.log('Response OK but structure unclear:', Object.keys(data));
            }
        } else {
            console.log('Response OK but not JSON (likely HTML 404 or page).');
        }
    } else {
        console.log('Request failed.');
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}

async function run() {
    // 1. Singular post
    await testEndpoint('Singular /post/:id', `${API_BASE_URL}/api/v1/post/${OLD_ID}`);
    
    // 2. Query param id
    await testEndpoint('Query /posts?id=:id', `${API_BASE_URL}/api/v1/posts?id=${OLD_ID}`);
    
    // 3. Query param slug
    await testEndpoint('Query /posts?slug=:slug', `${API_BASE_URL}/api/v1/posts?slug=${OLD_SLUG}`);
    
    // 4. Path param slug
    await testEndpoint('Path /posts/:slug', `${API_BASE_URL}/api/v1/posts/${OLD_SLUG}`);

    // 5. Filter param (common in some APIs)
    await testEndpoint('Filter /posts?filter[slug]=:slug', `${API_BASE_URL}/api/v1/posts?filter[slug]=${OLD_SLUG}`);
}

run();
