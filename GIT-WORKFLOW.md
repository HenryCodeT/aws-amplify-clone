# Git Workflow Setup

This project includes a minimalist Git workflow configuration for fast, clean commits.

## Setup

### Option 1: Git Bash (Windows)
1. Copy the contents of [.bashrc](.bashrc) to your `~/.bashrc` file
2. Restart Git Bash or run: `source ~/.bashrc`

### Option 2: WSL/Linux
1. Copy the contents of [.bashrc](.bashrc) to your `~/.bashrc` file
2. Run: `source ~/.bashrc`

### Option 3: Use project-specific (temporary)
```bash
# Source it in your current session
source .bashrc
```

## Features

### 1. Git Autocomplete
- Tab completion for git commands and branches
- Works in Git Bash and Linux terminals

### 2. Clean Prompt with Git Branch
Your prompt will show:
```
username ~/path/to/project (main)
→
```

### 3. Fast Git Aliases

| Alias | Command | Description |
|-------|---------|-------------|
| `g` | `git` | Git shorthand |
| `ga` | `git add` | Stage files |
| `gad` | `git add .` | Stage all files |
| `gc` | `git commit` | Commit |
| `gcm` | `git commit -m` | Commit with message |
| `gca` | `git commit -a -m` | Commit all with message |
| `gco` | `git checkout` | Checkout |
| `gs` | `git switch` | Switch branch |
| `gst` | `git status -sb` | Short status |
| `gl` | `git log --oneline --decorate --graph` | Pretty log |
| `gpl` | `git pull` | Pull |
| `gp` | `git push` | Push |

### 4. Conventional Commits Functions

Quick conventional commits:

```bash
# Feature
feat "auth" "add login form"
# → git commit -m "feat(auth): add login form"

# Bug fix
fix "ui" "correct button alignment"
# → git commit -m "fix(ui): correct button alignment"

# Refactor
refactor "forms" "extract validation logic"
# → git commit -m "refactor(forms): extract validation logic"

# Documentation
docs "readme" "update installation steps"
# → git commit -m "docs(readme): update installation steps"
```

### 5. Quality of Life Aliases

| Alias | Command | Description |
|-------|---------|-------------|
| `cls` | `clear` | Clear terminal |
| `ll` | `ls -la` | List all files |
| `pls` | `pwd` | Print working directory |

## Example Workflow

### Quick commit workflow:
```bash
# Check status
gst

# Stage all changes
gad

# Commit with conventional commit
feat "forms" "add form field component tests"

# Push to remote
gp
```

### Branch workflow:
```bash
# Create and switch to new branch
gs -c feature/new-component

# Make changes and commit
gad
gcm "implement new component"

# Push and set upstream
gp -u origin feature/new-component
```

### View history:
```bash
# Pretty log view
gl

# Last 5 commits
gl -5
```

## Conventional Commits Format

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactoring
- **docs**: Documentation changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **style**: Code style changes (formatting, etc.)
- **perf**: Performance improvements

### Examples:
```bash
feat(auth): add OAuth2 login
fix(ui): resolve button alignment issue
refactor(api): simplify error handling
docs(readme): update testing instructions
test(forms): add input validation tests
```

## Tips

1. **Use short status**: `gst` gives you a clean, concise view
2. **Stage incrementally**: Use `ga file.ts` instead of `gad` for better commit control
3. **Write clear commit messages**: Use conventional commits for consistency
4. **Review before pushing**: Always check `gl` before `gp`

---

**Happy committing!** 🚀
