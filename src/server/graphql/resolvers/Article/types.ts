import { Article } from "../../../lib/types";

export interface ArticleArgs {
  id: string;
}

export interface ArticlesArgs {
  limit: number;
  page: number;
}

export interface ArticlesData {
  total: number;
  result: Article[];
  totalCount: number;
}

export interface CreateArticleInput {
  title: string;
  content: Content;
  creator: string;
  public: boolean;
}

export interface Content {
  blocks: Blocks[];
  entityMap: any;
}

export interface EntityMapping {
  entityMap: EntityMap;
}

export interface Blocks {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: InlineStyleRanges[];
  entityRanges: EntityRanges[];
}

export interface EntityMap {
  type: string;
  mutability: string;
  data: DataInput;
}

export interface DataInput {
  src: string;
  width: string;
  alignment: string;
  height: string;
  url: string;
  targetOption: string;
}

export interface InlineStyleRanges {
  offset: number;
  length: number;
  style: string;
}

export interface EntityRanges {
  offset: number;
  length: number;
  key: number;
}

export interface CreateArticleArgs {
  input: CreateArticleInput;
}
