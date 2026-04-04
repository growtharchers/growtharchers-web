# Growtharchers Web — Astro + Cloudflare Pages

**Stack:** Astro 4 · Cloudflare Pages · GitHub · Decap CMS  
**Cost:** ₹0/month hosting · Domain renewal only  
**Deploy time:** ~60 seconds per commit

---

## Project structure

```
growtharchers-web/
├── src/
│   ├── layouts/
│   │   └── Base.astro          # HTML shell — SEO, JSON-LD, fonts, scripts
│   ├── components/
│   │   ├── Nav.astro           # Fixed navigation bar
│   │   └── Footer.astro        # Footer with dynamic copyright year
│   ├── pages/
│   │   ├── index.astro         # Homepage — all sections
│   │   └── insights/
│   │       └── [slug].astro    # Article template — auto-routes Markdown files
│   ├── content/
│   │   ├── insights/           # Markdown articles (add .md files here)
│   │   └── settings/           # JSON config for CMS-editable settings
│   └── styles/
│       └── global.css          # Full design system — all CSS tokens and classes
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS admin interface
│   │   └── config.yml          # CMS content collections config
│   ├── robots.txt              # Crawler instructions + sitemap URL
│   └── favicon.svg             # Add your favicon here
├── astro.config.mjs            # Astro config — site URL, sitemap, build options
├── package.json                # Dependencies: astro, @astrojs/sitemap
└── README.md                   # This file
```

---

## One-time setup (4–6 hours total across all three sites)

### Step 1 — Prerequisites (15 minutes)

Install Node.js (v18 or later) from https://nodejs.org  
Install Git from https://git-scm.com

Verify:
```bash
node --version   # should show v18+
git --version
```

---

### Step 2 — Create GitHub repository (10 minutes)

1. Go to https://github.com/new
2. Repository name: `growtharchers-web`
3. Set to **Private**
4. Do not initialise with README (you already have files)
5. Click **Create repository**

Then push this project:
```bash
cd growtharchers-web
git init
git add .
git commit -m "Initial commit — Growtharchers Astro project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/growtharchers-web.git
git push -u origin main
```

---

### Step 3 — Install dependencies and test locally (10 minutes)

```bash
cd growtharchers-web
npm install
npm run dev
```

Open http://localhost:4321 — the site should render exactly as the HTML prototype.

To confirm the production build works:
```bash
npm run build
npm run preview
```

Open http://localhost:4321 — same result, served from the static build output.

---

### Step 4 — Deploy to Cloudflare Pages (20 minutes)

1. Go to https://dash.cloudflare.com → **Pages** → **Create a project**
2. Click **Connect to Git** → Authorise GitHub → Select `growtharchers-web`
3. Configure build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**

Cloudflare will build and deploy. You will get a URL like:  
`https://growtharchers-web.pages.dev`

Test it. Every subsequent `git push` to `main` triggers an automatic redeploy in ~60 seconds.

---

### Step 5 — Connect your domain (30 minutes)

#### Move DNS to Cloudflare (do this once for all three sites)

1. Go to https://dash.cloudflare.com → **Add a site**
2. Enter `growtharchers.com` → Select **Free plan**
3. Cloudflare scans your existing DNS records — review and confirm
4. Copy the two Cloudflare nameservers shown (e.g. `liz.ns.cloudflare.com`)
5. Go to GoDaddy → Domain Settings → Nameservers → Enter custom nameservers
6. Wait 10–30 minutes for propagation

#### Add custom domain to Cloudflare Pages

1. In your Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `growtharchers.com` → Confirm
3. Add `www.growtharchers.com` → also confirm (redirects to apex)

SSL certificate issues automatically. HTTPS enforced automatically.

---

### Step 6 — Enable enterprise security (5 minutes, automatic)

In Cloudflare dashboard → **Security** tab:

| Setting | Value |
|---|---|
| SSL/TLS mode | Full (strict) |
| Always Use HTTPS | On |
| Automatic HTTPS Rewrites | On |
| Security Level | Medium |
| Bot Fight Mode | On |
| Browser Integrity Check | On |

WAF, DDoS protection, and CDN are active automatically at the free tier.  
No further configuration required.

---

### Step 7 — Configure Decap CMS (30 minutes)

1. Open `public/admin/config.yml`
2. Change line 6 to your GitHub username and repo:
   ```yaml
   repo: YOUR-GITHUB-USERNAME/growtharchers-web
   ```
3. Commit and push:
   ```bash
   git add public/admin/config.yml
   git commit -m "Configure Decap CMS backend"
   git push
   ```

