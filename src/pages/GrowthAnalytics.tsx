import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

// Growth metrics data
const growthMetrics = [
  {
    title: "Monthly Active Users",
    value: "45.2K",
    change: 12.5,
    changeLabel: "vs last month",
    icon: Users,
    trend: "up" as const,
    target: "50K",
    color: "hsl(var(--primary))",
  },
  {
    title: "User Acquisition Rate",
    value: "8.7%",
    change: 2.3,
    changeLabel: "vs last month",
    icon: TrendingUp,
    trend: "up" as const,
    target: "10%",
    color: "hsl(var(--success))",
  },
  {
    title: "Revenue Growth",
    value: "$142K",
    change: 18.2,
    changeLabel: "vs last month",
    icon: DollarSign,
    trend: "up" as const,
    target: "$160K",
    color: "hsl(var(--primary))",
  },
  {
    title: "Customer Retention",
    value: "84.3%",
    change: -1.2,
    changeLabel: "vs last month",
    icon: Target,
    trend: "down" as const,
    target: "85%",
    color: "hsl(var(--warning))",
  },
];

// User acquisition data
const userAcquisitionData = [
  { month: "Jan", newUsers: 3200, returningUsers: 15200, totalUsers: 18400 },
  { month: "Feb", newUsers: 3800, returningUsers: 16800, totalUsers: 20600 },
  { month: "Mar", newUsers: 4200, returningUsers: 18200, totalUsers: 22400 },
  { month: "Apr", newUsers: 5100, returningUsers: 19800, totalUsers: 24900 },
  { month: "May", newUsers: 4800, returningUsers: 21200, totalUsers: 26000 },
  { month: "Jun", newUsers: 5500, returningUsers: 22800, totalUsers: 28300 },
  { month: "Jul", newUsers: 6200, returningUsers: 24500, totalUsers: 30700 },
  { month: "Aug", newUsers: 5800, returningUsers: 26200, totalUsers: 32000 },
  { month: "Sep", newUsers: 6500, returningUsers: 27800, totalUsers: 34300 },
  { month: "Oct", newUsers: 7200, returningUsers: 29500, totalUsers: 36700 },
  { month: "Nov", newUsers: 6800, returningUsers: 31200, totalUsers: 38000 },
  { month: "Dec", newUsers: 7500, returningUsers: 32800, totalUsers: 40300 },
];

// Revenue growth data
const revenueGrowthData = [
  { month: "Jan", revenue: 85000, target: 90000, growth: 0 },
  { month: "Feb", revenue: 92000, target: 95000, growth: 8.2 },
  { month: "Mar", revenue: 98000, target: 100000, growth: 6.5 },
  { month: "Apr", revenue: 105000, target: 110000, growth: 7.1 },
  { month: "May", revenue: 112000, target: 115000, growth: 6.7 },
  { month: "Jun", revenue: 118000, target: 120000, growth: 5.4 },
  { month: "Jul", revenue: 125000, target: 125000, growth: 5.9 },
  { month: "Aug", revenue: 132000, target: 130000, growth: 5.6 },
  { month: "Sep", revenue: 138000, target: 135000, growth: 4.5 },
  { month: "Oct", revenue: 142000, target: 140000, growth: 2.9 },
  { month: "Nov", revenue: 148000, target: 145000, growth: 4.2 },
  { month: "Dec", revenue: 155000, target: 150000, growth: 4.7 },
];

// Acquisition channels data
const acquisitionChannelsData = [
  {
    name: "Organic Search",
    value: 35,
    users: 15750,
    color: "hsl(var(--primary))",
  },
  { name: "Paid Ads", value: 25, users: 11250, color: "hsl(var(--success))" },
  { name: "Social Media", value: 20, users: 9000, color: "hsl(var(--accent))" },
  { name: "Referrals", value: 12, users: 5400, color: "hsl(var(--warning))" },
  { name: "Direct", value: 8, users: 3600, color: "hsl(var(--muted))" },
];

