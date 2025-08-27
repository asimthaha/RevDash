import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  CreditCard,
  Target,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Jan", mrr: 45000, churn: 2800, new: 8500, expansion: 1200 },
  { month: "Feb", mrr: 52000, churn: 3200, new: 12500, expansion: 1800 },
  { month: "Mar", mrr: 58000, churn: 2900, new: 9800, expansion: 2200 },
  { month: "Apr", mrr: 65000, churn: 3100, new: 11200, expansion: 2400 },
  { month: "May", mrr: 72000, churn: 3400, new: 13800, expansion: 2600 },
  { month: "Jun", mrr: 78000, churn: 3000, new: 12200, expansion: 2800 },
  { month: "Jul", mrr: 85000, churn: 3300, new: 14500, expansion: 3200 },
  { month: "Aug", mrr: 92000, churn: 3600, new: 16200, expansion: 3400 },
  { month: "Sep", mrr: 98000, churn: 3200, new: 15800, expansion: 3600 },
  { month: "Oct", mrr: 105000, churn: 3800, new: 17500, expansion: 3800 },
  { month: "Nov", mrr: 112000, churn: 3500, new: 18200, expansion: 4000 },
  { month: "Dec", mrr: 120000, churn: 3900, new: 19800, expansion: 4200 },
];

const revenueBreakdown = [
  { name: "New Customers", value: 45, amount: 54000, color: "hsl(var(--primary))" },
  { name: "Expansion", value: 25, amount: 30000, color: "hsl(var(--success))" },
  { name: "Existing", value: 30, amount: 36000, color: "hsl(var(--accent))" },
];

const planData = [
  { plan: "Starter", customers: 1200, revenue: 24000, avgRevenue: 20, growth: 15.2 },
  { plan: "Professional", customers: 850, revenue: 68000, avgRevenue: 80, growth: 22.1 },
  { plan: "Enterprise", customers: 127, revenue: 38100, avgRevenue: 300, growth: 8.7 },
];

const Revenue = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Revenue Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive revenue tracking and subscription analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success">
              +12.5% MoM Growth
            </Badge>
            <Badge variant="secondary">
              Target: 85% achieved
            </Badge>
          </div>
        </div>

        {/* Revenue KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Current MRR"
            value="$120,000"
            change={12.5}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
            target="$150k"
          />
          
          <MetricCard
            title="Annual Run Rate"
            value="$1.44M"
            change={15.2}
            changeLabel="projected ARR"
            icon={TrendingUp}
            trend="up"
            target="$2M"
          />
          
          <MetricCard
            title="Average Revenue Per User"
            value="$89"
            change={5.8}
            changeLabel="vs last month"
            icon={Users}
            trend="up"
            target="$120"
          />
          
          <MetricCard
            title="Monthly Churn Rate"
            value="3.2%"
            change={-0.5}
            changeLabel="vs last month"
            icon={Target}
            trend="up"
            target="<2%"
          />
        </div>

        {/* Revenue Waterfall Chart */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>MRR Movement & Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Bar dataKey="new" stackId="a" fill="hsl(var(--success))" name="New Revenue" />
                  <Bar dataKey="expansion" stackId="a" fill="hsl(var(--primary))" name="Expansion" />
                  <Bar dataKey="churn" stackId="b" fill="hsl(var(--destructive))" name="Churn" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Composition */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Revenue Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {revenueBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Plans */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {planData.map((plan) => (
                <div key={plan.plan} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{plan.plan}</h4>
                      <p className="text-sm text-muted-foreground">
                        {plan.customers.toLocaleString()} customers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${plan.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-sm">
                        {plan.growth > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-destructive" />
                        )}
                        <span className={plan.growth > 0 ? "text-success" : "text-destructive"}>
                          {plan.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg. Revenue per Customer</span>
                      <span className="font-medium">${plan.avgRevenue}</span>
                    </div>
                    <Progress 
                      value={(plan.revenue / 70000) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Monthly Recurring Revenue Trend
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">MRR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">New Revenue</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name.toUpperCase()
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mrr" 
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

export default Revenue;