import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building, Maximize, Minimize } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  // Feature flag to enable/disable fullscreen functionality
  const FULLSCREEN_ENABLED = false; // Set to true to reactivate fullscreen feature
  
  const [videoError, setVideoError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen changes (disabled when FULLSCREEN_ENABLED is false)
  useEffect(() => {
    if (!FULLSCREEN_ENABLED) return;
    
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen function (disabled when FULLSCREEN_ENABLED is false)
  const toggleFullscreen = async () => {
    if (!FULLSCREEN_ENABLED || !videoContainerRef.current) return;

    try {
      if (!isFullscreen) {
        await videoContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 pt-10 pb-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground font-serif leading-tight">
                Leaders in real 
                <span className="text-primary block">Estates Business</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                TDC Ghana Ltd leads Ghana's transformation through innovative
                housing projects, strategic land development, and essential
                infrastructure that creates thriving communities.
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
              <div className="text-center lg:text-start"> 

                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  10,500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Housing Units
                </div>
              </div>
              <div className="text-center lg:text-start">
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  60,200+
                </div>
                <div className="text-sm text-muted-foreground">Land Plots</div>
              </div>
              <div className="text-center lg:text-start">
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="relative order-1 lg:order-2">
            <div 
              ref={videoContainerRef}
              className={`relative overflow-hidden bg-black transition-all duration-300 ${
                FULLSCREEN_ENABLED && isFullscreen 
                  ? 'fixed inset-0 z-50 w-screen h-screen aspect-auto' 
                  : 'aspect-video'
              }`}
            >
              {/* Expand/Collapse Button (hidden when FULLSCREEN_ENABLED is false) */}
              {FULLSCREEN_ENABLED && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5" />
                  ) : (
                    <Maximize className="h-5 w-5" />
                  )}
                </button>
              )}

              {!videoError ? (
                <MuxPlayer
                  playbackId="W9SyLTrBk8qABzU7mOvTBaAHTphVXXlICDEZ02kOXc00E"
                  metadataVideoTitle="Welcome to TDC Ghana Ltd"
                  metadataViewerUserId="user-tdc-001"
                  autoPlay="muted"
                  loop
                  onError={() => setVideoError(true)}
                  style={
                    {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      objectFit: "cover",
                      "--control-bar": "flex",
                      "--top-control-bar": "none",
                      "--center-controls": "none",
                      "--play-button": "none",
                      "--seek-backward-button": "none",
                      "--seek-forward-button": "none",
                      "--time-display": "none",
                      "--time-range": "none",
                      "--duration-display": "none",
                      "--rendition-menu-button": "none",
                      "--captions-menu-button": "none",
                      "--airplay-button": "none",
                      "--cast-button": "none",
                      "--pip-button": "none",
                      "--fullscreen-button": "none",
                      "--volume-range": "flex",
                      "--mute-button": "flex",
                    } as React.CSSProperties
                  }
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Building className="h-16 w-16 text-primary mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">TDC Ghana Ltd</h3>
                      <p className="text-muted-foreground">Building Ghana's Future Together</p>
                    </div>
                  </div>
                </div>
              )}
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
