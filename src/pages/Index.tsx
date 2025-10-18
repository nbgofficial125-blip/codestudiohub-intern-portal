import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Rocket, 
  Code, 
  Smartphone, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail,
  Award,
  Clock,
  Zap,
  CheckCircle2,
  Star,
  Building2,
  Globe
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";

// Form validation schema
const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number"),
  college: z.string().trim().min(2, "College name required").max(200),
  courseYear: z.string().trim().min(2, "Course/Year required").max(100),
  duration: z.string().min(1, "Please select duration"),
  mode: z.string().min(1, "Please select mode"),
  skills: z.string().trim().min(10, "Please provide details about your skills").max(1000),
  resume: z.any().optional(),
  webhookUrl: z.string().url("Invalid webhook URL").optional().or(z.literal("")),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    console.log("Form submission:", data);

    try {
      const webhookUrl = data.webhookUrl || "";
      
      if (webhookUrl) {
        const formData = new FormData();
        
        // Add all form fields to FormData
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'resume' && value instanceof FileList && value.length > 0) {
            formData.append('resume', value[0]);
          } else if (key !== 'resume' && key !== 'webhookUrl') {
            formData.append(key, value as string);
          }
        });
        
        formData.append('timestamp', new Date().toISOString());
        formData.append('source', 'CodeStudioHub Internship Application');
        
        await fetch(webhookUrl, {
          method: "POST",
          body: formData,
        });
      }

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50 mb-6 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
              <Rocket className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-foreground text-sm font-bold">Now Accepting Applications</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Internship Opportunity at</span>{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-extrabold drop-shadow-lg">
                CodeStudioHub
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build real-world products. Learn from industry experts. Launch your tech career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToForm}
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-6 h-auto group"
              >
                <span className="relative z-10">Apply Now</span>
                <Rocket className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })}
                className="text-lg px-8 py-6 h-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2 shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
            <div className="w-1 h-3 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-accent/20 to-secondary/20 border-2 border-accent/50 mb-4 shadow-[0_0_15px_hsl(var(--accent)/0.3)]">
                <Building2 className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-accent text-sm font-bold">About CodeStudioHub</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Why Join{" "}
                <span className="gradient-text">Our Team?</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                CodeStudioHub is a leading tech company specializing in innovative digital solutions. 
                We work with diverse clients across industries, delivering cutting-edge web and mobile applications.
              </p>
              
              <div className="grid gap-4">
                {[
                  { icon: Code, title: "Real Projects", desc: "Work on live client and in-house projects" },
                  { icon: Users, title: "Expert Mentorship", desc: "Learn from experienced developers" },
                  { icon: TrendingUp, title: "Career Growth", desc: "Build portfolio and industry connections" },
                  { icon: Award, title: "Performance-Based", desc: "Earn based on your contributions" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg glass-card hover-lift">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                      <item.icon className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg opacity-30 blur-2xl animate-pulse-slow" />
              <div className="relative rounded-xl overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                <img 
                  src={teamCollaboration} 
                  alt="Team collaboration" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Details Section */}
      <section id="details" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-accent/20 to-secondary/20 border-2 border-accent/50 mb-4 shadow-[0_0_15px_hsl(var(--accent)/0.3)]">
              <Zap className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-accent text-sm font-bold">Internship Details</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Program Overview</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our internship program
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: Building2, 
                label: "Company", 
                value: "CodeStudioHub",
                desc: "Leading tech solutions provider",
                color: "primary"
              },
              { 
                icon: Code, 
                label: "Project Type", 
                value: "Client & In-house",
                desc: "Real-world development experience",
                color: "secondary"
              },
              { 
                icon: Clock, 
                label: "Duration", 
                value: "1 / 2 / 3 Months",
                desc: "Flexible commitment options",
                color: "accent"
              },
              { 
                icon: Globe, 
                label: "Mode", 
                value: "Online & Offline",
                desc: "Work from anywhere or on-site",
                color: "primary"
              },
              { 
                icon: TrendingUp, 
                label: "Stipend", 
                value: "Performance-based",
                desc: "Earn as you contribute",
                color: "secondary"
              },
              { 
                icon: Award, 
                label: "Evaluation", 
                value: "S4 Performance Model",
                desc: "Fair and transparent assessment",
                color: "accent"
              },
            ].map((item, idx) => (
              <Card key={idx} className="glass-card hover-lift animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${item.color} to-${item.color === 'primary' ? 'secondary' : item.color === 'secondary' ? 'accent' : 'primary'} flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(var(--${item.color})/0.5)]`}>
                    <item.icon className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                  <CardDescription className="text-base font-semibold text-foreground">
                    {item.value}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Responsibilities Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50 mb-4 shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              <CheckCircle2 className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary text-sm font-bold">What You'll Learn</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Responsibilities</h2>
            <p className="text-lg text-muted-foreground">
              Gain hands-on experience with modern technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                  <Code className="w-6 h-6 text-background" />
                </div>
                <CardTitle>Website Development</CardTitle>
                <CardDescription>Frontend & Backend mastery</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "React, TypeScript, and modern frameworks",
                    "Node.js, Express, and API development",
                    "Database design and management",
                    "Responsive UI/UX implementation",
                  ].map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(var(--secondary)/0.5)]">
                  <Smartphone className="w-6 h-6 text-background" />
                </div>
                <CardTitle>App Development</CardTitle>
                <CardDescription>Hybrid & Native platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "React Native and cross-platform development",
                    "Mobile UI/UX best practices",
                    "App deployment and distribution",
                    "Performance optimization techniques",
                  ].map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift md:col-span-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(var(--accent)/0.5)]">
                  <Users className="w-6 h-6 text-background" />
                </div>
                <CardTitle>Professional Development</CardTitle>
                <CardDescription>Beyond technical skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Collaborate with experienced developers",
                    "Participate in code reviews and sprints",
                    "Learn agile development methodologies",
                    "Build a professional portfolio",
                    "Network with industry professionals",
                    "Receive mentorship and guidance",
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/50 mb-4 shadow-[0_0_15px_hsl(var(--secondary)/0.3)]">
              <Star className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-secondary text-sm font-bold">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Interns Say</h2>
            <p className="text-lg text-muted-foreground">
              Real experiences from our internship program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "Frontend Developer Intern",
                quote: "The hands-on experience I gained at CodeStudioHub was invaluable. I worked on real client projects and learned more in 3 months than I did in a year of college.",
                rating: 5,
              },
              {
                name: "Rahul Verma",
                role: "Full-Stack Intern",
                quote: "The mentorship here is exceptional. The team was always ready to help, and I got to contribute to production code from day one. Best decision of my career!",
                rating: 5,
              },
              {
                name: "Ananya Patel",
                role: "Mobile App Intern",
                quote: "I came in knowing just the basics and left with a portfolio of apps I'm proud to show. The performance-based stipend motivated me to give my best every day.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="glass-card hover-lift animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/50 mb-4 shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              <MapPin className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary text-sm font-bold">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Visit or Contact Us</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  M/s. CodeStudioHub<br />
                  414 Punit Chambers<br />
                  Near Mafco Market Bus Stop<br />
                  Sector 18, Vashi<br />
                  Navi Mumbai – 400705
                </p>
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d73.0!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzAwLjAiTiA3M8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-secondary drop-shadow-[0_0_10px_hsl(var(--secondary))]" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg glass-card">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5 drop-shadow-[0_0_10px_hsl(var(--primary))]" />
                    <div>
                      <p className="font-semibold mb-1 text-sm">Phone Numbers</p>
                      <a href="tel:+919867153231" className="text-sm text-muted-foreground hover:text-accent block">
                        +91 98671 53231
                      </a>
                      <a href="tel:+917978416108" className="text-sm text-muted-foreground hover:text-accent block">
                        +91 79784 16108
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg glass-card">
                    <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5 drop-shadow-[0_0_10px_hsl(var(--secondary))]" />
                    <div>
                      <p className="font-semibold mb-1 text-sm">Email</p>
                      <a href="mailto:info@codestudiohub.com" className="text-sm text-muted-foreground hover:text-accent">
                        info@codestudiohub.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg glass-card">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5 drop-shadow-[0_0_10px_hsl(var(--accent))]" />
                    <div>
                      <p className="font-semibold mb-1 text-sm">Office Hours</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday: 10:00 AM - 6:00 PM</p>
                      <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={scrollToForm}
                  variant="hero" 
                  className="w-full"
                >
                  Apply for Internship
                  <Rocket className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50 mb-4 shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              <Rocket className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary text-sm font-bold">Join Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Apply Now</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to start your journey with CodeStudioHub
            </p>
          </div>

          <Card className="glass-card hover-lift border-4">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      {...register("fullName")}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/University *</Label>
                    <Input
                      id="college"
                      placeholder="Your College Name"
                      {...register("college")}
                      className={errors.college ? "border-destructive" : ""}
                    />
                    {errors.college && (
                      <p className="text-sm text-destructive">{errors.college.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseYear">Course / Year *</Label>
                  <Input
                    id="courseYear"
                    placeholder="e.g., B.Tech Computer Science - 3rd Year"
                    {...register("courseYear")}
                    className={errors.courseYear ? "border-destructive" : ""}
                  />
                  {errors.courseYear && (
                    <p className="text-sm text-destructive">{errors.courseYear.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Preferred Duration *</Label>
                    <Select onValueChange={(value) => setValue("duration", value)}>
                      <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-months">2 Months</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.duration && (
                      <p className="text-sm text-destructive">{errors.duration.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Preferred Mode *</Label>
                    <Select onValueChange={(value) => setValue("mode", value)}>
                      <SelectTrigger className={errors.mode ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.mode && (
                      <p className="text-sm text-destructive">{errors.mode.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Projects *</Label>
                  <Textarea
                    id="skills"
                    placeholder="Tell us about your skills, projects, and what you hope to learn..."
                    rows={5}
                    {...register("skills")}
                    className={errors.skills ? "border-destructive" : ""}
                  />
                  {errors.skills && (
                    <p className="text-sm text-destructive">{errors.skills.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("resume")}
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-muted-foreground">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://your-webhook-url.com"
                    {...register("webhookUrl")}
                    className={errors.webhookUrl ? "border-destructive" : ""}
                  />
                  <p className="text-xs text-muted-foreground">
                    Connect your n8n/Zapier/Make webhook to receive submissions automatically
                  </p>
                  {errors.webhookUrl && (
                    <p className="text-sm text-destructive">{errors.webhookUrl.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                  {!isSubmitting && <Rocket className="ml-2 w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to our terms and conditions
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-background via-card to-background border-t-2 border-primary/50 py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">CodeStudioHub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building the next generation of developers through hands-on experience and expert mentorship.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary-foreground">
                    Program Details
                  </button>
                </li>
                <li>
                  <button onClick={scrollToForm} className="hover:text-primary-foreground">
                    Apply Now
                  </button>
                </li>
                <li>
                  <a href="tel:+919867153231" className="hover:text-primary-foreground">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-primary">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Sector 18, Vashi, Navi Mumbai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:+919867153231" className="hover:text-primary-foreground">
                    +91 98671 53231
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:info@codestudiohub.com" className="hover:text-primary-foreground">
                    info@codestudiohub.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/30 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeStudioHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
