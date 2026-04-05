# TradeFlow Signal App

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Multi-screen user flow: Splash → Email Login → Activation Code → Market Select → Chart → Screen Share → AI Analysis → Signal + Percent
- Email login form (email + password fields, no actual email sending)
- Activation code screen with 6-digit code entry (hardcoded valid code: 100000)
- Market Select screen with "Real" account type and a list of currency pairs
- Chart screen with live-style candlestick chart (EUR/USD), OHLC display, timeframe selector
- Screen Share Start button that triggers AI Analysis loading state
- AI Analysis loading screen with animated progress
- Signal result screen showing BUY/SELL signal with confidence percentage
- Navigation guards: users must complete each step in sequence
- Backend: user session state, activation code validation, market selection persistence, signal generation

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: activation code validation endpoint, market selection storage, AI signal generation (deterministic based on market + timestamp)
2. Frontend screens:
   a. SplashScreen - animated logo, auto-advance after 2s
   b. LoginScreen - email + password form, any non-empty credentials pass, navigates to activation
   c. ActivationScreen - 6 individual digit input boxes, validates against code 100000
   d. MarketSelectScreen - list of forex pairs under "Real Accounts" section, selectable rows
   e. ChartScreen - candlestick chart (using SVG or canvas), OHLC data, LIVE badge, timeframe toggle, Share Chart button
   f. AIAnalysisScreen - animated loading state with progress bar
   g. SignalScreen - BUY/SELL indicator, confidence % progress bar, entry/target/stop loss values
3. State management: React context or useState-based routing between screens
4. Styling: dark fintech theme matching design preview
