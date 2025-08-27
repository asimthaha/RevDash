import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CustomerFunnel } from "@/components/dashboard/CustomerFunnel";
import { TeamPerformance } from "@/components/dashboard/TeamPerformance";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  Activity,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your startup today.
          </p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <MetricCard
            title="Monthly Recurring Revenue"
            value="$120k"
            change={12.5}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
            target="$150k"
          />
          
          <MetricCard
            title="Annual Recurring Revenue"
            value="$1.44M"
            change={15.2}
            changeLabel="vs last year"
            icon={TrendingUp}
            trend="up"
            target="$2M"
          />
          
          <MetricCard
            title="Active Customers"
            value="2,847"
            change={8.3}
            changeLabel="new this month"
            icon={Users}
            trend="up"
            target="3,000"
          />
          
          <MetricCard
            title="Customer Churn"
            value="2.1%"
            change={-0.5}
            changeLabel="vs last month"
            icon={Activity}
            trend="up"
            target="<2%"
          />
          
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change={0.8}
            changeLabel="vs last month"
            icon={Target}
            trend="up"
            target="5%"
          />
          
          <MetricCard
            title="Runway"
            value="18 months"
            change={-2}
            changeLabel="months change"
            icon={Clock}
            trend="down"
            target="24+ months"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <RevenueChart />
          </div>
          
          <div className="space-y-6">
            <CustomerFunnel />
          </div>
        </div>

        {/* Team Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamPerformance />
          
          {/* Additional space for future components */}
          <div className="space-y-6">
            {/* This space is reserved for additional charts or metrics */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
