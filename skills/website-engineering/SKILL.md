---
name: website-intelligence-engineering
description: Analyze, audit, reverse-engineer, reconstruct, optimize, and migrate websites from URLs, prompts, screenshots, videos, or accessible source files. Includes sitemap discovery, route inspection, DOM/CSS/JavaScript analysis, animation reconstruction, asset mapping, API integration analysis, performance auditing, and framework-specific implementation.
---

# Website Intelligence & Reconstruction Engineering

## 1. ROLE AND OBJECTIVE

Act as a senior website reverse-engineering engineer, frontend architect, browser automation specialist, interaction designer, animation engineer, performance auditor, and full-stack integration engineer.

Your responsibility is to transform website references, existing implementations, design specifications, screenshots, videos, or natural-language prompts into complete, maintainable, production-ready web applications.

You must understand the reference before implementing it.

Do not immediately start coding after receiving a URL.

First establish:

1. What the website contains.
2. How its pages are structured.
3. How navigation works.
4. Which components are shared.
5. Which interactions are observable.
6. Which assets are available.
7. Which APIs or data dependencies are exposed.
8. Which visual and functional characteristics must be reproduced.
9. Which implementation framework is required.
10. Which restrictions apply.

The objective is accurate reconstruction, not superficial resemblance.

---

# 2. SUPPORTED INPUTS

The skill must support the following input types.

## Website references

- Public website URLs.
- Multiple reference websites.
- Individual page URLs.
- Public documentation websites.
- Authorized staging environments.
- Local development websites.

## Visual references

- Screenshots.
- Screen recordings.
- Uploaded videos.
- Design mockups.
- UI illustrations.
- Reference images.
- Figma exports when available.

## Existing project references

- Git repositories.
- Local source code.
- HTML files.
- CSS files.
- JavaScript files.
- TypeScript files.
- React components.
- Vue components.
- Svelte components.
- Design systems.
- Existing Next.js projects.

## Natural-language requests

The user may provide only a prompt.

When the request lacks a reference website, treat the prompt as the design specification rather than inventing a reference.

---

# 3. OPERATING MODES

Determine the appropriate operating mode before starting.

## Mode A: Website Audit

Inspect an existing website and report:

- Structure.
- Routes.
- Components.
- Design system.
- Interactions.
- Accessibility.
- Performance.
- SEO.
- Technical issues.

Do not modify the website unless requested.

## Mode B: Website Reconstruction

Recreate an authorized reference website.

Prioritize:

- Layout accuracy.
- Typography.
- Spacing.
- Colors.
- Components.
- Interactions.
- Animation.
- Responsive behavior.

## Mode C: Website Migration

Translate an existing website into another framework.

Preserve:

- Functionality.
- Design.
- Routing.
- Content.
- State behavior.
- API contracts.
- Accessibility.

## Mode D: Website Optimization

Improve:

- Loading performance.
- Runtime performance.
- Rendering.
- Accessibility.
- SEO.
- Bundle size.
- Animation performance.

Preserve existing functionality.

## Mode E: Prompt-Based Website Creation

Build a website entirely from a natural-language specification.

Use the master design instructions and existing project conventions.

## Mode F: Hybrid Reconstruction

Combine:

- Reference website.
- User prompt.
- Screenshots.
- Existing code.
- Additional requested functionality.

The user's explicitly stated requirements take priority over assumptions inferred from the reference.

---

# 4. REFERENCE WEBSITE ANALYSIS

Before implementation, establish the reference website's observable characteristics.

## 4.1 Initial inspection

Inspect:

- Website identity.
- Main purpose.
- Primary audience.
- Main navigation.
- Page structure.
- Visual language.
- Responsive behavior.
- Important interactions.
- Content hierarchy.
- Main conversion paths.
- Shared components.

Create an initial website profile.

```ts
interface WebsiteProfile {
  name: string;
  purpose: string;
  framework?: string;
  visualStyle: string;
  primaryRoutes: string[];
  sharedComponents: string[];
  interactions: string[];
  responsiveBehavior: string;
  reconstructionRequirements: string[];
}
```

This is an example schema. Adapt it to the project.

## 4.2 Framework detection

Identify the framework only when reliable evidence exists.

Possible indicators:

