export function getBaseUrl(): { baseUrl: string } {
  
  if (typeof window !== 'undefined') {
    const { pathname } = window.location;
    const baseUrl = pathname.split('/').slice(0, -1).join('/');
    return { baseUrl };
  }

  return { baseUrl: '' };
}