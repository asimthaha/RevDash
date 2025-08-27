import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserPlus,
  Heart,
  DollarSign,
  Target,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const customerGrowthData = [
  { month: "Jan", total: 2400, new: 120, churn: 48 },
  { month: "Feb", total: 2520, new: 180, churn: 60 },
  { month: "Mar", total: 2640, new: 160, churn: 40 },
  { month: "Apr", total: 2780, new: 200, churn: 60 },
  { month: "May", total: 2920, new: 220, churn: 80 },
  { month: "Jun", total: 3040, new: 180, churn: 60 },
  { month: "Jul", total: 3160, new: 200, churn: 80 },
  { month: "Aug", total: 3280, new: 240, churn: 120 },
  { month: "Sep", total: 3400, new: 220, churn: 100 },
  { month: "Oct", total: 3520, new: 260, churn: 140 },
  { month: "Nov", total: 3640, new: 280, churn: 160 },
  { month: "Dec", total: 3760, new: 320, churn: 200 },
];

const customerSegments = [
  {
    name: "Enterprise",
    value: 15,
    customers: 564,
    color: "hsl(var(--primary))",
  },
  {
    name: "Professional",
    value: 35,
    customers: 1316,
    color: "hsl(var(--success))",
  },
  { name: "Starter", value: 50, customers: 1880, color: "hsl(var(--accent))" },
];

const customerLifetimeData = [
  { segment: "Enterprise", clv: 45000, avgMonths: 36 },
  { segment: "Professional", clv: 15000, avgMonths: 24 },
  { segment: "Starter", clv: 5000, avgMonths: 12 },
];

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Customer Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive customer insights and relationship management
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success">
              +8.3% MoM Growth
            </Badge>
            <Badge variant="secondary">Retention: 94.2%</Badge>
          </div>
        </div>

        {/* Customer KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Customers"
            value="3,760"
            change={8.3}
            changeLabel="new this month"
            icon={Users}
            trend="up"
            target="4,000"
          />

          <MetricCard
            title="New Customers"
            value="320"
            change={15.2}
            changeLabel="vs last month"
            icon={UserPlus}
            trend="up"
            target="400"
          />

          <MetricCard
            title="Retention Rate"
            value="94.2%"
            change={0.8}
            changeLabel="vs last month"
            icon={Heart}
            trend="up"
            target="95%"
          />

          <MetricCard
            title="Avg. Customer LTV"
            value="$18,200"
            change={5.8}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
            target="$20k"
          />
        </div>

        {/* Customer Growth Chart */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Customer Growth & Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customerGrowthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ]}
                  />
                  <Bar
                    dataKey="new"
                    fill="hsl(var(--success))"
                    name="New Customers"
                  />
                  <Bar
                    dataKey="churn"
                    fill="hsl(var(--destructive))"
                    name="Churned"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Segments */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {customerSegments.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {item.customers.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.value}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Lifetime Value */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Customer Lifetime Value by Segment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {customerLifetimeData.map((segment) => (
                <div key={segment.segment} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{segment.segment}</h4>
                      <p className="text-sm text-muted-foreground">
                        Avg. {segment.avgMonths} months
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${segment.clv.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <ArrowUpRight className="w-4 h-4 text-success" />
                        <span className="text-success">
                          {((segment.clv / 20000) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <Progress
                    value={(segment.clv / 50000) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Customer Trend */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Total Customer Base Trend
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Total Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Monthly Growth</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name.toUpperCase(),
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
