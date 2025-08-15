import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AdvancedTradingChart } from "@/components/trading/AdvancedTradingChart";
import { BuySellPanel } from "@/components/trading/BuySellPanel";
import { EmotionTracker } from "@/components/trading/EmotionTracker";
import { TradeFeedbackPanel } from "@/components/trading/TradeFeedbackPanel";
import { PerformanceSummary } from "@/components/trading/PerformanceSummary";
import { AssetSelector } from "@/components/trading/AssetSelector";
import { TradeHistory } from "@/components/trading/TradeHistory";

/** -----------------------------------------------------------
 *  Trading Simulator (Futuristic, Glassy, Responsive)
 *  - Non-sticky top "command dock" (replaces basic bar)
 *  - Neon/glass styling using your existing utilities
 *  - Live price line + multi-asset ticker (BTC/ETH/SOL/ICP)
 *  - Back button fixed to go to /dashboard
 *  - XL: 2/3 chart + 1/3 controls; Mobile: stacked
 * ---------------------------------------------------------- */

type TickerMap = Record<string, number>;

const TICKER_SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "ICPUSDT"];

const TradingSimulator = () => {
  const navigate = useNavigate();

  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [simulationMode, setSimulationMode] = useState<"live" | "paper">("live");
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [livePrice, setLivePrice] = useState<number | null>(null);

  // global ticker prices for the marquee
  const [tickerPrices, setTickerPrices] = useState<TickerMap>({});

  // 24h change for the selected asset (for the header chip)
  const [change24h, setChange24h] = useState<number | null>(null);

  /** Fetch selected asset live price (+ 24h change) */
  useEffect(() => {
    const pair = `${selectedAsset}USDT`.toUpperCase();

    const fetchSelected = async () => {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`
        );
        setLivePrice(parseFloat(res.data.lastPrice));
        setChange24h(parseFloat(res.data.priceChangePercent));
      } catch (e) {
        console.error("Error fetching selected asset 24h", e);
      }
    };

    fetchSelected();
    const id = setInterval(fetchSelected, 10_000);
    return () => clearInterval(id);
  }, [selectedAsset]);

  /** Fetch multi-asset ticker prices (for the marquee) */
  useEffect(() => {
    const fetchTicker = async () => {
      try {
        // Binance supports ?symbols=[...] as JSON; safer to request individually
        const results = await Promise.all(
          TICKER_SYMBOLS.map(async (s) => {
            const r = await axios.get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${s}`
            );
            return [s, parseFloat(r.data.price)] as const;
          })
        );
        const map: TickerMap = {};
        results.forEach(([s, p]) => (map[s] = p));
        setTickerPrices(map);
      } catch (e) {
        console.error("Error fetching ticker prices", e);
      }
    };

    fetchTicker();
    const id = setInterval(fetchTicker, 10_000);
    return () => clearInterval(id);
  }, []);

  /** header change badge info */
  const isUp = (change24h ?? 0) >= 0;

  /** Build marquee items (duplicates for seamless loop) */
  const marqueeItems = useMemo(() => {
    const list = TICKER_SYMBOLS.map((s) => ({
      sym: s.replace("USDT", "/USDT"),
      price: tickerPrices[s],
    }));
    // duplicate once for continuous loop
    return [...list, ...list];
  }, [tickerPrices]);

  /** framer controls for slow marquee drift */
  const marqueeControls = useAnimationControls();
  useEffect(() => {
    // Animate leftward forever
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  }, [marqueeControls]);

  return (
    <div className="min-h-screen bg-background">
      {/* ======= COMMAND DOCK (non-sticky) ======= */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-6">
          <div
            className="
              relative rounded-2xl border border-border/60 bg-card/50
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(99,102,241,0.12)]
              overflow-hidden
            "
          >
            {/* glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/10" />

            {/* top row: back + titles + mode */}
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="hover:bg-primary/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>

                <div className="hidden md:block h-6 w-px bg-border/60" />

                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    Trading Simulator
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Practice executions, track emotions, and review performance.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* mode badge (paper/live) */}
                <span
                  className={`
                    inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium
                    ${simulationMode === "live"
                      ? "bg-primary/15 text-primary ring-1 ring-primary/20"
                      : "bg-muted/40 text-foreground ring-1 ring-border/60"}
                  `}
                >
                  {simulationMode === "live" ? "Live Mode" : "Paper Mode"}
                </span>
                {/* 24h change pill */}
                {change24h !== null && (
                  <span
                    className={`
                      inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium
                      ${isUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}
                    `}
                  >
                    {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {isUp ? "+" : ""}
                    {change24h.toFixed(2)}%
                    <span className="text-muted-foreground">/ 24h</span>
                  </span>
                )}
              </div>
            </div>

            {/* row 2: asset selector + live price */}
            <div className="flex flex-col gap-3 px-4 pb-4 md:flex-row md:items-center md:justify-between">
              <AssetSelector
                selectedAsset={selectedAsset}
                onAssetChange={(a) => setSelectedAsset(a)}
                simulationMode={simulationMode}
                onModeChange={(m) => setSimulationMode(m as "live" | "paper")}
              />

              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{selectedAsset}/USDT</span>{" "}
                {livePrice !== null ? (
                  <span>
                    ${livePrice.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </span>
                ) : (
                  <span className="opacity-70">Loading…</span>
                )}
              </div>
            </div>

            {/* TICKER: subtle neon glass track */}
            <div className="relative h-10 overflow-hidden border-t border-border/60 bg-background/40">
              <motion.div
                className="absolute left-0 top-0 flex h-10 w-[200%] items-center"
                animate={marqueeControls}
              >
                {marqueeItems.map((item, idx) => (
                  <div
                    key={`${item.sym}-${idx}`}
                    className="
                      mx-3 flex items-center gap-2 rounded-md
                      border border-border/50 bg-card/60 px-3 py-1
                      text-xs font-mono shadow-[0_0_14px_rgba(99,102,241,0.10)]
                    "
                  >
                    <span className="text-muted-foreground">{item.sym}</span>
                    <span className="text-foreground">
                      {item.price ? `$${item.price.toLocaleString(undefined, { maximumFractionDigits: 5 })}` : "—"}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= MAIN GRID ======= */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT: Chart + History + Summary */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <AdvancedTradingChart asset={selectedAsset} mode={simulationMode} />
            </Card>

            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <TradeHistory />
            </Card>
            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <TradeFeedbackPanel currentEmotion={currentEmotion} />
            </Card>

            <div className="xl:hidden">
              <Card className="glass-card rounded-2xl p-3 md:p-4">
                <PerformanceSummary />
              </Card>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <BuySellPanel
                asset={selectedAsset}
                onTradeExecuted={(emotion) => setCurrentEmotion(emotion)}
              />
            </Card>

            <Card className="glass-card rounded-2xl p-3 md:p-4">
              <EmotionTracker
                currentEmotion={currentEmotion}
                onEmotionChange={setCurrentEmotion}
              />
            </Card>

            <div className="hidden xl:block">
              <Card className="glass-card rounded-2xl p-3 md:p-4">
                <PerformanceSummary />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulator;
