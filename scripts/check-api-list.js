
const API_BASE_URL = "https://admin.eurochamghana.eu";

async function listNews() {
  console.log('Fetching news list...');
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/posts?per_page=100&sort=published_at&order=desc`);
    if (!res.ok) {
      console.error('API Error:', res.status, res.statusText);
      return;
    }
    const data = await res.json();
    console.log('Total data length:', data.data?.length);
    
    if (data.data) {
        data.data.forEach(item => {
            console.log(`- [${item.id}] ${item.slug}`);
        });
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

listNews();
