"use client"

import { Alert } from "@/components/ui/alert"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/docs/tabs"
import { TableOfContents } from "@/components/docs/table-of-contents"

const installationCode = `import { Alert } from "@/components/ui/alert"`

const usageCode = `import { Alert } from "@/components/ui/alert"

export function AlertExample() {
  return (
    <Alert state="info" size="md">
      The TXID is valid. Please proceed to the next step.
    </Alert>
  )
}`

const basicUsageCode = `<Alert state="info" size="md">
  The TXID is valid. Please proceed to the next step
</Alert>`

const statesCode = `<Alert state="info" size="md">
  Information message
</Alert>

<Alert state="error" size="md">
  Error message
</Alert>

<Alert state="success" size="md">
  Success message
</Alert>

<Alert state="warning" size="md">
  Warning message
</Alert>`

const sizesCode = `<Alert state="info" size="sm">
  Small alert message
</Alert>

<Alert state="info" size="md">
  Medium alert message
</Alert>`

const typesCode = `<Alert state="info" type="unselected">
  Unselected (default with border)
</Alert>

<Alert state="info" type="filled">
  Filled (with background)
</Alert>

<Alert state="info" type="text">
  Text (no background, no border)
</Alert>`

const interactionStatesCode = `<Alert state="info" type="unselected" interaction="default">
  Unselected (default state)
</Alert>

<Alert state="info" type="unselected" interaction="hover">
  Hover state
</Alert>

<Alert state="info" type="unselected" interaction="selected">
  Selected state
</Alert>`

const allVariantsCode = `// Info
<Alert state="info" size="sm" type="unselected">Small info</Alert>
<Alert state="info" size="sm" type="filled">Small info filled</Alert>
<Alert state="info" size="sm" type="text">Small info text</Alert>
<Alert state="info" size="md" type="unselected">Medium info</Alert>
<Alert state="info" size="md" type="filled">Medium info filled</Alert>
<Alert state="info" size="md" type="text">Medium info text</Alert>

// Error
<Alert state="error" size="sm" type="unselected">Small error</Alert>
<Alert state="error" size="sm" type="filled">Small error filled</Alert>
<Alert state="error" size="sm" type="text">Small error text</Alert>
<Alert state="error" size="md" type="unselected">Medium error</Alert>
<Alert state="error" size="md" type="filled">Medium error filled</Alert>
<Alert state="error" size="md" type="text">Medium error text</Alert>

// Success
<Alert state="success" size="sm" type="unselected">Small success</Alert>
<Alert state="success" size="sm" type="filled">Small success filled</Alert>
<Alert state="success" size="sm" type="text">Small success text</Alert>
<Alert state="success" size="md" type="unselected">Medium success</Alert>
<Alert state="success" size="md" type="filled">Medium success filled</Alert>
<Alert state="success" size="md" type="text">Medium success text</Alert>

// Warning
<Alert state="warning" size="sm" type="unselected">Small warning</Alert>
<Alert state="warning" size="sm" type="filled">Small warning filled</Alert>
<Alert state="warning" size="sm" type="text">Small warning text</Alert>
<Alert state="warning" size="md" type="unselected">Medium warning</Alert>
<Alert state="warning" size="md" type="filled">Medium warning filled</Alert>
<Alert state="warning" size="md" type="text">Medium warning text</Alert>`

const customIconCode = `import { iconComponents } from "@/components/icons/icons"

const CustomIcon = iconComponents["bell-ringing-01"]?.component

<Alert state="info" icon={<CustomIcon size={20} />}>
  Custom icon alert
</Alert>`

const noIconCode = `<Alert state="info" showIcon={false}>
  Alert without icon
</Alert>`

const apiCode = `interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert state/variant
   * @default "info"
   */
  state?: "info" | "error" | "success" | "warning"
  
  /**
   * Alert size
   * @default "md"
   */
  size?: "sm" | "md"
  
  /**
   * Alert type/style
   * @default "unselected"
   */
  type?: "unselected" | "filled" | "text"
  
  /**
   * Interaction state: default (unselected), hover, or selected
   * @default "default"
   */
  interaction?: "default" | "hover" | "selected"
  
  /**
   * Alert message text
   */
  children: React.ReactNode
  
  /**
   * Optional icon override
   */
  icon?: React.ReactNode
  
  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean
}`

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "states", title: "States" },
  { id: "sizes", title: "Sizes" },
  { id: "types", title: "Types" },
  { id: "interaction-states", title: "Interaction States" },
  { id: "examples", title: "Examples" },
  { id: "api", title: "API Reference" },
]

