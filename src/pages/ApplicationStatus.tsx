import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Search, Clock, CheckCircle, XCircle, AlertCircle, FileText, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getUserApplications, type Application } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";
import AuthModal from "@/components/auth/AuthModal";

const ApplicationStatus = () => {
  const [referenceId, setReferenceId] = useState("");
  const [searchResult, setSearchResult] = useState<Application | null>(null);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserApplications();
    }
  }, [user]);

  const loadUserApplications = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getUserApplications(user.id);
      if (error) throw error;
      setUserApplications(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your applications",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async () => {
    if (!referenceId.trim()) return;
    
    setIsLoading(true);
    try {
      // Search in user's applications if logged in
      if (user) {
        const found = userApplications.find(app => app.id === referenceId);
        if (found) {
          setSearchResult(found);
        } else {
          toast({
            title: "Application Not Found",
            description: "No application found with that reference ID",
            variant: "destructive",
          });
        }
      } else {
        setShowAuthModal(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'under_review': return 50;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const getStatusHistory = (application: Application) => {
    const history = [
      {
        status: "Application Submitted",
        date: new Date(application.created_at).toLocaleDateString(),
        description: "Your application has been successfully submitted",
        completed: true
      },
    ];

    if (application.status !== 'pending') {
      history.push({
        status: "Under Review",
        date: application.reviewed_at ? new Date(application.reviewed_at).toLocaleDateString() : "In Progress",
        description: "Your application is being reviewed by our team",
        completed: true
      });
    }

    if (application.status === 'approved') {
      history.push({
        status: "Approved",
        date: application.reviewed_at ? new Date(application.reviewed_at).toLocaleDateString() : "",
        description: "Your application has been approved!",
        completed: true
      });
    } else if (application.status === 'rejected') {
      history.push({
        status: "Rejected",
        date: application.reviewed_at ? new Date(application.reviewed_at).toLocaleDateString() : "",
        description: application.admin_comments || "Application was not approved",
        completed: true
      });
    }

    return history;
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "under review":
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      case "under review":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Status</h1>
            <p className="text-muted-foreground">
              Track the progress of your scholarship or health program application
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Find Your Application
              </CardTitle>
              <CardDescription>
                Enter your reference ID to check your application status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="referenceId">Reference ID</Label>
                  <Input
                    id="referenceId"
                    placeholder="e.g., SHA-2024-001234"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                <Button onClick={handleSearch} disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Searching..." : "Search"}
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Applications Section */}
          {user && userApplications.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Your recent application submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userApplications.map((app) => (
                    <div 
                      key={app.id} 
                      className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                      onClick={() => setSearchResult(app)}
                    >
                      <div>
                        <div className="font-medium">{app.full_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {app.application_type} • {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant={getStatusColor(app.status) as any}>
                        {app.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {searchResult && (
            <div className="space-y-6">
              {/* Application Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Application Details
                    </CardTitle>
                    <Badge variant={getStatusColor(searchResult.status) as any}>
                      {getStatusIcon(searchResult.status)}
                      <span className="ml-2">{searchResult.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Applicant:</span>
                        <span className="ml-2 font-medium">{searchResult.full_name}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Application Date:</span>
                        <span className="ml-2">{new Date(searchResult.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Reference ID:</span>
                        <span className="ml-2 font-mono">{searchResult.id}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Category:</span>
                        <Badge variant="outline" className="ml-2">{searchResult.application_type}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">School:</span>
                        <span className="ml-2">{searchResult.school_name}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Location:</span>
                        <span className="ml-2">{searchResult.county}, {searchResult.sub_county}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Application Progress</span>
                      <span className="text-sm text-muted-foreground">{getProgressValue(searchResult.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(searchResult.status)} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline</CardTitle>
                  <CardDescription>
                    Track the progress of your application through each stage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getStatusHistory(searchResult).map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {item.status}
                            </h4>
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Admin Comments */}
              {searchResult.admin_comments && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{searchResult.admin_comments}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Info Section */}
          {!searchResult && !user && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Please sign in to view your applications or search by reference ID.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {!searchResult && user && userApplications.length === 0 && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    You haven't submitted any applications yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationStatus;