import type { Language } from "./translations"

export interface SearchItem {
  id: string
  title: string
  titleKor?: string
  description: string
  descriptionKor?: string
  href: string
  category: "component" | "foundation" | "getting-started"
  keywords?: string[]
  keywordsKor?: string[]
}

export const searchData: SearchItem[] = [
  // Getting Started
  {
    id: "getting-started",
    title: "Getting Started",
    titleKor: "시작하기",
    description: "Installation and quick start guide for the MSQ Design System",
    descriptionKor: "MSQ 디자인 시스템 설치 및 빠른 시작 가이드",
    href: "/docs",
    category: "getting-started",
    keywords: ["install", "setup", "quick start", "introduction"],
    keywordsKor: ["설치", "설정", "빠른 시작", "소개"],
  },
  
  // Components
  {
    id: "button",
    title: "Button",
    titleKor: "버튼",
    description: "A versatile button component with multiple variants and sizes",
    descriptionKor: "다양한 변형과 크기를 가진 다용도 버튼 컴포넌트",
    href: "/docs/components/button",
    category: "component",
    keywords: ["button", "click", "action", "primary", "secondary", "outline"],
    keywordsKor: ["버튼", "클릭", "액션"],
  },
  {
    id: "social-button",
    title: "Social Button",
    titleKor: "소셜 버튼",
    description: "Social login buttons for Google, Facebook, Apple, and Twitter",
    descriptionKor: "Google, Facebook, Apple, Twitter용 소셜 로그인 버튼",
    href: "/docs/components/social-button",
    category: "component",
    keywords: ["social", "login", "google", "facebook", "apple", "twitter", "oauth"],
    keywordsKor: ["소셜", "로그인", "구글", "페이스북", "애플", "트위터"],
  },
  {
    id: "language-button",
    title: "Language Button",
    titleKor: "언어 버튼",
    description: "Language selector button with multiple variants",
    descriptionKor: "다양한 변형을 가진 언어 선택 버튼",
    href: "/docs/components/language-button",
    category: "component",
    keywords: ["language", "locale", "i18n", "translation", "selector"],
    keywordsKor: ["언어", "로케일", "번역", "선택"],
  },
  
  // Foundations
  {
    id: "colors",
    title: "Colors",
    titleKor: "색상",
    description: "Complete color palette with HEX, RGB, HSL, CSS variables, and Tailwind classes",
    descriptionKor: "HEX, RGB, HSL, CSS 변수 및 Tailwind 클래스가 포함된 전체 색상 팔레트",
    href: "/docs/foundations/colors",
    category: "foundation",
    keywords: ["color", "palette", "hex", "rgb", "hsl", "css variables", "tailwind"],
    keywordsKor: ["색상", "팔레트", "색", "변수"],
  },
  {
    id: "typography",
    title: "Typography",
    titleKor: "타이포그래피",
    description: "Typography system for MSQ mobile and admin applications with Poppins, Pretendard, and Inter",
    descriptionKor: "Poppins, Pretendard 및 Inter를 사용하는 MSQ 모바일 및 관리자 애플리케이션용 타이포그래피 시스템",
    href: "/docs/foundations/typography",
    category: "foundation",
    keywords: ["typography", "font", "text", "heading", "body", "poppins", "pretendard", "inter"],
    keywordsKor: ["타이포그래피", "글꼴", "텍스트", "제목", "본문"],
  },
  {
    id: "spacing",
    title: "Spacing",
    titleKor: "간격",
    description: "Spacing system and guidelines for consistent layouts",
    descriptionKor: "일관된 레이아웃을 위한 간격 시스템 및 가이드라인",
    href: "/docs/foundations/spacing",
    category: "foundation",
    keywords: ["spacing", "margin", "padding", "gap", "layout"],
    keywordsKor: ["간격", "여백", "레이아웃"],
  },
  {
    id: "grid",
    title: "Grid",
    titleKor: "그리드",
    description: "Grid system for responsive layouts",
    descriptionKor: "반응형 레이아웃을 위한 그리드 시스템",
    href: "/docs/foundations/grid",
    category: "foundation",
    keywords: ["grid", "layout", "responsive", "columns", "rows"],
    keywordsKor: ["그리드", "레이아웃", "반응형", "열", "행"],
  },
  {
    id: "radius",
    title: "Radius",
    titleKor: "반경",
    description: "Border radius system with pixels, rem, CSS variables, and Tailwind classes",
    descriptionKor: "픽셀, rem, CSS 변수 및 Tailwind 클래스가 포함된 테두리 반경 시스템",
    href: "/docs/foundations/radius",
    category: "foundation",
    keywords: ["radius", "border", "rounded", "corner", "border-radius"],
    keywordsKor: ["반경", "테두리", "둥근", "모서리"],
  },
  {
    id: "icons",
    title: "Icons",
    titleKor: "아이콘",
    description: "Comprehensive icon library with SVG download and React components",
    descriptionKor: "SVG 다운로드 및 React 컴포넌트가 포함된 포괄적인 아이콘 라이브러리",
    href: "/docs/foundations/icons",
    category: "foundation",
    keywords: ["icons", "svg", "icon", "symbol", "graphics", "download"],
    keywordsKor: ["아이콘", "SVG", "심볼", "그래픽", "다운로드"],
  },
]

interface ScoredSearchItem extends SearchItem {
  score: number
}

export function searchItems(query: string, language: Language): SearchItem[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()
  
  const scoredItems: ScoredSearchItem[] = searchData
    .filter((item) => {
      // Search in title (both languages)
      const titleMatch = 
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.titleKor && item.titleKor.toLowerCase().includes(lowerQuery))
      
      // Search in description (both languages)
      const descMatch = 
        item.description.toLowerCase().includes(lowerQuery) ||
        (item.descriptionKor && item.descriptionKor.toLowerCase().includes(lowerQuery))
      
      // Search in keywords (both languages)
      const keywordMatch = 
        item.keywords?.some(k => k.toLowerCase().includes(lowerQuery)) ||
        item.keywordsKor?.some(k => k.toLowerCase().includes(lowerQuery))
      
      return titleMatch || descMatch || keywordMatch
    })
    .map((item) => ({
      ...item,
      // Calculate relevance score (title matches are more relevant)
      score: calculateScore(item, lowerQuery, language),
    }))
    .sort((a, b) => b.score - a.score)
  
  // Return without score property
  return scoredItems.map(({ score, ...item }) => item)
}

function calculateScore(item: SearchItem, query: string, language: Language): number {
  let score = 0
  const title = language === "kor" && item.titleKor ? item.titleKor : item.title
  const description = language === "kor" && item.descriptionKor ? item.descriptionKor : item.description
  
  // Title exact match gets highest score
  if (title.toLowerCase() === query) score += 100
  else if (title.toLowerCase().startsWith(query)) score += 50
  else if (title.toLowerCase().includes(query)) score += 30
  
  // Description match
  if (description.toLowerCase().includes(query)) score += 10
  
  // Keyword match
  const keywords = language === "kor" && item.keywordsKor ? item.keywordsKor : item.keywords
  if (keywords?.some(k => k.toLowerCase() === query)) score += 20
  else if (keywords?.some(k => k.toLowerCase().includes(query))) score += 5
  
  return score
}

