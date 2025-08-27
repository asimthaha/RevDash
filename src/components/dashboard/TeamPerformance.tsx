import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const teamData = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "",
    initials: "SJ",
    tasksCompleted: 24,
    tasksTotal: 30,
    velocity: 8.5,
    status: "active"
  },
  {
    name: "Mike Chen",
    role: "Lead Developer",
    avatar: "",
    initials: "MC",
    tasksCompleted: 18,
    tasksTotal: 20,
    velocity: 9.2,
    status: "active"
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    avatar: "",
    initials: "ED",
    tasksCompleted: 15,
    tasksTotal: 18,
    velocity: 7.8,
    status: "active"
  },
  {
    name: "Alex Rivera",
    role: "Marketing Lead",
    avatar: "",
    initials: "AR",
    tasksCompleted: 22,
    tasksTotal: 25,
    velocity: 8.9,
    status: "busy"
  },
];

export function TeamPerformance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "busy": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {teamData.map((member) => (
          <div key={member.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
              </div>
              
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {member.tasksCompleted}/{member.tasksTotal}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {member.velocity} pts/day
                </Badge>
              </div>
              <Progress 
                value={(member.tasksCompleted / member.tasksTotal) * 100} 
                className="w-20 h-2"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}