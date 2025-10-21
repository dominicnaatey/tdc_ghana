import { respectValues } from "@/lib/data/about-data";

export default function RespectValues() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">We live by the acronym <span className="text-accent">SPICE-IT</span></h2>
          {/* <p className="text-lg text-gray-600 mb-12">
            We live by the acronym <strong>RESPECT</strong>
          </p> */}
        </div>
        
        <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
          {respectValues.map((item, index) => (
            <div key={index} className="text-center flex-shrink-0">
              <div className="w-16 h-20 bg-[#0D3562] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl font-bold text-white">{item.letter}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 max-w-[120px] leading-tight">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}