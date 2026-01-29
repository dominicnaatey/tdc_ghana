
const API_BASE_URL = "https://admin.eurochamghana.eu";
const OLD_SLUG = "agi-tema-branch-and-tdc-ghana-forge-strong-partnership-for-tema-development";

async function verifySlugEndpoint() {
  const url = `${API_BASE_URL}/api/v1/posts/${OLD_SLUG}`;
  console.log(`Fetching: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Keys:', Object.keys(data));
    if (data.data) {
        console.log('Data keys:', Object.keys(data.data));
        console.log('Title:', data.data.title);
        console.log('ID:', data.data.id);
        console.log('Content length:', data.data.content ? data.data.content.length : 'N/A');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

verifySlugEndpoint();