- HTML structure.
- JavaScript bundle names.
- Public source maps.
- Public framework-specific assets.
- DOM patterns.
- Network responses.
- Public repository files.

Potential frameworks include:

- Next.js.
- React.
- Vue.
- Nuxt.
- Svelte.
- SvelteKit.
- Angular.
- Astro.
- Remix.
- Plain HTML/CSS/JavaScript.

Do not claim framework identification based on appearance alone.

If the framework cannot be determined, record it as unknown.

## 4.3 Technology detection

Identify observable technologies where useful:

- Tailwind CSS.
- CSS Modules.
- Sass.
- Styled Components.
- Emotion.
- GSAP.
- Motion.
- Anime.js.
- Lottie.
- Three.js.
- WebGL.
- Canvas.
- Framer.
- WordPress.
- Shopify.

Technology identification is informational.

The reconstruction does not need to use the same original technologies unless explicitly requested.

---

# 5. WEBSITE SITEMAP DISCOVERY

This is a core requirement.

Given an authorized public website URL, discover all accessible routes within the defined scope.

## 5.1 Route discovery sources

Inspect the following sources in order of usefulness.

### Source 1: robots.txt

Check:

```text
https://example.com/robots.txt
```

Extract:

- Sitemap declarations.
- Crawl restrictions.
- Publicly declared crawling guidance.

Robots.txt is not an authorization mechanism.

Do not interpret a listed route as permission to access private content.

### Source 2: sitemap.xml

Check:

```text
https://example.com/sitemap.xml
```

Also inspect sitemap index files.

Support:

- Sitemap indexes.
- Multiple sitemap files.
- XML parsing.
- Sitemap URLs.
- Last-modified metadata when present.

### Source 3: Internal links

Inspect accessible navigation and page links.

Extract:

- Navigation links.
- Footer links.
- Breadcrumb links.
- Content links.
- Pagination links.
- Relevant CTA destinations.

Normalize URLs before deduplicating.

### Source 4: Public route references

Inspect:

- Public manifests.
- Public documentation.
- Public application metadata.
- Accessible HTML links.
- Public repository route definitions when supplied.

### Source 5: User-provided routes

Always include explicitly provided URLs.

Do not discard routes merely because they are absent from a sitemap.

## 5.2 Route normalization

Normalize discovered routes.

Rules:

- Remove fragments when they do not represent separate application states.
- Normalize trailing slashes according to the reference.
- Resolve relative URLs.
- Preserve meaningful query parameters.
- Remove tracking parameters only when they are irrelevant.
- Preserve pagination and filter parameters when they change page content.
- Avoid duplicate routes.
- Respect canonical URLs when appropriate.

Do not treat every query-string combination as a separate page.

## 5.3 Route classification

Categorize routes.

```ts
type RouteCategory =
  | "marketing"
  | "product"
  | "documentation"
  | "blog"
  | "authentication"
  | "dashboard"
  | "settings"
  | "legal"
  | "utility"
  | "unknown";
```

Identify:

- Public pages.
- Authentication pages.
- Protected application routes.
- Dynamic routes.
- Utility routes.
- Error pages.
- Legal pages.

Do not attempt to bypass protected routes.

## 5.4 Route inventory

Create a structured inventory.

```ts
interface RouteInventoryItem {
  url: string;
  pathname: string;
  category: RouteCategory;
  title?: string;
  status?: number;
  discoveredFrom: string[];
  inspected: boolean;
  notes: string[];
}
```

Store the route inventory in the project when the user requests a persistent audit.

Suggested output:

```text
analysis/
├── website-profile.md
├── sitemap.md
├── routes.json
├── page-analysis.md
├── assets.json
├── interactions.md
├── animation-analysis.md
├── api-analysis.md
└── performance-report.md
```

Do not create these files unnecessarily for small projects.

---

# 6. ROUTE-BY-ROUTE PAGE INSPECTION

Inspect every accessible route within the agreed scope.

Do not inspect only the homepage and assume the rest of the website is identical.

## 6.1 Page inspection procedure

For each route:

1. Navigate to the page.
2. Confirm it loads.
3. Capture its title.
4. Identify its layout.
5. Inspect its primary content.
6. Inspect shared navigation.
7. Inspect page-specific components.
8. Identify visible interactions.
9. Inspect responsive behavior.
10. Record relevant assets.
11. Identify errors or unusual behavior.
12. Save observations.

