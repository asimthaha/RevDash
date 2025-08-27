import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Users,
  Target,
  Calendar,
  TrendingUp,
  RefreshCw,
  Clock,
  BarChart3,
  PieChart,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
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
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// Cohort metrics
const cohortMetrics = [
  {
    title: "Average Retention Rate",
    value: "74.2%",
    change: 2.1,
    changeLabel: "vs last month",
    icon: Target,
    trend: "up" as const,
    target: "75%",
    color: "hsl(var(--primary))",
  },
  {
    title: "Active Cohorts",
    value: "24",
    change: 8.3,
    changeLabel: "new this quarter",
    icon: Users,
    trend: "up" as const,
    target: "30",
    color: "hsl(var(--success))",
  },
  {
    title: "Cohort LTV",
    value: "$1,247",
    change: 12.5,
    changeLabel: "vs last month",
    icon: TrendingUp,
    trend: "up" as const,
    target: "$1,300",
    color: "hsl(var(--primary))",
  },
  {
    title: "Churn Rate",
    value: "3.8%",
    change: -0.5,
    changeLabel: "vs last month",
    icon: BarChart3,
    trend: "down" as const,
    target: "<4%",
    color: "hsl(var(--warning))",
  },
];

// Cohort retention data - represents users acquired in each month and their retention over time
const cohortRetentionData = [
  {
    cohort: "2024-01",
    month0: 100,
    month1: 85,
    month2: 72,
    month3: 68,
    month4: 65,
    month5: 62,
    month6: 60,
    size: 2500,
    acquisitionChannel: "Organic Search",
  },
  {
    cohort: "2024-02",
    month0: 100,
    month1: 82,
    month2: 75,
    month3: 71,
    month4: 68,
    month5: 65,
    month6: 63,
    size: 2800,
    acquisitionChannel: "Paid Ads",
  },
  {
    cohort: "2024-03",
    month0: 100,
    month1: 88,
    month2: 78,
    month3: 74,
    month4: 71,
    month5: 68,
    month6: 66,
    size: 3200,
    acquisitionChannel: "Social Media",
  },
  {
    cohort: "2024-04",
    month0: 100,
    month1: 85,
    month2: 76,
    month3: 72,
    month4: 69,
    month5: 66,
    month6: 64,
    size: 2900,
    acquisitionChannel: "Referrals",
  },
  {
    cohort: "2024-05",
    month0: 100,
    month1: 87,
    month2: 79,
    month3: 75,
    month4: 72,
    month5: 69,
    month6: 67,
    size: 3100,
    acquisitionChannel: "Direct",
  },
  {
    cohort: "2024-06",
    month0: 100,
    month1: 84,
    month2: 74,
    month3: 70,
    month4: 67,
    month5: 64,
    month6: 62,
    size: 2700,
    acquisitionChannel: "Email Marketing",
  },
  {
    cohort: "2024-07",
    month0: 100,
    month1: 89,
    month2: 81,
    month3: 77,
    month4: 74,
    month5: 71,
    month6: 69,
    size: 3500,
    acquisitionChannel: "Content Marketing",
  },
  {
    cohort: "2024-08",
    month0: 100,
    month1: 86,
    month2: 77,
    month3: 73,
    month4: 70,
    month5: 67,
    month6: 65,
    size: 3300,
    acquisitionChannel: "PPC Campaigns",
  },
];

// User segmentation data
const userSegmentationData = [
  {
    segment: "High-Value",
    users: 12500,
    percentage: 28,
    retentionRate: 89,
    avgRevenue: 450,
    color: "hsl(var(--primary))",
  },
  {
    segment: "Regular",
    users: 18500,
    percentage: 41,
    retentionRate: 74,
    avgRevenue: 125,
    color: "hsl(var(--success))",
  },
  {
    segment: "Low-Engagement",
    users: 13500,
    percentage: 31,
    retentionRate: 45,
    avgRevenue: 35,
    color: "hsl(var(--warning))",
  },
];

