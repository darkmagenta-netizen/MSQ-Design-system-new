export type Language = "eng" | "kor"

export interface Translations {
  // Common
  docs: string
  components: string
  foundations: string
  getStarted: string
  installation: string
  
  // Foundations
  colors: string
  typography: string
  spacing: string
  grid: string
  radius: string
  icons: string
  logos: string
  cryptocurrency: string
  
  // Components
  button: string
  socialButton: string
  languageButton: string
  dropdown: string
  navBar: string
  alert: string
  badge: string
  calendar: string
  checkbox: string
  input: string
  pagination: string
  tabs: string
  toggle: string
  tooltip: string
  progress: string
  banner: string
  
  // Typography
  typographyTitle: string
  typographyDescription: string
  englishMobileTypography: string
  koreanMobileTypography: string
  adminTypography: string
  fontFamily: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
  fontWeight: string
  display: string
  headings: string
  bodyText: string
  
  // Colors
  colorsTitle: string
  colorsDescription: string
  primaryBlue: string
  gray: string
  errorRed: string
  baseColors: string
  
  // Spacing
  spacingTitle: string
  spacingDescription: string
  spacingNote: string
  pixels: string
  rem: string
  tailwind: string
  css: string
  
  // Grid
  gridTitle: string
  gridDescription: string
  gridSystem: string
  gridSystemDescription: string
  breakpoints: string
  breakpointsDescription: string
  usageWithTailwind: string
  usageWithTailwindDescription: string
  gridExamples: string
  twelveColumnGrid: string
  responsiveGrid: string
  asymmetricGrid: string
  
  // Radius
  radiusTitle: string
  radiusDescription: string
  radiusNote: string
  
  // Common UI
  copy: string
  copied: string
  note: string
  search: string
  toggleMenu: string
  
  // Search
  searchPlaceholder: string
  noResults: string
  recentSearches: string

  // Home page
  homeHeroTitle: string
  homeHeroSubtitle: string
  viewComponents: string
  examples: string
  documentation: string
  footerNote: string

  // Docs landing page
  docsPageTitle: string
  docsPageIntro: string
  docsInstallation: string
  docsInstallDescription: string
  docsThenImport: string
  docsQuickStart: string
  docsStep1: string
  docsStep2: string
  docsComponentsSection: string
  docsButtonCardDesc: string
  docsSocialButtonCardDesc: string
  docsLanguageButtonCardDesc: string
  docsDropdownCardDesc: string
}

