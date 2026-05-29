# AI Agent Instructions for Sales Brain AI Workspace

## Project Overview

This repository contains "Sales Brain AI" - a full-stack JavaScript application for AI-powered Telegram commerce. It enables Myanmar businesses to sell products via Telegram with AI-assisted customer service.

### Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, Motion (animations), Lucide React (icons)
- **Backend:** Express.js (embedded in `server.ts`) with Vite SSR
- **Database:** File-based JSON state (`sales_brain_state.json`), Supabase client ready for future migration
- **AI:** Google Gemini API (`@google/genai`)

### Key Files

| File | Purpose |
|------|---------|
| `server.ts` | Express server, state management, API endpoints |
| `src/App.tsx` | Main React application |
| `src/types.ts` | TypeScript interfaces (Product, Order, Session, etc.) |
| `src/components/*.tsx` | UI components (Onboarding, SmartMarketing, TelegramSimulator, CustomChart) |
| `sales_brain_state.json` | Persistent state file |

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development (Express + Vite) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | TypeScript type checking |

---

## Terminal Constraints (CRITICAL)

### PowerShell Environment
- **Primary shell:** Windows PowerShell
- **NO Bash syntax:** Do not use `cat << 'EOF'`, heredocs, or Unix utilities in terminal commands
- **File manipulation:** Use agent file I/O tools (`write`, `edit`) instead of shell pipes for complex content

### Unicode Protection
- **NEVER inject non-ASCII text in PowerShell commands.** Burmese (Myanmar) text in shell commands will corrupt to `?????`.
- **Always use file I/O tools** for writing or reading content with Burmese/Unicode characters.
- **Verify encoding:** Use `JSON.parse()` to verify JSON files contain correct Unicode.

### Example of Correct Approach

```powershell
# ❌ Wrong - Unicode corruption
node -e "console.log('မြန်မာ')"

# ✅ Correct - Use file tools
# Write the content to a file, then read/process it
```

---

## Localization & i18n Guardrails

### Translation Function Scope
- **NEVER call `t()` inside helper functions** declared outside React components. Doing so resolves to `undefined` and causes white screens.
- **Always pass `t` explicitly** as a function argument to utility functions.

### Key Conventions
- Use the **exact English string** as the translation key (e.g., `t("Client Customer")`)
- **No dot-notation:** Use `t("Add to Cart")` not `t("cart.add")`
- **No snake_case keys:** Use `t("Add to Cart")` not `t("add_to_cart")`

### Regex Safety
- When replacing/renaming `t()` calls, use **word boundaries** (`\bt\b`) to avoid corrupting unrelated properties like `draft.title`

---

## Architecture Patterns

### State Management
```typescript
// state object pattern
interface SystemState {
  config: ShopConfig;
  products: Product[];
  deliveryZones: DeliveryZone[];
  orders: Order[];
  sessions: { [id: string]: TelegramSession };
}

// Always persist after mutations
state.products.push(newProduct);
saveState(); // CRITICAL - persists to sales_brain_state.json
```

### API Endpoints
- All endpoints return JSON: `Response.json({ data })` or `res.json({ success: true })`
- Wrap file operations in try/catch
- Always validate input before processing

### Error Handling
```typescript
// Always wrap async operations
try {
  const result = await riskyOperation();
  res.json({ success: true, data: result });
} catch (error) {
  console.error('Operation failed:', error);
  res.json({ success: false, error: error.message });
}
```

---

## TypeScript Guidelines

### Type Definitions
- Define all interfaces in `src/types.ts`
- NEVER use `any` type - use `unknown` with proper type guards
- Use proper union types for optional values: `string | null` not `string?`

### Example Interfaces
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in MMK (Myanmar Kyat)
  description: string;
  stock: number;
  image: string;
}

interface Order {
  id: string;
  invoiceId: string;
  customerName: string;
  customerPhone: string;
  customerTelegramId: string;
  township: string;
  deliveryFee: number;
  paymentMethod: 'cod' | 'prepay';
  totalAmount: number;
  status: 'pending' | 'verifying' | 'confirmed' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt: string;
}
```

---

## React Best Practices

### Component Structure
- Keep components in `src/components/`
- Main application in `src/App.tsx`
- Use TypeScript for all components

### Animations
- Use **Motion** (`motion/react`) for animations
- Import: `import { motion } from "motion/react"`

### State Updates
```typescript
// ❌ Wrong - can cause stale closures
useEffect(() => {
  fetchData().then(setData); // setData might be stale
}, []);

// ✅ Correct - include proper dependencies
useEffect(() => {
  fetchData().then(setData);
}, [/* add proper deps */]);
```

---

## AI Integration (Gemini)

### Environment Variables
- Store API keys in `.env` file
- Access via `process.env.GEMINI_API_KEY`
- NEVER hardcode keys in source code

### Usage Pattern
```typescript
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  return response.text;
}
```

### Error Handling
- Always wrap AI calls in try/catch
- Provide fallback responses for production use
- Never expose API errors to users

---

## Common Pitfalls to Avoid

### 1. State Not Persisting
**Problem:** Changes lost after server restart  
**Solution:** Call `saveState()` after every state mutation

### 2. Unicode Corruption
**Problem:** Burmese text shows as `?????`  
**Solution:** Use file tools, not shell commands, for Unicode content

### 3. Missing Type Safety
**Problem:** TypeScript errors  
**Solution:** Use interfaces from `src/types.ts`, not `any`

### 4. API Response Format
**Problem:** Frontend can't parse response  
**Solution:** Always return JSON from API endpoints

### 5. Environment Variables
**Problem:** `process.env.VARIABLE` undefined  
**Solution:** Ensure `dotenv.config()` runs early in `server.ts`

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Onboarding.tsx`, `CustomChart.tsx` |
| Utilities | camelCase | `supabase.ts`, `helpers.ts` |
| Types | PascalCase | `types.ts` |
| Styles | Lowercase | `index.css` |

---

## Dependencies

Key packages in `package.json`:

```json
{
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@supabase/supabase-js": "^2.106.2",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  }
}
```

---

## Next Steps for Development

When working on this codebase:

1. **Run tests:** `npm run lint` before committing
2. **Check state:** Verify `saveState()` is called after mutations
3. **Verify types:** Use TypeScript interfaces, not `any`
4. **Handle errors:** Wrap async operations in try/catch
5. **Unicode safety:** Use file tools for non-ASCII content
6. **Check architecture:** Review `architecture-design/architecture.md` for context
7. **Document lessons:** Add new issues to `lesson-learned.md`

---

*Last Updated: 2025-05-28*
*For project architecture details, see `architecture-design/architecture.md`*
*For decision history, see `decision-log/README.md`*