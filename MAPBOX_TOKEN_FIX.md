# 🔴 Mapbox Token Issue - Action Required

## Problem
The original Mapbox token was exposed on GitHub and has been **automatically revoked by Mapbox** for security reasons.

## Why You're Seeing 401 Errors
- Mapbox scans GitHub repositories for exposed tokens
- When detected, they automatically revoke them
- The "Default public token" is the same revoked token
- That's why it shows: `401 Unauthorized`

## Solution: Create a NEW Token

### Steps:
1. Go to: https://account.mapbox.com/access-tokens/
2. Click **"Create a token"**
3. **Name:** "Kenya Livability - New"
4. **Token type:** Public
5. **Scopes to enable:**
   - ✅ `styles:read`
   - ✅ `tiles:read`
   - ✅ `fonts:read`
   - ✅ `datasets:read`
6. Click "Create token"
7. **Copy the ENTIRE new token** (starts with `pk.`)
8. Open `d:\Code Projects\Livability\.env`
9. Replace the `VITE_MAPBOX_TOKEN` value with the new token
10. Save the file
11. Let me know when done - I'll clear cache and restart

## Important
- **DO NOT** use the "Default public token"
- Create a **completely new token**
- The new token will work immediately

## After Creating New Token
I will:
1. Clear Vite cache
2. Restart client server
3. Verify map loads correctly
4. Update security documentation
