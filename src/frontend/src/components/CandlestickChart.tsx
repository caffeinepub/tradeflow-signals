import { useMemo } from "react";

interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
}

interface CandlestickChartProps {
  data: OHLC[];
  width?: number;
  height?: number;
}

export function generateCandleData(startPrice = 1.08, count = 40): OHLC[] {
  const candles: OHLC[] = [];
  let price = startPrice;
  const baseTime = new Date("2026-04-05T08:00:00Z");

  for (let i = 0; i < count; i++) {
    const open = price;
    const move = (Math.random() - 0.485) * 0.003;
    const close = Math.round((open + move) * 100000) / 100000;
    const highExtra = Math.random() * 0.0015;
    const lowExtra = Math.random() * 0.0015;
    const high =
      Math.round((Math.max(open, close) + highExtra) * 100000) / 100000;
    const low =
      Math.round((Math.min(open, close) - lowExtra) * 100000) / 100000;

    const t = new Date(baseTime.getTime() + i * 15 * 60 * 1000);
    const timeStr = t.toISOString().slice(11, 16);

    candles.push({ open, high, low, close, time: timeStr });
    price = close;
  }

  return candles;
}

export function CandlestickChart({
  data,
  width = 800,
  height = 320,
}: CandlestickChartProps) {
  const { candles, priceMin, priceMax, priceLabels } = useMemo(() => {
    if (!data.length)
      return {
        candles: [],
        priceMin: 0,
        priceMax: 1,
        priceLabels: [],
      };

    const allPrices = data.flatMap((d) => [d.high, d.low]);
    const rawMin = Math.min(...allPrices);
    const rawMax = Math.max(...allPrices);
    const pad = (rawMax - rawMin) * 0.12;
    const pMin = rawMin - pad;
    const pMax = rawMax + pad;

    const steps = 5;
    const stepSize = (pMax - pMin) / steps;
    const labels = Array.from({ length: steps + 1 }, (_, i) => {
      const val = pMin + i * stepSize;
      return val.toFixed(5);
    }).reverse();

    return {
      candles: data,
      priceMin: pMin,
      priceMax: pMax,
      priceLabels: labels,
    };
  }, [data]);

  const padding = { top: 16, right: 64, bottom: 32, left: 8 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const candleW = Math.max(2, (chartW / candles.length) * 0.6);
  const candleSpacing = chartW / candles.length;

  function yPos(price: number) {
    return (
      padding.top + chartH * (1 - (price - priceMin) / (priceMax - priceMin))
    );
  }

  function xPos(index: number) {
    return padding.left + index * candleSpacing + candleSpacing / 2;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      className="block"
      role="img"
      aria-label="EUR/USD Candlestick Chart"
    >
      <title>EUR/USD Candlestick Chart</title>
      {/* Grid lines */}
      {priceLabels.map((label, i) => {
        const y = padding.top + (chartH / (priceLabels.length - 1)) * i;
        return (
          <g key={label}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="#263247"
              strokeWidth="0.5"
              strokeDasharray="3,4"
            />
            <text
              x={width - padding.right + 6}
              y={y + 4}
              fontSize="9"
              fill="#6E7F98"
              fontFamily="JetBrains Mono, monospace"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Candles */}
      {candles.map((c, i) => {
        const x = xPos(i);
        const isBull = c.close >= c.open;
        const color = isBull ? "#2FCB73" : "#E05B5B";
        const bodyTop = yPos(Math.max(c.open, c.close));
        const bodyBottom = yPos(Math.min(c.open, c.close));
        const bodyH = Math.max(1, bodyBottom - bodyTop);
        const candleKey = `${c.time}-${i}`;

        return (
          <g key={candleKey}>
            {/* Wick */}
            <line
              x1={x}
              y1={yPos(c.high)}
              x2={x}
              y2={yPos(c.low)}
              stroke={color}
              strokeWidth="1"
            />
            {/* Body */}
            <rect
              x={x - candleW / 2}
              y={bodyTop}
              width={candleW}
              height={bodyH}
              fill={color}
              fillOpacity={isBull ? 0.9 : 0.85}
              rx="0.5"
            />
          </g>
        );
      })}

      {/* Time labels */}
      {candles
        .filter((_, i) => i % 8 === 0)
        .map((c, idx) => {
          const originalIndex = idx * 8;
          const x = xPos(originalIndex);
          return (
            <text
              key={c.time}
              x={x}
              y={height - 4}
              fontSize="9"
              fill="#6E7F98"
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
            >
              {c.time}
            </text>
          );
        })}
    </svg>
  );
}