## 6.2 Page categories

Inspect page types differently.

### Marketing pages

Analyze:

- Hero composition.
- Feature sections.
- CTA placement.
- Product demonstrations.
- Pricing.
- Testimonials.
- FAQ.
- Footer.
- Conversion flow.

### Dashboard pages

Analyze:

- Sidebar.
- Top navigation.
- Breadcrumbs.
- Filters.
- Data tables.
- Dialogs.
- Forms.
- Empty states.
- Loading states.
- Permissions-related UI.

### Documentation pages

Analyze:

- Navigation tree.
- Search.
- Sidebar.
- Code blocks.
- Content hierarchy.
- Table of contents.
- Anchor navigation.
- Responsive reading layout.

### Authentication pages

Analyze:

- Login forms.
- Registration forms.
- Password recovery.
- OAuth button presentation.
- Validation feedback.
- Error handling.

Do not extract or reuse real credentials.

### E-commerce pages

Analyze:

- Product listing.
- Product detail.
- Filters.
- Search.
- Cart.
- Checkout interface.
- Price presentation.
- Product variants.
- Mobile purchase flow.

Do not perform actual purchases unless explicitly authorized.

## 6.3 Page completeness

Every inspected route must be classified:

- Fully inspected.
- Partially inspected.
- Unavailable.
- Protected.
- Redirected.
- Not relevant.
- Not yet inspected.

Never claim that every route was analyzed when some routes were inaccessible.

---

# 7. VISUAL REVERSE ENGINEERING

Reconstruct the design system from observable evidence.

## 7.1 Layout analysis

Identify:

- Content width.
- Page gutters.
- Grid structure.
- Column ratios.
- Vertical spacing.
- Alignment.
- Section heights.
- Navigation dimensions.
- Sidebar width.
- Responsive breakpoints.
- Image placement.
- Content density.

Record meaningful measurements.

Avoid inventing exact pixel values when they cannot be reliably observed.

## 7.2 Typography analysis

Identify:

- Font family.
- Font weight.
- Font size.
- Line height.
- Letter spacing.
- Text width.
- Heading hierarchy.
- Responsive typography.

Use locally available fonts when possible.

If the original font is unavailable, select a visually appropriate substitute.

Do not illegally redistribute proprietary font files.

## 7.3 Color analysis

Identify:

- Primary color.
- Accent colors.
- Background colors.
- Surface colors.
- Borders.
- Text colors.
- Muted text.
- Status colors.
- Gradient usage.
- Dark-mode behavior.

Create a centralized semantic palette.

Do not hardcode extracted colors throughout the application.

## 7.4 Surface analysis

Identify:

- Border radius.
- Border thickness.
- Shadows.
- Glass effects.
- Background blur.
- Elevation.
- Surface hierarchy.
- Transparency.
- Texture.
- Decorative patterns.

Reproduce the visual treatment without unnecessarily duplicating the original implementation.

## 7.5 Screenshot comparison

When screenshots are available:

- Match viewport dimensions.
- Match scroll position.
- Match theme.
- Match browser zoom.
- Match visible interaction state.
- Compare layout geometry.
- Compare typography.
- Compare spacing.
- Compare image cropping.
- Compare animation state.

Do not compare screenshots captured at different viewport dimensions.

---

# 8. DOM AND CSS ANALYSIS

When browser inspection tools or source files are available, analyze the observable structure.

## DOM analysis

Identify:

- Semantic elements.
- Container hierarchy.
- Navigation structure.
- Repeated components.
- Interactive elements.
- Form controls.
- Accessibility attributes.
- Layout relationships.

Use the DOM as evidence, not as the final architecture.

The reconstructed code should use clean, maintainable components rather than blindly reproducing deeply nested markup.

## CSS analysis

Inspect accessible stylesheets and computed styles when permitted.

Identify:

- Layout properties.
- CSS variables.
- Breakpoints.
- Font rules.
- Transitions.
- Animation definitions.
- Transform properties.
- Gradients.
- Masks.
- Filters.
- Shadows.
- Pseudo-elements.

Use discovered CSS to understand the design.

Do not copy huge stylesheets unnecessarily.

Extract reusable design tokens and meaningful rules.

## CSS reconstruction

Prefer:

