# Development Guidelines for life-mbo

## Commands
- **Development**: `yarn dev`
- **Build**: `yarn build`
- **Start (prod)**: `yarn start`
- **Lint**: `yarn lint`
- **Type check**: `yarn tsc`
- **Test (all)**: `yarn test`
- **Test (watch)**: `yarn test:watch`
- **Test (single)**: `yarn test path/to/file.test.tsx`
- **DB Reset**: `./scripts/db-reset.sh`

## Code Style
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (auth, database)
- **File naming**: kebab-case.tsx for components, PascalCase for component names
- **Types**: TypeScript with strict mode, store types in src/types/
- **Validation**: Zod for form/data validation
- **Imports**: Use aliases (@/components, @/lib, etc.) defined in tsconfig.json
- **Auth**: Server-side auth actions in lib/actions/auth.ts
- **Components**: Group by feature in components/ directory
- **Forms**: Use React Hook Form + Zod for validation
- **Error handling**: Use try/catch with specific error messages