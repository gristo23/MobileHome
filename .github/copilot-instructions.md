# GitHub Copilot Instructions — mobile_home_v3

Purpose: give AI coding agents the minimal, concrete context they need to be productive in this React Native + Expo TypeScript app.

1) Big picture
- Expo-managed React Native app (Expo SDK ~54) with a prebuilt Android folder for native tweaks. Main entry: `index.ts` -> `App.tsx`.
- UI split: `navigation/` (Drawer navigator), `screens/` (page components), `components/` (reusable UI), `ui/` (small UI primitives).
- App-level state: `context/ThemeContext.tsx` and `context/AuthContext.tsx`. `AuthProvider` wraps `App` and provides `useAuth()` hook.

2) Important files & types
- `App.tsx` — root component; wraps `AuthProvider` and `ThemeProvider`, and mounts `DrawerStack`.
- `navigation/DrawerStack.tsx` — defines drawer routes and `DrawerParamList` TypeScript type. Route names are Estonian strings (e.g. `Avaleht`, `Otsing`, `Kuulutused`, `Sisselogimine`) — use these exact names when calling `navigation.navigate(...)`.
- `utils/api.ts` — `fetchVans()` is the single demo data source used by screens. Note: it deliberately limits results (`?_limit=10`) because large images can crash Android. Also contains `safeUrl()` helper to coerce to HTTPS and provide fallbacks.
- `types/van.ts` — canonical `van` type used across the codebase.

3) How to run & build (concrete commands)
- Start Metro (Expo): `npm run start` (alias for `expo start`).
- Run on Android (requires Android SDK/emulator or device): `npm run android` (runs `expo run:android`).
- Run on iOS (mac only): `npm run ios` (runs `expo run:ios`).
- Web preview: `npm run web`.

Windows notes: execute above commands from the project root (`c:\KOOL\Mobiil\mobile_home_v3`) in `cmd.exe` or a compatible shell. Ensure Android SDK + `adb` in PATH for `npm run android`.

4) Project conventions & patterns (concrete, discoverable rules)
- Files are PascalCase for components/screens (`HomeScreen.tsx`, `Header.tsx`).
- Navigation uses string route names in Estonian — update `DrawerParamList` when adding routes and keep the names identical to the `Drawer.Screen` `name` prop.
- Context providers live in `context/` and expose `useX` hooks (`useAuth`, `useTheme`). Wrap order matters: `AuthProvider` sits above `ThemeProvider` in `App.tsx`.
- Data helpers live in `utils/`. `fetchVans()` returns an array of `van` (see `types/van.ts`). Use the `thumbnail` field for list views and `image` for detail views.
- Styling: use React Native `StyleSheet` and inline styles; `components/Header.tsx` is the canonical header implementation used by navigation.

5) Integration points and gotchas
- Android native folder exists (`android/`) — changes here are native code and may require running `expo prebuild` or using bare workflow; prefer JS-level changes unless native behavior is required.
- Images: large remote images can crash Android memory; `utils/api.ts` intentionally limits and uses `safeUrl()` to prefer HTTPS plus smaller thumbnails.
- Routing: many components call `navigation.navigate('Avaleht')` etc. Use the exact route names (Estonian) and keep `DrawerParamList` in sync to preserve TypeScript safety.

6) Examples for common edits
- Add a new screen:
  - Create `screens/MyNewScreen.tsx` (PascalCase).
  - Add `MyNewScreen` import and `Drawer.Screen name="MinuUus" component={MyNewScreen}` to `navigation/DrawerStack.tsx`.
  - Extend `DrawerParamList` with `"MinuUus": undefined` (or proper params).

- Fetch and display vans:
  - Import `fetchVans` from `utils/api.ts` and `van` from `types/van.ts`.
  - Use `thumbnail` for lists and `image` for the detail screen.

7) What to preserve when editing
- Preserve Estonian UI strings — they are visible labels and route names used across code.
- Keep `DrawerParamList` types and `Drawer.Screen` names synchronized.

8) Missing or non-discoverable items (ask the repo owner)
- CI configuration, code style rules, or PR process are not present; ask whether to add linters or formatters.
- Any EAS build or deployment steps (this repo uses Expo, but an EAS/E2E setup wasn't found).

If anything above is unclear or you want adjustments (e.g., add examples for testing or a developer checklist), tell me which section to expand.
