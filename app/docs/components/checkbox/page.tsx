"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxBase } from "@/components/ui/checkbox-base"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxBase } from "@/components/ui/checkbox-base"
import { CheckboxGroup } from "@/components/ui/checkbox-group"`

const basicUsageCode = `<Checkbox label="Remember me" />`

const checkboxBaseCode = `<CheckboxBase checked={false} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Default" />`

const sizesCode = `<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="md" label="Medium checkbox" />`

const statesCode = `<Checkbox label="Default" />
<Checkbox label="Checked" checked />
<Checkbox label="Indeterminate" checked indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Checked Disabled" checked disabled />`

const withSupportingTextCode = `<Checkbox 
  label="Remember me" 
  supportingText="Save my login details for next time."
  showSupportingText={true}
/>`

const radioCode = `<Checkbox type="Radio" label="Option 1" name="radio-group" />
<Checkbox type="Radio" label="Option 2" name="radio-group" />
<Checkbox type="Radio" label="Option 3" name="radio-group" />`

const controlledCode = `const [checked, setChecked] = useState(false)

<Checkbox 
  label="Controlled checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`

const allCheckboxBaseVariantsCode = `// All Checkbox Base Variants
// Unchecked
<CheckboxBase checked={false} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={false} size="sm" type="Checkbox" state="Hover" />
<CheckboxBase checked={false} size="sm" type="Checkbox" state="Focused" />
<CheckboxBase checked={false} size="sm" type="Checkbox" state="Disabled" />

// Checked
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Hover" />
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Focused" />
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Disabled" />

// Indeterminate
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Hover" />
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Focused" />
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Disabled" />

// Radio
<CheckboxBase checked={false} size="sm" type="Radio" state="Default" />
<CheckboxBase checked={true} size="sm" type="Radio" state="Default" />

// Checkbox Outline
<CheckboxBase checked={true} size="sm" type="Checkbox outline" state="Default" />`

const checkboxGroupCode = `<CheckboxGroup 
  label="Checkbox Label"
  supportingText="Content will go here"
  checked={checked}
  onCheckedChange={setChecked}
/>`

const checkboxGroupStatesCode = `// Default (unselected)
<CheckboxGroup label="Checkbox Label" supportingText="Content will go here" />

// Hover (unselected)
<CheckboxGroup label="Checkbox Label" supportingText="Content will go here" state="Hover" />

// Focused (unselected)
<CheckboxGroup label="Checkbox Label" supportingText="Content will go here" state="Focused" />

// Selected
<CheckboxGroup label="Checkbox Label" supportingText="Content will go here" checked />

// Disabled
<CheckboxGroup label="Checkbox Label" supportingText="Content will go here" disabled />`

const allVariantsCode = `// Checkbox with text - All states
<Checkbox size="sm" label="Remember me" />
<Checkbox size="sm" label="Remember me" checked />
<Checkbox size="sm" label="Remember me" checked indeterminate />
<Checkbox size="sm" label="Remember me" disabled />
<Checkbox size="sm" label="Remember me" checked disabled />

// Checkbox without text - All states
<CheckboxBase checked={false} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} size="sm" type="Checkbox" state="Default" />
<CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Default" />

// Radio with text
<Checkbox type="Radio" label="Option 1" />
<Checkbox type="Radio" label="Option 2" checked />

// Radio without text
<CheckboxBase checked={false} size="sm" type="Radio" state="Default" />
<CheckboxBase checked={true} size="sm" type="Radio" state="Default" />`

const apiCode = `interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md"
  type?: "Checkbox" | "Radio"
  indeterminate?: boolean
  label?: string
  supportingText?: string
  showSupportingText?: boolean
}

interface CheckboxBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  checked?: boolean
  indeterminate?: boolean
  size?: "sm" | "md"
  type?: "Checkbox" | "Radio" | "Checkbox outline"
  state?: "Default" | "Hover" | "Focused" | "Disabled"
}

interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  supportingText?: string
  checked?: boolean
  disabled?: boolean
  state?: "Default" | "Hover" | "Focused" | "Disabled"
  size?: "sm" | "md"
  onCheckedChange?: (checked: boolean) => void
}`

