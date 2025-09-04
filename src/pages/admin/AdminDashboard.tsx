import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  GraduationCap, 
  Heart, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Download,
  Eye,
  School
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const AdminDashboard = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Mock data
  const dashboardStats = [
    { icon: FileText, label: "Total Applications", value: "1,234", change: "+12%", category: "all" },
    { icon: Clock, label: "Pending Review", value: "89", change: "+5%", category: "pending" },
    { icon: CheckCircle, label: "Approved", value: "1,045", change: "+15%", category: "approved" },
    { icon: XCircle, label: "Rejected", value: "100", change: "-8%", category: "rejected" }
  ];

  const educationStats = [
    { label: "Education Applications", value: "789", percentage: 64 },
    { label: "Avg. Amount", value: "R12,500", percentage: 0 },
    { label: "Success Rate", value: "92%", percentage: 92 }
  ];

  const healthStats = [
    { label: "Health Applications", value: "445", percentage: 36 },
    { label: "Avg. Amount", value: "R8,200", percentage: 0 },
    { label: "Success Rate", value: "88%", percentage: 88 }
  ];

  const recentApplications = [
    {
      id: "SHA-2024-001234",
      applicant: "John Doe",
      school: "Central High School",
      category: "Education",
      type: "Bursary",
      amount: "R15,000",
      status: "Under Review",
      date: "2024-01-20"
    },
    {
      id: "SHA-2024-001235",
      applicant: "Jane Smith",
      school: "Green Valley University",
      category: "Health",
      type: "Subsidy",
      amount: "R8,500",
      status: "Approved",
      date: "2024-01-19"
    },
    {
      id: "SHA-2024-001236",
      applicant: "Mike Johnson",
      school: "Tech Institute",
      category: "Education",
      type: "Emergency",
      amount: "R5,000",
      status: "Pending",
      date: "2024-01-18"
    }
  ];

  const schools = [
    "Central High School",
    "Green Valley University",
    "Tech Institute",
    "Medical College",
    "Arts Academy"
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "under review":
        return "warning";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const filteredApplications = recentApplications.filter(app => {
    const schoolMatch = !selectedSchool || app.school === selectedSchool;
    const statusMatch = !statusFilter || app.status.toLowerCase() === statusFilter.toLowerCase();
    return schoolMatch && statusMatch;
  });

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage bursary applications</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">School Name</label>
                  <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Schools" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Schools</SelectItem>
                      {schools.map(school => (
                        <SelectItem key={school} value={school}>{school}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Applicant</label>
                  <Input placeholder="Search by name or ID..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="education">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="health">
                <Heart className="w-4 h-4 mr-2" />
                Health
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      {filteredApplications.length} applications found
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{app.applicant}</span>
                              <Badge variant="outline" className="text-xs">
                                {app.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <School className="w-3 h-3" />
                              <span>{app.school}</span>
                              <span>•</span>
                              <span>{app.amount}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(app.status) as any} className="mb-1">
                              {app.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{app.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Trends</CardTitle>
                    <CardDescription>Monthly application statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">This Month</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium">+15%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Education</span>
                          <span>789 applications</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health</span>
                          <span>445 applications</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: '36%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {educationStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      {stat.percentage > 0 && (
                        <div className="mt-4">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Education Applications by School</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schools.slice(0, 5).map((school, index) => (
                      <div key={school} className="flex items-center justify-between">
                        <span className="font-medium">{school}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 50 + 10)} applications
                          </span>
                          <Badge variant="outline">
                            {Math.floor(Math.random() * 30 + 80)}% approval
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Tab */}
            <TabsContent value="health" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {healthStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <Heart className="w-8 h-8 text-accent" />
                      </div>
                      {stat.percentage > 0 && (
                        <div className="mt-4">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-accent h-2 rounded-full" 
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Health Program Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Medical Subsidies</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">267 applications</span>
                        <Badge variant="outline">60%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Mental Health Support</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">123 applications</span>
                        <Badge variant="outline">28%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Emergency Health Fund</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">55 applications</span>
                        <Badge variant="outline">12%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;