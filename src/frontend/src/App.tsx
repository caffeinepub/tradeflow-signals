import {
  CandlestickChart,
  generateCandleData,
} from "@/components/CandlestickChart";
import { StepIndicator } from "@/components/StepIndicator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  ArrowLeft,
  BarChart2,
  BrainCircuit,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  RefreshCw,
  Share2,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "splash"
  | "login"
  | "activation"
  | "market-select"
  | "chart"
  | "ai-analysis"
  | "signal";

interface MarketPair {
  pair: string;
  price: string;
  change: number;
}

const MARKETS: MarketPair[] = [
  { pair: "EUR/USD", price: "1.08423", change: 0.32 },
  { pair: "GBP/USD", price: "1.26781", change: -0.18 },
  { pair: "USD/JPY", price: "151.842", change: 0.55 },
  { pair: "AUD/USD", price: "0.64512", change: -0.41 },
  { pair: "USD/CAD", price: "1.36204", change: 0.12 },
  { pair: "EUR/GBP", price: "0.85537", change: -0.09 },
];

// ─── Screen wrapper ───────────────────────────────────────────────────────────

function ScreenWrapper({
  children,
  screenKey,
}: { children: React.ReactNode; screenKey: string }) {
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}

// ─── Screen 1: Splash ────────────────────────────────────────────────────────

