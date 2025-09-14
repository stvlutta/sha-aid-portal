import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileText, User, School, DollarSign, Upload, MapPin, Loader2, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";
import { submitApplication, uploadDocument, type ApplicationType } from "@/lib/supabase";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
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
    schoolLevel: "",
    classYear: "",
    
    // Application Details
    applicationType: "" as ApplicationType | "",
    householdSize: "",
    monthlyIncome: "",
    reasonForApplication: "",
    
    // Documents
    idDocument: null as File | null,
    schoolFeesStructure: null as File | null,
    incomeCertificate: null as File | null,
    birthCertificate: null as File | null,
  });

  // Update email when user is authenticated
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset sub county when county changes
    if (field === "county") {
      setFormData(prev => ({ ...prev, subCounty: "" }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phone && formData.nationalId && formData.dateOfBirth && formData.gender);
      case 2:
        return !!(formData.county && formData.subCounty && formData.division && formData.location && formData.subLocation && formData.village);
      case 3:
        return !!(formData.schoolName && formData.schoolLevel && formData.classYear);
      case 4:
        return !!(formData.applicationType && formData.householdSize && formData.reasonForApplication);
      case 5:
        return !!(formData.idDocument && formData.schoolFeesStructure);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!validateStep(5)) {
      toast({
        title: "Incomplete Application",
        description: "Please fill in all required fields and upload all documents.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload documents
      const documentUrls: { [key: string]: string } = {};

      if (formData.idDocument) {
        const { data, error } = await uploadDocument(formData.idDocument, user.id, 'id-document');
        if (error) throw error;
        documentUrls.id_document_url = data?.url || '';
      }

      if (formData.schoolFeesStructure) {
        const { data, error } = await uploadDocument(formData.schoolFeesStructure, user.id, 'school-fees');
        if (error) throw error;
        documentUrls.school_fees_structure_url = data?.url || '';
      }

      if (formData.incomeCertificate) {
        const { data, error } = await uploadDocument(formData.incomeCertificate, user.id, 'income-certificate');
        if (error) throw error;
        documentUrls.income_certificate_url = data?.url || '';
      }

      if (formData.birthCertificate) {
        const { data, error } = await uploadDocument(formData.birthCertificate, user.id, 'birth-certificate');
        if (error) throw error;
        documentUrls.birth_certificate_url = data?.url || '';
      }

      // Submit application
      const applicationData = {
        application_type: formData.applicationType as ApplicationType,
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        phone: formData.phone,
        email: formData.email,
        national_id: formData.nationalId,
        county: formData.county,
        sub_county: formData.subCounty,
        division: formData.division,
        location: formData.location,
        sub_location: formData.subLocation,
        village: formData.village,
        school_name: formData.schoolName,
        school_level: formData.schoolLevel,
        class_year: formData.classYear,
        household_size: parseInt(formData.householdSize),
        monthly_income: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
        reason_for_application: formData.reasonForApplication,
        ...documentUrls,
      };

      const { error } = await submitApplication(applicationData);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted. You will receive updates via email.",
      });

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting your application.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Application Submitted!</CardTitle>
              <CardDescription>
                Your application has been successfully submitted. You will receive updates on your application status via email.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => window.location.href = '/status'} className="w-full">
                Check Application Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

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
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="nationalId">National ID Number *</Label>
                <Input
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => handleInputChange("nationalId", e.target.value)}
                  placeholder="Enter your ID number"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex flex-row space-x-6 mt-2"
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
              <div>
                <Label htmlFor="division">Division *</Label>
                <Input
                  id="division"
                  value={formData.division}
                  onChange={(e) => handleInputChange("division", e.target.value)}
                  placeholder="Enter division"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <Label htmlFor="subLocation">Sub Location *</Label>
                <Input
                  id="subLocation"
                  value={formData.subLocation}
                  onChange={(e) => handleInputChange("subLocation", e.target.value)}
                  placeholder="Enter sub location"
                />
              </div>
              <div>
                <Label htmlFor="village">Village *</Label>
                <Input
                  id="village"
                  value={formData.village}
                  onChange={(e) => handleInputChange("village", e.target.value)}
                  placeholder="Enter village name"
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Select value={formData.schoolName} onValueChange={(value) => handleInputChange("schoolName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school name" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-md max-h-60 overflow-y-auto z-50">
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Ojolla Zone</div>
                    <SelectItem value="Gongo Primary">Gongo Primary</SelectItem>
                    <SelectItem value="Ogal Primary">Ogal Primary</SelectItem>
                    <SelectItem value="Oyiengo Primary">Oyiengo Primary</SelectItem>
                    <SelectItem value="Sabako Primary">Sabako Primary</SelectItem>
                    <SelectItem value="St. Aloys Ojola School">St. Aloys Ojola School</SelectItem>
                    <SelectItem value="Uradi Primary">Uradi Primary</SelectItem>
                    <SelectItem value="Usare Primary/Secondary">Usare Primary/Secondary</SelectItem>
                    <SelectItem value="Bara Primary">Bara Primary</SelectItem>
                    <SelectItem value="Rota Primary">Rota Primary</SelectItem>
                    <SelectItem value="Ongalo Primary">Ongalo Primary</SelectItem>
                    <SelectItem value="Osiri Primary">Osiri Primary</SelectItem>
                    <SelectItem value="Kibwayi Primary">Kibwayi Primary</SelectItem>
                    <SelectItem value="Lisuka Primary">Lisuka Primary</SelectItem>
                    <SelectItem value="Mboto Sunrise">Mboto Sunrise</SelectItem>
                    <SelectItem value="Nyanginja Primary">Nyanginja Primary</SelectItem>
                    <SelectItem value="Nyawara Primary">Nyawara Primary</SelectItem>
                    <SelectItem value="Obambo Primary">Obambo Primary</SelectItem>
                    <SelectItem value="Sambebe Primary">Sambebe Primary</SelectItem>
                    
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-t mt-2 pt-2">Chulaimbo Zone</div>
                    <SelectItem value="Eluhobe School">Eluhobe School</SelectItem>
                    <SelectItem value="Kuoyo School">Kuoyo School</SelectItem>
                    <SelectItem value="Maseno Girls Secondary School">Maseno Girls Secondary School</SelectItem>
                    <SelectItem value="Marera Primary">Marera Primary</SelectItem>
                    <SelectItem value="Nyakongo Primary">Nyakongo Primary</SelectItem>
                    <SelectItem value="Odowa Primary">Odowa Primary</SelectItem>
                    <SelectItem value="Chulaimbo Primary">Chulaimbo Primary</SelectItem>
                    <SelectItem value="Mbaka Oromo Primary">Mbaka Oromo Primary</SelectItem>
                    <SelectItem value="Nametsa Primary">Nametsa Primary</SelectItem>
                    <SelectItem value="Sanganyinya Primary">Sanganyinya Primary</SelectItem>
                    <SelectItem value="Sunga Primary">Sunga Primary</SelectItem>
                    <SelectItem value="Maseno Mixed">Maseno Mixed</SelectItem>
                    
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-t mt-2 pt-2">Otonglo Zone</div>
                    <SelectItem value="Kanyamony School">Kanyamony School</SelectItem>
                    <SelectItem value="Ngege Primary">Ngege Primary</SelectItem>
                    <SelectItem value="Tiengre Primary">Tiengre Primary</SelectItem>
                    <SelectItem value="Usoma Primary">Usoma Primary</SelectItem>
                    <SelectItem value="Ogongo Primary">Ogongo Primary</SelectItem>
                    <SelectItem value="Okore Ogonda Primary">Okore Ogonda Primary</SelectItem>
                    <SelectItem value="Dr. Robert Ouko School">Dr. Robert Ouko School</SelectItem>
                    <SelectItem value="Kanyamedha Primary/Secondary School">Kanyamedha Primary/Secondary School</SelectItem>
                    
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-t mt-2 pt-2">Other School</div>
                    <SelectItem value="other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
                {formData.schoolName === "other" && (
                  <Input
                    className="mt-2"
                    placeholder="Enter school name"
                    onChange={(e) => handleInputChange("schoolName", e.target.value)}
                  />
                )}
              </div>
              <div>
                <Label htmlFor="schoolLevel">School Level *</Label>
                <Select value={formData.schoolLevel} onValueChange={(value) => handleInputChange("schoolLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary School</SelectItem>
                    <SelectItem value="secondary">Secondary School</SelectItem>
                    <SelectItem value="tertiary">Tertiary Institution</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="classYear">Class/Year *</Label>
                <Input
                  id="classYear"
                  value={formData.classYear}
                  onChange={(e) => handleInputChange("classYear", e.target.value)}
                  placeholder="e.g., Class 8, Form 4, Year 2"
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

            <div className="space-y-4">
              <div>
                <Label>Application Type *</Label>
                <RadioGroup 
                  value={formData.applicationType} 
                  onValueChange={(value) => handleInputChange("applicationType", value)}
                  className="flex flex-row space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="health" id="health" />
                    <Label htmlFor="health">Health Bursary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="education" id="education" />
                    <Label htmlFor="education">Education Bursary</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="householdSize">Household Size *</Label>
                  <Input
                    id="householdSize"
                    type="number"
                    value={formData.householdSize}
                    onChange={(e) => handleInputChange("householdSize", e.target.value)}
                    placeholder="Number of people in household"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyIncome">Monthly Income (KES)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="Enter monthly income"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reasonForApplication">Reason for Application *</Label>
                <Textarea
                  id="reasonForApplication"
                  value={formData.reasonForApplication}
                  onChange={(e) => handleInputChange("reasonForApplication", e.target.value)}
                  placeholder="Explain why you need this bursary..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Required Documents</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="idDocument">National ID/Birth Certificate *</Label>
                <Input
                  id="idDocument"
                  type="file"
                  onChange={(e) => handleFileUpload("idDocument", e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a clear copy of your ID or birth certificate
                </p>
              </div>

              <div>
                <Label htmlFor="schoolFeesStructure">School Fees Structure *</Label>
                <Input
                  id="schoolFeesStructure"
                  type="file"
                  onChange={(e) => handleFileUpload("schoolFeesStructure", e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload the official school fees structure
                </p>
              </div>

              <div>
                <Label htmlFor="incomeCertificate">Income Certificate (Optional)</Label>
                <Input
                  id="incomeCertificate"
                  type="file"
                  onChange={(e) => handleFileUpload("incomeCertificate", e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload proof of income if available
                </p>
              </div>

              <div>
                <Label htmlFor="birthCertificate">Birth Certificate (Optional)</Label>
                <Input
                  id="birthCertificate"
                  type="file"
                  onChange={(e) => handleFileUpload("birthCertificate", e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload birth certificate if different from ID
                </p>
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
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Bursary Application</h1>
              <p className="text-muted-foreground">Apply for bursary support from Liet Ka Pas Community Development</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              </CardHeader>

              <CardContent>
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep === totalSteps ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>
                      Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Retry submission after auth
          setTimeout(handleSubmit, 100);
        }}
      />
    </Layout>
  );
};

export default ApplicationForm;