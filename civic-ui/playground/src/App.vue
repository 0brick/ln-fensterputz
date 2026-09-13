<script setup>
// Living style guide + demo page: every component gets a section here so
// changes are visible immediately with `npm run dev`. Not part of the
// published package — this file lives only in the playground.
import { ref } from 'vue'
import {
  AppButton,
  ButtonGroup,
  CloseButton,
  Alert,
  Badge,
  ToastContainer,
  useToast,
  Spinner,
  Placeholder,
  ProgressBar,
  Breadcrumb,
  Pagination,
  Tabs,
  Dropdown,
  Offcanvas,
  ScrollspyNav,
  Modal,
  BottomSheet,
  Tooltip,
  Popover,
  Card,
  Accordion,
  AccordionItem,
  Collapse,
  ListGroup,
  Carousel,
  TextInput,
  Textarea,
  FloatingLabel,
  InputGroup,
  Select,
  Checkbox,
  Radio,
  Switch,
  RangeSlider,
  HeroSection,
  SiteHeader,
  SiteFooter,
  TeaserGrid,
  CtaBanner,
  StatsSection,
  NewsletterSection
} from '../../src/index.js'

const toast = useToast()
const offcanvasOpen = ref(false)
const modalOpen = ref(false)
const sheetOpen = ref(false)
const page = ref(3)
const email = ref('')
const country = ref('')
const agree = ref(false)
const plan = ref('standard')
const notifications = ref(true)
const volume = ref(40)
const checkboxes = ref([])
const showMore = ref(false)
</script>

