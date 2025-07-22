import { ArrowRight, Upload, Users, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-8 animate-scale-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Photo Sharing</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Memories,{" "}
            <span className="text-gradient">Shared Effortlessly</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Create collaborative photo galleries for events, let AI find your best shots, 
            and share memories with the people who matter most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold hover-lift">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-6 text-lg hover-lift">
              Explore Demo Room
            </Button>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up">
            <div className="gallery-card text-center p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Together</h3>
              <p className="text-muted-foreground">Everyone can contribute photos to shared event galleries</p>
            </div>

            <div className="gallery-card text-center p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Face Detection</h3>
              <p className="text-muted-foreground">Automatically collect photos where you appear</p>
            </div>

            <div className="gallery-card text-center p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Download All</h3>
              <p className="text-muted-foreground">Get all your personal photos with one click</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;