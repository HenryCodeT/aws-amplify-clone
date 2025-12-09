# 1. Enable Git Autocomplete & Prompt (Git Bash/Windows)
if [ -f /usr/share/git/completion/git-completion.bash ]; then
  source /usr/share/git/completion/git-completion.bash
elif [ -f /mingw64/share/git/completion/git-completion.bash ]; then
  source /mingw64/share/git/completion/git-completion.bash
fi

if [ -f /usr/share/git/completion/git-prompt.sh ]; then
  source /usr/share/git/completion/git-prompt.sh
elif [ -f /mingw64/share/git/completion/git-prompt.sh ]; then
  source /mingw64/share/git/completion/git-prompt.sh
fi

# 2. Clean Prompt (with git branch)
GIT_PS1_SHOWDIRTYSTATE=1
GIT_PS1_SHOWUNTRACKEDFILES=1
GIT_PS1_SHOWUPSTREAM="auto"

# Set prompt with proper escaping for Git Bash
PROMPT_COMMAND='__git_ps1 "\n\[\e[92m\]\u\[\e[0m\] \[\e[94m\]\w\[\e[0m\]" "\n→ " " \[\e[33m\](%s)\[\e[0m\]"'

# 3. Minimalist Git Alias (Fast Workflow)
alias g='git'
alias ga='git add'
alias gad='git add .'
alias gc='git commit'
alias gcm='git commit -m'
alias gca='git commit -a -m'
alias gco='git checkout'
alias gs='git switch'
alias gst='git status -sb'
alias gl='git log --oneline --decorate --graph'
alias gpl='git pull'
alias gp='git push'

# 4. Conventional Commits Shortcuts
function feat() {
  git commit -m "feat($1): $2"
}

function fix() {
  git commit -m "fix($1): $2"
}

function refactor() {
  git commit -m "refactor($1): $2"
}

function docs() {
  git commit -m "docs($1): $2"
}

# 5. Quality of Life
alias cls='clear'
alias ll='ls -la'
alias pls='pwd'

