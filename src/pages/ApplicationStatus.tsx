import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Search, Clock, CheckCircle, XCircle, AlertCircle, FileText, Calendar, User } from "lucide-react";
import Layout from "@/components/layout/Layout";

const ApplicationStatus = () => {
  const [referenceId, setReferenceId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  // Mock data for demonstration
  const mockApplication = {
    id: "SHA-2024-001234",
    applicantName: "John Doe",
    applicationDate: "2024-01-15",
    category: "Education",
    type: "Bursary",
    amount: "R 5,000",
    status: "Under Review",
    progress: 60,
    statusHistory: [
      {
        status: "Application Submitted",
        date: "2024-01-15",
        description: "Your application has been successfully submitted",
        completed: true
      },
      {
        status: "Documents Verified",
        date: "2024-01-18",
        description: "All required documents have been verified",
        completed: true
      },
      {
        status: "Under Review",
        date: "2024-01-20",
        description: "Your application is currently being reviewed by our team",
        completed: true
      },
      {
        status: "Decision Pending",
        date: "Expected: 2024-02-05",
        description: "Final decision will be communicated soon",
        completed: false
      },
      {
        status: "Notification Sent",
        date: "Expected: 2024-02-10",
        description: "Decision will be sent via email and SMS",
        completed: false
      }
    ],
    nextSteps: [
      "Wait for review completion (estimated 2-3 business days)",
      "Check email regularly for updates",
      "Keep all original documents ready for collection"
    ],
    documents: [
      { name: "ID Document", status: "verified", uploadDate: "2024-01-15" },
      { name: "Proof of Registration", status: "verified", uploadDate: "2024-01-15" },
      { name: "Academic Transcript", status: "verified", uploadDate: "2024-01-15" },
      { name: "Proof of Income", status: "pending", uploadDate: "2024-01-15" },
      { name: "Bank Statement", status: "verified", uploadDate: "2024-01-15" }
    ]
  };

  const handleSearch = () => {
    if (referenceId.trim()) {
      // In a real app, this would make an API call
      setSearchResult(mockApplication);
    }
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
              Track the progress of your bursary or subsidy application
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
                  <Button onClick={handleSearch} className="bg-primary hover:bg-primary-hover">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      <span className="ml-2">{searchResult.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Applicant:</span>
                        <span className="ml-2 font-medium">{searchResult.applicantName}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Application Date:</span>
                        <span className="ml-2">{searchResult.applicationDate}</span>
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
                        <Badge variant="outline" className="ml-2">{searchResult.category}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Type:</span>
                        <span className="ml-2">{searchResult.type}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Amount:</span>
                        <span className="ml-2 font-semibold text-lg">{searchResult.amount}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Application Progress</span>
                      <span className="text-sm text-muted-foreground">{searchResult.progress}%</span>
                    </div>
                    <Progress value={searchResult.progress} className="h-3" />
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
                    {searchResult.statusHistory.map((item: any, index: number) => (
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

              {/* Documents Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Verification</CardTitle>
                  <CardDescription>
                    Status of your submitted documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchResult.documents.map((doc: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getDocumentStatusIcon(doc.status)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                        <div className="text-right">
                          <Badge variant={doc.status === 'verified' ? 'default' : doc.status === 'pending' ? 'secondary' : 'destructive'}>
                            {doc.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Uploaded: {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {searchResult.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Hint */}
          {!searchResult && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    <strong>Demo:</strong> Try searching with reference ID "SHA-2024-001234" to see a sample application status.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationStatus;