Absolutely. Here's a cleaner version that leaves the branding completely customizable so you can define your own colors, fonts, logo, and identity later.

---

# PROMPT

Build a **premium digital wedding invitation platform** inspired by the reference screenshots. The goal is **not to copy the exact design**, but to recreate the same luxurious experience, layout hierarchy, smooth interactions, and mobile-first flow.

The design system **must be fully themeable**. Do **not** hardcode colors, fonts, logos, or decorative assets. All branding should come from a centralized theme configuration so different weddings can have completely different looks.

---

# Tech Stack

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui
* React Hook Form
* Embla Carousel
* React Player
* Zustand (optional)
* Supabase (Database + Storage + Authentication)

The website must be:

* Mobile-first
* Fully responsive
* Fast
* SEO friendly
* Accessible
* PWA-ready

---

# Design Philosophy

The website should feel like opening a luxury wedding invitation.

Everything should be elegant, clean, spacious, modern and emotional.

Avoid looking like a traditional business website.

Use:

* Rounded cards
* Soft shadows
* Glassmorphism where appropriate
* Elegant spacing
* Smooth scrolling
* Luxury typography hierarchy
* Large photography
* Soft animations
* Minimal UI

All colors, fonts and decorative assets should come from a **Theme object**, making it possible to completely rebrand the website without changing components.

Example Theme Configuration:

```ts
theme = {
  primaryColor,
  secondaryColor,
  accentColor,
  backgroundColor,
  textColor,
  headingFont,
  bodyFont,
  scriptFont,
  borderRadius,
  buttonStyle,
  cardStyle,
  dividerStyle,
  decorativeElements
}
```

Every component should consume this theme.

---

# Navigation

Sticky navigation.

Contains:

* Couple logo or initials
* RSVP button

Navbar becomes slightly opaque while scrolling.

Glass effect.

---

# Website Sections

## 1. Hero

Fullscreen hero.

Contains:

* Background image/video
* Couple names
* Invitation text
* Wedding date
* Wedding location
* Countdown timer

Countdown contains:

* Days
* Hours
* Minutes
* Seconds

Animated.

---

## 2. Our Story

Timeline format.

Each chapter includes:

* Chapter number
* Title
* Description
* Image

Examples:

How We Met

Our Journey

The Proposal

Engagement

Countdown to Forever

Each card animates into view.

---

## 3. Families

Display both families.

Each card includes:

* Family title
* Parents' names
* Community
* LGA
* Optional portrait

Luxury invitation card layout.

---

## 4. Venue

Separate cards for:

Church Ceremony

Reception

Each includes:

* Date
* Time
* Address
* Embedded Google Map
* Directions button

---

## 5. Wedding Schedule

Vertical timeline.

Timeline items include:

Time

Event

Description

Cards alternate left and right.

Animated while scrolling.

---

## 6. Wedding Attire

Display optional attire collections.

Each product includes:

* Image
* Name
* Price
* WhatsApp Order button

Support unlimited products.

---

## 7. Gallery

Beautiful masonry gallery.

Supports:

* Images
* Videos

Videos open in fullscreen modal.

Images animate on hover.

---

## 8. Celebration Section

A beautiful celebratory section between content.

Can contain:

* Illustration
* Animation
* Quote
* Celebration message

This section should be reusable.

---

## 9. Gift & Donation

Gift information card.

Includes:

Account Name

Account Number

Bank

Copy buttons.

Optional QR Code.

---

## 10. RSVP

Beautiful RSVP form.

Fields:

* Name
* Phone
* Email
* Number of Guests
* Attendance
* Meal Preference
* Special Requests

Store responses in Supabase.

Show success animation after submission.

---

## 11. Contacts

Display contact cards.

Each includes:

* Name
* Phone Number
* Call Button
* WhatsApp Button

Also include:

Share Invitation button.

---

## 12. Footer

Contains:

* Couple names
* Wedding date
* Location
* Wedding hashtag
* Optional call-to-action

---

# Floating Music Player

Fixed bottom-right.

Circular floating button.

Features:

* Play
* Pause
* Mute

Background music should never autoplay with sound.

User interaction starts playback.

---

# Animations

Use Framer Motion throughout.

Include:

* Fade Up
* Fade Down
* Fade Left
* Fade Right
* Scale
* Parallax
* Staggered animations
* Hover effects
* Smooth page transitions
* Floating decorative elements
* Soft image zoom

Animations should feel elegant rather than flashy.

---

# Components

Create reusable components.

Examples:

Navbar

Hero

Countdown

Section Title

Timeline

Family Card

Venue Card

Schedule Timeline

Gallery

Video Modal

Attire Card

Donation Card

RSVP Form

Contact Card

Footer

Music Player

Buttons

Cards

Modals

Badges

---

# Admin Dashboard

Secure admin panel.

Features:

Edit:

* Couple Names
* Hero
* Story
* Families
* Schedule
* Venues
* Gallery
* Videos
* Wedding Attire
* RSVP Responses
* Donation Details
* Contacts
* Music
* Theme

Everything should update instantly.

---

# Database Structure

Supabase Tables

```
couples

stories

venues

families

schedule

gallery

videos

attire

donations

contacts

rsvp

theme

settings
```

Storage:

* Images
* Videos
* Music
* Documents

---

# Performance

* Image optimization
* Lazy loading
* Server Components where appropriate
* Dynamic imports
* SEO metadata
* Sitemap
* Open Graph
* Fast page speed
* Accessibility compliant
* Lighthouse score above 95

---

# Overall Goal

Build a **commercial-grade, premium digital wedding invitation platform** that delivers the same refined user experience as the reference, while remaining completely customizable. The architecture should separate **content**, **branding**, and **layout**, allowing each wedding website to have a unique visual identity simply by changing the theme and content in the admin dashboard—without modifying any component code. This should feel polished enough to serve as the foundation for a SaaS product where users can create elegant, mobile-first wedding websites in minutes.
