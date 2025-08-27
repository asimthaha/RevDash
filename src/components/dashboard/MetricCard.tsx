import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  target?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = "neutral",
  target,
  className = ""
}: MetricCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "metric-positive";
    if (trend === "down") return "metric-negative";
    return "metric-neutral";
  };

  const getTrendIcon = () => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return null;
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className={`metric-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TrendIcon && (
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            )}
            <span className="text-sm text-muted-foreground">{changeLabel}</span>
          </div>
          
          {target && (
            <Badge variant="secondary" className="text-xs">
              Target: {target}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}