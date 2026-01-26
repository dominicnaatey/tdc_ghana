import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
      <Building className="h-16 w-16 opacity-50" />
    </div>
  ),
});

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative bg-linear-to-br from-primary/5 to-accent/5 pt-10 pb-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif leading-tight">
                Leader in The Real
                <span className="text-primary block">
                  Estate Development Business
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                TDC Ghana Ltd leads Ghana's transformation through innovative
                housing projects, strategic land development, and essential
                infrastructure that creates thriving communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:pr-16 lg:pr-24	">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg w-full sm:flex-1"
              >
                <Link href="/projects">
                  Current Projects
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent h-14 px-8 text-lg w-full sm:flex-1"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 pt-1">
              <div className="text-center lg:text-start">
                <div className="text-2xl lg:text-2xl font-bold text-primary font-serif">
                  10,500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Housing Units
                </div>
              </div>
              <div className="text-center lg:text-start">
                <div className="text-2xl lg:text-2xl font-bold text-primary font-serif">
                  60,200+
                </div>
                <div className="text-sm text-muted-foreground">Land Plots</div>
              </div>
              <div className="text-center lg:text-start">
                <div className="text-2xl lg:text-2xl font-bold text-primary font-serif">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-5xl aspect-4/3 overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ease-in-out group bg-black">
              {/* Background Mux Player with scale effect */}
              <div className="absolute inset-0 transition-transform duration-10000 ease-linear scale-100 group-hover:scale-105">
                {!videoError ? (
                  <>
                    {!isVideoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm z-10">
                        <Loader2 className="h-10 w-10 text-white animate-spin" />
                      </div>
                    )}
                    <MuxPlayer
                      playbackId="W9SyLTrBk8qABzU7mOvTBaAHTphVXXlICDEZ02kOXc00E"
                      metadataVideoTitle="Welcome to TDC Ghana Ltd"
                      metadataViewerUserId="user-tdc-001"
                      streamType="on-demand"
                      className={`mux-cover pointer-events-none transition-opacity duration-500 ${
                        isVideoLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      accentColor="#00653A"
                      autoPlay="muted"
                      loop
                      muted
                      theme="microvideo"
                      playsInline
                      onCanPlay={() => setIsVideoLoaded(true)}
                      onError={() => setVideoError(true)}
                      style={
                        {
                          "--controls": "none",
                          "--media-object-fit": "cover",
                          "--media-object-position": "center",
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                        } as React.CSSProperties & {
                          [key: `--${string}`]: string | undefined;
                        }
                      }
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                    <Building className="h-16 w-16 opacity-50" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
