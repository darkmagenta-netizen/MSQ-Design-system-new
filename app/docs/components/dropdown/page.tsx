"use client"

import { useState } from "react"
import { Dropdown } from "@/components/ui/dropdown"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Dropdown } from "@/components/ui/dropdown"`

const basicUsageCode = `<Dropdown
  type="Token"
  placeholder="Select Tokens"
  options={[
    { value: "msqp", label: "MSQP" },
    { value: "p2up", label: "P2UP" },
    { value: "msq", label: "MSQ" }
  ]}
/>`

const tokenDropdownCode = `<Dropdown
  type="Token"
  state="expanded"
  label="Select Tokens"
  placeholder="Select Tokens"
  multiple={true}
  value={["msqp"]}
  options={[
    { value: "msqp", label: "MSQP" },
    { value: "p2up", label: "P2UP" },
    { value: "msq", label: "MSQ" }
  ]}
  onChange={(value) => console.log(value)}
/>`

const locationDropdownCode = `<Dropdown
  type="location"
  state="expanded"
  label="Location"
  placeholder="Location"
  options={[
    { value: "loc1", label: "Malir Cantt Check post No 2, Karachi" },
    { value: "loc2", label: "Malir Karachi" },
    { value: "loc3", label: "Malir Cantonment karachi" },
    { value: "loc4", label: "15 flyover Ghazi Dawood Borhi goth" }
  ]}
  onChange={(value) => console.log(value)}
/>`

const p2uDropdownCode = `<Dropdown
  type="P2U"
  state="expanded"
  placeholder="P2U"
  value="p2u"
  options={[
    { value: "msqpx", label: "MSQPX" },
    { value: "p2u", label: "P2U" },
    { value: "p2up", label: "P2UP" },
    { value: "msq", label: "MSQ" },
    { value: "matic", label: "MATIC" }
  ]}
  onChange={(value) => console.log(value)}
/>`

const controlledCode = `const [value, setValue] = useState("p2u")

<Dropdown
  type="P2U"
  value={value}
  onChange={(newValue) => setValue(newValue)}
  options={[
    { value: "p2u", label: "P2U" },
    { value: "msq", label: "MSQ" }
  ]}
/>`

const multipleSelectionCode = `const [selected, setSelected] = useState<string[]>([])

<Dropdown
  type="Token"
  multiple={true}
  value={selected}
  onChange={(newValue) => setSelected(newValue as string[])}
  options={[
    { value: "msqp", label: "MSQP" },
    { value: "p2up", label: "P2UP" },
    { value: "msq", label: "MSQ" }
  ]}
/>`

const apiCode = `interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Dropdown state: collapsed or expanded
   */
  state?: "collapsed" | "expanded"
  /**
   * Dropdown type: Token, location, or P2U
   */
  type?: "Token" | "location" | "P2U"
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Label text (shown above dropdown when expanded)
   */
  label?: string
  /**
   * Selected value(s)
   */
  value?: string | string[]
  /**
   * Options for the dropdown
   */
  options?: DropdownOption[]
  /**
   * Whether multiple selection is allowed (for Token type)
   */
  multiple?: boolean
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | string[]) => void
  /**
   * Callback when dropdown is opened/closed
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Search value (for location type)
   */
  searchValue?: string
  /**
   * Callback when search value changes (for location type)
   */
  onSearchChange?: (value: string) => void
  /**
   * Width of the dropdown
   */
  width?: string | number
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function DropdownPage() {
  const [tokenValue, setTokenValue] = useState<string[]>([])
  const [locationValue, setLocationValue] = useState<string>("")
  const [p2uValue, setP2uValue] = useState<string>("p2u")

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="dropdown" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Dropdown</h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            A versatile dropdown component with multiple types: Token (multi-select), Location (with search), and P2U (single select).
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">Installation</h2>
          <p className="text-muted-foreground mb-4">
            The Dropdown component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">Usage</h2>
          <p className="text-muted-foreground mb-4">
            Use Dropdown with a trigger and options. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <Dropdown
                  type="Token"
                  placeholder="Select Tokens"
                  options={[
                    { value: "msqp", label: "MSQP" },
                    { value: "p2up", label: "P2UP" },
                    { value: "msq", label: "MSQ" }
                  ]}
                />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">Examples</h2>
          
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Token Dropdown (Multi-select)</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Dropdown
                      type="Token"
                      state="expanded"
                      label="Select Tokens"
                      placeholder="Select Tokens"
                      multiple={true}
                      value={tokenValue}
                      options={[
                        { value: "msqp", label: "MSQP" },
                        { value: "p2up", label: "P2UP" },
                        { value: "msq", label: "MSQ" }
                      ]}
                      onChange={(value) => setTokenValue(value as string[])}
                    />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={tokenDropdownCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Location Dropdown (With Search)</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Dropdown
                      type="location"
                      state="expanded"
                      label="Location"
                      placeholder="Location"
                      value={locationValue}
                      options={[
                        { value: "loc1", label: "Malir Cantt Check post No 2, Karachi" },
                        { value: "loc2", label: "Malir Karachi" },
                        { value: "loc3", label: "Malir Cantonment karachi" },
                        { value: "loc4", label: "15 flyover Ghazi Dawood Borhi goth" }
                      ]}
                      onChange={(value) => setLocationValue(value as string)}
                    />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={locationDropdownCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">P2U Dropdown (Single Select)</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Dropdown
                      type="P2U"
                      state="expanded"
                      placeholder="P2U"
                      value={p2uValue}
                      options={[
                        { value: "msqpx", label: "MSQPX" },
                        { value: "p2u", label: "P2U" },
                        { value: "p2up", label: "P2UP" },
                        { value: "msq", label: "MSQ" },
                        { value: "matic", label: "MATIC" }
                      ]}
                      onChange={(value) => setP2uValue(value as string)}
                    />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={p2uDropdownCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Controlled Component</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Dropdown
                      type="P2U"
                      value={p2uValue}
                      onChange={(value) => setP2uValue(value as string)}
                      options={[
                        { value: "p2u", label: "P2U" },
                        { value: "msq", label: "MSQ" }
                      ]}
                    />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={controlledCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 sm:mb-4">Multiple Selection</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Dropdown
                      type="Token"
                      multiple={true}
                      value={tokenValue}
                      onChange={(value) => setTokenValue(value as string[])}
                      options={[
                        { value: "msqp", label: "MSQP" },
                        { value: "p2up", label: "P2UP" },
                        { value: "msq", label: "MSQ" }
                      ]}
                    />
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={multipleSelectionCode} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">API Reference</h2>
          <p className="text-muted-foreground mb-4">
            The Dropdown component displays a list of options when the trigger is clicked. It supports value, onValueChange, options, and placeholder. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
