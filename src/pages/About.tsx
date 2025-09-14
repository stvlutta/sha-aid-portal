import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, GraduationCap, Award, MapPin, Calendar, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every case with empathy and understanding, recognizing that behind every application is a student with dreams and aspirations."
    },
    {
      icon: Users,
      title: "Equity",
      description: "We believe every student deserves equal access to education and healthcare, regardless of their financial background."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in our programs and services, continuously improving to better serve our community."
    },
    {
      icon: TrendingUp,
      title: "Transparency",
      description: "We maintain open communication and clear processes, ensuring applicants understand every step of their journey."
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Liet Ka Pas Community Development
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We are dedicated to breaking down financial barriers that prevent students from accessing 
              quality education and healthcare. Our mission is to create a more equitable society where 
              every student can reach their full potential.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <Target className="w-8 h-8 mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To provide accessible financial assistance and support services that enable students 
                  to pursue their educational goals and maintain their health and wellbeing, creating 
                  lasting positive impact in our communities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent text-accent-foreground">
              <CardHeader>
                <GraduationCap className="w-8 h-8 mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A world where financial circumstances never limit a student's access to education 
                  and healthcare, fostering a generation of empowered individuals who contribute 
                  meaningfully to society.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted text-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Location Information */}
          <section className="mb-16">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Our Service Area
                </CardTitle>
                <CardDescription className="text-center">
                  Serving the Kisumu West community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="space-y-2 text-sm">
                    <p>Kisumu West Sub-County</p>
                    <p>Kisumu County, Kenya</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
                <p className="text-xl mb-6 opacity-90">
                  Take the first step towards securing your educational future
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/application">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Start Application
                    </Button>
                  </Link>
                  <Link to="/tutorials">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      Learn How to Apply
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;