# pi-coauthor-ext

A Pi extension that automatically adds a `Co-authored-by` trailer to git commits, attributing the AI model used.

## Features

- Detects `git commit` commands with `-m` or `--message` flags
- Automatically appends co-author attribution with model name and provider

## Usage

Install the extension in your Pi extensions directory:

```bash
ln -s ~/pi-extensions/pi-coauthor-ext ~/.pi/agent/extensions/pi-coauthor-ext
```

Then, whenever you make a git commit through Pi, it will automatically add:

```
Co-authored-by: Model Name (provider) <noreply@pi.dev>
```

## Example

```bash
git commit -m "Fix bug"
# Results in commit with:
# Fix bug
#
# Co-authored-by: Claude (anthropic) <noreply@pi.dev>
```