// Single entry point for the whole library. A consumer can either:
//   import { AppButton, HeroSection } from 'civic-ui'
// or register everything at once with app.use(CivicUI) and use the tags
// globally (<cui-button>, <cui-hero-section>, ...) — see the docs for both.
import './styles/tokens.css'
import './styles/base.css'
import './styles/utilities.css'

// Buttons
import AppButton from './components/button/AppButton.vue'
import ButtonGroup from './components/button/ButtonGroup.vue'
import CloseButton from './components/button/CloseButton.vue'

// Feedback
import Alert from './components/feedback/Alert.vue'
import Badge from './components/feedback/Badge.vue'
import Toast from './components/feedback/Toast.vue'
import ToastContainer from './components/feedback/ToastContainer.vue'
import Spinner from './components/feedback/Spinner.vue'
import Placeholder from './components/feedback/Placeholder.vue'
import ProgressBar from './components/feedback/ProgressBar.vue'

// Navigation
import Navbar from './components/navigation/Navbar.vue'
import Breadcrumb from './components/navigation/Breadcrumb.vue'
import Pagination from './components/navigation/Pagination.vue'
import Tabs from './components/navigation/Tabs.vue'
import Dropdown from './components/navigation/Dropdown.vue'
import Offcanvas from './components/navigation/Offcanvas.vue'
import ScrollspyNav from './components/navigation/ScrollspyNav.vue'

// Overlays
import Modal from './components/overlay/Modal.vue'
import BottomSheet from './components/overlay/BottomSheet.vue'
import Tooltip from './components/overlay/Tooltip.vue'
import Popover from './components/overlay/Popover.vue'

// Content
import Card from './components/content/Card.vue'
import Accordion from './components/content/Accordion.vue'
import AccordionItem from './components/content/AccordionItem.vue'
import Collapse from './components/content/Collapse.vue'
import ListGroup from './components/content/ListGroup.vue'
import Carousel from './components/content/Carousel.vue'

// Forms
import TextInput from './components/forms/TextInput.vue'
import Textarea from './components/forms/Textarea.vue'
import FloatingLabel from './components/forms/FloatingLabel.vue'
import InputGroup from './components/forms/InputGroup.vue'
import Select from './components/forms/Select.vue'
import Checkbox from './components/forms/Checkbox.vue'
import Radio from './components/forms/Radio.vue'
import Switch from './components/forms/Switch.vue'
import RangeSlider from './components/forms/RangeSlider.vue'

// Sections
import HeroSection from './sections/HeroSection.vue'
import TopBar from './sections/TopBar.vue'
import SiteHeader from './sections/SiteHeader.vue'
import SiteFooter from './sections/SiteFooter.vue'
import TeaserGrid from './sections/TeaserGrid.vue'
import CtaBanner from './sections/CtaBanner.vue'
import StatsSection from './sections/StatsSection.vue'
import NewsletterSection from './sections/NewsletterSection.vue'

// Composables
export { useToast } from './composables/useToast'
export { useClickOutside } from './composables/useClickOutside'
export { useId } from './composables/useId'
export { useScrollspy } from './composables/useScrollspy'

export {
  AppButton,
  ButtonGroup,
  CloseButton,
  Alert,
  Badge,
  Toast,
  ToastContainer,
  Spinner,
  Placeholder,
  ProgressBar,
  Navbar,
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
  TopBar,
  SiteHeader,
  SiteFooter,
  TeaserGrid,
  CtaBanner,
  StatsSection,
  NewsletterSection
}

const components = {
  CuiButton: AppButton,
  CuiButtonGroup: ButtonGroup,
  CuiCloseButton: CloseButton,
  CuiAlert: Alert,
  CuiBadge: Badge,
  CuiToast: Toast,
  CuiToastContainer: ToastContainer,
  CuiSpinner: Spinner,
  CuiPlaceholder: Placeholder,
  CuiProgressBar: ProgressBar,
  CuiNavbar: Navbar,
  CuiBreadcrumb: Breadcrumb,
  CuiPagination: Pagination,
  CuiTabs: Tabs,
  CuiDropdown: Dropdown,
  CuiOffcanvas: Offcanvas,
  CuiScrollspyNav: ScrollspyNav,
  CuiModal: Modal,
  CuiBottomSheet: BottomSheet,
  CuiTooltip: Tooltip,
  CuiPopover: Popover,
  CuiCard: Card,
  CuiAccordion: Accordion,
  CuiAccordionItem: AccordionItem,
  CuiCollapse: Collapse,
  CuiListGroup: ListGroup,
  CuiCarousel: Carousel,
  CuiTextInput: TextInput,
  CuiTextarea: Textarea,
  CuiFloatingLabel: FloatingLabel,
  CuiInputGroup: InputGroup,
  CuiSelect: Select,
  CuiCheckbox: Checkbox,
  CuiRadio: Radio,
  CuiSwitch: Switch,
  CuiRangeSlider: RangeSlider,
  CuiHeroSection: HeroSection,
  CuiTopBar: TopBar,
  CuiSiteHeader: SiteHeader,
  CuiSiteFooter: SiteFooter,
  CuiTeaserGrid: TeaserGrid,
  CuiCtaBanner: CtaBanner,
  CuiStatsSection: StatsSection,
  CuiNewsletterSection: NewsletterSection
}

// Vue plugin install — registers every component globally under its `Au*`
// tag name so templates can use them without individual imports.
export default {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  }
}