// Growth insights
const growthInsights = [
  {
    type: "positive",
    title: "Strong User Acquisition",
    description:
      "New user acquisition has increased by 18% this quarter, exceeding our target of 15%.",
    impact: "high",
    action:
      "Continue current marketing strategies and consider scaling successful channels.",
  },
  {
    type: "warning",
    title: "Retention Needs Attention",
    description:
      "Customer retention rate has declined to 84.3%, below our 85% target.",
    impact: "medium",
    action: "Implement retention campaigns and improve onboarding experience.",
  },
  {
    type: "info",
    title: "Revenue Growth Strong",
    description:
      "Monthly recurring revenue growth is at 18.2%, significantly above industry average.",
    impact: "high",
    action: "Monitor pricing strategy and consider expansion opportunities.",
  },
  {
    type: "positive",
    title: "Organic Traffic Growing",
    description:
      "Organic search traffic has increased by 25% month-over-month.",
    impact: "medium",
    action: "Continue SEO optimization and content marketing efforts.",
  },
];

const chartConfig = {
  newUsers: {
    label: "New Users",
    color: "hsl(var(--primary))",
  },
  returningUsers: {
    label: "Returning Users",
    color: "hsl(var(--success))",
  },
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--accent))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--muted))",
  },
};

const GrowthAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("12M");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "info":
        return Lightbulb;
      default:
        return Activity;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-success";
      case "warning":
        return "text-warning";
      case "info":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Growth Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into user acquisition, retention, and
              revenue growth
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Time Period Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Analysis Period:</span>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7D">Last 7 Days</SelectItem>
                    <SelectItem value="30D">Last 30 Days</SelectItem>
                    <SelectItem value="3M">Last 3 Months</SelectItem>
                    <SelectItem value="12M">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Data Updated
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {growthMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeLabel={metric.changeLabel}
              icon={metric.icon}
              trend={metric.trend}
              target={metric.target}
            />
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="acquisition"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Acquisition
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    User Growth Trend
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">New Users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span className="text-muted-foreground">
                          Returning Users
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <AreaChart data={userAcquisitionData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="newUsers"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="returningUsers"
                        stackId="1"
                        stroke="hsl(var(--success))"
                        fill="hsl(var(--success))"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Acquisition Channels */}
              <Card>
                <CardHeader>
                  <CardTitle>Acquisition Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {acquisitionChannelsData.map((channel, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          />
                          <span className="font-medium">{channel.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {channel.users.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {channel.value}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Acquisition Tab */}
          <TabsContent value="acquisition" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* User Acquisition Chart */}
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Acquisition Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-96">
                      <RechartsLineChart data={userAcquisitionData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="month"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="newUsers"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{
                            fill: "hsl(var(--primary))",
                            strokeWidth: 2,
                            r: 4,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalUsers"
                          stroke="hsl(var(--success))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{
                            fill: "hsl(var(--success))",
                            strokeWidth: 2,
                            r: 3,
                          }}
                        />
                      </RechartsLineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Acquisition Metrics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Key Acquisition Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Conversion Rate
                        </span>
                        <span className="font-medium">3.2%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "32%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Cost per Acquisition
                        </span>
                        <span className="font-medium">$24.50</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <ArrowDownRight className="w-4 h-4 text-success" />
                        <span className="text-success">-8.2%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Lifetime Value
                        </span>
                        <span className="font-medium">$187.30</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <ArrowUpRight className="w-4 h-4 text-success" />
                        <span className="text-success">+12.4%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Top Acquisition Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {acquisitionChannelsData
                        .slice(0, 3)
                        .map((channel, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{channel.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${channel.value * 3}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {channel.value}%
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <RechartsBarChart data={revenueGrowthData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-primary">
                                Revenue: ${payload[0].value?.toLocaleString()}
                              </p>
                              <p className="text-muted-foreground">
                                Target: ${payload[1].value?.toLocaleString()}
                              </p>
                              <p className="text-success">
                                Growth: {payload[2].value}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="hsl(var(--primary))"
                      name="Revenue"
                    />
                    <Bar
                      dataKey="target"
                      fill="hsl(var(--muted))"
                      name="Target"
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {growthInsights.map((insight, index) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${getInsightColor(insight.type)}`}
                        />
                        {insight.title}
                        <Badge
                          variant={
                            insight.impact === "high" ? "default" : "secondary"
                          }
                          className="ml-auto"
                        >
                          {insight.impact} impact
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {insight.description}
                      </p>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">
                          Recommended Action:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {insight.action}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GrowthAnalytics;
