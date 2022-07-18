import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export const markdownToHtml = (markdown: string) =>
  sanitizeHtml(marked.parse(markdown));
