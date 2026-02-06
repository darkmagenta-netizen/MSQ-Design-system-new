"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { iconComponents } from "@/components/icons/icons"

const installationCode = `import { Input } from "@/components/ui/input"`

const basicUsageCode = `<Input placeholder="Placeholder" />`

const withLabelCode = `<Input label="Label" placeholder="Placeholder" />`

const statesCode = `<Input label="Label" placeholder="Placeholder" />
<Input label="Label" placeholder="Placeholder" status="focused" />
<Input label="Label" placeholder="Placeholder" status="typing" />
<Input label="Label" placeholder="Placeholder" status="error" errorMessage="This field is required" />
<Input label="Label" placeholder="Placeholder" status="disabled" disabled />`

const sizesCode = `<Input size="md" label="Label" placeholder="Placeholder" />
<Input size="lg" label="Label" placeholder="Placeholder" />`

const leadingTextCode = `<Input 
  label="Label" 
  placeholder="Placeholder" 
  leadingText="http://"
  type="leading-text"
/>`

const trailingButtonCode = `<Input 
  label="Label" 
  placeholder="Placeholder" 
  trailingButton={<Button size="sm" variant="ghost">Copy</Button>}
  type="trailing-button"
/>`

const dropdownCode = `<Input 
  label="Label" 
  placeholder="Placeholder" 
  dropdownValue="s@h"
  type="dropdown"
/>`

const textAreaCode = `<Input 
  label="Description" 
  placeholder="Placeholder" 
  type="text-area"
/>`

const searchCode = `<Input 
  placeholder="Search for inquiry" 
  type="search"
/>`

