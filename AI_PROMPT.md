# Glass Links — Linktree Page Builder

## What Is It

A web app where anyone can build a beautiful "link in bio" page — like Linktree — but with a premium glassmorphism design. Users pick a template, customize everything live, and download a ready-to-deploy website as a ZIP file.

No sign-up. No account. Everything happens in the browser.

---

## How It Works

The page is split into two sides:

**Left side — Editor Panel** (where you customize)
**Right side — Live Preview** (see changes in real-time)

On mobile, the preview is on top and the editor is on the bottom.

---

## Templates

There are 3 glassmorphism templates to choose from. Each has a unique color scheme and animated background decorations:

### 1. Cosmic
- Colors: Purple and blue gradient accents
- Decorations: Soft floating glowing orbs in the background
- Vibe: Deep space, dreamy

### 2. Aurora
- Colors: Green and cyan gradient accents
- Decorations: Slowly rotating gradient wave rings
- Vibe: Northern lights, nature

### 3. Nebula
- Colors: Pink and purple gradient accents
- Decorations: Scattered blur particles floating around
- Vibe: Galaxy dust, soft

---

## Design Style

### Glassmorphism (The Core Look)
- All cards and containers have a frosted glass effect
- Semi-transparent white background (user can adjust opacity from 2% to 25%)
- Blur behind the glass (user can adjust from 10px to 50px)
- Thin white border around each glass card (very subtle, 10-15% white)
- Rounded corners (16-24px radius)
- No drop shadows — the glass effect comes from the blur and transparency

### Background
- Default background is a solid near-black color (#050010)
- Users upload their own background image
- Background image shows at full opacity — no dimming, no overlay
- Background stays fixed while content scrolls

### Typography
- Inter font (clean, modern)
- Name is large and bold
- Bio is smaller, lighter weight
- Link titles are medium weight, easy to read

### Animations
- Everything animates smoothly:
  - Elements fade in and slide up when the page loads
  - Links appear one after another with a slight delay between each
  - Buttons scale up slightly on hover
  - Buttons press down slightly when clicked
  - Folders expand and collapse smoothly
  - Template decorations (orbs, waves, particles) are always gently animated

---

## Editor Features

### Profile Section
- **Name** — text input, shown at the top of the page
- **Bio** — short text area (2 lines), shown below the name
- **Avatar** — upload a photo, displayed in a circle above the name

### Appearance Section
- **Background Image** — upload a photo that covers the entire page behind the glass
- **Glass Opacity** — slider (2% to 25%, default 8%) — how see-through the glass cards are
- **Blur Intensity** — slider (10px to 50px, default 24px) — how blurry the glass effect is

### Link Folders Section
Links are organized into **folders** (sections). For example:

```
📁 Social (3 links)
   • Twitter → https://twitter.com/...
   • Instagram → https://instagram.com/...
   • YouTube → https://youtube.com/...

📁 Work (2 links)
   • Portfolio → https://...
   • LinkedIn → https://...
```

**Folder features:**
- Add a new folder (give it a name like "Social" or "Work")
- Rename a folder
- Delete a folder
- Expand/collapse a folder to show/hide its links
- See how many links are in each folder

**Link features (inside each folder):**
- Add a new link
- Set the link title (what people see)
- Set the URL (where it goes)
- Pick an icon from a dropdown (globe, GitHub, Twitter, Instagram, YouTube, music, email, LinkedIn, Twitch, send, link)
- Or upload a custom icon image instead of using a preset icon
- Delete a link

### Template Selector
- Visual preview of all 3 templates
- Click to switch — the live preview updates instantly

### Export Button
- One click to download everything as a ZIP file
- Shows a loading spinner while generating
- Shows a success checkmark when done

---

## What's Inside the Downloaded ZIP

The ZIP contains 3 files that work on any web host:

1. **index.html** — the complete page with all content, icons, and background baked in
2. **style.css** — all the glass effects, colors, animations, and responsive layout
3. **README.md** — instructions for deploying to Vercel, GitHub Pages, or Netlify

The exported files have **zero dependencies** — no React, no JavaScript frameworks, no npm. Just pure HTML and CSS. The only external resource is Google Fonts (for the Inter font).

This means anyone can:
- Open the HTML file directly in a browser
- Drag and drop onto any web hosting service
- It just works, forever, with no maintenance

---

## Responsive Design

- **Desktop:** Editor on the left (380px wide), live preview on the right (takes remaining space)
- **Mobile:** Preview on top, editor on the bottom (45% of screen height)
- **Tiny screens** (under 380px): Everything scales down, padding reduces
- **Safe areas:** Respects notches and rounded corners on phones (iPhone notch, etc.)
- **Full screen:** Uses the entire viewport height — no scrolling the page itself, only the editor panel scrolls internally

---

## The Vibe

This should feel like a **premium creative tool** — clean, modern, minimal, with beautiful glass effects and smooth animations. Think Apple design meets Figma meets a luxury brand. Every pixel matters.

No clutter. No unnecessary buttons. No ads. Just a beautiful tool that makes beautiful pages.