4. Enable GitHub OAuth in Cloudflare Pages:
   - Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App
   - **Application name:** Growtharchers CMS
   - **Homepage URL:** https://growtharchers.com
   - **Authorization callback URL:** https://api.netlify.com/auth/done
   - Note the Client ID and generate a Client Secret

5. In Cloudflare Pages → Settings → Environment Variables, add:
   - `OAUTH_CLIENT_ID` = your GitHub OAuth client ID
   - `OAUTH_CLIENT_SECRET` = your GitHub OAuth client secret

6. Visit https://growtharchers.com/admin — log in with GitHub — the CMS is live.

---

### Step 8 — Submit to Google Search Console (15 minutes)

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://growtharchers.com`
3. Verify ownership via HTML tag method:
   - Google gives you a meta tag: `<meta name="google-site-verification" content="...">`
   - Add it to `src/layouts/Base.astro` inside `<head>` under the existing meta tags
   - Commit, push, wait for deploy, then click Verify in Search Console
4. In Search Console → Sitemaps → Add: `https://growtharchers.com/sitemap-index.xml`
5. Done. Google will index all pages, including future Insights articles, automatically.

---

## Day-to-day content updates

### Adding an Insights article (no code required)

Via Decap CMS:
1. Visit https://growtharchers.com/admin
2. Click **Insights Articles** → **New Article**
3. Fill in title, description, tags, body
4. Click **Publish**
5. Article auto-deploys in ~60 seconds at `https://growtharchers.com/insights/your-slug`

Via file (for developers):
1. Create `src/content/insights/article-slug.md`:
```markdown
---
title: "The 6 Commerce Fits Flywheel"
description: "How six domain boundaries form a complete commerce coherence diagnostic — mirroring the 6 Value Fits of the 6VS."
publishDate: "2026-04-01"
author: "Kartik G Iyer"
tags: ["6 Commerce Fits", "Commerce Strategy", "Intelligent Commerce"]
readTime: "14 min read"
---

Your article body in Markdown here.

## Section heading

Content continues...
```
2. Commit and push → live in 60 seconds.

---

### Updating a section on the homepage

1. Open `src/pages/index.astro` in VS Code (or GitHub web editor)
2. Find the section (sections are labelled with comments: `<!-- HERO -->`, `<!-- APPROACH -->`, etc.)
3. Edit the text
4. Commit → auto-deploys

For larger changes (new sections, layout changes), Claude can generate the updated HTML block and you paste it in.

---

## Replicating for Careerarchers and Valuearchers

The same five-file pattern applies. For each sister site:

1. Copy this project: `cp -r growtharchers-web careerarchers-web`
2. Replace `src/styles/global.css` with the Careerarchers CSS
3. Replace `src/pages/index.astro` body content with the Careerarchers HTML
4. Update `astro.config.mjs`: change `site` to `'https://careerarchers.com'`
5. Update `src/layouts/Base.astro`: change default title, description, JSON-LD details
6. Update `src/components/Nav.astro`: Careerarchers nav links and logo
7. Update `src/components/Footer.astro`: Careerarchers footer content
8. Create new GitHub repo `careerarchers-web`, push, connect to Cloudflare Pages

Total per sister site: ~2 hours including domain setup.

---

## Monthly maintenance checklist

| Task | Frequency | Time |
|---|---|---|
| Astro version update | Quarterly | 15 min — `npm update astro` |
| Review Cloudflare security analytics | Monthly | 10 min |
| Check Google Search Console for crawl errors | Monthly | 10 min |
| Add new Insights articles | As needed | 15 min via CMS |
| Review Core Web Vitals in Search Console | Monthly | 10 min |

**Total: ~45 minutes/month across all three sites.**

---

## Cost summary

| Item | Cost |
|---|---|
| Cloudflare Pages hosting (3 sites) | **₹0/month** |
| Cloudflare WAF + DDoS + CDN + SSL | **₹0/month** |
| GitHub (private repos) | **₹0/month** |
| Decap CMS | **₹0/month** |
| Google Search Console | **₹0/month** |
| growtharchers.com domain renewal | ~₹1,000/year |
| careerarchers.com domain renewal | ~₹1,000/year |
| valuearchers.com domain renewal | ~₹1,000/year |
| **Total** | **~₹3,000/year** |

---

## Support and updates

For structural changes, new sections, or framework updates — generate the HTML with Claude and paste into the relevant `.astro` file. The design system (CSS variables, component classes) is fully documented in `src/styles/global.css`.

For content updates — use Decap CMS at `/admin` or edit Markdown files directly.

For technical questions — Astro documentation at https://docs.astro.build