// Cohort performance over time
const cohortPerformanceData = [
  { period: "Jan", retention: 78, ltv: 890, churn: 4.2 },
  { period: "Feb", retention: 82, ltv: 920, churn: 3.8 },
  { period: "Mar", retention: 79, ltv: 980, churn: 4.1 },
  { period: "Apr", retention: 85, ltv: 1050, churn: 3.5 },
  { period: "May", retention: 83, ltv: 1120, churn: 3.7 },
  { period: "Jun", retention: 87, ltv: 1180, churn: 3.3 },
  { period: "Jul", retention: 89, ltv: 1250, churn: 3.1 },
  { period: "Aug", retention: 86, ltv: 1320, churn: 3.4 },
];

// Cohort insights
const cohortInsights = [
  {
    type: "positive",
    title: "Strong July Cohort Performance",
    description:
      "The July 2024 cohort shows 89% retention rate, 25% above average. Content marketing channel performing exceptionally well.",
    impact: "high",
    action:
      "Scale content marketing efforts and analyze successful strategies for replication.",
  },
  {
    type: "warning",
    title: "January Cohort Needs Attention",
    description:
      "January 2024 cohort retention has dropped to 60% at 6 months, below our 75% target.",
    impact: "medium",
    action:
      "Implement re-engagement campaigns and analyze churn reasons for this cohort.",
  },
  {
    type: "info",
    title: "High-Value Segment Growing",
    description:
      "High-value user segment has grown by 12% this quarter, driving 68% of total revenue.",
    impact: "high",
    action:
      "Focus retention efforts on high-value users and create targeted engagement programs.",
  },
  {
    type: "positive",
    title: "Social Media Cohorts Improving",
    description:
      "Social media acquisition cohorts show 15% better retention than average across all time periods.",
    impact: "medium",
    action:
      "Increase investment in social media marketing and optimize conversion funnels.",
  },
];

const chartConfig = {
  retention: {
    label: "Retention Rate",
    color: "hsl(var(--primary))",
  },
  ltv: {
    label: "Lifetime Value",
    color: "hsl(var(--success))",
  },
  churn: {
    label: "Churn Rate",
    color: "hsl(var(--destructive))",
  },
  users: {
    label: "Users",
    color: "hsl(var(--primary))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--success))",
  },
};

const CohortAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("12M");
  const [selectedChannel, setSelectedChannel] = useState("All");
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
        return BarChart3;
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

  const getRetentionColor = (retention: number) => {
    if (retention >= 80) return "bg-success/20 text-success border-success/30";
    if (retention >= 70) return "bg-warning/20 text-warning border-warning/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };

  const filteredCohorts = cohortRetentionData.filter(
    (cohort) =>
      selectedChannel === "All" || cohort.acquisitionChannel === selectedChannel
  );

  const channels = [
    "All",
    ...Array.from(
      new Set(cohortRetentionData.map((c) => c.acquisitionChannel))
    ),
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Cohort Analytics</h1>
            <p className="text-muted-foreground">
              Analyze user retention patterns and cohort performance across time
              and acquisition channels
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

        {/* Time Period and Channel Selector */}
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
                    <SelectItem value="6M">Last 6 Months</SelectItem>
                    <SelectItem value="12M">Last 12 Months</SelectItem>
                    <SelectItem value="24M">Last 24 Months</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-sm font-medium ml-4">Channel:</span>
                <Select
                  value={selectedChannel}
                  onValueChange={setSelectedChannel}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Badge
                  variant="secondary"
                  className="bg-success/10 text-success"
                >
                  Live Data
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cohort Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cohortMetrics.map((metric, index) => (
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
        <Tabs defaultValue="retention" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="retention" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Retention
            </TabsTrigger>
            <TabsTrigger
              value="segmentation"
              className="flex items-center gap-2"
            >
              <PieChart className="w-4 h-4" />
              Segmentation
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Retention Tab */}
          <TabsContent value="retention" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              {/* Cohort Retention Heatmap */}
              <div className="xl:col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cohort Retention Heatmap</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Percentage of users retained from each cohort over time
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <div className="min-w-[800px]">
                        {/* Heatmap Header */}
                        <div className="grid grid-cols-9 gap-1 mb-4">
                          <div className="p-2 text-sm font-medium text-muted-foreground">
                            Cohort
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 0
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 1
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 2
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 3
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 4
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 5
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Month 6
                          </div>
                          <div className="p-2 text-sm font-medium text-muted-foreground text-center">
                            Size
                          </div>
                        </div>

                        {/* Heatmap Rows */}
                        {filteredCohorts.map((cohort, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-9 gap-1 mb-1"
                          >
                            <div className="p-2 text-sm font-medium bg-muted/50 rounded">
                              {cohort.cohort}
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month0
                              )}`}
                            >
                              {cohort.month0}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month1
                              )}`}
                            >
                              {cohort.month1}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month2
                              )}`}
                            >
                              {cohort.month2}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month3
                              )}`}
                            >
                              {cohort.month3}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month4
                              )}`}
                            >
                              {cohort.month4}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month5
                              )}`}
                            >
                              {cohort.month5}%
                            </div>
                            <div
                              className={`p-2 text-sm text-center rounded border ${getRetentionColor(
                                cohort.month6
                              )}`}
                            >
                              {cohort.month6}%
                            </div>
                            <div className="p-2 text-sm text-center bg-muted/30 rounded">
                              {cohort.size.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-success/20 border border-success/30 rounded"></div>
                        <span className="text-sm text-muted-foreground">
                          80%+
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-warning/20 border border-warning/30 rounded"></div>
                        <span className="text-sm text-muted-foreground">
                          70-79%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-destructive/20 border border-destructive/30 rounded"></div>
                        <span className="text-sm text-muted-foreground">
                          70%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Retention Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Retention Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Avg. 1-Month Retention
                        </span>
                        <span className="font-medium">86.3%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "86.3%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Avg. 3-Month Retention
                        </span>
                        <span className="font-medium">73.8%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full"
                          style={{ width: "73.8%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Avg. 6-Month Retention
                        </span>
                        <span className="font-medium">64.2%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-warning h-2 rounded-full"
                          style={{ width: "64.2%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Top Performing Cohorts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredCohorts
                        .sort((a, b) => b.month6 - a.month6)
                        .slice(0, 3)
                        .map((cohort, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium">
                              {cohort.cohort}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {cohort.acquisitionChannel}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {cohort.month6}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Segmentation Tab */}
          <TabsContent value="segmentation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Segmentation Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>User Segmentation</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Distribution of users by value segment
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSegmentationData.map((segment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: segment.color }}
                            />
                            <span className="font-medium">
                              {segment.segment}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {segment.users.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {segment.percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${segment.percentage}%`,
                              backgroundColor: segment.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Segment Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Segment Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Retention and revenue by segment
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSegmentationData.map((segment, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">{segment.segment}</span>
                          <Badge variant="secondary">
                            {segment.retentionRate}% retention
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Avg. Revenue
                            </span>
                            <div className="font-medium">
                              ${segment.avgRevenue}/month
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Total Users
                            </span>
                            <div className="font-medium">
                              {segment.users.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cohort Performance Trends</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Overall cohort metrics over time
                </p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <RechartsLineChart data={cohortPerformanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="period"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      yAxisId="retention"
                      orientation="left"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      yAxisId="ltv"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="retention"
                      type="monotone"
                      dataKey="retention"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="Retention Rate (%)"
                    />
                    <Line
                      yAxisId="ltv"
                      type="monotone"
                      dataKey="ltv"
                      stroke="hsl(var(--success))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Lifetime Value ($)"
                    />
                  </RechartsLineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cohortInsights.map((insight, index) => {
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

export default CohortAnalytics;
