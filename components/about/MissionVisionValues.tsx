import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";


export default function MissionVisionValues() {
  return (
    <section className="py-16 lg:py-24 bg-[#0D3562]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="text-center border-border bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To create and manage unique, sustainable urban settlements that meets stakeholders expectations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To maintain the leadership role in the real estate business in Ghana.
              </p>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </section>
  );
}