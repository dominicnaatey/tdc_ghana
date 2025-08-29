import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { leadership } from "@/lib/data/about-data";

export default function LeadershipTeam() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4">
            Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the experienced professionals leading TDC Ghana's mission to transform communities across Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, index) => (
            <Card key={index} className="text-center border-border">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground font-serif mb-2">{leader.name}</h3>
                <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
                  {leader.position}
                </Badge>
                <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}