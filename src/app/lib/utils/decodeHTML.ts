import { decode } from 'he';

export function decodeHTML(html: string): string {
  return decode(html);
}


// export function decodeHTML(html: string): string {
//   return html
//     .replace(/&quot;/g, '"')
//     .replace(/&#039;/g, "'")
//     .replace(/&amp;/g, '&')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>');
// }