export default function AlertPage() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="w-full min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            Alert
          </h1>
          <p className="text-muted-foreground text-lg">
            Alert components for displaying informational, error, success, and warning messages with icons and customizable styles.
          </p>
        </div>

        <section id="installation" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            The Alert component is part of the design system. Import it from the UI package.
          </p>
          <CodeBlock code={installationCode} />
        </section>

        <section id="usage" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Use Alert with a state (info, error, success, warning), optional size and type. You can copy the example below to get started.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <Alert state="info" size="md">
                  The TXID is valid. Please proceed to the next step.
                </Alert>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={usageCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="states" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            States
          </h2>
          <p className="text-muted-foreground mb-4">
            Alerts support four states: info, error, success, and warning. Each state has its own color scheme and icon.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Alert state="info" size="md">
                    Information message
                  </Alert>
                  <Alert state="error" size="md">
                    Invalid TXID format. Please check and try again.
                  </Alert>
                  <Alert state="success" size="md">
                    Transaction completed successfully.
                  </Alert>
                  <Alert state="warning" size="md">
                    Invalid TXID format. Please check and try again.
                  </Alert>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={statesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="sizes" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Sizes
          </h2>
          <p className="text-muted-foreground mb-4">
            Alerts come in two sizes: small (sm) and medium (md). Small alerts are 32px tall, medium alerts are 48px tall.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Alert state="info" size="sm">
                    Small alert message
                  </Alert>
                  <Alert state="info" size="md">
                    Medium alert message
                  </Alert>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={sizesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="types" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Types
          </h2>
          <p className="text-muted-foreground mb-4">
            Alerts support three types: unselected (default with border), filled (with background), and text (no background or border).
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <Alert state="info" type="unselected">
                    Unselected (default with border)
                  </Alert>
                  <Alert state="info" type="filled">
                    Filled (with background)
                  </Alert>
                  <Alert state="info" type="text">
                    Text (no background, no border)
                  </Alert>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={typesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="interaction-states" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Interaction States
          </h2>
          <p className="text-muted-foreground mb-4">
            Unselected alerts support three interaction states: default (unselected), hover, and selected. The hover state is automatically applied on hover, but you can also explicitly set the interaction state.
          </p>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <ComponentPreview>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Info</div>
                    <Alert state="info" type="unselected" interaction="default">
                      Unselected (default state) - hover to see hover state
                    </Alert>
                    <Alert state="info" type="unselected" interaction="hover">
                      Hover state
                    </Alert>
                    <Alert state="info" type="unselected" interaction="selected">
                      Selected state
                    </Alert>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Error</div>
                    <Alert state="error" type="unselected" interaction="default">
                      Unselected (default state) - hover to see hover state
                    </Alert>
                    <Alert state="error" type="unselected" interaction="hover">
                      Hover state
                    </Alert>
                    <Alert state="error" type="unselected" interaction="selected">
                      Selected state
                    </Alert>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Success</div>
                    <Alert state="success" type="unselected" interaction="default">
                      Unselected (default state) - hover to see hover state
                    </Alert>
                    <Alert state="success" type="unselected" interaction="hover">
                      Hover state
                    </Alert>
                    <Alert state="success" type="unselected" interaction="selected">
                      Selected state
                    </Alert>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Warning</div>
                    <Alert state="warning" type="unselected" interaction="default">
                      Unselected (default state) - hover to see hover state
                    </Alert>
                    <Alert state="warning" type="unselected" interaction="hover">
                      Hover state
                    </Alert>
                    <Alert state="warning" type="unselected" interaction="selected">
                      Selected state
                    </Alert>
                  </div>
                </div>
              </ComponentPreview>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={interactionStatesCode} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="examples" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            Examples
          </h2>
          <p className="text-muted-foreground mb-6">
            Copy any example below to use in your project. Each shows a common pattern (basic, error, success, etc.).
          </p>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-1">Basic</h3>
              <p className="text-muted-foreground text-sm mb-3">
                A basic info alert with default size and style.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="info" size="md">
                      Your profile information has been saved. Changes will be reflected immediately.
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`<Alert state="info" size="md">
  Your profile information has been saved. Changes will be reflected immediately.
</Alert>`} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Error (destructive)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Use <code className="text-xs bg-muted px-1 rounded">state="error"</code> for payment failures or validation errors.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="error" size="md">
                      Your payment could not be processed. Please check your payment method and try again.
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`<Alert state="error" size="md">
  Your payment could not be processed. Please check your payment method and try again.
</Alert>`} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Success</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Use <code className="text-xs bg-muted px-1 rounded">state="success"</code> for confirmations and completed actions.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="success" size="md">
                      Transaction completed successfully. A receipt has been sent to your email.
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`<Alert state="success" size="md">
  Transaction completed successfully. A receipt has been sent to your email.
</Alert>`} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Warning</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Use <code className="text-xs bg-muted px-1 rounded">state="warning"</code> for caution or expiry notices.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="warning" size="md">
                      Your subscription will expire in 3 days. Renew now to avoid service interruption.
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={`<Alert state="warning" size="md">
  Your subscription will expire in 3 days. Renew now to avoid service interruption.
</Alert>`} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">All Variants</h3>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <div className="flex flex-col gap-4">
                      {/* Info */}
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Info</div>
                        <div className="flex flex-col gap-2">
                          <Alert state="info" size="sm" type="unselected">The TXID is valid.</Alert>
                          <Alert state="info" size="sm" type="filled">The TXID is valid.</Alert>
                          <Alert state="info" size="sm" type="text">The TXID is valid.</Alert>
                          <Alert state="info" size="md" type="unselected">The TXID is valid. Please proceed to the next step</Alert>
                          <Alert state="info" size="md" type="filled">The TXID is valid. Please proceed to the next step</Alert>
                          <Alert state="info" size="md" type="text">The TXID is valid. Please proceed to the next step</Alert>
                        </div>
                      </div>
                      {/* Error */}
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Error</div>
                        <div className="flex flex-col gap-2">
                          <Alert state="error" size="sm" type="unselected">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="error" size="sm" type="filled">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="error" size="sm" type="text">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="error" size="md" type="unselected">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="error" size="md" type="filled">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="error" size="md" type="text">Invalid TXID format. Please check and try again.</Alert>
                        </div>
                      </div>
                      {/* Success */}
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Success</div>
                        <div className="flex flex-col gap-2">
                          <Alert state="success" size="sm" type="unselected">Transaction completed successfully.</Alert>
                          <Alert state="success" size="sm" type="filled">Transaction completed successfully.</Alert>
                          <Alert state="success" size="sm" type="text">Transaction completed successfully.</Alert>
                          <Alert state="success" size="md" type="unselected">Transaction completed successfully.</Alert>
                          <Alert state="success" size="md" type="filled">Transaction completed successfully.</Alert>
                          <Alert state="success" size="md" type="text">Transaction completed successfully.</Alert>
                        </div>
                      </div>
                      {/* Warning */}
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium text-muted-foreground">Warning</div>
                        <div className="flex flex-col gap-2">
                          <Alert state="warning" size="sm" type="unselected">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="warning" size="sm" type="filled">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="warning" size="sm" type="text">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="warning" size="md" type="unselected">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="warning" size="md" type="filled">Invalid TXID format. Please check and try again.</Alert>
                          <Alert state="warning" size="md" type="text">Invalid TXID format. Please check and try again.</Alert>
                        </div>
                      </div>
                    </div>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={allVariantsCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Custom Icon</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Pass a custom icon via the <code className="text-xs bg-muted px-1 rounded">icon</code> prop.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="info" icon={null} showIcon={false}>
                      Alert without icon (custom implementation needed)
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={customIconCode} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">Without Icon</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Set <code className="text-xs bg-muted px-1 rounded">showIcon={false}</code> to hide the icon.
              </p>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <ComponentPreview>
                    <Alert state="info" showIcon={false}>
                      Alert without icon
                    </Alert>
                  </ComponentPreview>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock code={noIconCode} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="api" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
            API Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            The Alert component displays a callout for user attention. It supports four states (info, error, success, warning), two sizes, and three visual types.
          </p>
          <div className="overflow-x-auto rounded-lg border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium p-3">Prop</th>
                  <th className="text-left font-medium p-3">Type</th>
                  <th className="text-left font-medium p-3">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">state</td>
                  <td className="p-3 text-muted-foreground">&quot;info&quot; | &quot;error&quot; | &quot;success&quot; | &quot;warning&quot;</td>
                  <td className="p-3 text-muted-foreground">&quot;info&quot;</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">size</td>
                  <td className="p-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot;</td>
                  <td className="p-3 text-muted-foreground">&quot;md&quot;</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">type</td>
                  <td className="p-3 text-muted-foreground">&quot;unselected&quot; | &quot;filled&quot; | &quot;text&quot;</td>
                  <td className="p-3 text-muted-foreground">&quot;unselected&quot;</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">interaction</td>
                  <td className="p-3 text-muted-foreground">&quot;default&quot; | &quot;hover&quot; | &quot;selected&quot;</td>
                  <td className="p-3 text-muted-foreground">&quot;default&quot;</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">icon</td>
                  <td className="p-3 text-muted-foreground">React.ReactNode</td>
                  <td className="p-3 text-muted-foreground">—</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-mono text-xs">showIcon</td>
                  <td className="p-3 text-muted-foreground">boolean</td>
                  <td className="p-3 text-muted-foreground">true</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">children</td>
                  <td className="p-3 text-muted-foreground">React.ReactNode</td>
                  <td className="p-3 text-muted-foreground">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Alert also accepts all standard <code className="text-xs bg-muted px-1 rounded">HTMLDivElement</code> attributes (e.g. className).</p>
          <CodeBlock code={apiCode} />
        </section>
      </div>
      <TableOfContents items={tocItems} />
    </div>
  )
}
