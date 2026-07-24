# 06 - Design System Specification

## 1. Design Tokens & Color Palette (Source of Truth)

```css
:root {
  /* Surface & Background Base */
  --color-background: #051424;                /* Deep Dark Industrial Navy */
  --color-surface: #051424;
  --color-surface-dim: #051424;
  --color-surface-container-lowest: #010f1f;
  --color-surface-container-low: #0d1c2d;
  --color-surface-container: #122131;
  --color-surface-container-high: #1c2b3c;
  --color-surface-container-highest: #273647;
  --color-surface-variant: #273647;

  /* Primary Accent & Safety Orange */
  --color-primary: #ffb693;                   /* Soft Highlight Orange */
  --color-primary-container: #ff6b00;         /* Industrial Safety Orange CTA */
  --color-on-primary-container: #572000;
  --color-primary-fixed: #ffdbcc;
  --color-primary-fixed-dim: #ffb693;

  /* Text & On-Surface Colors */
  --color-on-surface: #d4e4fa;                /* Main Body Text (Icy Blue-White) */
  --color-on-surface-variant: #e2bfb0;        /* Muted Subtitle Text */
  --color-on-background: #d4e4fa;

  /* Borders & Outlines */
  --color-outline: #a98a7d;                   /* Primary Border */
  --color-outline-variant: #5a4136;           /* Subtle Section Divider */
  --color-industrial-border: #334155;        /* Dark Slate Border Utility */

  /* Status Colors */
  --color-in-stock: #4ade80;                  /* Emerald Green Stock Status */
  --color-error: #ffb4ab;
  --color-on-error: #690005;
  --color-error-container: #93000a;
}
```

---

## 2. Component Utility Classes

```css
/* Industrial Dot-Grid Background */
.industrial-grid {
    background-image: radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0);
    background-size: 40px 40px;
}

/* Glassmorphism Container */
.industrial-glass {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(169, 138, 125, 0.1);
}

/* Dark Slate Industrial Border */
.industrial-border {
    border: 1px solid #334155;
}

/* LED Inset Glow for Active Tags */
.led-active {
    box-shadow: inset 0 0 4px rgba(255, 107, 0, 0.8);
}

/* Orange Glow Button & Hover States */
.orange-glow {
    box-shadow: 0 0 15px rgba(255, 107, 0, 0.2);
}
.orange-glow-hover:hover {
    box-shadow: 0 0 25px rgba(255, 107, 0, 0.4);
}

/* Custom Webkit Industrial Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #051424; }
::-webkit-scrollbar-thumb { background: #273647; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #ffb693; }

/* Input Focus Highlights */
input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #ffb693 !important;
    box-shadow: 0 0 0 1px #ffb693;
}
```

---

## 3. Typography Hierarchy

| Token | Font Family | Size | Line Height | Weight | Letter Spacing | Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Inter | `48px` | `56px` | `800` (ExtraBold) | `-0.02em` | Normal |
| `headline-lg` | Inter | `32px` | `40px` | `700` (Bold) | `-0.01em` | Normal |
| `title-md` | Inter | `20px` | `28px` | `600` (SemiBold) | Normal | Normal |
| `body-lg` | Inter | `16px` | `24px` | `400` (Regular) | Normal | Normal |
| `body-sm` | Inter | `14px` | `20px` | `400` (Regular) | Normal | Normal |
| `label-caps` | **JetBrains Mono** | `12px` | `16px` | `600` (SemiBold) | `0.05em` | **UPPERCASE** |
| `specs-label` | **JetBrains Mono** | `10px` | `14px` | `600` (SemiBold) | `0.05em` | **UPPERCASE** |

---

## 4. Official Brand Emblem Logo Vector Specification

```xml
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Main Outer Shield (Dark Charcoal #1A1A1A) -->
  <path d="M100 30 L160 55 V100 C160 145 100 175 100 175 C100 175 40 145 40 100 V55 L100 30 Z" 
        fill="#1A1A1A" stroke="#333333" stroke-width="4"/>
  
  <!-- Inner Animated Safety Core (Safety Orange #FF6B00) -->
  <path d="M100 60 L140 78 V100 C140 125 100 145 100 145 C100 145 60 125 60 100 V78 L100 60 Z" 
        fill="#FF6B00" opacity="0.9">
    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
  </path>

  <!-- Central Industrial Cross Detail (#1A1A1A) -->
  <rect x="95" y="80" width="10" height="40" fill="#1A1A1A" rx="2" />
  <rect x="80" y="95" width="40" height="10" fill="#1A1A1A" rx="2" />
</svg>
```
