import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Users, BookOpen, Stethoscope, Calculator, Phone, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Services = () => {
  const educationServices = [
    {
      title: "Tuition Bursaries",
      description: "Full or partial coverage of school and university tuition fees",
      amount: "Up to R50,000/year",
      eligibility: "Academic merit + Financial need",
      icon: GraduationCap
    },
    {
      title: "Textbook Allowance",
      description: "Annual allowance for required textbooks and learning materials",
      amount: "Up to R3,000/year",
      eligibility: "All registered students",
      icon: BookOpen
    },
    {
      title: "Emergency Education Fund",
      description: "Urgent financial assistance for unexpected educational expenses",
      amount: "Up to R10,000",
      eligibility: "Crisis situations only",
      icon: Calculator
    }
  ];

  const healthServices = [
    {
      title: "Medical Care Subsidies",
      description: "Assistance with medical consultations, treatments, and procedures",
      amount: "Up to R25,000/year",
      eligibility: "Income-based assessment",
      icon: Stethoscope
    },
    {
      title: "Mental Health Support",
      description: "Counseling and therapy services for students and families",
      amount: "Up to R8,000/year",
      eligibility: "Referral required",
      icon: Heart
    },
    {
      title: "Health Emergency Fund",
      description: "Urgent medical assistance for emergency situations",
      amount: "Up to R50,000",
      eligibility: "Medical emergency only",
      icon: Heart
    }
  ];

  const supportServices = [
    {
      title: "Application Assistance",
      description: "Help with completing applications and gathering documents",
      icon: Users,
      contact: "assistance@sha.gov"
    },
    {
      title: "Financial Counseling",
      description: "Budgeting and financial planning support for recipients",
      icon: Calculator,
      contact: "+1 (555) 123-4567"
    },
    {
      title: "Academic Mentoring",
      description: "Educational guidance and mentorship programs",
      icon: GraduationCap,
      contact: "mentors@sha.gov"
    }
  ];

  const applicationProcess = [
    "Check eligibility requirements for your desired program",
    "Gather all required documentation",
    "Complete the online application form",
    "Submit application and await confirmation",
    "Track your application status online",
    "Receive decision notification via email/SMS"
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive financial assistance programs for education and health needs
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">R2.5M</div>
                <div className="text-sm text-muted-foreground">Disbursed This Year</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">1,200+</div>
                <div className="text-sm text-muted-foreground">Students Supported</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </CardContent>
            </Card>
          </div>

          {/* Education Services */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <GraduationCap className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Education Programs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {educationServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary">{service.amount}</Badge>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">Eligibility:</span>
                        <p className="text-sm text-muted-foreground">{service.eligibility}</p>
                      </div>
                      <Link to="/application">
                        <Button className="w-full">Apply Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Health Services */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Heart className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Health Programs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {healthServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline">{service.amount}</Badge>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">Eligibility:</span>
                        <p className="text-sm text-muted-foreground">{service.eligibility}</p>
                      </div>
                      <Link to="/application">
                        <Button variant="outline" className="w-full">Apply Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Support Services */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Users className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">Support Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {supportServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-muted text-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                        <div className="flex items-center text-sm">
                          {service.contact.includes('@') ? (
                            <>
                              <Mail className="w-4 h-4 mr-2 text-primary" />
                              <a href={`mailto:${service.contact}`} className="text-primary hover:underline">
                                {service.contact}
                              </a>
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2 text-primary" />
                              <a href={`tel:${service.contact}`} className="text-primary hover:underline">
                                {service.contact}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-center">How to Apply</CardTitle>
                <CardDescription className="text-center">
                  Follow these simple steps to submit your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Link to="/application">
                    <Button size="lg" className="bg-primary hover:bg-primary-hover">
                      Start Your Application
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Need Help?</CardTitle>
                <CardDescription className="text-center">
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">Monday - Friday, 8AM - 5PM</p>
                    <a href="tel:+1555123456" className="text-primary hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div>
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">Response within 24 hours</p>
                    <a href="mailto:support@sha.gov" className="text-primary hover:underline">
                      support@sha.gov
                    </a>
                  </div>
                  <div>
                    <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">In-Person Help</h3>
                    <p className="text-sm text-muted-foreground mb-2">Visit our office</p>
                    <p className="text-sm">123 Education Street, City</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Services;