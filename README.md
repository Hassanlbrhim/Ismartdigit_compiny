# I Smart Digit

Next.js 14 · Tailwind · Framer Motion · RTL (AR/EN) · file-backed admin dashboard.

## Run
    npm install
    cp .env.local.example .env.local   # then CHANGE the three values
    npm run dev                        # http://localhost:3000   admin: /admin/login

Dev fallback login (only when NODE_ENV != production and no env set): admin@ismartdigit.com / change-me

## Deploy for free (Netlify + Neon)
See DEPLOY.md (Arabic, step by step). Set DATABASE_URL to use Neon Postgres; leave it empty to use ./data/db.json.

## Production (VPS)
    npm run build && npm start
Needs ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET in the environment, and a PERSISTENT disk:
content and messages live in `data/db.json` (created automatically, git-ignored). Back it up.
On serverless hosts (Vercel) the disk is ephemeral: replace load()/save() in src/lib/db.ts with a real database.

## Images
Export the 4 project images from Figma to public/projects/{ridan,fitness,shopzen,trustsafe}.png
(or upload them from Admin > Projects). Export the hero illustration and upload it in Admin > Content.
