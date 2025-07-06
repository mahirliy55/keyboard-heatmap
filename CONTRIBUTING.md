# 🤝 Contributing to keyboard-heatmap

We're thrilled that you'd like to contribute to this project! Your help is essential for keeping it great. 🎉

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [How to Contribute](#-how-to-contribute)
- [Development Workflow](#-development-workflow)
- [Pull Request Guidelines](#-pull-request-guidelines)
- [Issue Guidelines](#-issue-guidelines)
- [Coding Standards](#-coding-standards)
- [Testing](#-testing)
- [Documentation](#-documentation)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

**In short: Be kind, be respectful, be collaborative.**

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ 
- **npm** 7+
- **TypeScript** knowledge
- **Git** for version control

### Local Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/keyboard-heatmap.git
   cd keyboard-heatmap
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Commands

```bash
# 🏗️ Build the project
npm run build

# 🔧 Watch mode for development
npm run dev

# 🧪 Run tests
npm test

# 🔍 Run linting
npm run lint

# 🧹 Clean build files
npm run clean
```

## 💡 How to Contribute

### Ways to Contribute

1. **🐛 Bug Reports** - Found a bug? Let us know!
2. **✨ Feature Requests** - Have an idea? Share it!
3. **📖 Documentation** - Help improve our docs
4. **💻 Code** - Submit bug fixes or new features
5. **🌍 Translations** - Help us support more languages
6. **🎨 Design** - Improve UI/UX
7. **📊 Examples** - Add usage examples

### Good First Issues

Look for issues labeled with:
- `good first issue` - Perfect for newcomers
- `help wanted` - We need your help!
- `documentation` - Improve our docs

## 🔄 Development Workflow

### 1. Issue First
- **For bugs**: Create an issue describing the problem
- **For features**: Create an issue or discussion first
- **For docs**: Small fixes can go directly to PR

### 2. Development Process
```bash
# 1. Create feature branch
git checkout -b feature/amazing-feature

# 2. Make your changes
# ... write code ...

# 3. Test your changes
npm test
npm run build

# 4. Commit your changes
git add .
git commit -m "feat: add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Create Pull Request
```

### 3. Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

**Examples:**
```bash
feat: add dark mode support
fix: resolve memory leak in tracker
docs: update API documentation
test: add unit tests for React hook
```

## 📥 Pull Request Guidelines

### Before Submitting

- ✅ **Tests pass**: `npm test`
- ✅ **Build works**: `npm run build`
- ✅ **Code is formatted**: Follow our style guide
- ✅ **Documentation updated**: If you changed APIs
- ✅ **Changelog updated**: Add entry to CHANGELOG.md

### Pull Request Template

```markdown
## 📝 Description
Brief description of changes

## 🔗 Related Issue
Fixes #123

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All tests pass

## 📖 Documentation
- [ ] README updated
- [ ] API docs updated
- [ ] Examples added/updated

## ✅ Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Breaking changes documented
```

### Review Process

1. **Automated checks** run first
2. **Maintainer review** - we'll provide feedback
3. **Address feedback** - make requested changes
4. **Final approval** - ready to merge! 🎉

## 🐛 Issue Guidelines

### Bug Reports

Please include:

```markdown
## 🐛 Bug Description
Clear description of the bug

## 🔄 Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## ✅ Expected Behavior
What should happen

## ❌ Actual Behavior
What actually happens

## 📱 Environment
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Package version: [e.g. 1.0.0]

## 📎 Additional Context
Screenshots, logs, etc.
```

### Feature Requests

Please include:

```markdown
## 💡 Feature Description
Clear description of the feature

## 🎯 Use Case
Why would this be useful?

## 📋 Proposed Solution
How should this work?

## 🔄 Alternatives
Any alternative solutions?

## 📎 Additional Context
Mockups, examples, etc.
```

## 🎨 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good
interface KeyboardOptions {
  ignoreModifierKeys?: boolean;
  caseSensitive?: boolean;
}

// ❌ Avoid
interface options {
  ignore_modifier_keys?: boolean;
  casesensitive?: boolean;
}
```

### Code Style

- **Naming**: Use camelCase for variables, PascalCase for types
- **Comments**: Use JSDoc for public APIs
- **Exports**: Use named exports, avoid default exports
- **Types**: Prefer interfaces over types when possible

### File Structure

```
src/
├── core/           # Core functionality
├── react/          # React integration
├── visualization/  # SVG generation
├── types.ts        # Type definitions
└── index.ts        # Main exports
```

## 🧪 Testing

### Testing Strategy

- **Unit tests**: Test individual functions
- **Integration tests**: Test components working together
- **Browser tests**: Test in real browsers
- **React tests**: Test hooks and components

### Writing Tests

```typescript
// Example test
describe('KeyboardTracker', () => {
  it('should track key presses', () => {
    const tracker = createKeyboardTracker();
    tracker.startTracking();
    
    // Simulate key press
    const event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);
    
    const data = tracker.getHeatmapData();
    expect(data.frequencies['a']).toBe(1);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📖 Documentation

### Documentation Types

1. **API Documentation** - In code comments
2. **User Guide** - README.md
3. **Examples** - In examples/ folder
4. **Contributing** - This file

### Writing Documentation

- **Clear and concise** - Easy to understand
- **Examples included** - Show how to use
- **Up to date** - Keep in sync with code
- **Accessible** - Consider all skill levels

## 🎯 Areas We Need Help

### High Priority
- 🌐 **Multiple keyboard layouts** (AZERTY, QWERTZ)
- 📱 **Mobile optimization**
- ♿ **Accessibility improvements**
- 🎨 **More visualization types**

### Medium Priority
- 🔌 **Framework integrations** (Vue, Angular)
- 📊 **Advanced analytics**
- 🎮 **Gaming features**
- 🌍 **Internationalization**

### Low Priority
- 🌙 **Dark mode**
- 🎵 **Sound effects**
- 📈 **Performance optimizations**
- 🔧 **Developer tools**

## 🏆 Recognition

Contributors are recognized in:
- 📜 **README.md** - All contributors section
- 📋 **CHANGELOG.md** - For each release
- 🎉 **Release notes** - Special thanks
- 🐦 **Social media** - Feature announcements

## 💬 Getting Help

- 💭 **GitHub Discussions** - General questions
- 🐛 **GitHub Issues** - Bug reports and features
- 📧 **Email** - Security issues only
- 💬 **Discord** - Real-time chat (coming soon)

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! ❤️

**Happy coding!** 🎉 