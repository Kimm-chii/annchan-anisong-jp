🌟 Project Title: AnnChan's Room 🎀 (Anisong JP / Artist Portfolio Web App)

1. Custom Visual Assets & Branding 
Magical Winged Moon Favicon: The Artist's own designed icon a vector SVG tab favicon featuring a pastel winged crescent moon, blossom flower, glowing star, and sparkle accents—without any background bounding circle—to complement the site's aesthetic.
Cohesive Theme & Typography: Built around a soft pastel palette (sakura pinks, lavender, rose, and dark purple velvet) using clean typography and responsive layout containers.

2. Animated Intro / Splash Screen (IntroSplash.tsx)
Interactive First-Time Intro: An overlay that plays upon entering the site, featuring ambient background glow blooms and floating sparkles.
Bilingual Quote: Animated typography displaying:
♪
Every song holds a memory.
一つひとつの歌に、想いを込めて。
UX Optimizations: Features an automated fade-out timer (2.4s) as well as a " tap/click anywhere to skip" gesture handler for quick access.

3. Seamless Viewport-Fit Hero Section
Pixel-Perfect Viewport Alignment: Calibrated the Hero layout (min-h-[calc(100vh-80px)]) so the first screen focuses purely on the welcome banner without awkwardly showing cropped content from the next section.
Subtle Scroll Indicators: Soft visual transitions that hint at content below without cluttering the screen.

4. Discography & Video Showcase (Music.tsx)
Adaptive Card System: Displays music releases and YouTube covers with custom hover states, play overlays, and animated disc badges.
Mobile-Responsive Ergonomics: Transforms into compact horizontal list cards on mobile devices for easy browsing, while expanding into a multi-column grid on desktop displays.

5. Navigation & Social Hub (Navbar.tsx, FloatingNav.tsx)
Floating Quick-Nav: A floating bottom navigation bar tailored for mobile touch screens.
Social Community Hub: Dedicated social link section (YouTube, X/Twitter, TikTok, Twitch) with subscriber badges and interactive hover effects.
Dark / Light Theme Toggle: Seamless light and dark mode switching powered by Tailwind CSS dark mode classes.
🛠️ Tech Stack & Implementation Highlights
Frontend Framework: React 18 with TypeScript & Vite
Styling: Tailwind CSS with custom gradient stops and backdrop glassmorphism (backdrop-blur)
Animations: Motion (motion/react) for smooth entrance, exit, and scroll-triggered animations
Iconography: Lucide React + custom inline SVG vector assets