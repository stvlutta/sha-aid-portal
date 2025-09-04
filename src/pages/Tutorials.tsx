import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, FileText, Clock, CheckCircle, Download, Users, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Tutorials = () => {
  const videoTutorials = [
    {
      title: "How to Apply for a Bursary",
      duration: "8:32",
      thumbnail: "/placeholder.svg",
      description: "Step-by-step guide through the entire application process",
      category: "Getting Started"
    },
    {
      title: "Required Documents Explained",
      duration: "5:45",
      thumbnail: "/placeholder.svg",
      description: "Understanding what documents you need and how to prepare them",
      category: "Documentation"
    },
    {
      title: "Checking Your Application Status",
      duration: "3:21",
      thumbnail: "/placeholder.svg",
      description: "Learn how to track your application progress online",
      category: "Status Tracking"
    },
    {
      title: "Health Subsidy Applications",
      duration: "6:15",
      thumbnail: "/placeholder.svg",
      description: "Specific guidance for health-related financial assistance",
      category: "Health"
    }
  ];

  const faqItems = [
    {
      question: "Who is eligible to apply for SHA bursaries?",
      answer: "Students enrolled in registered educational institutions who meet our financial need criteria are eligible. This includes high school students (grades 8-12) and university students. Applicants must be South African citizens or permanent residents."
    },
    {
      question: "What documents do I need to submit?",
      answer: "Required documents include: certified copy of ID document, proof of registration from your school/university, latest academic transcript, proof of household income, and bank statements for the last 3 months."
    },
    {
      question: "How long does the application process take?",
      answer: "The standard processing time is 4-6 weeks from the date all required documents are received. Emergency applications may be processed faster (2-3 weeks) depending on circumstances."
    },
    {
      question: "Can I apply for both education and health assistance?",
      answer: "Yes, you can submit separate applications for both categories if you meet the eligibility criteria for each. However, each application will be assessed independently."
    },
    {
      question: "What happens if my application is rejected?",
      answer: "If your application is unsuccessful, you will receive detailed feedback explaining the reasons. You may appeal the decision within 30 days or reapply in the next application cycle with additional supporting documentation."
    },
    {
      question: "How will I receive the funds if approved?",
      answer: "Approved funds are typically paid directly to your bank account within 5-10 business days of approval. For education bursaries, we may also pay directly to the institution depending on the arrangement."
    }
  ];

  const stepByStepGuide = [
    {
      step: 1,
      title: "Prepare Your Documents",
      description: "Gather all required documents including ID, proof of registration, academic records, and financial information.",
      icon: FileText
    },
    {
      step: 2,
      title: "Complete the Application",
      description: "Fill out the online application form with accurate personal, academic, and financial information.",
      icon: BookOpen
    },
    {
      step: 3,
      title: "Submit Application",
      description: "Review all information carefully and submit your application. You'll receive a reference number.",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Track Your Progress",
      description: "Use your reference number to check the status of your application online.",
      icon: Clock
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Tutorials & Help</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about applying for SHA bursaries and subsidies
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How to Apply in 4 Simple Steps</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {stepByStepGuide.map((item) => (
                <Card key={item.step} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">Step {item.step}</div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Video Tutorials */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Video Tutorials</h2>
              <Badge variant="secondary">
                <Users className="w-4 h-4 mr-1" />
                {videoTutorials.length} Videos
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {videoTutorials.map((video, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-primary/80 hover:bg-primary">
                        <PlayCircle className="w-6 h-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{video.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Downloadable Resources */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Downloadable Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">Application Checklist</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete checklist of all required documents and information needed for your application.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">Eligibility Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed guidelines explaining who qualifies for different types of assistance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">Sample Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Example of a completed application form to guide you through the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;