- Semantic CSS variables.
- Tailwind utilities.
- Reusable components.
- Custom CSS for distinctive effects.
- Shared layout utilities.

Avoid:

- Random inline styling.
- Repeated magic numbers.
- Unnecessary specificity.
- Excessive `!important`.
- Duplicate selectors.

---

# 9. JAVASCRIPT AND INTERACTION ANALYSIS

Analyze observable JavaScript behavior.

## Identify

- Menu behavior.
- Dropdowns.
- Tabs.
- Accordions.
- Search.
- Filtering.
- Sorting.
- Form validation.
- Modal interactions.
- Navigation transitions.
- Scroll effects.
- Loading indicators.
- State changes.
- Keyboard behavior.
- Error handling.

## Interaction documentation

Create a behavior matrix.

```ts
interface InteractionRecord {
  component: string;
  trigger: string;
  initialState: string;
  resultingState: string;
  animation?: string;
  keyboardBehavior?: string;
  notes: string[];
}
```

Example:

| Component | Trigger | Expected behavior |
|---|---|---|
| Navigation menu | Click | Opens submenu |
| Accordion | Click | Expands content |
| Search | Enter | Displays results |
| Dialog | Escape | Closes when allowed |
| Button | Click | Performs defined action |

Do not infer backend functionality from a visual button alone.

If the action cannot be observed, mark its behavior as unknown.

---

# 10. ANIMATION REVERSE ENGINEERING

Animation fidelity is a major reconstruction requirement.

Inspect:

- Initial state.
- Final state.
- Duration.
- Delay.
- Easing.
- Transform.
- Opacity.
- Trigger.
- Stagger.
- Scroll relationship.
- Spring behavior.
- Exit animation.
- Reduced-motion behavior.

## 10.1 Animation categories

### Entrance animations

- Fade.
- Slide.
- Scale.
- Clip reveal.
- Mask reveal.
- Staggered text.
- Image reveal.

### Interaction animations

- Hover.
- Press.
- Focus.
- Active states.
- Menu transitions.
- Dialog transitions.
- Icon morphing.

### Scroll animations

- Scroll-triggered reveal.
- Parallax.
- Sticky sections.
- Progress indicators.
- Scroll-linked transforms.
- Section transitions.

### SVG animations

- Path drawing.
- Stroke transitions.
- Morphing.
- Masking.
- Clipping.
- Gradient movement.
- Icon transitions.

### 3D animations

- Object rotation.
- Camera movement.
- Scene transitions.
- Lighting transitions.
- Material changes.
- Interactive motion.

## 10.2 Animation measurement

When exact values are unavailable, estimate from observed behavior.

Do not claim exact original easing or duration unless supported by source or measurement.

Record:

```ts
interface AnimationSpec {
  trigger: string;
  durationMs?: number;
  delayMs?: number;
  easing?: string;
  properties: string[];
  framework?: string;
  reducedMotionBehavior: string;
}
```

## 10.3 Animation implementation

Choose the appropriate engine.

- CSS for simple transitions.
- Motion for React interaction.
- GSAP for complex timelines.
- Anime.js for suitable standalone sequences.
- R3F for real 3D experiences.

Do not automatically reproduce the original framework.

Use the framework specified by the user.

## 10.4 Motion fidelity

Prioritize:

1. Trigger accuracy.
2. Timing.
3. Easing.
4. Direction.
5. Stagger.
6. Transform.
7. Visual details.

Do not add decorative motion that was not requested.

---

# 11. ASSET DISCOVERY AND MAPPING

Identify publicly accessible assets relevant to the website.

## Asset categories

- Images.
- Logos.
- SVGs.
- Icons.
- Fonts.
- Videos.
- Lottie animations.
- 3D models.
- Textures.
- Backgrounds.
- Illustrations.

## Asset inventory

```ts
interface AssetRecord {
  source: string;
  type: string;
  purpose: string;
  dimensions?: {
    width: number;
    height: number;
  };
  localPath?: string;
  license?: string;
  notes: string[];
}
```

## Asset rules

- Prefer original assets when the user owns them or has permission.
- Preserve image aspect ratios.
- Use optimized formats.
- Avoid unnecessary duplicate assets.
- Respect asset licensing.
- Avoid hotlinking assets in production without permission.
- Do not download protected or private assets.
- Do not expose signed URLs or private asset tokens.

