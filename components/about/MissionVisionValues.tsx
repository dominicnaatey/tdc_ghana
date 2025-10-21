import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, ShieldCheck } from "lucide-react";

export default function MissionVisionValues() {
  return (
    <section className="py-16 lg:py-24 bg-[#0D3562]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100 font-serif text-center">
            Corporate Direction: Vision, Mission and Core Values
          </h2>
        </div>
        <p className="text-gray-100 leading-relaxed mb-8 text-center ">
          The Company’s vision, mission and core values are set out below as the
          guiding principles that define its strategic direction, institutional
          culture and commitment to stakeholders:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center border-border bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
                Vision Statement
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-base">
                To be Ghana’s premier real estate developer with global impact.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
                Mission Statement
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-base">
                We create sustainable, innovative, urban environments that
                exceed the expectations of our stakeholders, enhance community
                well-being and promote environmental stewardship for future
                generations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-serif mb-4">
                Our Core Values
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-base">
                The values of TDC Ghana Ltd define who we are, shape our culture
                and guide how we deliver on our mandate. They provide the
                foundation for decision-making, stakeholder engagement and the
                execution of our strategic objectives.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
