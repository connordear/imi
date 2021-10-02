export interface JishoSection {
  antonyms: string[];
  english_definitions: string[];
}

export interface JishoBase {
  senses: JishoSection[];
  slug: string;
}

export interface JishoResponse {
  data: JishoBase[];
}