function SplashScreen() {
  return (
    <ScreenWrapper screenKey="splash">
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center glow-blue">
            <Activity className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            TradeFlow
          </h1>
          <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase">
            Professional Trading Signals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex items-center gap-2 mt-8"
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "120ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "240ms" }}
          />
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 2: Login ─────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (canSubmit) onLogin();
  }

  return (
    <ScreenWrapper screenKey="login">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={1} totalSteps={6} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Activity
                    className="w-4 h-4 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  TradeFlow
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Welcome back, trader
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email-input"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  id="email-input"
                  data-ocid="login.input"
                  type="email"
                  placeholder="trader@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/60 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password-input"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    data-ocid="login.input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/60 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                data-ocid="login.submit_button"
                type="submit"
                disabled={!canSubmit}
                className={[
                  "w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200",
                  canSubmit
                    ? "bg-primary text-primary-foreground hover:opacity-90 glow-blue"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                ].join(" ")}
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-xs text-primary hover:underline transition-all"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 3: Activation Code ───────────────────────────────────────────────

function ActivationScreen({ onActivate }: { onActivate: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const VALID_CODE = "100000";

  const code = digits.join("");
  const isComplete = digits.every((d) => d !== "");

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setError("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newDigits = Array(6).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    const nextEmpty = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[nextEmpty]?.focus();
  }

  function handleVerify() {
    if (code === VALID_CODE) {
      setError("");
      onActivate();
    } else {
      setError("Invalid code. Please try again.");
    }
  }

  return (
    <ScreenWrapper screenKey="activation">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={2} totalSteps={6} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Activation Code
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Enter the 6-digit code to activate your account
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-2 justify-between" onPaste={handlePaste}>
                {digits.map((digit, i) => (
                  <input
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional digit inputs
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    data-ocid="activation.input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={[
                      "w-12 h-14 text-center text-xl font-bold rounded-xl border text-foreground outline-none transition-all",
                      "bg-input focus:border-primary/70 focus:ring-2 focus:ring-primary/25",
                      error ? "border-destructive/70" : "border-border",
                      digit ? "border-primary/50" : "",
                    ].join(" ")}
                  />
                ))}
              </div>

              {error && (
                <motion.p
                  data-ocid="activation.error_state"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="button"
                data-ocid="activation.submit_button"
                onClick={handleVerify}
                disabled={!isComplete}
                className={[
                  "w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200",
                  isComplete
                    ? "bg-primary text-primary-foreground hover:opacity-90 glow-blue"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                ].join(" ")}
              >
                Verify Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 4: Market Select ──────────────────────────────────────────────────

function MarketSelectScreen({
  onSelect,
}: {
  onSelect: (market: MarketPair) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScreenWrapper screenKey="market-select">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={3} totalSteps={6} />
        <div className="flex-1 flex flex-col px-6 pb-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground">
              Select Market
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Choose a forex pair to analyze
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Real Accounts
              </span>
              <div className="h-px flex-1 bg-border" />
              <Badge
                variant="outline"
                className="text-success border-success/40 text-xs"
              >
                LIVE
              </Badge>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            {MARKETS.map((market, idx) => {
              const isSelected = selected === market.pair;
              const isPositive = market.change >= 0;
              return (
                <button
                  type="button"
                  key={market.pair}
                  data-ocid={`market.item.${idx + 1}`}
                  onClick={() => setSelected(market.pair)}
                  className={[
                    "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200",
                    isSelected
                      ? "bg-primary/15 border-primary/50 glow-blue"
                      : "surface hover:border-border/80 hover:bg-card/80",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        isSelected ? "bg-primary/25" : "bg-muted/60",
                      ].join(" ")}
                    >
                      {isPositive ? (
                        <TrendingUp
                          className={`w-4 h-4 ${isSelected ? "text-primary" : "text-success"}`}
                          strokeWidth={2}
                        />
                      ) : (
                        <TrendingDown
                          className={`w-4 h-4 ${isSelected ? "text-primary" : "text-trade-red"}`}
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm text-foreground">
                        {market.pair}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {market.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "text-sm font-semibold",
                        isPositive ? "text-success" : "text-trade-red",
                      ].join(" ")}
                    >
                      {isPositive ? "+" : ""}
                      {market.change.toFixed(2)}%
                    </span>
                    {isSelected && (
                      <Badge className="bg-primary/20 text-primary border-primary/40 text-xs px-2 py-0.5">
                        SELECTED
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              type="button"
              data-ocid="market.primary_button"
              disabled={!selected}
              onClick={() => {
                const m = MARKETS.find((mk) => mk.pair === selected);
                if (m) onSelect(m);
              }}
              className={[
                "w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2",
                selected
                  ? "bg-primary text-primary-foreground hover:opacity-90 glow-blue"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              ].join(" ")}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 5: Chart ─────────────────────────────────────────────────────────

const CANDLE_DATA = generateCandleData(1.08, 40);

function ChartScreen({
  market,
  onAnalyze,
}: {
  market: MarketPair;
  onAnalyze: () => void;
}) {
  const [timeframe, setTimeframe] = useState("15M");
  const [indicators, setIndicators] = useState<string[]>([]);
  const lastCandle = CANDLE_DATA[CANDLE_DATA.length - 1];

  function toggleIndicator(ind: string) {
    setIndicators((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind],
    );
  }

  return (
    <ScreenWrapper screenKey="chart">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={4} totalSteps={6} />

        {/* Top bar */}
        <div className="px-4 pb-2">
          <div className="surface rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="font-bold text-foreground">{market.pair}</span>
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground border-border"
              >
                Real
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-success">LIVE</span>
              </div>
              <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* OHLC row */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "O", value: lastCandle.open.toFixed(5) },
              { label: "H", value: lastCandle.high.toFixed(5) },
              { label: "L", value: lastCandle.low.toFixed(5) },
              { label: "C", value: lastCandle.close.toFixed(5) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="surface-elevated rounded-lg px-3 py-2"
              >
                <div className="text-xs text-muted-foreground mb-0.5">
                  {label}
                </div>
                <div className="text-xs font-mono font-semibold text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeframe tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-1">
            {["1M", "5M", "15M", "1H", "4H"].map((tf) => (
              <button
                type="button"
                key={tf}
                data-ocid="chart.tab"
                onClick={() => setTimeframe(tf)}
                className={[
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  timeframe === tf
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                ].join(" ")}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 flex-1 min-h-0">
          <div
            className="surface rounded-xl overflow-hidden"
            style={{ height: 280 }}
          >
            <CandlestickChart data={CANDLE_DATA} width={720} height={260} />
          </div>
        </div>

        {/* Indicator toggles */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Indicators:</span>
            {["MA", "RSI", "MACD"].map((ind) => (
              <button
                type="button"
                key={ind}
                data-ocid="chart.toggle"
                onClick={() => toggleIndicator(ind)}
                className={[
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
                  indicators.includes(ind)
                    ? "bg-primary/20 text-primary border-primary/40"
                    : "border-border text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-6 pt-2">
          <button
            type="button"
            data-ocid="chart.primary_button"
            onClick={onAnalyze}
            className="w-full rounded-xl font-semibold text-sm bg-success/90 text-white hover:opacity-90 transition-all glow-green flex items-center justify-center gap-2.5 py-3.5"
          >
            <Share2 className="w-4 h-4" />
            Share Chart &amp; Get AI Analysis
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 6: AI Analysis ────────────────────────────────────────────────────

const ANALYSIS_STEPS = [
  "Collecting market data...",
  "Running pattern recognition...",
  "Applying ML models...",
  "Generating signal...",
];

function AIAnalysisScreen({ onComplete }: { onComplete: () => void }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    ANALYSIS_STEPS.forEach((_, i) => {
      const t = setTimeout(
        () => setCompletedSteps((prev) => [...prev, i]),
        (i + 1) * 1000,
      );
      timers.push(t);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 90);

    const doneTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      onComplete();
    }, 4500);

    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <ScreenWrapper screenKey="ai-analysis">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={5} totalSteps={6} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            {/* Spinner */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <svg
                  className="w-24 h-24 animate-spin-ring"
                  viewBox="0 0 96 96"
                  role="img"
                  aria-label="Loading spinner"
                >
                  <title>Loading spinner</title>
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    fill="none"
                    stroke="oklch(var(--border))"
                    strokeWidth="4"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    fill="none"
                    stroke="oklch(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="80 185"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit
                    className="w-9 h-9 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                AI Analysis in Progress
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Analyzing market patterns and generating signal...
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-1.5 bg-muted" />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {ANALYSIS_STEPS.map((step, i) => {
                const isCompleted = completedSteps.includes(i);
                const isActive = !isCompleted && completedSteps.length === i;
                return (
                  <motion.div
                    key={step}
                    data-ocid={`analysis.item.${i + 1}`}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: isCompleted || isActive ? 1 : 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl surface"
                  >
                    <div
                      className={[
                        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        isCompleted
                          ? "bg-success"
                          : isActive
                            ? "bg-primary/30 border border-primary"
                            : "bg-muted",
                      ].join(" ")}
                    >
                      {isCompleted ? (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={2.5}
                        />
                      ) : isActive ? (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                    <span
                      className={[
                        "text-sm font-medium",
                        isCompleted
                          ? "text-success"
                          : isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {step}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── Screen 7: Signal ─────────────────────────────────────────────────────────

function SignalScreen({
  market,
  onNewAnalysis,
  onChangeMarket,
}: {
  market: MarketPair;
  onNewAnalysis: () => void;
  onChangeMarket: () => void;
}) {
  const lastCandle = CANDLE_DATA[CANDLE_DATA.length - 1];
  const isBuy = lastCandle.close > lastCandle.open;
  const entryPrice = lastCandle.close.toFixed(5);
  const confidence = 88;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ScreenWrapper screenKey="signal">
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={6} totalSteps={6} />
        <div className="flex-1 flex flex-col px-6 pb-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">
                {market.pair}
              </h2>
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                15M
              </Badge>
              <Badge className="ml-auto text-xs bg-success/20 text-success border-success/40">
                Signal Ready
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Signal Generated: {dateStr} at {timeStr}
            </p>
          </div>

          {/* Signal box */}
          <motion.div
            data-ocid="signal.card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className={[
              "rounded-2xl border-2 p-6 mb-5 text-center",
              isBuy
                ? "bg-success/10 border-success/50 glow-green"
                : "bg-destructive/10 border-destructive/50 glow-red",
            ].join(" ")}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Trading Signal
            </div>
            <div
              className={[
                "text-5xl font-black tracking-tight mb-1",
                isBuy ? "text-success" : "text-trade-red",
              ].join(" ")}
            >
              {isBuy ? "↗ BUY" : "↘ SELL"}
            </div>
            <div className="text-sm text-muted-foreground">
              {market.pair} · 15M Timeframe
            </div>
          </motion.div>

          {/* Confidence score */}
          <div className="surface rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-foreground">
                Confidence Score
              </span>
              <span className="text-sm font-bold text-success">
                {confidence}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-success rounded-full"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              {
                icon: Target,
                label: "Entry Price",
                value: entryPrice,
                color: "text-foreground",
              },
              {
                icon: TrendingUp,
                label: "Target",
                value: `+${(0.005).toFixed(4)}`,
                color: "text-success",
              },
              {
                icon: Shield,
                label: "Stop Loss",
                value: `-${(0.003).toFixed(4)}`,
                color: "text-trade-red",
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="surface-elevated rounded-xl p-3 text-center"
              >
                <Icon
                  className={`w-4 h-4 mx-auto mb-1.5 ${color}`}
                  strokeWidth={1.5}
                />
                <div className="text-xs text-muted-foreground mb-0.5">
                  {label}
                </div>
                <div className={`text-xs font-bold font-mono ${color}`}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Info card */}
          <div className="surface rounded-xl p-4 mb-5 flex items-start gap-3">
            <Activity
              className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <div className="text-xs font-semibold text-foreground mb-0.5">
                AI Analysis Summary
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isBuy
                  ? "Bullish momentum detected with strong buy-side pressure. RSI oversold recovery pattern identified with positive divergence on the 15M chart."
                  : "Bearish continuation pattern identified. Price rejection at key resistance with declining volume confirms downward momentum on the 15M timeframe."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 mt-auto">
            <button
              type="button"
              data-ocid="signal.primary_button"
              onClick={onNewAnalysis}
              className="w-full h-12 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all glow-blue flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
            <button
              type="button"
              data-ocid="signal.secondary_button"
              onClick={onChangeMarket}
              className="w-full h-12 rounded-xl font-semibold text-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Market
            </button>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedMarket, setSelectedMarket] = useState<MarketPair>(MARKETS[0]);
  // Ref for stable callback reference during AI analysis
  const screenRef = useRef(screen);
  screenRef.current = screen;

  // Splash auto-advance
  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("login"), 2500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleAnalysisComplete = useCallback(() => {
    setScreen("signal");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === "splash" && <SplashScreen key="splash" />}

        {screen === "login" && (
          <LoginScreen key="login" onLogin={() => setScreen("activation")} />
        )}

        {screen === "activation" && (
          <ActivationScreen
            key="activation"
            onActivate={() => setScreen("market-select")}
          />
        )}

        {screen === "market-select" && (
          <MarketSelectScreen
            key="market-select"
            onSelect={(market) => {
              setSelectedMarket(market);
              setScreen("chart");
            }}
          />
        )}

        {screen === "chart" && (
          <ChartScreen
            key="chart"
            market={selectedMarket}
            onAnalyze={() => setScreen("ai-analysis")}
          />
        )}

        {screen === "ai-analysis" && (
          <AIAnalysisScreen
            key="ai-analysis"
            onComplete={handleAnalysisComplete}
          />
        )}

        {screen === "signal" && (
          <SignalScreen
            key="signal"
            market={selectedMarket}
            onNewAnalysis={() => setScreen("chart")}
            onChangeMarket={() => setScreen("market-select")}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      {screen !== "splash" && (
        <footer className="text-center py-3 text-xs text-muted-foreground/50">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </footer>
      )}
    </div>
  );
}