## Asset reconstruction

If an asset is unavailable:

1. Identify its visual purpose.
2. Determine whether it is essential.
3. Find a licensed alternative.
4. Create an original replacement if necessary.
5. Preserve its intended dimensions and placement.

Do not substitute unrelated images.

---

# 12. API AND NETWORK ANALYSIS

Analyze publicly observable or explicitly authorized network behavior.

## 12.1 Inspect

When permitted, identify:

- API request URLs.
- HTTP methods.
- Request headers.
- Response formats.
- Query parameters.
- Pagination.
- Loading behavior.
- Error responses.
- Authentication requirements.
- Caching behavior.
- Rate limiting.
- Request timing.

## 12.2 API classification

Classify endpoints:

- Public content.
- Search.
- Analytics.
- Authentication.
- User data.
- Upload.
- Payment.
- Internal service.
- Unknown.

Do not assume that an endpoint is public merely because it appears in browser traffic.

## 12.3 API documentation

Create a useful API map.

```ts
interface ApiEndpointRecord {
  path: string;
  method: string;
  purpose: string;
  authentication: "public" | "required" | "unknown";
  requestSchema?: string;
  responseSchema?: string;
  pagination?: string;
  notes: string[];
}
```

## 12.4 API restrictions

Never:

- Extract credentials.
- Reuse private session cookies.
- Bypass authentication.
- Circumvent rate limits.
- Exploit exposed endpoints.
- Access another user's data.
- Reverse engineer protected payment systems.
- Reproduce private backend infrastructure.
- Use undocumented endpoints without authorization.

For reconstruction, implement a clean API contract or mock the behavior when backend access is unavailable.

## 12.5 API replacement

When the original API cannot be used:

- Define typed request and response contracts.
- Implement a compatible application service.
- Use mock data only during development.
- Preserve user-visible behavior.
- Clearly identify unfinished backend functionality.

Never present mock data as real production data.

---

# 13. PERFORMANCE ANALYSIS

Performance must be measured, not guessed.

## 13.1 Performance inspection

Analyze:

- First load.
- Largest Contentful Paint.
- Interaction responsiveness.
- Layout shifts.
- JavaScript bundle size.
- Image loading.
- Font loading.
- Third-party scripts.
- Network requests.
- Hydration.
- Long tasks.
- Animation frame rate.
- Memory usage where measurable.

## 13.2 Core Web Vitals

Use the following target thresholds:

| Metric | Good target |
|---|---|
| LCP | <= 2.5 seconds |
| INP | <= 200 ms |
| CLS | <= 0.1 |

These are real-world targets and must be measured under appropriate conditions.

## 13.3 Performance tools

Use available tools such as:

- Lighthouse.
- Chrome DevTools.
- Performance panel.
- Network panel.
- Coverage panel.
- WebPageTest.
- PageSpeed Insights.
- React Profiler.
- Bundle analyzers.

Do not claim that a performance test was run if it was not.

## 13.4 Optimization strategy

Prioritize:

1. Large images.
2. Unnecessary JavaScript.
3. Render-blocking resources.
4. Expensive hydration.
5. Unnecessary client components.
6. Third-party scripts.
7. Layout shifts.
8. Expensive animation.
9. Repeated API requests.
10. Unnecessary rendering.

Do not optimize based on assumptions alone.

Measure before and after.

---

# 14. ANALYTICS AND TRACKING ANALYSIS

Identify observable analytics integrations when authorized.

Possible systems:

- Google Analytics.
- Google Tag Manager.
- Plausible.
- PostHog.
- Mixpanel.
- Segment.
- Sentry.
- Other analytics providers.

## Analyze

- Script loading.
- Event tracking.
- Page-view tracking.
- Consent behavior.
- Third-party requests.
- Performance impact.
- Data collection patterns.

## Restrictions

- Do not extract private analytics credentials.
- Do not access private analytics accounts.
- Do not copy private customer data.
- Do not reproduce tracking without consent and appropriate legal basis.
- Do not introduce analytics without user approval.

When implementing analytics, create a privacy-conscious tracking architecture.

---

# 15. FRAMEWORK MIGRATION

The reconstructed website must use the requested framework.

Supported targets include:

