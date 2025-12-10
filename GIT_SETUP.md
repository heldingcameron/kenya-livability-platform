# Git Configuration & Repository Setup - Quick Reference

## ✅ Git Installation Confirmed
- Git version: 2.52.0.windows.1
- User: Cameron
- Email: alexcameronhazel@gmail.com

---

## 🔄 IMPORTANT: Restart Required

**The PowerShell terminal needs to be restarted for Git to work.**

### Steps:
1. Close the current PowerShell/terminal window
2. Open a new PowerShell window
3. Navigate back to the project: `cd "d:\Code Projects\Livability"`
4. Let me know when ready, and I'll continue with the Git setup

---

## 📝 What I'll Do Next (After Restart)

```powershell
# 1. Configure Git (already set globally, but will verify)
git config --global user.name "Cameron"
git config --global user.email "alexcameronhazel@gmail.com"
git config --global init.defaultBranch main

# 2. Initialize repository
git init

# 3. Check status
git status

# 4. Add all files
git add .

# 5. Create initial commit
git commit -m "Initial commit: Core platform with auth, map, and reporting features

- Authentication system with JWT
- Mapbox integration with custom markers
- Building detail pages with scoring
- Report submission with rate limiting
- Scoring engine with recency weighting
- Responsive design foundation
- Phase 1: 85% complete"

# 6. Verify branch name
git branch

# 7. Create GitHub repository (you'll need to do this manually or I can guide you)
# Then connect and push:
git remote add origin https://github.com/heldingcameron/REPO_NAME.git
git push -u origin main
```

---

## 🌐 GitHub Repository Setup

### Option 1: Create via GitHub Website (Recommended)
1. Go to: https://github.com/new
2. Repository name: `kenya-livability-platform` (or your preferred name)
3. Description: "Crowdsourced platform for tracking power, water, and internet reliability across Kenya"
4. Choose: **Private** or **Public**
5. ❌ **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"
7. Copy the repository URL (e.g., `https://github.com/heldingcameron/kenya-livability-platform.git`)

### Option 2: Create via GitHub CLI (if installed)
```powershell
gh repo create kenya-livability-platform --private --source=. --remote=origin
```

---

## 📋 Repository Details

**Suggested Name:** `kenya-livability-platform`

**Suggested Description:** 
```
Crowdsourced platform for tracking power, water, and internet reliability across Kenya. Built with React, TypeScript, Express, PostgreSQL, and Mapbox.
```

**Topics/Tags (optional):**
- kenya
- infrastructure
- livability
- mapbox
- react
- typescript
- postgresql
- crowdsourcing

---

## ✅ Checklist

- [x] Git installed
- [x] Git configured (user.name, user.email)
- [ ] Terminal restarted
- [ ] Repository initialized
- [ ] Initial commit created
- [ ] GitHub repository created
- [ ] Remote added
- [ ] Code pushed to GitHub

---

**Next Step:** Please restart your terminal and let me know when you're ready to continue!
