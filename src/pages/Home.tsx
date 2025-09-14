import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, FileText, Clock, Users, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Home = () => {

  const services = [
    {
      icon: GraduationCap,
      title: "Education Bursaries",
      description: "Financial support for tuition, books, and educational materials",
      category: "Education"
    },
    {
      icon: Heart,
      title: "Health Subsidies",
      description: "Medical care assistance and health program funding",
      category: "Health"
    },
    {
      icon: FileText,
      title: "Application Support",
      description: "Guidance and assistance throughout the application process",
      category: "Support"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Liet Ka Pas Community Development
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Supporting education and health through accessible financial assistance programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <FileText className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              </Link>
              <Link to="/status">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Clock className="w-5 h-5 mr-2" />
                  Check Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive support for both educational and health-related financial assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Actions</h2>
            <p className="text-muted-foreground">Everything you need to get started</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/application">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">New Application</h3>
                  <p className="text-sm text-muted-foreground">Start your bursary application</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/status">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Check Status</h3>
                  <p className="text-sm text-muted-foreground">Track your application</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tutorials">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Learn how to apply</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/services">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Services</h3>
                  <p className="text-sm text-muted-foreground">Explore all programs</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;