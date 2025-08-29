import { Calendar, Building, CheckCircle } from "lucide-react";
import { initialFunctions, newObjects2017 } from "@/lib/data/about-data";

export default function BackgroundHistory() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-8 text-center">
            Background Of TDC Ghana Ltd.
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center mb-6">
                <Calendar className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground font-serif">Established 1952</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The TDC Ghana Ltd was set up in 1952 by an Act of Parliament with the sole responsibility to plan and develop about 63 square miles of public land for various land cases and also manage the township that had been created to provide accommodation to those that would be engaged in these economic operations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                TDC was given a 125 year lease term to manage this land area known as the Tema Acquisition Area. The Company since its birth has gone through many experiences involving structural and legislative changes that have cumulatively given it a new lease of life.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-foreground font-serif mb-4">Initial Functions</h4>
              <div className="space-y-3">
                {initialFunctions.map((func, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">{func}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2017 Conversion */}
        <div className="bg-[#0D3562] rounded-2xl p-8 lg:p-12">
          <div className="flex items-center mb-6">
            <Building className="h-8 w-8 text-accent mr-3" />
            <h3 className="text-2xl font-bold text-gray-100 font-serif">2017 Transformation</h3>
          </div>
          <p className="text-gray-100 leading-relaxed mb-8">
            In 2017, TDC was converted into a Limited Liability Company with enhanced mandate to expand its operational and geographical scope beyond the Tema Acquisition Area.
          </p>
          
          <h4 className="text-xl font-bold text-gray-100 font-serif mb-6">Enhanced Objects & Mandate</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newObjects2017.map((obj, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-100 text-sm md:text-base">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}