<template>
  <ToastContainer />

  <SiteHeader :utility-links="[{ label: 'Contact', href: '#' }, { label: 'Press', href: '#' }, { label: 'Careers', href: '#' }]">
    <template #brand><a href="#">Civic UI</a></template>
    <template #links>
      <a href="#">About</a>
      <a href="#">Work</a>
      <a href="#">Topics</a>
      <a href="#">Careers</a>
    </template>
    <template #actions>
      <AppButton variant="accent" size="sm" href="#kontakt">Contact</AppButton>
    </template>
  </SiteHeader>

  <HeroSection
    eyebrow="Component library"
    title="A calm, official-feeling UI kit for serious projects."
    text="Every component on this page ships in the package — copy a section, wire your data, and you have a professional site."
    :primary-action="{ label: 'Browse components', href: '#components' }"
    :secondary-action="{ label: 'Read the docs', href: '#' }"
  />

  <main id="components" class="cui-container cui-stack" style="padding-block: 6.4rem; gap: 6.4rem;">
    <Breadcrumb :items="[{ label: 'Home', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Playground' }]" />

    <section>
      <h2>Buttons &amp; Button group</h2>
      <div class="cui-cluster">
        <AppButton variant="primary">Primary</AppButton>
        <AppButton variant="accent">Accent</AppButton>
        <AppButton variant="outline">Outline</AppButton>
        <AppButton variant="ghost">Ghost</AppButton>
        <AppButton variant="link">Link</AppButton>
        <AppButton variant="danger">Danger</AppButton>
        <AppButton variant="primary" loading>Loading</AppButton>
        <AppButton variant="primary" disabled>Disabled</AppButton>
      </div>
      <div class="cui-cluster" style="margin-top: 1.6rem;">
        <ButtonGroup>
          <AppButton variant="primary">Day</AppButton>
          <AppButton variant="primary">Week</AppButton>
          <AppButton variant="primary">Month</AppButton>
        </ButtonGroup>
        <CloseButton />
      </div>
    </section>

    <section>
      <h2>Alerts &amp; Badges</h2>
      <div class="cui-stack">
        <Alert variant="info" title="Heads up">This is an informational alert.</Alert>
        <Alert variant="success" dismissible>Your changes were saved successfully.</Alert>
        <Alert variant="warning">Please double-check the highlighted fields.</Alert>
        <Alert variant="danger">Something went wrong submitting the form.</Alert>
      </div>
      <div class="cui-cluster" style="margin-top: 1.6rem;">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success" pill>Active</Badge>
        <Badge variant="danger" pill>Closed</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </section>

    <section>
      <h2>Toasts</h2>
      <div class="cui-cluster">
        <AppButton variant="outline" @click="toast.info('This is an informational toast.')">Show info toast</AppButton>
        <AppButton variant="outline" @click="toast.success('Saved successfully.', { title: 'Success' })">Show success toast</AppButton>
        <AppButton variant="outline" @click="toast.danger('Could not save changes.', { title: 'Error' })">Show error toast</AppButton>
      </div>
    </section>

    <section>
      <h2>Spinners, Placeholders &amp; Progress</h2>
      <div class="cui-cluster">
        <Spinner size="sm" /><Spinner /><Spinner size="lg" />
      </div>
      <div class="cui-stack" style="margin-top: 1.6rem; max-width: 420px;">
        <Placeholder height="2.4rem" width="60%" />
        <Placeholder height="1.4rem" />
        <Placeholder height="1.4rem" width="80%" />
      </div>
      <div class="cui-stack" style="margin-top: 1.6rem; max-width: 420px;">
        <ProgressBar :value="72" label="Upload progress" show-value />
        <ProgressBar :value="40" variant="accent" striped />
      </div>
    </section>

    <section>
      <h2>Navs &amp; Tabs, Pagination, Dropdown</h2>
      <Tabs :tabs="[{ id: 'one', label: 'Overview' }, { id: 'two', label: 'Details' }, { id: 'three', label: 'Documents' }]">
        <template #one>Overview content goes here.</template>
        <template #two>Details content goes here.</template>
        <template #three>Documents content goes here.</template>
      </Tabs>
      <div class="cui-cluster" style="margin-top: 2.4rem;">
        <Pagination v-model="page" :total="12" />
        <Dropdown>
          <template #trigger><AppButton variant="outline">Options ▾</AppButton></template>
          <a href="#">Edit</a>
          <a href="#">Duplicate</a>
          <button type="button">Delete</button>
        </Dropdown>
      </div>
    </section>

    <section>
      <h2>Offcanvas, Modal &amp; Bottom sheet</h2>
      <div class="cui-cluster">
        <AppButton variant="outline" @click="offcanvasOpen = true">Open offcanvas</AppButton>
        <AppButton variant="outline" @click="modalOpen = true">Open modal</AppButton>
        <AppButton variant="outline" @click="sheetOpen = true">Open bottom sheet</AppButton>
      </div>
      <Offcanvas v-model="offcanvasOpen" title="Filters">
        <p>Offcanvas content — filters, a cart, a secondary menu.</p>
      </Offcanvas>
      <Modal v-model="modalOpen" title="Confirm action">
        <p>Are you sure you want to proceed? This cannot be undone.</p>
        <template #footer="{ close }">
          <AppButton variant="ghost" @click="close">Cancel</AppButton>
          <AppButton variant="primary" @click="close">Confirm</AppButton>
        </template>
      </Modal>
      <BottomSheet v-model="sheetOpen" title="Quick actions">
        <p>Common mobile pattern for a short list of actions.</p>
      </BottomSheet>
    </section>

    <section>
      <h2>Tooltips &amp; Popovers</h2>
      <div class="cui-cluster">
        <Tooltip text="Additional context on hover">
          <AppButton variant="outline">Hover me</AppButton>
        </Tooltip>
        <Popover title="More information">
          <template #trigger><AppButton variant="outline">Click me</AppButton></template>
          <p>Rich popover content can go here, including links and buttons.</p>
        </Popover>
      </div>
    </section>

    <section>
      <h2>Cards, Carousel &amp; List group</h2>
      <div class="cui-grid cui-grid--3">
        <Card eyebrow="Topic" title="Cybersecurity" href="#">
          Protecting critical infrastructure from digital threats.
        </Card>
        <Card eyebrow="Topic" title="Regions" href="#" variant="outlined">
          Analysis across regions and geopolitical developments.
        </Card>
        <Card eyebrow="Topic" title="Careers" href="#" variant="flat">
          Open positions across analysis, tech and operations.
        </Card>
      </div>

      <div style="margin-top: 3.2rem;">
        <Carousel :slide-count="3">
          <Card title="Slide one">First slide content.</Card>
          <Card title="Slide two">Second slide content.</Card>
          <Card title="Slide three">Third slide content.</Card>
        </Carousel>
      </div>

      <div style="margin-top: 3.2rem; max-width: 420px;">
        <ListGroup
          :items="[
            { label: 'Application received', description: 'Step 1 of 4', badge: '✓' },
            { label: 'Interview scheduled', description: 'Step 2 of 4', active: true },
            { label: 'Background check', description: 'Step 3 of 4' }
          ]"
        />
      </div>
    </section>

    <section>
      <h2>Accordion &amp; Collapse</h2>
      <Accordion>
        <AccordionItem title="What does this component library include?">
          Every component listed in the documentation, styled consistently.
        </AccordionItem>
        <AccordionItem title="Can I use my own colors?">
          Yes — override the CSS variables in tokens.css.
        </AccordionItem>
      </Accordion>
      <Collapse v-model="showMore" label="Show more details" style="margin-top: 1.6rem;">
        <p>Extra detail revealed by the Collapse component.</p>
      </Collapse>
    </section>

    <section>
      <h2>Forms — inputs, select, checks &amp; radios, range</h2>
      <div class="cui-grid cui-grid--2">
        <TextInput v-model="email" label="Email" type="email" placeholder="you@example.com" hint="We'll never share this." />
        <Select v-model="country" label="Country" placeholder="Choose a country" :options="['Germany', 'Austria', 'Switzerland']" />
        <FloatingLabel v-model="email" label="Floating label email" type="email" />
        <InputGroup label="Website">
          <template #prepend>https://</template>
          <input type="text" placeholder="example.com" />
        </InputGroup>
        <Textarea label="Message" placeholder="Your message" />
        <RangeSlider v-model="volume" label="Volume" :min="0" :max="100" />
      </div>

      <div class="cui-stack" style="margin-top: 2.4rem;">
        <Checkbox v-model="agree" label="I agree to the terms and conditions" />
        <Checkbox v-model="checkboxes" value="a" label="Option A" />
        <Checkbox v-model="checkboxes" value="b" label="Option B" />
        <div class="cui-cluster">
          <Radio v-model="plan" value="basic" name="plan" label="Basic" />
          <Radio v-model="plan" value="standard" name="plan" label="Standard" />
          <Radio v-model="plan" value="pro" name="plan" label="Pro" />
        </div>
        <Switch v-model="notifications" label="Email notifications" />
      </div>
    </section>

    <section>
      <h2>Scrollspy</h2>
      <p>See <code>ScrollspyNav</code> — pair it with page sections that carry matching ids.</p>
    </section>
  </main>

  <TeaserGrid
    eyebrow="Topics"
    title="What we work on"
    intro="A representative slice of subject areas, rendered from a plain array of objects."
    :items="[
      { title: 'Cybersecurity', text: 'Defending against digital threats.', href: '#' },
      { title: 'Regions', text: 'Geopolitical analysis by region.', href: '#' },
      { title: 'Proliferation', text: 'Tracking the spread of sensitive technology.', href: '#' }
    ]"
  />

  <StatsSection
    title="By the numbers"
    :stats="[
      { value: '30+', label: 'Locations' },
      { value: '6,500', label: 'Employees' },
      { value: '75', label: 'Years of service' },
      { value: '24/7', label: 'Operations' }
    ]"
  />

  <CtaBanner title="Interested in joining us?" text="We're hiring across analysis, technology and operations." :action="{ label: 'View open roles', href: '#' }" />

  <NewsletterSection title="Stay informed" text="Occasional updates, no spam." @submit="(addr) => toast.success(`Subscribed: ${addr}`)" />

  <SiteFooter
    :columns="[
      { title: 'About', links: [{ label: 'Mission', href: '#' }, { label: 'History', href: '#' }] },
      { title: 'Work', links: [{ label: 'Topics', href: '#' }, { label: 'Reports', href: '#' }] },
      { title: 'Careers', links: [{ label: 'Open roles', href: '#' }, { label: 'Application process', href: '#' }] }
    ]"
    :legal-links="[{ label: 'Imprint', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Accessibility', href: '#' }]"
    copyright="© 2026 Civic UI. All rights reserved."
  >
    <template #brand>
      <p><strong>Civic UI</strong></p>
      <p>A clean, professional Vue component library for official-feeling web projects.</p>
    </template>
  </SiteFooter>
</template>
