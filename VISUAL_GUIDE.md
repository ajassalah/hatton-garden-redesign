# 🎨 Admin Dashboard - Visual Guide

## Overview

The admin dashboard features a **premium glassmorphism design** with purple/pink gradients, creating a modern and sophisticated interface for managing your Hatton Garden website.

---

## 🔐 Login Page (`/admin`)

### Design Elements
- **Background**: Dark gradient from slate-900 → purple-900 → slate-900
- **Card**: Frosted glass effect with white/10 opacity
- **Logo**: Purple-to-pink gradient circle with lock icon
- **Inputs**: Glass-style with white borders
- **Button**: Gradient purple-to-pink with hover effects

### Features
- Username and password fields
- Error message display (red alert box)
- Loading spinner during authentication
- Default credentials shown at bottom
- Smooth animations and transitions

### Color Palette
```
Background: bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
Card: bg-white/10 backdrop-blur-xl
Border: border-white/20
Button: bg-gradient-to-r from-purple-500 to-pink-500
Error: bg-red-500/20 border-red-500/50
```

---

## 📊 Main Dashboard (`/admin/dashboard`)

### Layout
```
┌─────────────────────────────────────────────────────┐
│  Sidebar (64px)  │  Main Content Area              │
│                  │                                  │
│  Logo            │  Dashboard Overview              │
│  Hatton Garden   │                                  │
│                  │  [Stats Cards Grid]              │
│  Navigation:     │  ┌──────┐ ┌──────┐ ┌──────┐     │
│  • Dashboard     │  │ 💎   │ │ ☕   │ │ 👁️   │     │
│  • Jewellers     │  │ 50   │ │ 12   │ │12.5K │     │
│  • Cafes         │  └──────┘ └──────┘ └──────┘     │
│  • Blog          │                                  │
│  • Users         │  Quick Actions                   │
│  • Settings      │  ┌─────────────────────────┐    │
│                  │  │ Manage Jewellers        │    │
│  Logout          │  │ Manage Cafes            │    │
│                  │  │ Create Blog Post        │    │
│                  │  └─────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Statistics Cards (4 cards)
1. **Total Jewellers** (Purple gradient)
   - Icon: Diamond (💎)
   - Number: Dynamic count
   - Background: Purple glow on hover

2. **Cafes & Restaurants** (Orange gradient)
   - Icon: Coffee (☕)
   - Number: Dynamic count
   - Background: Orange glow on hover

3. **Total Views** (Blue gradient)
   - Icon: Eye (👁️)
   - Number: 12,547
   - Background: Blue glow on hover

4. **Average Rating** (Yellow gradient)
   - Icon: Star (⭐)
   - Number: 4.7
   - Background: Yellow glow on hover

### Quick Actions
Three large action cards with icons:
- **Manage Jewellers** (Purple border)
- **Manage Cafes** (Orange border)
- **Create Blog Post** (Blue border)

Each card has:
- Large icon on left
- Title and description
- Hover scale effect
- Smooth transitions

---

## 💎 Jewellers Management (`/admin/dashboard/jewellers`)

### Layout
```
┌─────────────────────────────────────────────────────┐
│  ← Back    Manage Jewellers        [+ Add New]      │
│                                                      │
│  Search: [___________]  Category: [Dropdown]        │
│                                                      │
│  Stats: Total: 50 | Filtered: 50 | Avg: 4.7        │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │          │
│  │ ✏️ 🗑️    │  │ ✏️ 🗑️    │  │ ✏️ 🗑️    │          │
│  │          │  │          │  │          │          │
│  │ Name     │  │ Name     │  │ Name     │          │
│  │ Category │  │ Category │  │ Category │          │
│  │ ⭐ 4.8   │  │ ⭐ 4.9   │  │ ⭐ 4.7   │          │
│  │          │  │          │  │          │          │
│  │ Desc...  │  │ Desc...  │  │ Desc...  │          │
│  │          │  │          │  │          │          │
│  │ 📍 Addr  │  │ 📍 Addr  │  │ 📍 Addr  │          │
│  │ 📞 Phone │  │ 📞 Phone │  │ 📞 Phone │          │
│  │ ✉️ Email │  │ ✉️ Email │  │ ✉️ Email │          │
│  │          │  │          │  │          │          │
│  │ 150 rev  │  │ 200 rev  │  │ 180 rev  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

### Features
- **Back Button**: Returns to dashboard
- **Add New Button**: Purple-pink gradient
- **Search Bar**: Real-time filtering
- **Category Dropdown**: Filter by type
- **Stats Row**: 3 stat cards showing totals
- **Grid Layout**: 3 columns on desktop, responsive
- **Jeweller Cards**: Each showing:
  - Image with overlay buttons (Edit/Delete)
  - Name and category
  - Star rating badge
  - Description (2 lines max)
  - Contact info with icons
  - Review count
  - Link to public page

### Card Design
- Glass background with blur
- White border with low opacity
- Hover effect: Brightens background
- Edit button: Blue
- Delete button: Red
- Rating badge: Yellow background

---

## ☕ Cafes Management (`/admin/dashboard/cafes`)