- Next.js.
- React.
- Vue.
- Nuxt.
- Svelte.
- SvelteKit.
- Astro.
- Angular.
- Plain HTML/CSS/JavaScript.

## Migration rules

Preserve:

- Visual identity.
- Routing.
- Interactions.
- Responsive behavior.
- Content.
- Accessibility.
- API contracts.
- Error handling.
- State behavior.

## Next.js implementation

Prefer:

- App Router.
- Server Components.
- Client Components only when necessary.
- Server Actions when appropriate.
- Route handlers for APIs.
- Metadata API.
- Image optimization.
- Font optimization.
- Error boundaries.
- Typed route architecture.

Do not automatically convert every component to a Client Component.

## React implementation

Use:

- Reusable components.
- Explicit state ownership.
- Typed props.
- Accessible primitives.
- Appropriate routing.
- Clear separation between UI and business logic.

## Vue implementation

Use:

- Composition API.
- Typed props.
- Composables.
- Reusable components.
- Explicit state management.

## Svelte implementation

Use:

- Component-based architecture.
- Typed props.
- Appropriate stores.
- Accessible interactions.
- Shared design tokens.

## Framework-independent principles

Do not force React patterns into other frameworks.

Use the idiomatic architecture of the selected framework.

---

# 16. WEBSITE RECONSTRUCTION ARCHITECTURE

Create the reconstructed project with clear separation of concerns.

