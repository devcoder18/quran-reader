export function getBaseUrl(): { baseUrl: string } {
  const { pathname } = window.location;
  const baseUrl = pathname.split('/').slice(0, -1).join('/');
  return { baseUrl };
}