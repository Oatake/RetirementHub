---
name: Professional Service Marketplace
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#454652'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#4c56af'
  primary: '#000666'
  on-primary: '#ffffff'
  primary-container: '#1a237e'
  on-primary-container: '#8690ee'
  inverse-primary: '#bdc2ff'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#251900'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f2d00'
  on-tertiary-container: '#c19000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#343d96'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffdfa0'
  tertiary-fixed-dim: '#f8bd2a'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system establishes a high-trust environment that merges the transactional efficiency of a modern e-commerce platform with the prestige of a private financial institution. The brand personality is authoritative yet accessible, focusing on clarity, security, and professional growth. 

The visual style is **Corporate / Modern**. It leverages a rigorous card-based architecture to organize complex service offerings into digestible, actionable units. By utilizing a clean, structured layout with subtle depth, the design system communicates reliability to both service providers and high-value clients. The interface avoids unnecessary flourishes, opting instead for a "utility-first" aesthetic where every element serves to facilitate a transaction or a financial decision.

## Colors

The palette is anchored by **Trustworthy Deep Blue**, used for primary branding, navigation, and core interaction points to instill a sense of permanence and expertise. **Success Green** is applied strategically to represent growth, completed transactions, and positive financial trends, acting as a secondary signal for "go" actions. **Accent Gold** is reserved specifically for financial planning highlights, premium service tiers, and "gold-standard" certifications.

The background system utilizes a cool-toned neutral palette (#F5F5F7) to provide a soft contrast against pure white cards, reducing eye strain during long-form financial reviews. Text adheres to high-contrast standards, using a near-black for headings and a slate-grey for secondary metadata.

## Typography

This design system utilizes **Inter** across all levels to ensure maximum legibility and a systematic, utilitarian feel. The typographic hierarchy is designed to handle dense information—such as service descriptions and financial terms—without overwhelming the user. 

Headlines use tighter letter spacing and heavier weights to command attention, while body copy is set with generous line heights to facilitate reading. Labels are occasionally transformed to uppercase with increased weight to distinguish them from standard body text in dense UI environments like data tables or service filters.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop to maintain a professional "dashboard" feel, centering the content within a 1280px container. On smaller screens, the system transitions to a fluid model with 16px side margins.

A strict 8px spacing scale governs all spatial relationships. Elements are grouped using "Stack" units: 12px for related items within a component (e.g., a heading and its sub-label), 24px for spacing between components, and 48px for major section breaks. This rhythm ensures that the card-based layout feels organized and intentional, reflecting the precision required in financial services.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layering**. Surfaces are categorized into three levels of elevation:
1. **Base:** The neutral background (#F5F5F7).
2. **Flat:** White surfaces with a subtle 1px border (#E0E0E0) for low-priority content.
3. **Elevated (Default Cards):** White surfaces with a soft, diffused shadow (Blur: 12px, Y: 4px, Opacity: 6% Black). This makes service cards appear to float slightly, inviting interaction.
4. **Active/Hover:** Shadows intensify (Blur: 20px, Y: 8px, Opacity: 10% Black) to provide tactile feedback when a user engages with a marketplace listing.

Depth is never used for mere decoration; it is a functional tool to separate "Product" (Cards) from "Environment" (Background).

## Shapes

The design system employs a **Rounded** shape language (8px / 0.5rem) to soften the professional aesthetic, making the marketplace feel approachable and modern. 

- **Standard Elements:** 8px radius for buttons, input fields, and standard cards.
- **Large Containers:** 16px radius for featured sections or modal overlays to create a distinct visual enclosure.
- **Micro-elements:** 4px radius for tags or small badges to maintain sharpness at smaller scales.

This consistent rounding balances the rigid grid with a touch of contemporary softness, aligning with the "e-commerce" side of the platform's identity.

## Components

### Buttons
- **Primary:** Deep Blue background with white text. High emphasis for "Book Service" or "Confirm Investment."
- **Secondary:** Success Green background for positive actions like "Approve" or "Deposit."
- **Ghost:** Transparent background with a Deep Blue border for secondary actions like "Cancel" or "Save for Later."

### Cards
Cards are the primary container for services. They must include a white background, the standard 8px corner radius, and the "Elevated" shadow. Information should be layered: Image/Icon at the top, Title/Price in the middle, and a clear CTA button at the bottom.

### Inputs & Fields
Input fields use a 1px grey border that transitions to a 2px Deep Blue border on focus. Labels should be placed above the field in the `label-bold` style. Errors are signaled with a 1px red border and a caption message below.

### Financial Planning Elements
- **Progress Bars:** Use Success Green to indicate completion.
- **Premium Badges:** Small chips with Accent Gold background and dark text to highlight "Certified" or "Top-Rated" advisors.
- **Summary Lists:** Minimalist lists with 1px bottom dividers and emphasized numerical data in Deep Blue.

### Chips & Tags
Used for service categories (e.g., "Tax Planning," "Legal"). These use a light grey background and `caption` typography to stay subordinate to primary card content.
