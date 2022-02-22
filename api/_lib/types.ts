export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
  fileType: FileType;
  text: string;
  author?: string[];
  authorProfile?: string[];
  tags: string[];
  fontSize: string;
  url: string[];
}
