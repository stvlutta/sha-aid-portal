import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Heart,
  Calendar,
  Filter
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getAllApplications, type Application } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";

const AdminReports = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin } = useAuth();

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
      console.error("Failed to load applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate monthly data for charts
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      const educationCount = Math.floor(Math.random() * 50) + 10;
      const healthCount = Math.floor(Math.random() * 30) + 5;
      return {
        month,
        education: educationCount,
        health: healthCount,
        total: educationCount + healthCount
      };
    });
  };

  const monthlyData = generateMonthlyData();

  // Status distribution data
  const statusData = [
    { name: 'Approved', value: applications.filter(app => app.status === 'approved').length, color: '#22c55e' },
    { name: 'Pending', value: applications.filter(app => app.status === 'pending').length, color: '#eab308' },
    { name: 'Under Review', value: applications.filter(app => app.status === 'under_review').length, color: '#f97316' },
    { name: 'Rejected', value: applications.filter(app => app.status === 'rejected').length, color: '#ef4444' },
  ];

  // Application type distribution
  const typeData = [
    { name: 'Education', value: applications.filter(app => app.application_type === 'education').length, color: '#3b82f6' },
    { name: 'Health', value: applications.filter(app => app.application_type === 'health').length, color: '#8b5cf6' },
  ];

  // Redirect if not admin
  if (!isLoading && (!user || !isAdmin)) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access admin reports.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading reports...</p>
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
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive analysis of application data</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter Period
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                    <p className="text-2xl font-bold">{applications.length}</p>
                    <p className="text-xs text-success">+12% from last month</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approval Rate</p>
                    <p className="text-2xl font-bold">
                      {applications.length > 0 ? Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100) : 0}%
                    </p>
                    <p className="text-xs text-success">+5% from last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Education Apps</p>
                    <p className="text-2xl font-bold">{applications.filter(app => app.application_type === 'education').length}</p>
                    <p className="text-xs text-warning">-2% from last month</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Health Apps</p>
                    <p className="text-2xl font-bold">{applications.filter(app => app.application_type === 'health').length}</p>
                    <p className="text-xs text-success">+8% from last month</p>
                  </div>
                  <Heart className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status Distribution</CardTitle>
                    <CardDescription>Current status breakdown of all applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Type Distribution</CardTitle>
                    <CardDescription>Education vs Health applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={typeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {typeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Application Trends</CardTitle>
                  <CardDescription>Application volume over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="education" stackId="a" fill="#3b82f6" name="Education" />
                      <Bar dataKey="health" stackId="a" fill="#8b5cf6" name="Health" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Approval Rate Trend</CardTitle>
                  <CardDescription>Monthly approval rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} name="Total Applications" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Demographics Tab */}
            <TabsContent value="demographics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications by County</CardTitle>
                    <CardDescription>Geographic distribution of applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Baringo', 'Elgeyo-Marakwet', 'Kericho', 'Nandi', 'Uasin Gishu'].map((county, index) => {
                        const count = Math.floor(Math.random() * 30) + 5;
                        const percentage = Math.floor(Math.random() * 25) + 10;
                        return (
                          <div key={county} className="flex items-center justify-between">
                            <span className="font-medium">{county}</span>
                            <div className="flex items-center space-x-4">
                              <div className="w-32 bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-12">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>School Level Distribution</CardTitle>
                    <CardDescription>Applications by education level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { level: 'University', count: 45, color: '#3b82f6' },
                        { level: 'Tertiary', count: 32, color: '#8b5cf6' },
                        { level: 'Secondary', count: 28, color: '#22c55e' },
                        { level: 'Primary', count: 15, color: '#f59e0b' },
                      ].map((item) => (
                        <div key={item.level} className="flex items-center justify-between">
                          <span className="font-medium">{item.level}</span>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${(item.count / 45) * 100}%`,
                                  backgroundColor: item.color
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Time</CardTitle>
                    <CardDescription>Average application processing time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">12.5</div>
                      <div className="text-sm text-muted-foreground">Days average</div>
                      <div className="text-xs text-success mt-1">-2 days from last month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Rate</CardTitle>
                    <CardDescription>Overall application success rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success mb-2">78%</div>
                      <div className="text-sm text-muted-foreground">Applications approved</div>
                      <div className="text-xs text-success mt-1">+5% from last month</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rate</CardTitle>
                    <CardDescription>Percentage of started applications completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning mb-2">85%</div>
                      <div className="text-sm text-muted-foreground">Completion rate</div>
                      <div className="text-xs text-success mt-1">+3% from last month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Schools</CardTitle>
                  <CardDescription>Schools with highest approval rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { school: 'University of Eldoret', applications: 45, approved: 42, rate: 93 },
                      { school: 'Moi University', applications: 38, approved: 34, rate: 89 },
                      { school: 'KMTC Eldoret', applications: 29, approved: 25, rate: 86 },
                      { school: 'Eldoret Polytechnic', applications: 22, approved: 18, rate: 82 },
                    ].map((school) => (
                      <div key={school.school} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{school.school}</div>
                          <div className="text-sm text-muted-foreground">
                            {school.applications} applications • {school.approved} approved
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-success">{school.rate}%</div>
                          <div className="text-xs text-muted-foreground">approval rate</div>
                        </div>
                      </div>
                    ))}
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

export default AdminReports;