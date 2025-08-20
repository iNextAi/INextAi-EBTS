import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

const PortfolioPage = () => {
  const portfolioData = [
    { time: 0, value: 80000 },
    { time: 1, value: 85000 },
    { time: 2, value: 82000 },
    { time: 3, value: 88000 },
    { time: 4, value: 92000 },
    { time: 5, value: 89000 },
    { time: 6, value: 95000 },
    { time: 7, value: 98000 },
    { time: 8, value: 96000 },
    { time: 9, value: 100000 },
  ];

  const assets = [
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "0.14",
      value: "$245",
      change: "+100%",
      isPositive: true,
      color: "bg-blue-500",
    },
    {
      name: "Bitcoin",
      symbol: "BTC", 
      amount: "0.14",
      value: "$245",
      change: "+100%",
      isPositive: true,
      color: "bg-orange-500",
    },
    {
      name: "USDT",
      symbol: "USDT",
      amount: "0.14",
      value: "$245", 
      change: "+100%",
      isPositive: true,
      color: "bg-green-500",
    }
  ];

  const myAssets = [
    { symbol: "BTC", action: "Sell", value: "$245", color: "bg-orange-500" },
    { symbol: "ETH", action: "Buy", value: "$245", color: "bg-blue-500" },
    { symbol: "USDT", action: "Sell", value: "$245", color: "bg-green-500" },
    { symbol: "SOL", action: "Buy", value: "$245", color: "bg-purple-500" },
    { symbol: "BTC", action: "Buy", value: "$245", color: "bg-orange-500" },
  ];

  const marketData = [
    { symbol: "ETH", name: "Ethereum", price: "$25", change: "+0.25%", isPositive: true, color: "bg-blue-500" },
    { symbol: "BTC", name: "Bitcoin", price: "$25", change: "+0.25%", isPositive: true, color: "bg-orange-500" },
    { symbol: "SOL", name: "Solana", price: "$25", change: "-0.25%", isPositive: false, color: "bg-purple-500" },
    { symbol: "USDT", name: "USDT", price: "$25", change: "-0.25%", isPositive: false, color: "bg-green-500" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Portfolio Assets Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.map((asset, index) => (
            <Card key={index} className="bg-card border border-border relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${asset.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{asset.symbol.slice(0, 1)}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{asset.name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3">
                  <div className="text-lg font-bold text-foreground">{asset.amount} {asset.symbol}</div>
                  <div className="text-sm text-muted-foreground">{asset.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">{asset.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Growth Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">Growth</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">
                    View report
                  </Button>
                </div>
                <div className="flex gap-4 mt-4">
                  {["12 months", "3 months", "30 days", "7 days", "24 hours"].map((period, index) => (
                    <Button
                      key={period}
                      variant={index === 0 ? "default" : "ghost"}
                      size="sm"
                      className="text-xs"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <YAxis hide />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Balance */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div>
                  <div className="text-sm opacity-90 mb-1">Total balance</div>
                  <div className="text-2xl font-bold">$ 100,000.00</div>
                </div>
                <div className="mt-4">
                  <div className="text-xs opacity-75">Guang Kiet</div>
                  <div className="text-xs opacity-75 mt-1">0x999000200034mmllxs_919020</div>
                </div>
              </CardContent>
            </Card>

            {/* My Assets */}
            <Card className="bg-card border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">My Assets</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">
                    Today
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${asset.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{asset.symbol.slice(0, 1)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{asset.symbol}</div>
                          <div className="text-xs text-muted-foreground">{asset.action}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-foreground">{asset.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Markets */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Markets</CardTitle>
              <Button variant="outline" size="sm" className="text-xs">
                See All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <div>Coin</div>
                <div>Coin Price</div>
                <div>24h Change</div>
                <div>Trade</div>
              </div>
              {marketData.map((coin, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 ${coin.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{coin.symbol.slice(0, 1)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{coin.symbol}</div>
                      <div className="text-xs text-muted-foreground">{coin.name}</div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground">{coin.price}</div>
                  <div className={`text-sm ${coin.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs w-fit">
                    Trade
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;