# Domain Cutover Guide: erickmazer.com

This document walks through pointing `erickmazer.com` from AWS to the new Vercel-hosted site. Follow these steps ONLY after you're satisfied with the content on the Vercel preview URL.

## Current State

- **Old site (AWS)**: http://erickmazer.com/ — static HTML/CSS, preserved in `v0/` of this repo
- **New site (Vercel)**: https://v1-six-lovat.vercel.app — Next.js 16, live and functional
- **DNS**: Still points to AWS (wherever the old site is hosted)

## Prerequisites Before Cutover

- [ ] You're happy with the content on the new site
- [ ] Content calibration phase is complete (real bio, history, current interests)
- [ ] Fatherhood quote is your own (not the placeholder)
- [ ] Social links point to your real profiles
- [ ] Font files are working (visit https://v1-six-lovat.vercel.app/ and verify Japanese characters render)

## Cutover Steps (~10 min active work, 24-72h DNS propagation)

### Step 1: Add custom domain in Vercel

1. Go to https://vercel.com/dashboard
2. Select the `v1` project (under `erick-mazer-yamashitas-projects`)
3. Settings → Domains → Add Domain
4. Enter: `erickmazer.com`
5. Add a second entry for: `www.erickmazer.com`
6. Vercel will show DNS records to configure. You'll see something like:
   - `erickmazer.com` → A record → `76.76.21.21`
   - `www.erickmazer.com` → CNAME → `cname.vercel-dns.com`

### Step 2: Update DNS records in your AWS account

Log into AWS Route 53 (or whichever DNS provider hosts erickmazer.com):

1. Navigate to Route 53 → Hosted Zones → erickmazer.com
2. **If `erickmazer.com` currently has A records pointing to AWS** (e.g., CloudFront, S3, EC2):
   - Update the root A record to point to `76.76.21.21` (Vercel's IP)
3. **If you want `www.erickmazer.com` to work**:
   - Update/create CNAME record for `www` pointing to `cname.vercel-dns.com`
4. **TTL**: Lower to 300 seconds before making changes so propagation is faster. You can raise it again after.

### Step 3: Verify DNS update locally

Wait 5-10 minutes after the change, then:

```bash
dig erickmazer.com +short        # should eventually return 76.76.21.21
dig www.erickmazer.com +short    # should return cname.vercel-dns.com
```

DNS propagation takes anywhere from minutes to 72 hours depending on:
- Your TTL setting
- Local ISP DNS cache
- Resolver behavior worldwide

### Step 4: Verify the site works on erickmazer.com

Once DNS has propagated:
1. Visit https://erickmazer.com in an incognito window
2. Verify the new Next.js site loads (not the old AWS page)
3. Vercel auto-issues Let's Encrypt SSL — the lock icon should show a valid cert
4. Test `/playground` route
5. Check OG tags: paste the URL into Twitter / Slack and verify the OG image previews

### Step 5: Wait for full propagation (24-72 hours)

During this window, both AWS and Vercel might receive traffic depending on the resolver. That's fine — the old AWS page is still there and valid. Once propagation completes (check from multiple networks / VPNs if you want certainty), you can decommission AWS.

### Step 6: Decommission the AWS-hosted old site

Once you're confident DNS has fully moved:
1. Log into AWS Console
2. Find where the old site was hosted — likely S3 + CloudFront, or EC2
3. **Don't delete the archive** — we have it in `v0/` of this repo forever. But you can remove:
   - S3 bucket (if it was a static site)
   - CloudFront distribution
   - Route 53 records you no longer need
   - Any EC2 instance that only served this site
4. This saves you money and reduces surface area

## Vercel Custom Domain Notes

- **SSL**: Auto-provisioned by Let's Encrypt. No manual cert management needed.
- **Redirects**: Vercel auto-handles www → apex (or vice versa, configurable in dashboard).
- **metadata URL fix**: After adding the custom domain, update `v1/app/layout.tsx` to include:
  ```ts
  export const metadata = {
    metadataBase: new URL('https://erickmazer.com'),
    // ... rest
  }
  ```
  This removes the "metadataBase not set" build warning and ensures OG images use the correct absolute URLs.

## Rollback Plan

If anything goes wrong:
1. In Route 53, revert the DNS records to their original AWS values
2. DNS propagates back within the TTL window (hopefully short because of step 2 above)
3. Old site is back up
4. No data loss — both sites stay intact during cutover

## Contact / Debug

- Vercel dashboard: https://vercel.com/dashboard
- Vercel support: https://vercel.com/help
- DNS propagation checker: https://www.whatsmydns.net/

---

_Generated: 2025-04-24_
_Site version: v1 (Next.js 16, Tailwind v4, R3F v9)_
_Deployment URL at time of writing: https://v1-six-lovat.vercel.app_
