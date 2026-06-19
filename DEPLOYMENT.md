# Deploying Vasco Macau's Portfolio to Vercel

A step-by-step guide for getting this codebase live on Vercel. The site has two halves — a static React frontend and a FastAPI backend — and Vercel handles both, but they deploy separately.

---

## Part 1 — Push the codebase to GitHub

Vercel imports from a Git repo, so the project must be in GitHub first.

1. **Inside Emergent's UI**, click the **GitHub** button in the top bar and authorize Emergent to push to your GitHub account. This creates a repo automatically.
   _(If you'd rather do it manually: clone the workspace locally with `git clone …`, create a new GitHub repo, then `git remote add origin <your-repo>` and `git push -u origin main`.)_

2. Verify the repo on GitHub shows both `frontend/` and `backend/` folders at the root.

---

## Part 2 — Deploy the frontend (the visible site)

### Step 1 — Import the project
1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. Click **Import** next to your new repo.

### Step 2 — Configure the build
Vercel auto-detects most things, but **override these fields** in the import screen:

| Field | Value |
|---|---|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `yarn build` |
| **Output Directory** | `build` |
| **Install Command** | `yarn install` |

### Step 3 — Environment variables
Add one env var in the **Environment Variables** section before deploying:

| Name | Value |
|---|---|
| `REACT_APP_BACKEND_URL` | _(leave empty for now — fill this in after Part 3)_ |

> If you skip this for the first deploy, the site will render but `GET /api/projects` calls will fail. That's fine — we'll set it correctly after the backend is up.

### Step 4 — Deploy
Click **Deploy**. First build takes ~3 minutes (R3F + Three.js compile is heavy).

Once green, Vercel gives you a URL like `https://vasco-macau.vercel.app`. The hero scene, the cursor, the typography — all of it works on the static side.

---

## Part 3 — Deploy the FastAPI backend

Vercel **does** run Python via serverless functions, but the cleanest path for a FastAPI app with MongoDB is **Railway** or **Render** (both free tiers work).

### Option A — Railway (recommended, fastest)

1. Go to **[railway.app](https://railway.app)** → sign in with GitHub.
2. **New Project** → **Deploy from GitHub repo** → select your repo.
3. After it imports, click into the service → **Settings**:
   - **Root Directory:** `backend`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Watch Paths:** `backend/**`
4. **Variables** tab → add:

| Name | Value |
|---|---|
| `MONGO_URL` | _(your MongoDB connection string — see below)_ |
| `DB_NAME` | `quiet_craft` |
| `CORS_ORIGINS` | `https://vasco-macau.vercel.app` _(your Vercel URL from Part 2)_ |

5. **Get a MongoDB connection string:**
   - Free tier: **[MongoDB Atlas](https://cloud.mongodb.com)** → create a free M0 cluster → **Connect** → **Drivers** → copy the URI. Looks like:
     `mongodb+srv://<user>:<pass>@cluster.xxx.mongodb.net/?retryWrites=true&w=majority`
   - Whitelist Railway's IPs: in Atlas, **Network Access** → **Add IP** → `0.0.0.0/0` _(or Railway's egress IPs if you want stricter)_.
6. Railway gives you a URL like `https://quietcraft-backend.up.railway.app`. **Copy it.**

### Option B — Render
Same shape: new web service → root `backend` → start command `uvicorn server:app --host 0.0.0.0 --port $PORT` → set env vars → connect Atlas.

---

## Part 4 — Connect frontend to backend

1. Back in **Vercel** → your project → **Settings** → **Environment Variables**.
2. Edit `REACT_APP_BACKEND_URL`:
   - **Value:** the backend URL from Part 3 (no trailing slash). e.g. `https://quietcraft-backend.up.railway.app`
   - Apply to: **Production, Preview, Development** (all three).
3. **Deployments** tab → click the latest production deployment → ⋯ → **Redeploy**.

After ~2 minutes, the site reloads and `GET /api/projects` now hits the live backend. Projects load from MongoDB, contact form submits successfully.

---

## Part 5 — Custom domain (optional)

1. In Vercel: **Settings** → **Domains** → **Add** → enter `vascomacau.com` (or whatever you own).
2. Vercel shows you a CNAME or A record. Add it at your domain registrar (Namecheap, GoDaddy, etc.).
3. Wait 5–60 minutes for DNS propagation. Vercel auto-issues an SSL cert.

Update `CORS_ORIGINS` on Railway to include the new domain:
`https://vascomacau.com,https://www.vascomacau.com,https://vasco-macau.vercel.app`

---

## Part 6 — Edit content without redeploying

Two ways to update what's on the site:

### Method 1 — Edit `content.ts` and push to GitHub
- File: `frontend/src/data/content.ts`
- Change `SITE.designerName`, `SITE.email`, project arrays, etc.
- `git push` → Vercel auto-deploys in ~3 minutes.

### Method 2 — Hit the backend API to add/update projects
The seeded projects in MongoDB take precedence over the fallback in `content.ts`. To replace them:

```bash
# Wipe seed (one-off — connect to your Atlas DB via Compass or mongosh):
db.projects.drop()

# Then POST new projects via API:
curl -X POST https://quietcraft-backend.up.railway.app/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "stripe-redesign",
    "index": 1,
    "year": 2025,
    "title": "Stripe Dashboard",
    "role": "Lead Designer",
    "disciplines": ["Product", "Design System"],
    "outcome": "Shipped the next generation of the merchant surface.",
    "description": "…",
    "hero_image": "",
    "color": "#1A1F2A"
  }'
```

Front-end will pick up the new projects on next page load (no rebuild needed — it fetches `/api/projects` at runtime).

---

## Checklist before launch

- [ ] Vercel frontend deployed and loading
- [ ] Railway/Render backend deployed
- [ ] `REACT_APP_BACKEND_URL` set in Vercel and redeployed
- [ ] `CORS_ORIGINS` on backend includes the production frontend domain
- [ ] `MONGO_URL` configured and Atlas IP whitelist set
- [ ] Contact form submission works end-to-end (test with a real email)
- [ ] Real designer name + email swapped in `content.ts`
- [ ] Custom domain pointed (if applicable)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) — target Lighthouse score ≥85 on desktop

---

## Troubleshooting

**Frontend deploys but is blank**
→ Check the browser console. Usually `REACT_APP_BACKEND_URL` isn't set, or CORS is blocking. Inspect Network tab.

**3D scene doesn't render on Safari**
→ Safari < 16 has limited WebGL2. The site degrades to a black field. Acceptable — the typography still lands.

**View Transition morph (reel → case study) doesn't animate**
→ Only Chromium-based browsers (Chrome, Edge, Arc) and Safari 18+ support this. Firefox falls back to a hard cut. Working as intended.

**Build times out**
→ Three.js is heavy. If you hit Vercel's 45-min limit, upgrade to Pro, or remove the `@react-three/drei` `Environment preset="studio"` (saves ~600KB).