const tocItems = [
  { title: "Installation", id: "installation" },
  { title: "Usage", id: "usage" },
  { title: "Checkbox Base", id: "checkbox-base" },
  { title: "Checkbox Variants", id: "checkbox-variants" },
  { title: "Checkbox Group", id: "checkbox-group" },
  { title: "Examples", id: "examples" },
  { title: "API Reference", id: "api" },
]

export default function CheckboxPage() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const [groupChecked1, setGroupChecked1] = useState(false)
  const [groupChecked2, setGroupChecked2] = useState(false)
  const [groupChecked3, setGroupChecked3] = useState(false)
  const [groupChecked4, setGroupChecked4] = useState(false)
  const [groupChecked5, setGroupChecked5] = useState(false)

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 id="checkbox" className="scroll-mt-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Checkbox
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2">
            A checkbox allows users to select one or more items from a set. Supports checked, unchecked, and indeterminate states.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Checkbox component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Checkbox with checked and onCheckedChange for controlled state. Copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <Checkbox label="Remember me" />
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={basicUsageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="checkbox-base" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Checkbox Base
          </h2>
          <p className="text-muted-foreground mb-6">
            The checkbox base component provides all visual states and variants. Use this when you need full control over styling.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic States</h3>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-4">
                  <CheckboxBase checked={false} size="sm" type="Checkbox" state="Default" />
                  <CheckboxBase checked={true} size="sm" type="Checkbox" state="Default" />
                  <CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Default" />
                </div>
              </ComponentPreview>
              <CodeBlock code={checkboxBaseCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">All Variants</h3>
              <Tabs defaultValue="unchecked" className="w-full">
                <TabsList>
                  <TabsTrigger value="unchecked">Unchecked</TabsTrigger>
                  <TabsTrigger value="checked">Checked</TabsTrigger>
                  <TabsTrigger value="indeterminate">Indeterminate</TabsTrigger>
                  <TabsTrigger value="radio">Radio</TabsTrigger>
                  <TabsTrigger value="outline">Outline</TabsTrigger>
                </TabsList>
                <TabsContent value="unchecked">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Default</div>
                        <CheckboxBase checked={false} size="sm" type="Checkbox" state="Default" />
                        <CheckboxBase checked={false} size="md" type="Checkbox" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Hover</div>
                        <CheckboxBase checked={false} size="sm" type="Checkbox" state="Hover" />
                        <CheckboxBase checked={false} size="md" type="Checkbox" state="Hover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Focused</div>
                        <CheckboxBase checked={false} size="sm" type="Checkbox" state="Focused" />
                        <CheckboxBase checked={false} size="md" type="Checkbox" state="Focused" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Disabled</div>
                        <CheckboxBase checked={false} size="sm" type="Checkbox" state="Disabled" />
                        <CheckboxBase checked={false} size="md" type="Checkbox" state="Disabled" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="checked">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Default</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox" state="Default" />
                        <CheckboxBase checked={true} size="md" type="Checkbox" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Hover</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox" state="Hover" />
                        <CheckboxBase checked={true} size="md" type="Checkbox" state="Hover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Focused</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox" state="Focused" />
                        <CheckboxBase checked={true} size="md" type="Checkbox" state="Focused" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Disabled</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox" state="Disabled" />
                        <CheckboxBase checked={true} size="md" type="Checkbox" state="Disabled" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="indeterminate">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Default</div>
                        <CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Default" />
                        <CheckboxBase checked={true} indeterminate={true} size="md" type="Checkbox" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Hover</div>
                        <CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Hover" />
                        <CheckboxBase checked={true} indeterminate={true} size="md" type="Checkbox" state="Hover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Focused</div>
                        <CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Focused" />
                        <CheckboxBase checked={true} indeterminate={true} size="md" type="Checkbox" state="Focused" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Disabled</div>
                        <CheckboxBase checked={true} indeterminate={true} size="sm" type="Checkbox" state="Disabled" />
                        <CheckboxBase checked={true} indeterminate={true} size="md" type="Checkbox" state="Disabled" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="radio">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Unchecked</div>
                        <CheckboxBase checked={false} size="sm" type="Radio" state="Default" />
                        <CheckboxBase checked={false} size="md" type="Radio" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Checked</div>
                        <CheckboxBase checked={true} size="sm" type="Radio" state="Default" />
                        <CheckboxBase checked={true} size="md" type="Radio" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Disabled</div>
                        <CheckboxBase checked={false} size="sm" type="Radio" state="Disabled" />
                        <CheckboxBase checked={true} size="sm" type="Radio" state="Disabled" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="outline">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Default</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox outline" state="Default" />
                        <CheckboxBase checked={true} size="md" type="Checkbox outline" state="Default" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Hover</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox outline" state="Hover" />
                        <CheckboxBase checked={true} size="md" type="Checkbox outline" state="Hover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Focused</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox outline" state="Focused" />
                        <CheckboxBase checked={true} size="md" type="Checkbox outline" state="Focused" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm text-muted-foreground">Disabled</div>
                        <CheckboxBase checked={true} size="sm" type="Checkbox outline" state="Disabled" />
                        <CheckboxBase checked={true} size="md" type="Checkbox outline" state="Disabled" />
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="checkbox-variants" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Checkbox Variants
          </h2>
          <p className="text-muted-foreground mb-6">
            All checkbox variants with different states, sizes, and types. These match the Figma design system.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">With Text Label</h3>
              <Tabs defaultValue="unchecked" className="w-full">
                <TabsList>
                  <TabsTrigger value="unchecked">Unchecked</TabsTrigger>
                  <TabsTrigger value="checked">Checked</TabsTrigger>
                  <TabsTrigger value="indeterminate">Indeterminate</TabsTrigger>
                  <TabsTrigger value="radio">Radio</TabsTrigger>
                </TabsList>
                <TabsContent value="unchecked">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Checkbox size="sm" label="Remember me" />
                      <Checkbox size="md" label="Remember me" />
                      <Checkbox size="sm" label="Remember me" disabled />
                      <Checkbox size="md" label="Remember me" disabled />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="checked">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Checkbox size="sm" label="Remember me" checked />
                      <Checkbox size="md" label="Remember me" checked />
                      <Checkbox size="sm" label="Remember me" checked disabled />
                      <Checkbox size="md" label="Remember me" checked disabled />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="indeterminate">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Checkbox size="sm" label="Remember me" checked indeterminate />
                      <Checkbox size="md" label="Remember me" checked indeterminate />
                      <Checkbox size="sm" label="Remember me" checked indeterminate disabled />
                      <Checkbox size="md" label="Remember me" checked indeterminate disabled />
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="radio">
                  <ComponentPreview>
                    <div className="space-y-4">
                      <Checkbox type="Radio" size="sm" label="Option 1" />
                      <Checkbox type="Radio" size="md" label="Option 2" />
                      <Checkbox type="Radio" size="sm" label="Option 3" checked />
                      <Checkbox type="Radio" size="md" label="Option 4" checked />
                      <Checkbox type="Radio" size="sm" label="Option 5" disabled />
                      <Checkbox type="Radio" size="md" label="Option 6" checked disabled />
                    </div>
                  </ComponentPreview>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">With Supporting Text</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Checkbox
                    size="sm"
                    label="Remember me"
                    supportingText="Save my login details for next time."
                    showSupportingText={true}
                  />
                  <Checkbox
                    size="md"
                    label="Remember me"
                    supportingText="Save my login details for next time."
                    showSupportingText={true}
                  />
                  <Checkbox
                    size="sm"
                    label="Remember me"
                    supportingText="Save my login details for next time."
                    showSupportingText={true}
                    checked
                  />
                  <Checkbox
                    size="sm"
                    label="Remember me"
                    supportingText="Save my login details for next time."
                    showSupportingText={true}
                    disabled
                  />
                </div>
              </ComponentPreview>
            </div>
          </div>
        </section>

        <section id="checkbox-group" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Checkbox Group
          </h2>
          <p className="text-muted-foreground mb-6">
            A checkbox group component that combines a label, supporting text, and checkbox in a single interactive container.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
              <ComponentPreview>
                <CheckboxGroup
                  label="Checkbox Label"
                  supportingText="Content will go here"
                  checked={groupChecked1}
                  onCheckedChange={setGroupChecked1}
                />
              </ComponentPreview>
              <CodeBlock code={checkboxGroupCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">All States</h3>
              <ComponentPreview>
                <div className="space-y-3">
                  <CheckboxGroup
                    label="Checkbox Label"
                    supportingText="Content will go here"
                    checked={groupChecked2}
                    onCheckedChange={setGroupChecked2}
                  />
                  <CheckboxGroup
                    label="Checkbox Label"
                    supportingText="Content will go here"
                    checked={groupChecked3}
                    onCheckedChange={setGroupChecked3}
                    state="Hover"
                  />
                  <CheckboxGroup
                    label="Checkbox Label"
                    supportingText="Content will go here"
                    checked={groupChecked4}
                    onCheckedChange={setGroupChecked4}
                    state="Focused"
                  />
                  <CheckboxGroup
                    label="Checkbox Label"
                    supportingText="Content will go here"
                    checked={true}
                    disabled
                  />
                  <CheckboxGroup
                    label="Checkbox Label"
                    supportingText="Content will go here"
                    checked={false}
                    disabled
                  />
                </div>
              </ComponentPreview>
              <CodeBlock code={checkboxGroupStatesCode} />
            </div>
          </div>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Checkbox size="sm" label="Small checkbox" />
                  <Checkbox size="md" label="Medium checkbox" />
                </div>
              </ComponentPreview>
              <CodeBlock code={sizesCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Checkbox label="Default" />
                  <Checkbox label="Checked" checked />
                  <Checkbox label="Indeterminate" checked indeterminate />
                  <Checkbox label="Disabled" disabled />
                  <Checkbox label="Checked Disabled" checked disabled />
                </div>
              </ComponentPreview>
              <CodeBlock code={statesCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">With Supporting Text</h3>
              <ComponentPreview>
                <Checkbox
                  label="Remember me"
                  supportingText="Save my login details for next time."
                  showSupportingText={true}
                />
              </ComponentPreview>
              <CodeBlock code={withSupportingTextCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Radio Buttons</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Checkbox
                    type="Radio"
                    label="Option 1"
                    name="radio-group"
                    checked={radioValue === "option1"}
                    onChange={() => setRadioValue("option1")}
                  />
                  <Checkbox
                    type="Radio"
                    label="Option 2"
                    name="radio-group"
                    checked={radioValue === "option2"}
                    onChange={() => setRadioValue("option2")}
                  />
                  <Checkbox
                    type="Radio"
                    label="Option 3"
                    name="radio-group"
                    checked={radioValue === "option3"}
                    onChange={() => setRadioValue("option3")}
                  />
                </div>
              </ComponentPreview>
              <CodeBlock code={radioCode} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Controlled</h3>
              <ComponentPreview>
                <div className="space-y-4">
                  <Checkbox
                    label="Controlled checkbox"
                    checked={checked1}
                    onChange={(e) => setChecked1(e.target.checked)}
                  />
                  <Checkbox
                    label="Another controlled checkbox"
                    checked={checked2}
                    onChange={(e) => setChecked2(e.target.checked)}
                  />
                  <Checkbox
                    label="Indeterminate controlled"
                    checked={checked3}
                    indeterminate={checked3}
                    onChange={(e) => setChecked3(e.target.checked)}
                  />
                </div>
              </ComponentPreview>
              <CodeBlock code={controlledCode} />
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Checkbox component displays a selectable control. It supports checked, onCheckedChange, size, state, and supporting text. See the interface below for full prop details.
          </p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
