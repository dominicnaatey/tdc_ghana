import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-serif leading-tight">
                Building Ghana's
                <span className="text-primary block">Future Together</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                TDC Ghana Ltd leads Ghana's transformation
                through innovative housing projects, strategic land development,
                and essential infrastructure that creates thriving communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Explore Housing Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View Available Land
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 pt-4">
              <div className="text-start">
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  10,500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Housing Units
                </div>
              </div>
              <div className="text-start">
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  60,200+
                </div>
                <div className="text-sm text-muted-foreground">Land Plots</div>
              </div>
              <div className="text-start">
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
              <MuxPlayer 
                playbackId="W9SyLTrBk8qABzU7mOvTBaAHTphVXXlICDEZ02kOXc00E"
                metadataVideoTitle="Welcome to TDC Ghana Ltd"
                metadataViewerUserId="user-tdc-001"
                autoPlay="muted"
                loop
                style={{width: '100%', height: '100%'}}
              />
            </div>

            {/* Floating Cards */}
            {/* <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Home className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Quality Housing</div>
                  <div className="text-sm text-muted-foreground">Affordable & Modern</div>
                </div>
              </div>
            </div> */}

            {/* <div className="absolute -top-6 -right-6 bg-background border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Infrastructure</div>
                  <div className="text-sm text-muted-foreground">World-Class Standards</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
