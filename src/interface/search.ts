const SEARCH_TAB_TYPES = ["prec", "statute"] as const;
export type SearchTabType = (typeof SEARCH_TAB_TYPES)[number];
export const SEARCH_TAB_INFOS: {
  label: string;
  value: SearchTabType;
}[] = [
  {
    label: "판례",
    value: "prec",
  },
  {
    label: "현행 법령",
    value: "statute",
  },
];

export interface LawsSearchRequest {
  q: string; // 검색어
  type: SearchTabType;
  page: number;
  size: number;
}

export interface Page<T> {
  list: T[];
  first: boolean;
  last: boolean;
  currentElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// --- 판례 상세 데이터 ---
interface PrecDetailData {
  type: "prec";
  // 판례 데이터
  판례정보일련번호: number;
  사건번호: string;
  사건종류명: string;
  판결유형: string;
  선고: string;
  법원명: string;
  선고일자: string;
  사건명: string;
  판례내용: string;
}

// --- 법령 상세 데이터 ---
interface Lawitem {
  // 목
  목번호: string;
  목내용: string;
}
interface LawSubparagraph {
  // 호
  호번호: string;
  호내용: string;
  목?: Lawitem | Lawitem[];
}
interface LawParagraph {
  // 항
  항번호: string;
  항내용: string;
  호?: LawSubparagraph | LawSubparagraph[];
}
interface LawArticle {
  // 조문단위
  _attributes?: {
    조문키: string; // 반환값에는 없음
  };
  조문키: string;
  조문번호: number;
  조문여부: string;
  조문제목?: string;
  조문시행일자: number;
  조문내용: string;
  항?: LawParagraph | LawParagraph[];
  조문참고자료?: string | string[];
}
interface LawAddendum {
  // 부칙단위
  부칙키: string;
  부칙공포일자: number;
  부칙공포번호: number;
  부칙내용: string[];
}
interface LawDetailData {
  type: "statute";
  // 법령 데이터
  기본정보: {
    법령ID: number;
    법령명_한글?: string; // 반환값에는 없음
    법령명: string;
    시행일자: number;
  };
  조문: {
    조문단위: LawArticle[];
  };
  부칙: {
    부칙단위: LawAddendum[];
  };
}

export type GetLawsResponseType<T extends SearchTabType> = T extends "prec"
  ? PrecDetailData
  : LawDetailData;

export type GetLawDetailResponseType<T extends SearchTabType> = T extends "prec"
  ? { type: "prec"; isBookmarked: boolean; lawInfo: PrecDetailData }
  : { type: "statute"; isBookmarked: boolean; lawInfo: LawDetailData };
