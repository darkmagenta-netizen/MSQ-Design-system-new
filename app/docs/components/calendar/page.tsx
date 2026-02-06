"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarSearch } from "@/components/ui/calendar-search"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Calendar } from "@/components/ui/calendar"`

const basicUsageCode = `// Basic calendar with date selection
const [selectedDate, setSelectedDate] = useState<Date | undefined>()

<Calendar
  value={selectedDate}
  onDateSelect={(date) => setSelectedDate(date)}
/>`

const controlledCode = `// Controlled calendar
const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 3, 19))

<Calendar
  value={selectedDate}
  onDateSelect={(date) => {
    setSelectedDate(date)
    console.log("Selected date:", date)
  }}
/>`

const disabledDatesCode = `// Calendar with disabled dates
const disabledDates = [
  new Date(2024, 3, 1),
  new Date(2024, 3, 5),
  new Date(2024, 3, 10),
]

<Calendar
  disabledDates={disabledDates}
  onDateSelect={(date) => console.log("Selected:", date)}
/>`

const holidaysCode = `// Calendar with holidays
// Note: Dates should be normalized (time set to midnight)
const holidays = [
  new Date(2024, 3, 15), // April 15, 2024
  new Date(2024, 3, 20), // April 20, 2024
].map(date => {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized
})

<Calendar
  holidays={holidays}
  onDateSelect={(date) => console.log("Selected:", date)}
/>`

const languageCode = `// Calendar with Korean language
<Calendar
  language="kor"
  onDateSelect={(date) => console.log("Selected:", date)}
/>

// Calendar with English language
<Calendar
  language="eng"
  onDateSelect={(date) => console.log("Selected:", date)}
/>`

const minMaxDateCode = `// Calendar with min and max date restrictions
const minDate = new Date(2024, 3, 1)
const maxDate = new Date(2024, 3, 30)

<Calendar
  minDate={minDate}
  maxDate={maxDate}
  onDateSelect={(date) => console.log("Selected:", date)}
/>`

const customDisabledCode = `// Calendar with custom disabled logic
<Calendar
  isDateDisabled={(date) => {
    // Disable weekends
    const day = date.getDay()
    return day === 0 || day === 6
  }}
  onDateSelect={(date) => console.log("Selected:", date)}
/>`

const fullExampleCode = `// Complete calendar example with all features
const [selectedDate, setSelectedDate] = useState<Date | undefined>()
const holidays = [new Date(2024, 3, 15), new Date(2024, 3, 20)]
const disabledDates = [new Date(2024, 3, 1), new Date(2024, 3, 5)]

<Calendar
  value={selectedDate}
  language="eng"
  holidays={holidays}
  disabledDates={disabledDates}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  onDateSelect={(date) => {
    setSelectedDate(date)
    console.log("Selected date:", date)
  }}
  onMonthChange={(date) => {
    console.log("Month changed to:", date)
  }}
/>`

const apiCode = `interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Currently selected date
   */
  value?: Date
  
  /**
   * Default date to show (defaults to today)
   */
  defaultDate?: Date
  
  /**
   * Callback when a date is selected
   */
  onDateSelect?: (date: Date) => void
  
  /**
   * Callback when month changes
   */
  onMonthChange?: (date: Date) => void
  
  /**
   * Array of dates that should be disabled
   */
  disabledDates?: Date[]
  
  /**
   * Array of dates that are holidays
   */
  holidays?: Date[]
  
  /**
   * Function to check if a date is disabled
   */
  isDateDisabled?: (date: Date) => boolean
  
  /**
   * Function to check if a date is a holiday
   */
  isDateHoliday?: (date: Date) => boolean
  
  /**
   * Language for month and day names ("eng" | "kor")
   */
  language?: "eng" | "kor"
  
  /**
   * Minimum selectable date
   */
  minDate?: Date
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date
}

interface CalendarDate {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled?: boolean
  isHoliday?: boolean
}`

