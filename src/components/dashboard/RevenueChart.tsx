import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", mrr: 45000, arr: 540000 },
  { month: "Feb", mrr: 52000, arr: 624000 },
  { month: "Mar", mrr: 58000, arr: 696000 },
  { month: "Apr", mrr: 65000, arr: 780000 },
  { month: "May", mrr: 72000, arr: 864000 },
  { month: "Jun", mrr: 78000, arr: 936000 },
  { month: "Jul", mrr: 85000, arr: 1020000 },
  { month: "Aug", mrr: 92000, arr: 1104000 },
  { month: "Sep", mrr: 98000, arr: 1176000 },
  { month: "Oct", mrr: 105000, arr: 1260000 },
  { month: "Nov", mrr: 112000, arr: 1344000 },
  { month: "Dec", mrr: 120000, arr: 1440000 },
];

export function RevenueChart() {
  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Revenue Growth
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">MRR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">ARR</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                dataKey="arr" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}