export const translations: Record<Language, Translations> = {
  eng: {
    docs: "Docs",
    components: "Components",
    foundations: "Foundations",
    getStarted: "Get Started",
    installation: "Installation",
    colors: "Colors",
    typography: "Typography",
    spacing: "Spacing",
    grid: "Grid",
    radius: "Radius",
    icons: "Icons",
    logos: "Logos",
    cryptocurrency: "Cryptocurrency",
    button: "Button",
    socialButton: "Social Button",
    languageButton: "Language Button",
    dropdown: "Dropdown",
    navBar: "Nav Bar",
    alert: "Alert",
    badge: "Badge",
    calendar: "Calendar",
    checkbox: "Checkbox",
    input: "Input",
    pagination: "Pagination",
    tabs: "Tabs",
    toggle: "Toggle",
    tooltip: "Tooltip",
    progress: "Progress",
    banner: "Banner",
    typographyTitle: "Typography",
    typographyDescription: "Comprehensive typography system for MSQ mobile and admin applications. Includes English and Korean mobile typography using Poppins and Pretendard, and admin typography using Inter.",
    englishMobileTypography: "English Mobile Typography",
    koreanMobileTypography: "Korean Mobile Typography",
    adminTypography: "Admin Typography",
    fontFamily: "Font Family",
    fontSize: "Font Size",
    lineHeight: "Line Height",
    letterSpacing: "Letter Spacing",
    fontWeight: "Font Weight",
    display: "Display",
    headings: "Headings",
    bodyText: "Body Text",
    colorsTitle: "MSQ Design System Colors",
    colorsDescription: "The complete MSQ color palette in HEX, RGB, HSL, CSS variables, and Tailwind classes. Ready to copy and paste into your project.",
    primaryBlue: "Primary Blue",
    gray: "Gray",
    errorRed: "Error Red",
    baseColors: "Base Colors",
    spacingTitle: "MSQ Design System Spacing",
    spacingDescription: "The complete MSQ spacing scale in pixels, rem, CSS variables, and Tailwind classes. Ready to copy and paste into your project.",
    spacingNote: "Click on any spacing value to copy it to your clipboard. Spacing values are displayed in all common formats.",
    pixels: "Pixels",
    rem: "REM",
    tailwind: "Tailwind",
    css: "CSS",
    gridTitle: "MSQ Design System Grid",
    gridDescription: "The MSQ grid system provides a responsive layout structure using a 12-column grid with consistent breakpoints and spacing.",
    gridSystem: "Grid System",
    gridSystemDescription: "The MSQ grid system uses a responsive container with consistent padding and max-widths at different breakpoints. The system is built on a 12-column grid layout.",
    breakpoints: "Breakpoints",
    breakpointsDescription: "The grid system uses standard breakpoints that align with Tailwind CSS defaults.",
    usageWithTailwind: "Usage with Tailwind CSS",
    usageWithTailwindDescription: "When using Tailwind CSS, you can leverage the built-in grid utilities.",
    gridExamples: "Grid Examples",
    twelveColumnGrid: "12-Column Grid",
    responsiveGrid: "Responsive Grid (1 column on mobile, 2 on tablet, 3 on desktop)",
    asymmetricGrid: "Asymmetric Grid (2/3 + 1/3 split)",
    radiusTitle: "MSQ Design System Radius",
    radiusDescription: "The complete MSQ border radius scale in pixels, rem, CSS variables, and Tailwind classes. Ready to copy and paste into your project.",
    radiusNote: "Click on any radius value to copy it to your clipboard. Radius values are displayed in all common formats.",
    copy: "Copy",
    copied: "Copied",
    note: "Note",
    search: "Search",
    toggleMenu: "Toggle menu",
    searchPlaceholder: "Search documentation...",
    noResults: "No results found",
    recentSearches: "Recent searches",
    homeHeroTitle: "The Foundation of the MSQ Design System",
    homeHeroSubtitle: "A flexible, code-driven design system built to scale with our product, providing clear design standards that help MSQ teams ship faster, stay consistent, and scale confidently.",
    viewComponents: "View Components",
    examples: "Examples",
    documentation: "Documentation",
    footerNote: "MSQ Design System — Built for customization",
    docsPageTitle: "Getting Started",
    docsPageIntro: "MSQ Design System is a collection of reusable components built with React and TypeScript.",
    docsInstallation: "Installation",
    docsInstallDescription: "The components are already set up in this project. Install dependencies:",
    docsThenImport: "Then import components in your code:",
    docsQuickStart: "Quick Start",
    docsStep1: "1. Import a component",
    docsStep2: "2. Use it in your code",
    docsComponentsSection: "Components",
    docsButtonCardDesc: "A versatile button component with multiple variants and sizes.",
    docsSocialButtonCardDesc: "Social login buttons for Google, Facebook, Apple, and Twitter.",
    docsLanguageButtonCardDesc: "Language selector button with multiple variants.",
    docsDropdownCardDesc: "A versatile dropdown component with Token, Location, and P2U types.",
  },
  kor: {
    docs: "문서",
    components: "컴포넌트",
    foundations: "기초",
    getStarted: "시작하기",
    installation: "설치",
    colors: "색상",
    typography: "타이포그래피",
    spacing: "간격",
    grid: "그리드",
    radius: "반경",
    icons: "아이콘",
    logos: "로고",
    cryptocurrency: "암호화폐",
    button: "버튼",
    socialButton: "소셜 버튼",
    languageButton: "언어 버튼",
    dropdown: "드롭다운",
    navBar: "네비게이션 바",
    alert: "알림",
    badge: "배지",
    calendar: "캘린더",
    checkbox: "체크박스",
    input: "입력",
    pagination: "페이지네이션",
    tabs: "탭",
    toggle: "토글",
    tooltip: "툴팁",
    progress: "진행률",
    banner: "배너",
    typographyTitle: "타이포그래피",
    typographyDescription: "MSQ 모바일 및 관리자 애플리케이션을 위한 포괄적인 타이포그래피 시스템. Poppins와 Pretendard를 사용하는 영어 및 한국어 모바일 타이포그래피와 Inter를 사용하는 관리자 타이포그래피를 포함합니다.",
    englishMobileTypography: "영어 모바일 타이포그래피",
    koreanMobileTypography: "한국어 모바일 타이포그래피",
    adminTypography: "관리자 타이포그래피",
    fontFamily: "글꼴 패밀리",
    fontSize: "글꼴 크기",
    lineHeight: "줄 간격",
    letterSpacing: "자간",
    fontWeight: "글꼴 두께",
    display: "디스플레이",
    headings: "제목",
    bodyText: "본문",
    colorsTitle: "MSQ 디자인 시스템 색상",
    colorsDescription: "HEX, RGB, HSL, CSS 변수 및 Tailwind 클래스 형식의 전체 MSQ 색상 팔레트. 프로젝트에 복사하여 붙여넣을 수 있습니다.",
    primaryBlue: "주요 파란색",
    gray: "회색",
    errorRed: "오류 빨간색",
    baseColors: "기본 색상",
    spacingTitle: "MSQ 디자인 시스템 간격",
    spacingDescription: "픽셀, rem, CSS 변수 및 Tailwind 클래스 형식의 전체 MSQ 간격 스케일. 프로젝트에 복사하여 붙여넣을 수 있습니다.",
    spacingNote: "간격 값을 클릭하여 클립보드에 복사하세요. 간격 값은 모든 일반 형식으로 표시됩니다.",
    pixels: "픽셀",
    rem: "REM",
    tailwind: "Tailwind",
    css: "CSS",
    gridTitle: "MSQ 디자인 시스템 그리드",
    gridDescription: "MSQ 그리드 시스템은 일관된 중단점과 간격을 사용하는 12열 그리드로 반응형 레이아웃 구조를 제공합니다.",
    gridSystem: "그리드 시스템",
    gridSystemDescription: "MSQ 그리드 시스템은 다양한 중단점에서 일관된 패딩과 최대 너비를 가진 반응형 컨테이너를 사용합니다. 시스템은 12열 그리드 레이아웃을 기반으로 구축됩니다.",
    breakpoints: "중단점",
    breakpointsDescription: "그리드 시스템은 Tailwind CSS 기본값과 일치하는 표준 중단점을 사용합니다.",
    usageWithTailwind: "Tailwind CSS 사용",
    usageWithTailwindDescription: "Tailwind CSS를 사용할 때 내장 그리드 유틸리티를 활용할 수 있습니다.",
    gridExamples: "그리드 예제",
    twelveColumnGrid: "12열 그리드",
    responsiveGrid: "반응형 그리드 (모바일 1열, 태블릿 2열, 데스크톱 3열)",
    asymmetricGrid: "비대칭 그리드 (2/3 + 1/3 분할)",
    radiusTitle: "MSQ 디자인 시스템 반경",
    radiusDescription: "픽셀, rem, CSS 변수 및 Tailwind 클래스 형식의 전체 MSQ 테두리 반경 스케일. 프로젝트에 복사하여 붙여넣을 수 있습니다.",
    radiusNote: "반경 값을 클릭하여 클립보드에 복사하세요. 반경 값은 모든 일반 형식으로 표시됩니다.",
    copy: "복사",
    copied: "복사됨",
    note: "참고",
    search: "검색",
    toggleMenu: "메뉴 토글",
    searchPlaceholder: "문서 검색...",
    noResults: "결과를 찾을 수 없습니다",
    recentSearches: "최근 검색",
    homeHeroTitle: "MSQ 디자인 시스템의 기반",
    homeHeroSubtitle: "제품과 함께 확장 가능한 유연한 코드 기반 디자인 시스템으로, MSQ 팀이 더 빠르게 출시하고, 일관성을 유지하며, 자신 있게 확장할 수 있도록 명확한 디자인 기준을 제공합니다.",
    viewComponents: "컴포넌트 보기",
    examples: "예제",
    documentation: "문서",
    footerNote: "MSQ 디자인 시스템 — 맞춤 제작",
    docsPageTitle: "시작하기",
    docsPageIntro: "MSQ 디자인 시스템은 React와 TypeScript로 구축된 재사용 가능한 컴포넌트 모음입니다.",
    docsInstallation: "설치",
    docsInstallDescription: "컴포넌트는 이 프로젝트에 이미 설정되어 있습니다. 의존성을 설치하세요:",
    docsThenImport: "그런 다음 코드에서 컴포넌트를 가져오세요:",
    docsQuickStart: "빠른 시작",
    docsStep1: "1. 컴포넌트 가져오기",
    docsStep2: "2. 코드에서 사용하기",
    docsComponentsSection: "컴포넌트",
    docsButtonCardDesc: "다양한 변형과 크기를 가진 다용도 버튼 컴포넌트.",
    docsSocialButtonCardDesc: "Google, Facebook, Apple, Twitter용 소셜 로그인 버튼.",
    docsLanguageButtonCardDesc: "다양한 변형을 가진 언어 선택 버튼.",
    docsDropdownCardDesc: "Token, Location, P2U 유형을 지원하는 다용도 드롭다운 컴포넌트.",
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language]
}