const apiCode = `interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "md" | "lg"
  status?: "placeholder" | "focused" | "typing" | "error" | "disabled"
  type?: "default" | "leading-text" | "trailing-button" | "dropdown" | "text-area" | "search"
  leadingText?: string
  trailingButton?: React.ReactNode
  dropdownValue?: string
  errorMessage?: string
  helperText?: string
  label?: string
  searchIcon?: string
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "States", id: "states" },
  { title: "Sizes", id: "sizes" },
  { title: "Types", id: "types" },
  { title: "Search Input", id: "search-input" },
  { title: "API Reference", id: "api" },
]

const MenuIcon = iconComponents["menu"]?.component
const CopyIcon = iconComponents["copy"]?.component

export default function InputPage() {
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="input" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Input
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            A UI element that accepts text data from the user. Supports various states, sizes, and types including leading text, trailing buttons, dropdowns, and text areas.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Input component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Input with label, placeholder, state, and optional leading/trailing content. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <Input label="Label" placeholder="Placeholder" />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={withLabelCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="states" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            States
          </h2>
          <p className="text-muted-foreground mb-6">
            Input fields have different visual states: placeholder, focused, typing, error, and disabled.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">All States</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Input label="Label" placeholder="Placeholder" />
                  <Input label="Label" placeholder="Placeholder" status="focused" />
                  <Input label="Label" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Placeholder" status="typing" />
                  <Input label="Label" placeholder="Placeholder" status="error" errorMessage="This field is required" />
                  <Input label="Label" placeholder="Placeholder" status="disabled" disabled />
                </div>
              </ComponentPreview>
              <CodeBlock code={statesCode} />
            </div>
          </div>
        </section>

        <section id="sizes" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Sizes
          </h2>
          <ComponentPreview>
            <div className="space-y-4">
              <Input size="md" label="Label" placeholder="Placeholder" />
              <Input size="lg" label="Label" placeholder="Placeholder" />
            </div>
          </ComponentPreview>
          <CodeBlock code={sizesCode} />
        </section>

        <section id="types" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Types
          </h2>
          <p className="text-muted-foreground mb-6">
            Input fields can have different configurations: default, leading text, trailing button, dropdown, and text area.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Medium Size</h3>
              <Tabs defaultValue="default" className="w-full">
                <TabsList>
                  <TabsTrigger value="default">Default</TabsTrigger>
                  <TabsTrigger value="leading-text">Leading Text</TabsTrigger>
                  <TabsTrigger value="trailing-button">Trailing Button</TabsTrigger>
                  <TabsTrigger value="dropdown">Dropdown</TabsTrigger>
                  <TabsTrigger value="text-area">Text Area</TabsTrigger>
                </TabsList>
                <TabsContent value="default">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Input size="md" label="Label" placeholder="Placeholder" />
                      <Input size="md" label="Label" placeholder="Placeholder" status="focused" />
                      <Input size="md" label="Label" placeholder="Placeholder" status="typing" />
                      <Input size="md" label="Label" placeholder="Placeholder" status="error" errorMessage="Error message" />
                      <Input size="md" label="Label" placeholder="Placeholder" status="disabled" disabled />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="leading-text">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Input size="md" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" />
                      <Input size="md" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" status="focused" />
                      <Input size="md" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" status="typing" />
                      <Input size="md" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" status="error" errorMessage="Error message" />
                      <Input size="md" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" status="disabled" disabled />
                    </div>
                  </ComponentPreview>
                  <CodeBlock code={leadingTextCode} />
                </TabsContent>
                <TabsContent value="trailing-button">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Input 
                        size="md" 
                        label="Label" 
                        placeholder="Placeholder" 
                        trailingButton={
                          MenuIcon ? (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              {React.createElement(MenuIcon, { size: 16 })}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">Copy</Button>
                          )
                        }
                        type="trailing-button"
                      />
                      <Input 
                        size="md" 
                        label="Label" 
                        placeholder="Placeholder" 
                        trailingButton={
                          CopyIcon ? (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              {React.createElement(CopyIcon, { size: 16 })}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">Copy</Button>
                          )
                        }
                        type="trailing-button"
                        status="focused"
                      />
                      <Input 
                        size="md" 
                        label="Label" 
                        placeholder="Placeholder" 
                        trailingButton={
                          CopyIcon ? (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              {React.createElement(CopyIcon, { size: 16 })}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">Copy</Button>
                          )
                        }
                        type="trailing-button"
                        status="typing"
                      />
                      <Input 
                        size="md" 
                        label="Label" 
                        placeholder="Placeholder" 
                        trailingButton={
                          MenuIcon ? (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              {React.createElement(MenuIcon, { size: 16 })}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">Copy</Button>
                          )
                        }
                        type="trailing-button"
                        status="error"
                        errorMessage="Error message"
                      />
                      <Input 
                        size="md" 
                        label="Label" 
                        placeholder="Placeholder" 
                        trailingButton={
                          CopyIcon ? (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" disabled>
                              {React.createElement(CopyIcon, { size: 16 })}
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" disabled>Copy</Button>
                          )
                        }
                        type="trailing-button"
                        status="disabled"
                        disabled
                      />
                    </div>
                  </ComponentPreview>
                  <CodeBlock code={trailingButtonCode} />
                </TabsContent>
                <TabsContent value="dropdown">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Input size="md" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" />
                      <Input size="md" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" status="focused" />
                      <Input size="md" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" status="typing" />
                      <Input size="md" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" status="error" errorMessage="Error message" />
                      <Input size="md" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" status="disabled" disabled />
                    </div>
                  </ComponentPreview>
                  <CodeBlock code={dropdownCode} />
                </TabsContent>
                <TabsContent value="text-area">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Input size="md" label="Description" placeholder="Placeholder" type="text-area" />
                      <Input size="md" label="Description" placeholder="Placeholder" type="text-area" status="focused" />
                      <Input size="md" label="Description" placeholder="Placeholder" type="text-area" status="typing" />
                      <Input size="md" label="Description" placeholder="Placeholder" type="text-area" status="error" errorMessage="Error message" />
                      <Input size="md" label="Description" placeholder="Placeholder" type="text-area" status="disabled" disabled />
                    </div>
                  </ComponentPreview>
                  <CodeBlock code={textAreaCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Large Size</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Input size="lg" label="Label" placeholder="Placeholder" />
                  <Input size="lg" label="Label" placeholder="Placeholder" leadingText="http://" type="leading-text" />
                  <Input 
                    size="lg" 
                    label="Label" 
                    placeholder="Placeholder" 
                    trailingButton={<Button size="sm" variant="ghost">Copy</Button>}
                    type="trailing-button"
                  />
                  <Input size="lg" label="Label" placeholder="Placeholder" dropdownValue="s@h" type="dropdown" />
                </div>
              </ComponentPreview>
            </div>
          </div>
        </section>

        <section id="search-input" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Search Input
          </h2>
          <p className="text-muted-foreground mb-6">
            Specialized input field for search functionality with a search icon.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Input placeholder="Search for inquiry" type="search" />
                  <Input placeholder="Search for inquiry" type="search" status="focused" />
                  <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search for inquiry" type="search" status="typing" />
                  <Input placeholder="Search for inquiry" type="search" status="error" errorMessage="Invalid search query" />
                </div>
              </ComponentPreview>
              <CodeBlock code={searchCode} />
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Input component provides a text field with label, states, sizes, and optional leading/trailing content. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
