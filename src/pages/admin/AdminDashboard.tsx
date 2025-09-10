import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getAllApplications, updateApplicationStatus, type Application, type ApplicationStatus } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";

const AdminDashboard = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isAdmin) {
      loadApplications();
    }
  }, [user, isAdmin]);

  const loadApplications = async () => {
    try {
      const { data, error } = await getAllApplications();
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: ApplicationStatus, comments?: string) => {
    try {
      const { error } = await updateApplicationStatus(applicationId, newStatus, comments);
      if (error) throw error;
      
      await loadApplications();
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  // Calculate stats from real data
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const underReviewApplications = applications.filter(app => app.status === 'under_review').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
  const educationApplications = applications.filter(app => app.application_type === 'education').length;
  const healthApplications = applications.filter(app => app.application_type === 'health').length;

  const dashboardStats = [
    { icon: FileText, label: "Total Applications", value: totalApplications.toString(), change: "", category: "all" },
    { icon: Clock, label: "Pending Review", value: (pendingApplications + underReviewApplications).toString(), change: "", category: "pending" },
    { icon: CheckCircle, label: "Approved", value: approvedApplications.toString(), change: "", category: "approved" },
    { icon: XCircle, label: "Rejected", value: rejectedApplications.toString(), change: "", category: "rejected" }
  ];

  const schools = [...new Set(applications.map(app => app.school_name))].filter(Boolean);

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

  const filteredApplications = applications.filter(app => {
    const schoolMatch = !selectedSchool || app.school_name === selectedSchool;
    const statusMatch = !statusFilter || app.status === statusFilter;
    return schoolMatch && statusMatch;
  });

  // Redirect if not admin
  if (!isLoading && (!user || !isAdmin)) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
          </div>
        </div>
      </Layout>
    );
  }

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
                              <span className="font-medium">{app.full_name}</span>
                              <Badge variant="outline" className="text-xs">
                                {app.application_type}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <School className="w-3 h-3" />
                              <span>{app.school_name}</span>
                              <span>•</span>
                              <span>{app.county}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(app.status) as any} className="mb-1">
                              {app.status.replace('_', ' ')}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="ml-2 space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStatusUpdate(app.id, 'approved')}
                              disabled={app.status === 'approved'}
                            >
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStatusUpdate(app.id, 'rejected')}
                              disabled={app.status === 'rejected'}
                            >
                              <XCircle className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
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
                          <span>{educationApplications} applications</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${totalApplications > 0 ? (educationApplications / totalApplications) * 100 : 0}%` }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Health</span>
                          <span>{healthApplications} applications</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: `${totalApplications > 0 ? (healthApplications / totalApplications) * 100 : 0}%` }}></div>
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
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Education Applications</p>
                        <p className="text-2xl font-bold">{educationApplications}</p>
                      </div>
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Approved Rate</p>
                        <p className="text-2xl font-bold">
                          {educationApplications > 0 ? Math.round((applications.filter(app => app.application_type === 'education' && app.status === 'approved').length / educationApplications) * 100) : 0}%
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Review</p>
                        <p className="text-2xl font-bold">
                          {applications.filter(app => app.application_type === 'education' && (app.status === 'pending' || app.status === 'under_review')).length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Education Applications by School</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schools.slice(0, 5).map((school) => {
                      const schoolApps = applications.filter(app => app.school_name === school && app.application_type === 'education');
                      const approvedCount = schoolApps.filter(app => app.status === 'approved').length;
                      const approvalRate = schoolApps.length > 0 ? Math.round((approvedCount / schoolApps.length) * 100) : 0;
                      
                      return (
                        <div key={school} className="flex items-center justify-between">
                          <span className="font-medium">{school}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              {schoolApps.length} applications
                            </span>
                            <Badge variant="outline">
                              {approvalRate}% approval
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Tab */}
            <TabsContent value="health" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Health Applications</p>
                        <p className="text-2xl font-bold">{healthApplications}</p>
                      </div>
                      <Heart className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Approved Rate</p>
                        <p className="text-2xl font-bold">
                          {healthApplications > 0 ? Math.round((applications.filter(app => app.application_type === 'health' && app.status === 'approved').length / healthApplications) * 100) : 0}%
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Review</p>
                        <p className="text-2xl font-bold">
                          {applications.filter(app => app.application_type === 'health' && (app.status === 'pending' || app.status === 'under_review')).length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Health Applications Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Health Applications</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{healthApplications} applications</span>
                        <Badge variant="outline">
                          {totalApplications > 0 ? Math.round((healthApplications / totalApplications) * 100) : 0}% of total
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Approved Applications</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          {applications.filter(app => app.application_type === 'health' && app.status === 'approved').length} applications
                        </span>
                        <Badge variant="outline">Approved</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Under Review</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          {applications.filter(app => app.application_type === 'health' && (app.status === 'pending' || app.status === 'under_review')).length} applications
                        </span>
                        <Badge variant="outline">In Progress</Badge>
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