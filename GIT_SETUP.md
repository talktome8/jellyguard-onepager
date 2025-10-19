# Git Setup Instructions

## Issue
Your Git remote URL contains a placeholder `<YourUser>` instead of your actual GitHub username.

## How to Fix

### Option 1: If you already have a GitHub repository

1. **Find your GitHub username** (go to github.com and check your profile)

2. **Update the remote URL** with your actual username:
   ```bash
   git remote set-url origin https://github.com/YOUR-ACTUAL-USERNAME/jellyguard-onepager.git
   ```
   Replace `YOUR-ACTUAL-USERNAME` with your real GitHub username

3. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

### Option 2: If you need to create a new GitHub repository

1. **Go to GitHub**: https://github.com/new

2. **Create a repository**:
   - Repository name: `jellyguard-onepager`
   - Description: "JellyGuard - Clean Water, Naturally. Nature-inspired jellyfish protection system."
   - Choose Public or Private
   - **Do NOT** initialize with README (you already have files)
   - Click "Create repository"

3. **Copy the repository URL** from GitHub (it will look like):
   ```
   https://github.com/YOUR-USERNAME/jellyguard-onepager.git
   ```

4. **Update your local repository**:
   ```bash
   git remote set-url origin https://github.com/YOUR-USERNAME/jellyguard-onepager.git
   git push -u origin main
   ```

### Option 3: Using SSH (Recommended for security)

If you have SSH keys set up with GitHub:

```bash
git remote set-url origin git@github.com:YOUR-USERNAME/jellyguard-onepager.git
git push -u origin main
```

## Verify Connection

After updating the remote URL, verify it's correct:
```bash
git remote -v
```

You should see your actual username, not `<YourUser>`.

## Troubleshooting

### If you get authentication errors:

1. **GitHub Personal Access Token** (for HTTPS):
   - Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` scope
   - Use the token as your password when pushing

2. **GitHub CLI** (easiest):
   ```bash
   # Install GitHub CLI if not installed
   winget install GitHub.cli
   
   # Login
   gh auth login
   
   # Follow the prompts
   ```

3. **SSH Keys** (most secure):
   - Follow GitHub's guide: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Change remote URL (HTTPS)
git remote set-url origin https://github.com/USERNAME/jellyguard-onepager.git

# Change remote URL (SSH)
git remote set-url origin git@github.com:USERNAME/jellyguard-onepager.git

# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/USERNAME/jellyguard-onepager.git

# Push to GitHub
git push -u origin main
```

## What to Replace

Replace these placeholders:
- `YOUR-USERNAME` → Your actual GitHub username
- `YOUR-ACTUAL-USERNAME` → Your actual GitHub username
- `<YourUser>` → Your actual GitHub username

## Example

If your GitHub username is `johndoe`:
```bash
git remote set-url origin https://github.com/johndoe/jellyguard-onepager.git
git push -u origin main
```
