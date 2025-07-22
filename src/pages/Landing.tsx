
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Landing = () => {
  const features = [
    {
      title: "Room-Based Sharing",
      description: "Create dedicated galleries for each event or occasion",
      benefits: ["Organized by event", "Easy collaboration", "Private or public options"]
    },
    {
      title: "AI Face Detection",
      description: "Automatically find photos where you appear",
      benefits: ["Smart photo discovery", "Personal galleries", "Time-saving automation"]
    },
    {
      title: "Seamless Upload",
      description: "Upload multiple photos at once with drag & drop",
      benefits: ["Batch uploads", "Progress tracking", "Multiple formats supported"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How MemoryShare Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to organize and share your memories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🏠
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Create or Join a Room</h3>
              <p className="text-muted-foreground">Set up a gallery for your event or join using a room code</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                📸
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Upload & Share Photos</h3>
              <p className="text-muted-foreground">Everyone can contribute photos to the shared gallery</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                ✨
              </div>
              <h3 className="text-xl font-semibold mb-3">3. AI Finds Your Photos</h3>
              <p className="text-muted-foreground">Automatically discover all photos where you appear</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to share and organize memories effortlessly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-accent/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Memories?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating beautiful photo galleries together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Demo Room
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">MemoryShare</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              The easiest way to share and organize photos from any event.
            </p>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            © 2024 MemoryShare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
