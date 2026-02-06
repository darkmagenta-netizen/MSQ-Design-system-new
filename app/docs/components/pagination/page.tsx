"use client"

import { useState } from "react"
import { Pagination, PaginationDotIndicator, PaginationDotGroup, CarouselImage } from "@/components/ui/pagination"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Pagination, PaginationDotIndicator, PaginationDotGroup } from "@/components/ui/pagination"`

const basicUsageCode = `<Pagination 
  currentPage={1}
  totalPages={24}
  totalItems={678}
  itemsPerPage={10}
  onPageChange={(page) => console.log(page)}
/>`

const desktopCode = `<Pagination 
  currentPage={1}
  totalPages={24}
  totalItems={678}
  itemsPerPage={10}
  size="desktop"
  onPageChange={(page) => console.log(page)}
/>`

const mobileCode = `<Pagination 
  currentPage={1}
  totalPages={24}
  totalItems={678}
  itemsPerPage={10}
  size="mobile"
  showTableCount={false}
  onPageChange={(page) => console.log(page)}
/>`

const dotIndicatorCode = `<PaginationDotIndicator current={false} size="md" />
<PaginationDotIndicator current={true} size="md" />
<PaginationDotIndicator current={false} size="lg" />
<PaginationDotIndicator current={true} size="lg" />`

const dotGroupCode = `<PaginationDotGroup total={3} current={0} size="md" style="dot" />
<PaginationDotGroup total={3} current={1} size="md" style="dot" framed />
<PaginationDotGroup total={4} current={2} size="md" style="line" />
<PaginationDotGroup total={3} current={0} size="lg" style="dot" />`

const controlledCode = `const [currentPage, setCurrentPage] = useState(1)

<Pagination 
  currentPage={currentPage}
  totalPages={24}
  totalItems={678}
  itemsPerPage={10}
  onPageChange={setCurrentPage}
/>`

const apiCode = `interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number
  totalPages?: number
  totalItems?: number
  itemsPerPage?: number
  showTableCount?: boolean
  showPageNumbers?: boolean
  size?: "desktop" | "mobile"
  lang?: "eng" | "kor"
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  maxPageButtons?: number
}

interface PaginationDotIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  current?: boolean
  size?: "md" | "lg"
}

interface PaginationDotGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  total?: number
  current?: number
  size?: "md" | "lg"
  style?: "dot" | "line"
  framed?: boolean
}`

const carouselCode = `<CarouselImage 
  size="sm"
  currentSlide={0}
  totalSlides={3}
  onPrevious={() => console.log('Previous')}
  onNext={() => console.log('Next')}
/>`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Sizes", id: "sizes" },
  { title: "Dot Indicators", id: "dot-indicators" },
  { title: "Carousel", id: "carousel" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(5)
  const [currentPage3, setCurrentPage3] = useState(24)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [dotCurrent, setDotCurrent] = useState(0)
  const [carouselSlide, setCarouselSlide] = useState(0)

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="pagination" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Pagination
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            Pagination component for navigating through multiple pages of content. Includes page numbers, navigation buttons, table count display, and dot indicators for carousels.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Pagination component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Pagination with currentPage, totalPages, and onPageChange. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="sizes" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Sizes
          </h2>
          <p className="text-muted-foreground mb-6">
            Pagination component supports desktop and mobile sizes.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Desktop</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={itemsPerPage}
                  size="desktop"
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </ComponentPreview>
              <CodeBlock code={desktopCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Mobile</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={itemsPerPage}
                  size="mobile"
                  showTableCount={false}
                  onPageChange={setCurrentPage}
                />
              </ComponentPreview>
              <CodeBlock code={mobileCode} />
            </div>
          </div>
        </section>

        <section id="dot-indicators" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Dot Indicators
          </h2>
          <p className="text-muted-foreground mb-6">
            Dot indicators for carousels and image galleries. Available in dot and line styles.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Dot Indicator</h3>
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <PaginationDotIndicator current={false} size="md" />
                    <PaginationDotIndicator current={true} size="md" />
                    <PaginationDotIndicator current={false} size="md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <PaginationDotIndicator current={false} size="lg" />
                    <PaginationDotIndicator current={true} size="lg" />
                    <PaginationDotIndicator current={false} size="lg" />
                  </div>
                </div>
              </ComponentPreview>
              <CodeBlock code={dotIndicatorCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Dot Group</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <PaginationDotGroup total={3} current={dotCurrent} size="md" style="dot" />
                  <PaginationDotGroup total={3} current={dotCurrent} size="md" style="dot" framed />
                  <PaginationDotGroup total={4} current={dotCurrent} size="md" style="line" />
                  <PaginationDotGroup total={3} current={dotCurrent} size="lg" style="dot" />
                </div>
              </ComponentPreview>
              <CodeBlock code={dotGroupCode} />
            </div>
          </div>
        </section>

        <section id="carousel" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Carousel
          </h2>
          <p className="text-muted-foreground mb-6">
            Carousel image component with navigation arrows and dot indicators. Perfect for image galleries and slideshows.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Small Size</h3>
              <ComponentPreview>
                <div className="flex justify-center">
                  <CarouselImage
                    size="sm"
                    currentSlide={carouselSlide}
                    totalSlides={3}
                    onPrevious={() => setCarouselSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                    onNext={() => setCarouselSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                  />
                </div>
              </ComponentPreview>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Medium Size</h3>
              <ComponentPreview>
                <div className="flex justify-center">
                  <CarouselImage
                    size="md"
                    currentSlide={carouselSlide}
                    totalSlides={3}
                    onPrevious={() => setCarouselSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                    onNext={() => setCarouselSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                  />
                </div>
              </ComponentPreview>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Large Size</h3>
              <ComponentPreview>
                <div className="flex justify-center">
                  <CarouselImage
                    size="lg"
                    currentSlide={carouselSlide}
                    totalSlides={3}
                    onPrevious={() => setCarouselSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                    onNext={() => setCarouselSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                  />
                </div>
              </ComponentPreview>
            </div>

            <CodeBlock code={carouselCode} />
          </div>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </ComponentPreview>
              <CodeBlock code={controlledCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Middle Page</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage2}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={10}
                  onPageChange={setCurrentPage2}
                />
              </ComponentPreview>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Last Page</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage3}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={10}
                  onPageChange={setCurrentPage3}
                />
              </ComponentPreview>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Without Table Count</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={10}
                  showTableCount={false}
                  onPageChange={setCurrentPage}
                />
              </ComponentPreview>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Korean Language</h3>
              <ComponentPreview>
                <Pagination
                  currentPage={currentPage}
                  totalPages={24}
                  totalItems={678}
                  itemsPerPage={itemsPerPage}
                  lang="kor"
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </ComponentPreview>
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Pagination component displays page navigation with optional dot indicators and mobile layout. It supports currentPage, totalPages, onPageChange, and variant.
          </p>
          <p className="text-muted-foreground text-sm mb-2">See the interface below for full prop details.</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
