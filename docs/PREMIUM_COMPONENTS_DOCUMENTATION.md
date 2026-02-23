# Premium Components Documentation

Complete guide to all premium components added to the Technocoders website.

## Table of Contents
1. [Form Components](#form-components)
2. [Number Counter](#number-counter)
3. [Timeline Components](#timeline-components)
4. [Image Components](#image-components)
5. [Advanced Animations](#advanced-animations)

---

## Form Components

### PremiumForm Components
Location: `src/components/PremiumForm.jsx`

#### FloatingInput
Floating label input field with validation support.

```jsx
import { FloatingInput } from './components/PremiumForm';

<FloatingInput
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  error={errors.email}
/>
```

**Props:**
- `label` (string, required): Input label
- `type` (string): Input type (text, email, password, etc.)
- `value` (string): Input value
- `onChange` (function): Change handler
- `required` (boolean): Mark as required
- `error` (string): Error message to display
- `placeholder` (string): Placeholder text

#### FloatingTextarea
Floating label textarea with auto-resize.

```jsx
<FloatingTextarea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
/>
```

#### FloatingSelect
Floating label select dropdown.

```jsx
<FloatingSelect
  label="Service"
  value={service}
  onChange={(e) => setService(e.target.value)}
  options={[
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Development' }
  ]}
/>
```

#### PremiumCheckbox
Custom styled checkbox with smooth animations.

```jsx
<PremiumCheckbox
  label="I agree to terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

#### PremiumRadio
Custom styled radio button.

```jsx
<PremiumRadio
  label="Option 1"
  name="choice"
  value="option1"
  checked={choice === 'option1'}
  onChange={(e) => setChoice(e.target.value)}
/>
```

---

## Number Counter

### NumberCounter Components
Location: `src/components/NumberCounter.jsx`

#### NumberCounter
Animated number counter with scroll trigger.

```jsx
import { NumberCounter } from './components/NumberCounter';

<NumberCounter
  end={1000}
  start={0}
  duration={2000}
  decimals={0}
  prefix="$"
  suffix="+"
/>
```

**Props:**
- `end` (number, required): Target number
- `start` (number): Starting number (default: 0)
- `duration` (number): Animation duration in ms (default: 2000)
- `decimals` (number): Decimal places (default: 0)
- `prefix` (string): Text before number
- `suffix` (string): Text after number
- `separator` (string): Thousands separator (default: ',')

#### StatCard
Card displaying a statistic with animated counter.

```jsx
<StatCard
  value={500}
  label="Projects Completed"
  icon={<ProjectIcon />}
  prefix=""
  suffix="+"
  color="green"
/>
```

**Colors:** green, blue, purple, orange, pink

#### CounterGrid
Grid layout for multiple stat cards.

```jsx
<CounterGrid
  columns={4}
  stats={[
    { value: 500, label: 'Projects', suffix: '+', color: 'green' },
    { value: 100, label: 'Clients', suffix: '+', color: 'blue' },
    { value: 50, label: 'Team Members', suffix: '+', color: 'purple' },
    { value: 99, label: 'Satisfaction', suffix: '%', color: 'orange' }
  ]}
/>
```

#### CircularProgress
Circular progress indicator with counter.

```jsx
<CircularProgress
  value={75}
  max={100}
  size={120}
  strokeWidth={8}
  color="green"
  label="Completion"
  showValue={true}
/>
```

---

## Timeline Components

### Timeline Components
Location: `src/components/Timeline.jsx`

#### Timeline
Vertical timeline with alternating items.

```jsx
import { Timeline } from './components/Timeline';

<Timeline
  variant="alternating"
  items={[
    {
      date: '2024',
      title: 'Company Founded',
      description: 'Started our journey',
      icon: '🚀',
      color: 'green'
    },
    {
      date: '2025',
      title: 'Major Milestone',
      description: 'Reached 100 clients',
      icon: '🎯',
      color: 'blue'
    }
  ]}
/>
```

**Variants:** alternating, single

#### HorizontalTimeline
Horizontal timeline for process steps.

```jsx
<HorizontalTimeline
  currentStep={2}
  steps={[
    { title: 'Planning', description: 'Define requirements' },
    { title: 'Design', description: 'Create mockups' },
    { title: 'Development', description: 'Build the product' },
    { title: 'Launch', description: 'Go live' }
  ]}
/>
```

#### ProcessTimeline
Numbered process steps with icons.

```jsx
<ProcessTimeline
  steps={[
    {
      title: 'Discovery',
      description: 'Understanding your needs',
      icon: '🔍'
    },
    {
      title: 'Strategy',
      description: 'Planning the approach',
      icon: '📋'
    },
    {
      title: 'Execution',
      description: 'Building the solution',
      icon: '⚡'
    }
  ]}
/>
```

#### CompactTimeline
Compact vertical timeline for lists.

```jsx
<CompactTimeline
  items={[
    { time: '10:00 AM', text: 'Project kickoff meeting' },
    { time: '2:00 PM', text: 'Design review' },
    { time: '4:00 PM', text: 'Development sprint' }
  ]}
/>
```

---

## Image Components

### ImageOverlay Components
Location: `src/components/ImageOverlay.jsx`

#### ImageOverlay
Image with hover overlay effects.

```jsx
import { ImageOverlay } from './components/ImageOverlay';

<ImageOverlay
  src="/images/project.jpg"
  alt="Project"
  title="Amazing Project"
  description="A brief description"
  overlay="gradient"
/>
```

**Overlay Types:** gradient, solid, blur, color

#### ImageZoom
Image with zoom effect on hover.

```jsx
<ImageZoom
  src="/images/photo.jpg"
  alt="Photo"
  zoom={1.2}
/>
```

#### ImageReveal
Image with reveal animation.

```jsx
<ImageReveal
  src="/images/hero.jpg"
  alt="Hero"
  direction="left"
/>
```

**Directions:** left, right, top, bottom

#### ImageGrid
Grid of images with hover effects.

```jsx
<ImageGrid
  columns={3}
  overlay="gradient"
  images={[
    { src: '/img1.jpg', alt: 'Image 1', title: 'Title 1' },
    { src: '/img2.jpg', alt: 'Image 2', title: 'Title 2' }
  ]}
/>
```

#### ImageCompare
Before/After image comparison slider.

```jsx
<ImageCompare
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  beforeLabel="Before"
  afterLabel="After"
/>
```

#### ImageLightbox
Clickable image that opens in lightbox.

```jsx
<ImageLightbox
  src="/full-image.jpg"
  alt="Full Image"
  thumbnail="/thumbnail.jpg"
/>
```

---

## Advanced Animations

### Animation Components
Location: `src/components/AdvancedAnimations.jsx`

#### FadeInUp
Fade in with upward motion on scroll.

```jsx
import { FadeInUp } from './components/AdvancedAnimations';

<FadeInUp delay={0}>
  <h1>Animated Heading</h1>
</FadeInUp>
```

#### SlideIn
Slide in from specified direction.

```jsx
<SlideIn direction="left" delay={100}>
  <div>Content</div>
</SlideIn>
```

**Directions:** left, right, top, bottom

#### ScaleIn
Scale up animation on scroll.

```jsx
<ScaleIn delay={200}>
  <img src="/logo.png" alt="Logo" />
</ScaleIn>
```

#### RotateIn
Rotate in animation.

```jsx
<RotateIn delay={300}>
  <div>Rotating content</div>
</RotateIn>
```

#### StaggeredList
List with staggered animation for children.

```jsx
<StaggeredList staggerDelay={100}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredList>
```

#### FloatingElement
Floating animation effect.

```jsx
<FloatingElement duration={3} distance={20}>
  <img src="/icon.png" alt="Icon" />
</FloatingElement>
```

#### PulseElement
Pulsing animation effect.

```jsx
<PulseElement duration={2} scale={1.05}>
  <button>Click Me</button>
</PulseElement>
```

#### GlitchText
Glitch effect on text.

```jsx
<GlitchText text="TECHNOCODERS" />
```

#### WaveText
Wave animation on text characters.

```jsx
<WaveText text="Hello World" />
```

#### GradientBorder
Animated gradient border.

```jsx
<GradientBorder>
  <div>Content with gradient border</div>
</GradientBorder>
```

#### MorphingShape
Morphing background shape.

```jsx
<MorphingShape />
```

---

## Usage Examples

### Contact Form Example

```jsx
import { FloatingInput, FloatingTextarea, PremiumCheckbox } from './components/PremiumForm';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreed: false
  });

  return (
    <form>
      <FloatingInput
        label="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <FloatingInput
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <FloatingTextarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      
      <PremiumCheckbox
        label="I agree to the terms and conditions"
        checked={formData.agreed}
        onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
      />
      
      <button type="submit" className="btn btn-primary">Send Message</button>
    </form>
  );
}
```

### Stats Section Example

```jsx
import { CounterGrid } from './components/NumberCounter';
import { FadeInUp } from './components/AdvancedAnimations';

function StatsSection() {
  return (
    <FadeInUp>
      <CounterGrid
        columns={4}
        stats={[
          { value: 500, label: 'Projects Completed', suffix: '+', color: 'green' },
          { value: 100, label: 'Happy Clients', suffix: '+', color: 'blue' },
          { value: 50, label: 'Team Members', suffix: '+', color: 'purple' },
          { value: 99, label: 'Client Satisfaction', suffix: '%', color: 'orange' }
        ]}
      />
    </FadeInUp>
  );
}
```

### Timeline Section Example

```jsx
import { Timeline } from './components/Timeline';
import { SlideIn } from './components/AdvancedAnimations';

function CompanyHistory() {
  return (
    <SlideIn direction="left">
      <Timeline
        variant="alternating"
        items={[
          {
            date: '2020',
            title: 'Company Founded',
            description: 'Started with a vision to transform digital experiences',
            color: 'green'
          },
          {
            date: '2022',
            title: 'Expansion',
            description: 'Opened new offices and doubled our team',
            color: 'blue'
          },
          {
            date: '2024',
            title: 'Innovation',
            description: 'Launched cutting-edge AI solutions',
            color: 'purple'
          }
        ]}
      />
    </SlideIn>
  );
}
```

---

## Best Practices

### Performance
- Use `delay` props to stagger animations for better visual flow
- Avoid animating too many elements simultaneously
- Use `prefers-reduced-motion` media query for accessibility

### Accessibility
- Always provide meaningful `alt` text for images
- Ensure form labels are descriptive
- Test with keyboard navigation
- Respect user's motion preferences

### Responsive Design
- All components are mobile-responsive
- Test on different screen sizes
- Use appropriate `columns` prop for grids on mobile

### Animation Timing
- Keep animations under 1 second for better UX
- Use easing functions for natural motion
- Stagger delays by 50-100ms for lists

---

## Browser Support

All components support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Features gracefully degrade in older browsers.

---

## Customization

All components use CSS custom properties (variables) from the design system:
- Colors: `--color-accent-green`, `--color-accent-blue`, etc.
- Spacing: `--spacing-1` through `--spacing-12`
- Typography: `--font-heading`, `--font-body`
- Transitions: `--transition-fast`, `--transition-normal`, `--transition-slow`

Customize by overriding these variables in your CSS.