import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  BookOpen,
  PlayCircle,
  HelpCircle,
  Phone,
  FileText,
  Download,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Calendar,
  ExternalLink,
  Video,
  Mail,
  Headphones,
} from "lucide-react";

// Help content data structure for easy updates
const helpContent = {
  introduction: {
    title: "Welcome to Revenue Dashboard Help",
    description:
      "Your comprehensive guide to maximizing the potential of our revenue analytics platform.",
    content: `
      The Revenue Dashboard is a powerful analytics platform designed to help startups and businesses
      track, analyze, and optimize their revenue performance. Whether you're monitoring key metrics,
      analyzing customer behavior, or forecasting growth, this dashboard provides the insights you need
      to make data-driven decisions.

      This help center is your go-to resource for understanding how to use all features effectively,
      troubleshoot issues, and get the most out of your analytics experience.
    `,
  },
  gettingStarted: [
    {
      title: "Account Setup",
      content:
        "Create your account, verify your email, and set up your organization profile.",
    },
    {
      title: "Navigation Basics",
      content:
        "Learn how to navigate between different sections and use the sidebar menu.",
    },
    {
      title: "Connecting Data Sources",
      content: "Link your revenue data from various platforms and databases.",
    },
    {
      title: "Dashboard Customization",
      content:
        "Customize your dashboard layout and add your most important metrics.",
    },
  ],
  faqs: [
    {
      question: "How often is my data updated?",
      answer:
        "Data is refreshed every 15 minutes for active dashboards and hourly for historical data.",
    },
    {
      question: "Can I export my reports?",
      answer:
        "Yes, you can export reports in PDF, CSV, and Excel formats from any chart or table.",
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "You'll receive a notification, and additional usage will be billed at your plan's overage rate.",
    },
    {
      question: "How do I invite team members?",
      answer:
        "Go to Settings > Team Management and enter their email addresses to send invitations.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use enterprise-grade security with end-to-end encryption and SOC 2 compliance.",
    },
  ],
  featureGuides: [
    {
      title: "Revenue Analytics",
      description:
        "Track and analyze your revenue streams with advanced charting and forecasting.",
      icon: "📊",
      content:
        "Learn about MRR, ARR, churn analysis, and revenue forecasting tools.",
    },
    {
      title: "Customer Insights",
      description:
        "Understand your customer behavior and lifecycle with cohort and funnel analysis.",
      icon: "👥",
      content:
        "Discover customer segments, retention patterns, and conversion optimization strategies.",
    },
    {
      title: "Product Analytics",
      description:
        "Monitor product performance and feature adoption across your user base.",
      icon: "📦",
      content:
        "Track feature usage, user engagement, and product-market fit metrics.",
    },
    {
      title: "Team Performance",
      description: "Monitor team productivity and collaboration metrics.",
      icon: "👥",
      content:
        "Analyze team efficiency, goal tracking, and performance benchmarking.",
    },
  ],
  videoTutorials: [
    {
      title: "Dashboard Overview",
      duration: "3:24",
      thumbnail: "/placeholder.svg",
      description: "Get familiar with the main dashboard interface",
    },
    {
      title: "Creating Custom Reports",
      duration: "5:12",
      thumbnail: "/placeholder.svg",
      description: "Learn to build custom reports and visualizations",
    },
    {
      title: "Setting Up Alerts",
      duration: "2:45",
      thumbnail: "/placeholder.svg",
      description: "Configure notifications for key metric changes",
    },
    {
      title: "Data Integration Guide",
      duration: "7:30",
      thumbnail: "/placeholder.svg",
      description: "Connect your data sources and sync settings",
    },
  ],
  troubleshooting: [
    {
      issue: "Dashboard not loading",
      solution:
        "Check your internet connection and try refreshing the page. Clear browser cache if issues persist.",
      tags: ["loading", "connection", "cache"],
    },
    {
      issue: "Data not updating",
      solution:
        "Data refreshes automatically every 15 minutes. Use the manual refresh button if needed.",
      tags: ["data", "refresh", "sync"],
    },
    {
      issue: "Charts not displaying correctly",
      solution:
        "Ensure your browser is up to date. Try switching to a different chart type or clearing browser data.",
      tags: ["charts", "display", "browser"],
    },
    {
      issue: "Export functionality not working",
      solution:
        "Check your browser's popup blocker settings. Ensure you have sufficient permissions for downloads.",
      tags: ["export", "download", "permissions"],
    },
  ],
  contactSupport: {
    channels: [
      {
        type: "Live Chat",
        description: "Get instant help from our support team",
        availability: "24/7",
        icon: MessageSquare,
        action: "Start Chat",
      },
      {
        type: "Email Support",
        description:
          "Send us detailed questions and we'll respond within 24 hours",
        availability: "Business Hours",
        icon: Mail,
        action: "Send Email",
      },
      {
        type: "Phone Support",
        description: "Speak directly with our technical experts",
        availability: "Mon-Fri 9AM-6PM EST",
        icon: Phone,
        action: "Call Now",
      },
      {
        type: "Community Forum",
        description: "Connect with other users and share solutions",
        availability: "Always Open",
        icon: Headphones,
        action: "Join Community",
      },
    ],
    responseTimes: {
      liveChat: "< 5 minutes",
      email: "< 24 hours",
      phone: "Immediate (during business hours)",
    },
  },
  glossary: [
    {
      term: "MRR",
      definition:
        "Monthly Recurring Revenue - Total predictable revenue generated monthly",
    },
    {
      term: "ARR",
      definition:
        "Annual Recurring Revenue - Total predictable revenue generated annually",
    },
    {
      term: "Churn Rate",
      definition:
        "Percentage of customers who stop using your service during a given period",
    },
    {
      term: "Cohort Analysis",
      definition:
        "Method of analyzing user behavior by grouping them based on shared characteristics",
    },
    {
      term: "Conversion Rate",
      definition:
        "Percentage of users who complete a desired action out of total visitors",
    },
    {
      term: "Runway",
      definition:
        "Amount of time a company can operate before running out of cash",
    },
    {
      term: "LTV",
      definition:
        "Customer Lifetime Value - Total revenue expected from a single customer",
    },
    {
      term: "CAC",
      definition:
        "Customer Acquisition Cost - Total cost to acquire a new customer",
    },
  ],
  changelog: [
    {
      version: "2.1.0",
      date: "2024-01-15",
      changes: [
        "Added advanced cohort analysis features",
        "Improved data refresh performance",
        "New customizable dashboard layouts",
      ],
    },
    {
      version: "2.0.5",
      date: "2023-12-20",
      changes: [
        "Fixed chart rendering issues on mobile devices",
        "Enhanced export functionality for large datasets",
        "Added support for additional data connectors",
      ],
    },
    {
      version: "2.0.0",
      date: "2023-11-30",
      changes: [
        "Complete redesign of user interface",
        "New real-time collaboration features",
        "Improved accessibility and screen reader support",
      ],
    },
  ],
};

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Search functionality
  const filteredFAQs = useMemo(() => {
    if (!searchQuery) return helpContent.faqs;
    return helpContent.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredTroubleshooting = useMemo(() => {
    if (!searchQuery) return helpContent.troubleshooting;
    return helpContent.troubleshooting.filter(
      (item) =>
        item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-8 w-8" />
            Help Center
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about using the Revenue Dashboard
            effectively.
          </p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search help articles, FAQs, and troubleshooting guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="troubleshoot">Troubleshoot</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {helpContent.introduction.title}
                </CardTitle>
                <CardDescription>
                  {helpContent.introduction.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {helpContent.introduction.content}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Watch Getting Started Video
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download User Guide PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "Dashboard Setup",
                      "Data Integration",
                      "Report Creation",
                      "Team Management",
                    ].map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
                      >
                        <span className="text-sm">{topic}</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>
                  Follow these steps to set up and start using your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {helpContent.gettingStarted.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpContent.featureGuides.map((feature, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.content}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>
                  Learn through our comprehensive video guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpContent.videoTutorials.map((video, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm">{video.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {video.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFAQs.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No FAQs found matching your search.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Troubleshoot Tab */}
          <TabsContent value="troubleshoot" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting Guide</CardTitle>
                <CardDescription>
                  Common issues and their solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredTroubleshooting.map((item, index) => (
                    <AccordionItem key={index} value={`troubleshoot-${index}`}>
                      <AccordionTrigger>{item.issue}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>{item.solution}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredTroubleshooting.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No troubleshooting articles found matching your search.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {helpContent.contactSupport.channels.map((channel, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <channel.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-sm">
                            {channel.type}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {channel.description}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {channel.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                  <CardDescription>
                    Expected response times by channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(helpContent.contactSupport.responseTimes).map(
                    ([channel, time]) => (
                      <div
                        key={channel}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm capitalize">
                          {channel.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <Badge variant="secondary">{time}</Badge>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    API Documentation
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Integration Guide
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Developer Portal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Updates
                  </CardTitle>
                  <CardDescription>
                    Latest features and improvements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {helpContent.changelog.slice(0, 3).map((update, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            Version {update.version}
                          </h4>
                          <Badge variant="outline">{update.date}</Badge>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {update.changes.map((change, changeIndex) => (
                            <li
                              key={changeIndex}
                              className="flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              {change}
                            </li>
                          ))}
                        </ul>
                        {index < helpContent.changelog.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Glossary
                  </CardTitle>
                  <CardDescription>Key terms and definitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {helpContent.glossary.map((item, index) => (
                      <AccordionItem key={index} value={`glossary-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.term}
                        </AccordionTrigger>
                        <AccordionContent>{item.definition}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Help;