const stylingCode = `/* Calendar Styling Reference */

/* Month Navigation */
/* - Month name: 20px font, 28px line-height, -0.4px tracking, bold, #141519 */
/* - Year: 14px font, 20px line-height, -0.56px tracking, medium, #545766 */
/* - Navigation buttons: 44px × 44px, hover bg rgba(0,0,0,0.03) */
/* - Chevron icons: 20px, #6b6f80 */

/* Day Headers */
/* - Sunday: 12px font, 18px line-height, 0.06px tracking, bold, #e62e2e (red) */
/* - Other days: 12px font, 18px line-height, 0.06px tracking, bold, #141519 */
/* - Header height: 48px, border-bottom: rgba(0,0,0,0.03) */

/* Date Cells */
/* - Cell size: min 36px × 36px, padding: 6px vertical */
/* - Date number: 24px × 24px circle, 12px font, 18px line-height, 0.192px tracking, semibold */
/* - Gap between cells: 4px */

/* Date States */
/* - Default: text #141519 */
/* - Today: bg #174fdf, text #f6f7f9 (white) */
/* - Selected: bg #174fdf, text #f6f7f9 (white) */
/* - Hover: bg rgba(0,0,0,0.03) */
/* - Disabled: text #bbbfcc */
/* - Holiday: text #c00 (red) */
/* - Holiday disabled: text #bbbfcc */

/* Holiday Label */
/* - 10px font, 16px line-height, 0.16px tracking, medium, #c00 */
/* - Height: 14px, padding: 4px horizontal */`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
  { id: "styling", title: "Styling Reference" },
  { id: "api", title: "API Reference" },
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2024, 3, 19))
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>()
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>()

  // Example dates for demonstrations
  const disabledDates = [
    new Date(2024, 3, 1),
    new Date(2024, 3, 5),
    new Date(2024, 3, 10),
  ]

  // Normalize holidays to midnight for proper comparison
  const holidays = [
    new Date(2024, 3, 15),
    new Date(2024, 3, 20),
  ].map(date => {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  })

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Calendar
          </h1>
          <p className="text-muted-foreground text-lg">
            A calendar component for date selection with support for holidays, disabled dates, and multiple languages. Matches the exact Figma design for easy integration.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Calendar component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="w-full max-w-[328px]">
                  <Calendar
                    value={selectedDate2}
                    onDateSelect={(date) => setSelectedDate2(date)}
                  />
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled Calendar</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        value={selectedDate}
                        onDateSelect={(date) => setSelectedDate(date)}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={controlledCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">With Disabled Dates</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        disabledDates={disabledDates}
                        onDateSelect={(date) => console.log("Selected:", date)}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={disabledDatesCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">With Holidays</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        holidays={holidays}
                        onDateSelect={(date) => console.log("Selected:", date)}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={holidaysCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Language Support</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex flex-col gap-6 sm:flex-row">
                      <div className="w-full max-w-[328px]">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Korean</div>
                        <Calendar
                          language="kor"
                          onDateSelect={(date) => console.log("Selected:", date)}
                        />
                      </div>
                      <div className="w-full max-w-[328px]">
                        <div className="text-sm font-medium text-muted-foreground mb-2">English</div>
                        <Calendar
                          language="eng"
                          onDateSelect={(date) => console.log("Selected:", date)}
                        />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={languageCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Date Range Restrictions</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        minDate={new Date(2024, 3, 1)}
                        maxDate={new Date(2024, 3, 30)}
                        onDateSelect={(date) => console.log("Selected:", date)}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={minMaxDateCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Custom Disabled Logic</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        isDateDisabled={(date) => {
                          // Disable weekends
                          const day = date.getDay()
                          return day === 0 || day === 6
                        }}
                        onDateSelect={(date) => console.log("Selected:", date)}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={customDisabledCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Complete Example</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="w-full max-w-[328px]">
                      <Calendar
                        value={selectedDate3}
                        language="eng"
                        holidays={holidays}
                        disabledDates={disabledDates}
                        minDate={new Date(2024, 0, 1)}
                        maxDate={new Date(2024, 11, 31)}
                        onDateSelect={(date) => {
                          setSelectedDate3(date)
                          console.log("Selected date:", date)
                        }}
                        onMonthChange={(date) => {
                          console.log("Month changed to:", date)
                        }}
                      />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={fullExampleCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Calendar Search Components</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex flex-col gap-4 w-full max-w-md">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">Date Picker Input</div>
                        <CalendarSearch status="calendar" placeholder="MM/DD/YY - MM/DD/YY" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">Search Input</div>
                        <CalendarSearch status="search" placeholder="Search" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`// Date picker input
<CalendarSearch 
  status="calendar" 
  placeholder="MM/DD/YY - MM/DD/YY" 
/>

// Search input
<CalendarSearch 
  status="search" 
  placeholder="Search" 
/>`} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="styling" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Styling Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The calendar component uses exact styling from the Figma design. Here are the key styling values for reference:
          </p>
          <CodeBlock code={stylingCode} language="css" />
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Calendar component displays a date picker with mode, selected, onSelect, disabled dates, and locale. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