### Layout
Similar to Jewellers page but with:
- **Orange-red gradient** for Add button
- **Cafe-specific icons**: Coffee, Clock
- **Different categories**: Café, Pub, Restaurant, Bistro, Wine Bar
- **Opening times** instead of some fields

### Card Differences
- Orange accent color instead of purple
- Clock icon for opening times
- Link to website instead of public page

---

## 🎨 Design System

### Colors
```css
/* Backgrounds */
Dark Gradient: from-slate-900 via-purple-900 to-slate-900
Glass: bg-white/5 backdrop-blur-xl
Border: border-white/10

/* Primary (Jewellers) */
Purple: from-purple-500 to-pink-500

/* Secondary (Cafes) */
Orange: from-orange-500 to-red-500

/* Accents */
Blue: from-blue-500 to-cyan-500
Yellow: from-yellow-500 to-orange-500
Red: from-red-500 to-pink-500

/* Text */
White: text-white
Gray: text-gray-400
```

### Typography
```css
Headings: font-bold
Body: font-medium
Small: text-sm
Large: text-3xl, text-4xl
```

### Spacing
```css
Padding: p-4, p-6, p-8
Margin: mb-2, mb-4, mb-6, mb-8
Gap: gap-2, gap-4, gap-6
Rounded: rounded-lg, rounded-xl, rounded-2xl
```

### Effects
```css
Blur: backdrop-blur-xl
Shadow: shadow-lg, shadow-xl, shadow-2xl
Hover: hover:scale-105, hover:bg-white/10
Transition: transition-all duration-200
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Sidebar collapses to hamburger menu
- Stats cards stack vertically
- Grid becomes 1 column
- Reduced padding

### Tablet (768px - 1024px)
- Sidebar visible
- Stats cards 2x2 grid
- Content grid 2 columns
- Medium padding

### Desktop (> 1024px)
- Full sidebar
- Stats cards 4 columns
- Content grid 3 columns
- Full padding

---

## 🎯 Interactive Elements

### Buttons
- **Primary**: Gradient background, white text, shadow
- **Secondary**: Glass background, colored border
- **Icon**: Small, rounded, colored background
- **Hover**: Scale up, brighten, increase shadow

### Inputs
- **Text**: Glass background, white border, white text
- **Select**: Same as text input
- **Search**: Icon on left, glass style
- **Focus**: Purple ring, border transparent

### Cards
- **Default**: Glass background, white border
- **Hover**: Brighter background, scale slightly
- **Active**: Colored border, glow effect

### Icons
- **Size**: w-4 h-4 (small), w-5 h-5 (medium), w-6 h-6 (large)
- **Color**: Matches context (purple, orange, etc.)
- **Style**: Lucide React icons

---

## 🌟 Special Effects

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(16px)
border: 1px solid rgba(255, 255, 255, 0.1)
```

### Gradients
```css
/* Background */
background: linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)

/* Buttons */
background: linear-gradient(to right, #a855f7, #ec4899)
```

### Animations
- Fade in on load
- Slide in from bottom
- Scale on hover
- Spin on loading
- Smooth transitions

---

## 📸 Visual Examples

### Login Page
```
┌─────────────────────────────────────┐
│                                     │
│         [Purple Circle Icon]        │
│                                     │
│      Admin Dashboard                │
│      Hatton Garden Management       │
│                                     │
│   Username: [_____________]         │
│                                     │
│   Password: [_____________]         │
│                                     │
│      [Sign In Button]               │
│                                     │
│   Default: admin / changeme123      │
│                                     │
└─────────────────────────────────────┘
```

### Dashboard Stats
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 💎       │ │ ☕       │ │ 👁️       │ │ ⭐       │
│ Jewel    │ │ Cafes    │ │ Views    │ │ Rating   │
│ 50       │ │ 12       │ │ 12.5K    │ │ 4.7      │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Jeweller Card
```
┌─────────────────────────┐
│ [Jeweller Image]        │
│ ✏️ Edit    🗑️ Delete    │
├─────────────────────────┤
│ Harper Tait             │
│ Fine Jewellery          │
│ ⭐ 5.0                  │
│                         │
│ Beautiful fine jewel... │
│                         │
│ 📍 67-68 Hatton Garden │
│ 📞 +44 7566 7564 99    │
│ ✉️ info@harpertait.com │
│                         │
│ 347 reviews  View → │
└─────────────────────────┘
```

---

## 🎨 Color Meanings

- **Purple/Pink**: Primary brand, jewellers, premium
- **Orange/Red**: Cafes, dining, warmth
- **Blue**: Information, actions, links
- **Yellow**: Ratings, highlights, success
- **Red**: Delete, errors, warnings
- **Green**: Success, confirmation (future)
- **Gray**: Secondary text, disabled

---

## ✨ Key Design Principles

1. **Consistency**: Same patterns throughout
2. **Clarity**: Clear visual hierarchy
3. **Feedback**: Hover states, loading states
4. **Accessibility**: Good contrast, clear labels
5. **Performance**: Optimized animations
6. **Responsiveness**: Works on all devices
7. **Beauty**: Premium, modern aesthetic

---

This visual guide helps you understand the design language and user interface of the admin dashboard. All pages follow these consistent patterns for a cohesive user experience.
