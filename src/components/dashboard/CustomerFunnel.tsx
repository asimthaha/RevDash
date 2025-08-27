import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const funnelData = [
  { stage: "Visitors", count: 10000, percentage: 100, color: "bg-blue-500" },
  { stage: "Leads", count: 2500, percentage: 25, color: "bg-indigo-500" },
  { stage: "Trials", count: 750, percentage: 7.5, color: "bg-purple-500" },
  { stage: "Customers", count: 150, percentage: 1.5, color: "bg-success" },
];

export function CustomerFunnel() {
  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelData.map((stage, index) => (
          <div key={stage.stage} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <span className="font-medium">{stage.stage}</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{stage.count.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stage.percentage}%</p>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={stage.percentage} 
                className="h-2"
                style={{
                  background: `linear-gradient(to right, hsl(var(--${stage.color.includes('success') ? 'success' : 'primary'})) 0%, hsl(var(--${stage.color.includes('success') ? 'success' : 'primary'})) ${stage.percentage}%, hsl(var(--muted)) ${stage.percentage}%, hsl(var(--muted)) 100%)`
                }}
              />
            </div>
            {index < funnelData.length - 1 && (
              <div className="text-xs text-muted-foreground pl-6">
                {((funnelData[index + 1].count / stage.count) * 100).toFixed(1)}% conversion to next stage
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}