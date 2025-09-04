import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, GraduationCap, Award, MapPin, Calendar, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: Users, label: "Students Supported", value: "15,000+", description: "Since 2020" },
    { icon: GraduationCap, label: "Education Programs", value: "25", description: "Active programs" },
    { icon: Heart, label: "Health Initiatives", value: "18", description: "Health support programs" },
    { icon: Award, label: "Success Rate", value: "94%", description: "Application approval rate" }
  ];

  const milestones = [
    {
      year: "2020",
      title: "SHA Foundation Established",
      description: "School Health Authority was founded to bridge the gap in educational and health support for students."
    },
    {
      year: "2021",
      title: "First 1,000 Students Supported",
      description: "Reached our first major milestone by providing assistance to over 1,000 students in our initial year."
    },
    {
      year: "2022",
      title: "Health Programs Launched",
      description: "Expanded our services to include comprehensive health and mental wellness support programs."
    },
    {
      year: "2023",
      title: "Digital Platform Launch",
      description: "Introduced our online portal making applications more accessible and transparent for all users."
    },
    {
      year: "2024",
      title: "Partnership Expansion",
      description: "Formed strategic partnerships with 50+ schools and healthcare providers across the region."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Executive Director",
      description: "15+ years in educational administration and social welfare programs."
    },
    {
      name: "Michael Chen",
      role: "Program Manager",
      description: "Specialist in financial aid programs with extensive experience in student services."
    },
    {
      name: "Dr. Amara Patel",
      role: "Health Services Director",
      description: "Medical professional focused on student health and wellness programs."
    },
    {
      name: "James Williams",
      role: "Operations Manager",
      description: "Expert in process optimization and digital platform management."
    }
  ];

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
            <Badge variant="outline" className="mb-4">Est. 2020</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About School Health Authority
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

          {/* Statistics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="font-medium text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

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

          {/* Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="outline">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-16">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Visit Our Office
                </CardTitle>
                <CardDescription className="text-center">
                  We welcome visitors and are here to help with any questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="font-semibold mb-4">Main Office</h3>
                    <div className="space-y-2 text-sm">
                      <p>123 Education Street</p>
                      <p>City, State 12345</p>
                      <p>South Africa</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-4">Office Hours</h3>
                    <div className="space-y-2 text-sm">
                      <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
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