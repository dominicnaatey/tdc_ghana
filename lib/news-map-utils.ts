// Utility to map news slugs to IDs for static export and fallback
// Designed to be safe for both server and client usage

export async function saveNewsMap(slugMap: Record<string, number>) {
  if (typeof window !== 'undefined') return; // Server only

  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const ROOT_MAP_PATH = path.join(process.cwd(), 'news-slug-map.json');
    const PUBLIC_MAP_PATH = path.join(process.cwd(), 'public', 'news-slug-map.json');

    const content = JSON.stringify(slugMap, null, 2);
    
    // Save to root (for server-side/build usage)
    fs.writeFileSync(ROOT_MAP_PATH, content);
    
    // Save to public (for client-side usage)
    const publicDir = path.dirname(PUBLIC_MAP_PATH);
    if (fs.existsSync(publicDir)) {
        fs.writeFileSync(PUBLIC_MAP_PATH, content);
    }
    
    console.log(`[news-map] Saved ${Object.keys(slugMap).length} slugs to map (root and public)`);
  } catch (error) {
    console.warn('[news-map] Failed to save news map:', error);
  }
}

export async function getNewsIdFromMap(slug: string): Promise<number | null> {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  // Client-side: Fetch from public JSON
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/news-slug-map.json');
      if (res.ok) {
        const map = await res.json();
        // Try exact match
        if (map[normalizedSlug]) return map[normalizedSlug];
        // Try case-insensitive key match
        const key = Object.keys(map).find(k => k.toLowerCase() === normalizedSlug);
        if (key) return map[key];
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
         console.warn('[news-map] Client-side fetch failed:', e);
      }
    }
    return null;
  }

  // Server-side: Read from file
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const ROOT_MAP_PATH = path.join(process.cwd(), 'news-slug-map.json');
    const PUBLIC_MAP_PATH = path.join(process.cwd(), 'public', 'news-slug-map.json');
    
    let content: string | null = null;
    
    if (fs.existsSync(ROOT_MAP_PATH)) {
      content = fs.readFileSync(ROOT_MAP_PATH, 'utf8');
    } else if (fs.existsSync(PUBLIC_MAP_PATH)) {
      content = fs.readFileSync(PUBLIC_MAP_PATH, 'utf8');
    }

    if (content) {
      const map = JSON.parse(content);
      
      // Try exact match
      if (map[normalizedSlug]) {
        return map[normalizedSlug];
      }
      
      // Try finding key that matches
      const key = Object.keys(map).find(k => k.toLowerCase() === normalizedSlug);
      if (key) {
        return map[key];
      }
    }
  } catch (error) {
    console.warn('[news-map] Failed to read news map:', error);
  }
  return null;
}
