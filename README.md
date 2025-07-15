# create-custom-context

Create custom context for React applications.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Format and fix code
pnpm format

# Check code quality
pnpm check

# Build the library
pnpm build
```

## 📦 Scripts

- `pnpm dev` - Start development mode with watch
- `pnpm test` - Run tests (add `--watch` for watch mode)
- `pnpm format` - Format code and fix issues with Biome
- `pnpm lint` - Check for unused code and dependencies with Knip
- `pnpm check` - Run all quality checks (types, lint, format)
- `pnpm build` - Build the library (with quality checks)
- `pnpm prepublishOnly` - Runs automatically before publishing

## 🔧 Tools

- **TypeScript** - Type checking
- **Biome** - Code formatting and linting (with ultracite preset)
- **tsup** - Build tool
- **Vitest** - Testing framework
- **Knip** - Dead code elimination

## 📁 Project Structure

```
create-custom-context/
├── src/
│   └── index.ts          # Main entry point
├── dist/                 # Build output
├── biome.jsonc           # Biome configuration
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
├── vitest.config.ts      # Test configuration
├── knip.json             # Dead code detection configuration
└── package.json          # Package configuration
```

## 🛠️ Development Workflow

1. **Write code** in `src/`
2. **Test** with `pnpm test` (or `pnpm test --watch`)
3. **Format & fix** with `pnpm format`
4. **Check unused code** with `pnpm lint` (optional)
5. **Check quality** with `pnpm check`
6. **Build** with `pnpm build`
7. **Publish** with `pnpm publish`

## 📄 License

MIT 