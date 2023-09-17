import { SearchTabType } from "./search";

export interface LawStoreRequest {
  type: SearchTabType;
  id: string | number;
}

export interface LawStoreResponse {
  bookmarkId: number;
}

export interface LawStoreGetRequest {
  type: SearchTabType;
  page: number;
  take: number;
}

export interface LawStoreGetResponse {}
