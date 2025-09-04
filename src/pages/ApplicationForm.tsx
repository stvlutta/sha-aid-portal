import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileText, User, School, DollarSign, Upload, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Location data for Kenya
const locationData = {
  counties: [
    'Nairobi', 'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta', 'Garissa',
    'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka-Nithi', 'Embu', 'Kitui',
    'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga', 'Murang\'a', 'Kiambu', 'Turkana',
    'West Pokot', 'Samburu', 'Trans-Nzoia', 'Uasin Gishu', 'Elgeyo-Marakwet', 'Nandi',
    'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 'Kakamega',
    'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira'
  ],
  subCounties: {
    'Nairobi': ['Westlands', 'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi South', 'Embakasi North', 'Embakasi Central', 'Embakasi East', 'Embakasi West', 'Makadara', 'Kamukunji', 'Starehe', 'Mathare'],
    'Mombasa': ['Changamwe', 'Jomba', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
    'Kiambu': ['Gatundu South', 'Gatundu North', 'Juja', 'Thika Town', 'Ruiru', 'Githunguri', 'Kiambu Town', 'Kiambaa', 'Kabete', 'Kikuyu', 'Limuru', 'Lari']
  }
};

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    
    // Location Information
    county: "",
    subCounty: "",
    division: "",
    location: "",
    subLocation: "",
    village: "",
    
    // School Information
    schoolName: "",
    grade: "",
    studentId: "",
    
    // Application Details
    applicationType: "",
    category: "",
    amount: "",
    reason: "",
    
    // Documents
    documents: [] as File[],
    
    // Declaration
    declaration: false
  });

  const { toast } = useToast();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.declaration) {
      toast({
        title: "Declaration Required",
        description: "Please accept the declaration to submit your application.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. Reference ID: LKP-2024-001234",
      variant: "default"
    });

    // Reset form or redirect
    console.log("Form submitted:", formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Location Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="county">County *</Label>
                <Select value={formData.county} onValueChange={(value) => handleInputChange("county", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationData.counties.map((county) => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subCounty">Sub County *</Label>
                <Select 
                  value={formData.subCounty} 
                  onValueChange={(value) => handleInputChange("subCounty", value)}
                  disabled={!formData.county}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub county" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.county && locationData.subCounties[formData.county as keyof typeof locationData.subCounties]?.map((subCounty) => (
                      <SelectItem key={subCounty} value={subCounty}>{subCounty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="division">Division *</Label>
                <Input
                  id="division"
                  value={formData.division}
                  onChange={(e) => handleInputChange("division", e.target.value)}
                  placeholder="Enter division"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subLocation">Sub Location *</Label>
                <Input
                  id="subLocation"
                  value={formData.subLocation}
                  onChange={(e) => handleInputChange("subLocation", e.target.value)}
                  placeholder="Enter sub location"
                  required
                />
              </div>
              <div>
                <Label htmlFor="village">Village *</Label>
                <Input
                  id="village"
                  value={formData.village}
                  onChange={(e) => handleInputChange("village", e.target.value)}
                  placeholder="Enter village name"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <School className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">School Information</h3>
            </div>

            <div>
              <Label htmlFor="schoolName">School Name *</Label>
              <Input
                id="schoolName"
                value={formData.schoolName}
                onChange={(e) => handleInputChange("schoolName", e.target.value)}
                placeholder="Enter your school name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grade">Grade/Year *</Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade8">Grade 8</SelectItem>
                    <SelectItem value="grade9">Grade 9</SelectItem>
                    <SelectItem value="grade10">Grade 10</SelectItem>
                    <SelectItem value="grade11">Grade 11</SelectItem>
                    <SelectItem value="grade12">Grade 12</SelectItem>
                    <SelectItem value="university1">University Year 1</SelectItem>
                    <SelectItem value="university2">University Year 2</SelectItem>
                    <SelectItem value="university3">University Year 3</SelectItem>
                    <SelectItem value="university4">University Year 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="studentId">Student ID Number *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Application Details</h3>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="applicationType">Application Type *</Label>
              <Select value={formData.applicationType} onValueChange={(value) => handleInputChange("applicationType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bursary">Bursary</SelectItem>
                  <SelectItem value="subsidy">Subsidy</SelectItem>
                  <SelectItem value="emergency">Emergency Assistance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Requested Amount (ZAR) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="e.g., 5000"
                required
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason for Application *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                rows={4}
                placeholder="Please provide a detailed explanation of why you need this assistance..."
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Documents & Declaration</h3>
            </div>

            <div>
              <Label htmlFor="documents">Required Documents</Label>
              <div className="mt-2 p-4 border-2 border-dashed border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Please upload the following documents:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>ID Document</li>
                  <li>Proof of Registration</li>
                  <li>Academic Transcript</li>
                  <li>Proof of Income (Parent/Guardian)</li>
                  <li>Bank Statement</li>
                </ul>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-3"
                  onChange={(e) => handleInputChange("documents", Array.from(e.target.files || []))}
                />
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration}
                  onCheckedChange={(checked) => handleInputChange("declaration", checked as boolean)}
                />
                <div>
                  <Label htmlFor="declaration" className="text-sm font-medium">
                    Declaration and Consent *
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I declare that all information provided is true and accurate. I understand that providing false information may result in the rejection of my application and/or legal action. I consent to Liet Ka Pas verifying the information provided and using my personal information for the purpose of processing this application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Bursary & Subsidy Application
              </CardTitle>
              <CardDescription>
                Complete the form below to apply for financial assistance
              </CardDescription>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent>
              {renderStepContent()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep === totalSteps ? (
                  <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
                    Submit Application
                  </Button>
                ) : (
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary-hover">
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;