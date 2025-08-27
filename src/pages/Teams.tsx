import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  MoreHorizontal,
  Building2,
  UserPlus,
  Target,
  Calendar,
  Award,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Form validation schema
const teamFormSchema = z.object({
  name: z
    .string()
    .min(2, "Team name must be at least 2 characters")
    .max(50, "Team name must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  leadName: z
    .string()
    .min(2, "Lead name must be at least 2 characters")
    .max(50, "Lead name must be less than 50 characters"),
  leadEmail: z.string().email("Please enter a valid email address"),
  leadPhone: z
    .string()
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(50, "Department must be less than 50 characters"),
  memberCount: z
    .number()
    .min(1, "Team must have at least 1 member")
    .max(100, "Team cannot have more than 100 members"),
});

type TeamFormData = z.infer<typeof teamFormSchema>;

// Sample team data
const initialTeams = [
  {
    id: 1,
    name: "Engineering Team",
    description:
      "Responsible for developing and maintaining our core product infrastructure, including backend services, APIs, and deployment pipelines.",
    leadName: "Sarah Johnson",
    leadEmail: "sarah.johnson@company.com",
    leadPhone: "+1-555-0123",
    department: "Engineering",
    memberCount: 12,
    createdAt: "2023-01-15",
    status: "active",
    avatar: "",
    initials: "ET",
    projects: ["Backend API", "Infrastructure", "DevOps"],
    performance: 92,
  },
  {
    id: 2,
    name: "Product Design",
    description:
      "Creates intuitive and beautiful user experiences through research, wireframing, prototyping, and visual design.",
    leadName: "Mike Chen",
    leadEmail: "mike.chen@company.com",
    leadPhone: "+1-555-0124",
    department: "Design",
    memberCount: 8,
    createdAt: "2023-02-20",
    status: "active",
    avatar: "",
    initials: "PD",
    projects: ["Mobile App", "Web Dashboard", "Brand Guidelines"],
    performance: 88,
  },
  {
    id: 3,
    name: "Marketing & Sales",
    description:
      "Drives customer acquisition, manages marketing campaigns, and handles sales operations across all channels.",
    leadName: "Emily Davis",
    leadEmail: "emily.davis@company.com",
    leadPhone: "+1-555-0125",
    department: "Marketing",
    memberCount: 15,
    createdAt: "2023-01-10",
    status: "active",
    avatar: "",
    initials: "MS",
    projects: ["Q4 Campaign", "Lead Generation", "Content Strategy"],
    performance: 85,
  },
  {
    id: 4,
    name: "Customer Success",
    description:
      "Ensures customer satisfaction, handles support requests, and drives product adoption and retention.",
    leadName: "Alex Rivera",
    leadEmail: "alex.rivera@company.com",
    leadPhone: "+1-555-0126",
    department: "Support",
    memberCount: 10,
    createdAt: "2023-03-05",
    status: "active",
    avatar: "",
    initials: "CS",
    projects: ["Onboarding", "Support Portal", "Customer Feedback"],
    performance: 94,
  },
  {
    id: 5,
    name: "Data Analytics",
    description:
      "Analyzes user behavior, product metrics, and business performance to drive data-informed decisions.",
    leadName: "Lisa Wang",
    leadEmail: "lisa.wang@company.com",
    leadPhone: "+1-555-0127",
    department: "Analytics",
    memberCount: 6,
    createdAt: "2023-04-12",
    status: "active",
    avatar: "",
    initials: "DA",
    projects: ["Dashboard", "Reporting", "A/B Testing"],
    performance: 89,
  },
];

type Team = (typeof initialTeams)[0];

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      leadName: "",
      leadEmail: "",
      leadPhone: "",
      department: "",
      memberCount: 1,
    },
  });

  const editForm = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      leadName: "",
      leadEmail: "",
      leadPhone: "",
      department: "",
      memberCount: 1,
    },
  });

  // Filter teams based on search and department
  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leadName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || team.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [
    "All",
    ...Array.from(new Set(teams.map((team) => team.department))),
  ];

  const handleAddTeam = async (data: TeamFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTeam: Team = {
        id: Math.max(...teams.map((t) => t.id)) + 1,
        name: data.name,
        description: data.description,
        leadName: data.leadName,
        leadEmail: data.leadEmail,
        leadPhone: data.leadPhone || "",
        department: data.department,
        memberCount: data.memberCount,
        createdAt: new Date().toISOString().split("T")[0],
        status: "active",
        avatar: "",
        initials: data.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        projects: [],
        performance: Math.floor(Math.random() * 20) + 80,
      };

      setTeams([...teams, newTeam]);
      setIsAddDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTeam = async (data: TeamFormData) => {
    if (!editingTeam) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedTeam: Team = {
        ...editingTeam,
        ...data,
        initials: data.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };

      setTeams(
        teams.map((team) => (team.id === editingTeam.id ? updatedTeam : team))
      );
      setIsEditDialogOpen(false);
      setEditingTeam(null);
      editForm.reset();
    } catch (error) {
      console.error("Error updating team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTeams(teams.filter((team) => team.id !== teamId));
    } catch (error) {
      console.error("Error deleting team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (team: Team) => {
    setEditingTeam(team);
    editForm.reset({
      name: team.name,
      description: team.description,
      leadName: team.leadName,
      leadEmail: team.leadEmail,
      leadPhone: team.leadPhone || "",
      department: team.department,
      memberCount: team.memberCount,
    });
    setIsEditDialogOpen(true);
  };

  const TeamCard = ({ team }: { team: Team }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={team.avatar} alt={team.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {team.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {team.name}
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {team.department}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEditDialog(team)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Team
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Team
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the "{team.name}" team and remove all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteTeam(team.id)}
                    >
                      Delete Team
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {team.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{team.memberCount}</span>
              <span className="text-muted-foreground">members</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{team.performance}%</span>
              <span className="text-muted-foreground">performance</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <UserPlus className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{team.leadName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground truncate">
                {team.leadEmail}
              </span>
            </div>
          </div>
        </div>

        {team.projects.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Target className="w-4 h-4" />
              Active Projects
            </div>
            <div className="flex flex-wrap gap-1">
              {team.projects.slice(0, 2).map((project, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {project}
                </Badge>
              ))}
              {team.projects.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{team.projects.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const TeamSkeleton = () => (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TeamForm = ({
    form: currentForm,
    onSubmit,
    isEdit = false,
  }: {
    form: ReturnType<typeof useForm<TeamFormData>>;
    onSubmit: (data: TeamFormData) => void;
    isEdit?: boolean;
  }) => (
    <Form {...currentForm}>
      <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={currentForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={currentForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the team's responsibilities and goals"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a clear description of the team's purpose and
                objectives.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={currentForm.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Engineering, Marketing"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={currentForm.control}
            name="memberCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Team Lead Information</h4>
          <FormField
            control={currentForm.control}
            name="leadName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team lead's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={currentForm.control}
              name="leadEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="lead@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={currentForm.control}
              name="leadPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1-555-0123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEdit ? "Update Team" : "Create Team"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground">
              Manage your organization's teams and team members
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Team
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <TeamForm form={form} onSubmit={handleAddTeam} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Teams</label>
                <Input
                  placeholder="Search by name, description, or lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTeams.length} of {teams.length} teams
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Teams Grid */}
        <div className="space-y-4">
          {isLoading && teams.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <TeamSkeleton key={index} />
              ))}
            </div>
          ) : filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No teams found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm.length > 0 || selectedDepartment !== "All"
                  ? "Try adjusting your search criteria or filters"
                  : "Get started by creating your first team"}
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                disabled={searchTerm.length > 0 || selectedDepartment !== "All"}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Team
              </Button>
            </Card>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
            </DialogHeader>
            {editingTeam && (
              <TeamForm
                form={editForm}
                onSubmit={handleEditTeam}
                isEdit={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Teams;
