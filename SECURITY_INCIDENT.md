# 🚨 SECURITY INCIDENT REPORT

**Date:** 2025-12-10  
**Severity:** HIGH  
**Status:** PARTIALLY MITIGATED - ACTION REQUIRED

---

## 🔴 Issue Discovered

**Exposed Secret:** Mapbox Public Access Token  
**Token:** `pk.eyJ1Ijoia2VueWFubm9vYiIsImEiOiJjbWl6MDI1YjQwaWJzM2dzZDVycTc5eG8wIn0.3FwhEXFAgdtWYskB7_amGw`

**Location:** 
- ❌ README.md (lines 162) - **FIXED**
- ❌ .env.example (line 12) - **FIXED**
- ⚠️ Git commit history (commits 3e0ca0f, 3278cb2, 9df11a7) - **STILL VISIBLE**

**Exposure Duration:** ~6 minutes (from first push to fix)

---

## ✅ Immediate Actions Taken

1. ✅ Removed token from README.md
2. ✅ Removed token from .env.example (done earlier)
3. ✅ Committed fix: `49db2cb - SECURITY FIX: Remove exposed Mapbox token from README`
4. ✅ Pushed fix to GitHub

**Current Status:**
- Token is NO LONGER visible in current files
- Token IS STILL visible in Git history

---

## ⚠️ CRITICAL: Why This Matters

Even though the token is removed from current files, it's **permanently stored in Git history**. Anyone with access to the repository can view previous commits and see the token.

### Git History Shows:
```bash
# View commit history
git log --all --full-history --source -- README.md

# View specific commit
git show 3e0ca0f:README.md
```

---

## 🔧 REQUIRED ACTIONS

### 1. Regenerate Mapbox Token (CRITICAL - Do This Now!)

**Steps:**
1. Go to: https://account.mapbox.com/access-tokens/
2. Find the token: `pk.eyJ1Ijoia2VueWFubm9vYiIsImEiOiJjbWl6MDI1YjQwaWJzM2dzZDVycTc5eG8wIn0.3FwhEXFAgdtWYskB7_amGw`
3. Click "Revoke" or "Delete" to invalidate it
4. Create a new token with the same permissions
5. Copy the new token
6. Update your local `.env` file with the new token
7. **DO NOT** commit the new token to Git

**Why This Is Critical:**
- The exposed token can be used by anyone to make Mapbox API calls
- This could result in unexpected charges to your account
- Mapbox may rate-limit or suspend your account if abuse is detected

---

### 2. Update Local Environment (After Regenerating Token)

```bash
# Edit your .env file (NOT .env.example)
# Replace the old token with the new one
VITE_MAPBOX_TOKEN="your-new-mapbox-token-here"
```

**Verify .env is gitignored:**
```bash
git check-ignore .env
# Should output: .gitignore:14:.env
```

---

### 3. Optional: Clean Git History (Advanced)

⚠️ **WARNING:** This rewrites Git history and requires force-pushing. Only do this if you understand the implications.

**Option A: Use BFG Repo-Cleaner (Recommended)**
```bash
# Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text passwords.txt kenya-livability-platform.git
cd kenya-livability-platform.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

**Option B: Use git filter-branch (Manual)**
```bash
git filter-branch --tree-filter 'git ls-files -z "*.md" "*.example" | xargs -0 sed -i "s/pk\.eyJ1Ijoia2VueWFubm9vYiIsImEiOiJjbWl6MDI1YjQwaWJzM2dzZDVycTc5eG8wIn0\.3FwhEXFAgdtWYskB7_amGw/your-mapbox-public-token-here/g"' HEAD
git push --force
```

**Option C: Delete and Recreate Repository (Nuclear Option)**
1. Delete the GitHub repository
2. Create a new one with the same name
3. Force push the current state (with token already removed)

---

## 📋 Verification Checklist

After regenerating the token:

- [ ] Old Mapbox token revoked on Mapbox dashboard
- [ ] New Mapbox token created
- [ ] Local `.env` file updated with new token
- [ ] Application tested with new token (map loads correctly)
- [ ] `.env` file is NOT staged for commit (`git status` shows it as untracked)
- [ ] README.md shows placeholder only
- [ ] .env.example shows placeholder only

---

## 🛡️ Prevention Measures

To prevent this from happening again:

1. ✅ `.gitignore` is properly configured
2. ✅ `.env.example` uses placeholders only
3. ✅ README.md uses placeholders only
4. 🔲 **Pre-commit hook** to scan for secrets (future improvement)
5. 🔲 **GitHub Secret Scanning** enabled (check repository settings)

---

## 📊 Impact Assessment

**Likelihood of Exploitation:** Medium
- Repository was public for ~6 minutes
- Token is a public Mapbox token (limited permissions)
- No billing information directly exposed

**Potential Impact:** Low to Medium
- Unauthorized API usage
- Potential service disruption
- Possible account suspension

**Recommended Action:** **REGENERATE TOKEN IMMEDIATELY**

---

## 📝 Lessons Learned

1. Always use `.env.example` with placeholders
2. Never include actual secrets in documentation
3. Review all files before initial commit
4. Use automated secret scanning tools
5. Implement pre-commit hooks for secret detection

---

## 🔗 Useful Resources

- Mapbox Token Management: https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/
- GitHub Secret Scanning: https://docs.github.com/en/code-security/secret-scanning
- BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
- Git Filter-Branch: https://git-scm.com/docs/git-filter-branch

---

**IMMEDIATE ACTION REQUIRED: Regenerate the Mapbox token now!**

After regenerating, update me and I'll help verify everything is secure.