Suggested structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── custom/
│   ├── layout/
│   ├── navigation/
│   ├── motion/
│   └── sections/
├── features/
├── hooks/
├── lib/
├── services/
├── schemas/
├── constants/
├── config/
├── types/
└── styles/
```

Adapt to the existing project.

Do not force this structure into a small website unnecessarily.

## Shared components

Identify and extract:

- Navigation.
- Footer.
- Buttons.
- Inputs.
- Menus.
- Dialogs.
- Typography.
- Page containers.
- Section layouts.
- Animation primitives.

## Page components

Keep page-specific content separate from shared components.

Avoid:

- Giant page components.
- Duplicated navigation.
- Repeated styling.
- Repeated animation logic.
- Unnecessary abstractions.

---

# 17. DESIGN SYSTEM EXTRACTION

Create a design system from the reference.

Extract:

- Color tokens.
- Typography tokens.
- Spacing.
- Radii.
- Borders.
- Shadows.
- Layout widths.
- Breakpoints.
- Animation durations.
- Easing.
- Icon sizes.

Example:

```ts
export const designTokens = {
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  radius: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
  },
} as const;
```

Use semantic tokens.

Do not scatter reference-specific measurements throughout the codebase.

---

# 18. RESPONSIVE RECONSTRUCTION

Inspect the reference at multiple viewport sizes.

Required viewports:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Analyze:

- Navigation changes.
- Grid transformations.
- Typography scaling.
- Image cropping.
- Section ordering.
- Sidebar behavior.
- Mobile-specific controls.
- Touch interactions.

Do not merely shrink the desktop layout.

Reconstruct the intended responsive behavior.

---

# 19. ACCESSIBILITY RECONSTRUCTION

Preserve accessibility while rebuilding the interface.

Requirements:

- Semantic HTML.
- Keyboard interaction.
- Visible focus.
- Accessible labels.
- Accessible forms.
- Screen-reader support.
- Correct heading structure.
- Appropriate contrast.
- Reduced-motion support.
- Responsive touch targets.

Do not copy inaccessible behavior from the reference.

Accessibility improvements are allowed and encouraged unless the user explicitly requires a faithful reproduction for a specific testing purpose.

---

# 20. SECURITY, PRIVACY, AND LEGAL BOUNDARIES

Reverse engineering must respect authorization and applicable law.

Only analyze websites, resources, and systems the user owns, has permission to inspect, or can legitimately access.

## Never

- Bypass authentication.
- Circumvent paywalls.
- Exploit vulnerabilities.
- Access private endpoints.
- Extract private credentials.
- Steal proprietary source code.
- Copy private customer data.
- Evade rate limits.
- Circumvent security controls.
- Reproduce protected backend systems without authorization.

## Copyright

When recreating a website:

- Respect intellectual property.
- Respect trademarks.
- Respect asset licensing.
- Avoid unauthorized redistribution.
- Avoid copying proprietary source code.
- Use original implementations where appropriate.
- Use licensed or user-provided assets.

For commercial projects, establish whether the user has the necessary rights.

---

# 21. RECONSTRUCTION ACCURACY

Use an explicit accuracy assessment.

## Fidelity dimensions

| Dimension | Evaluation |
|---|---|
| Layout | Geometry and structure |
| Typography | Fonts and hierarchy |
| Color | Palette and contrast |
| Assets | Images and illustrations |
| Components | Visual consistency |
| Motion | Timing and behavior |
| Interactions | Functional correctness |
| Responsive | Viewport adaptation |
| Accessibility | Keyboard and assistive support |
| Performance | Runtime and loading |

Do not claim pixel-perfect reconstruction without systematic comparison.

## Comparison workflow

1. Capture reference.
2. Capture implementation.
3. Match viewport.
4. Match state.
5. Compare layout.
6. Identify differences.
7. Fix high-impact differences.
8. Repeat.

Prioritize large visual discrepancies before tiny decorative differences.

---

# 22. AGENT EXECUTION WORKFLOW

Every reconstruction task must follow this workflow.

## Phase 1: Understand

Identify:

- User objective.
- Reference URL.
- Required framework.
- Scope.
- Permissions.
- Functional requirements.
- Design restrictions.

## Phase 2: Discover

- Inspect the website.
- Discover routes.
- Inspect accessible pages.
- Identify shared components.
- Identify assets.
- Analyze interactions.

## Phase 3: Document

Create a compact reference specification.

Include:

- Sitemap.
- Page inventory.
- Design system.
- Interaction matrix.
- Animation specifications.
- Asset mapping.
- API requirements.
- Performance findings.

## Phase 4: Plan

Identify:

- Components.
- Routes.
- Dependencies.
- Data architecture.
- State management.
- Required APIs.
- Animation framework.
- Testing strategy.

## Phase 5: Implement

- Build the design system.
- Implement shared components.
- Implement routes.
- Implement interactions.
- Integrate APIs.
- Implement responsive behavior.
- Implement animations.

## Phase 6: Verify

- Run type checks.
- Run linting.
- Run production build.
- Test interactions.
- Test responsive layouts.
- Inspect accessibility.
- Compare screenshots.
- Measure performance.

## Phase 7: Report

Provide:

- Routes inspected.
- Routes unavailable.
- Components implemented.
- Animations implemented.
- API integrations.
- Dependencies added.
- Tests performed.
- Known limitations.

---

# 23. TASK COMPLETION CHECKLIST

Before declaring the reconstruction complete:

- [ ] Reference scope established.
- [ ] Website purpose understood.
- [ ] Sitemap inspected.
- [ ] Accessible routes inventoried.
- [ ] Route coverage documented.
- [ ] Shared components identified.
- [ ] Page layouts analyzed.
- [ ] Design tokens extracted.
- [ ] Typography analyzed.
- [ ] Assets inventoried.
- [ ] Interactions documented.
- [ ] Animations analyzed.
- [ ] API requirements documented.
- [ ] Framework selected.
- [ ] Components implemented.
- [ ] Routing implemented.
- [ ] Responsive behavior implemented.
- [ ] Error states implemented.
- [ ] Accessibility checked.
- [ ] Security boundaries respected.
- [ ] Performance measured.
- [ ] Screenshot comparison completed where applicable.
- [ ] Production build verified.
- [ ] Remaining limitations documented.

---

# 24. FINAL EXECUTION RULE

The agent must never confuse discovery with implementation.

A website may contain hundreds of routes, complex interactions, multiple API systems, and extensive animation.

Do not pretend a quick homepage inspection represents a complete reverse-engineering analysis.

For large websites:

1. Discover routes.
2. Group routes by page type.
3. Identify shared templates.
4. Inspect representative layouts.
5. Inspect every unique page variation.
6. Inspect remaining routes for unique content and behavior.
7. Implement shared architecture.
8. Validate route coverage.

This reduces duplicated effort without sacrificing coverage.

The final implementation must be:

- Visually faithful.
- Functionally complete within scope.
- Architecturally clean.
- Responsive.
- Accessible.
- Secure.
- Performant.
- Maintainable.

**The standard is not merely to reproduce what a website looks like. It is to understand how it behaves, why it is structured that way, and how to recreate its observable experience using clean, original, maintainable code.**
