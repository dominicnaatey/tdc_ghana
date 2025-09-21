import Image from "next/image"

export default function PlotOptionsPricesPage() {
  const plotImages = [
    {
      id: 1,
      src: "/serviced-plots/tdcplotland1.jpg",
      alt: "TDC Ghana serviced plot in Tema Community 25"
    },
    {
      id: 2,
      src: "/serviced-plots/tdcplotland2.jpg",
      alt: "TDC Ghana serviced plot in Tema Community 26"
    },
    {
      id: 3,
      src: "/serviced-plots/tdcplotland3.jpg",
      alt: "TDC Ghana serviced plots development"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Title */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            TDC Ghana Ltd offers serviced plots located in{" "}
            <span className="text-blue-600">Tema Communities 25 and 26</span>
          </h1>
        </div>
      </section>

      {/* Main Images Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Large Image */}
          <div className="mb-8">
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={plotImages[0].src}
                alt={plotImages[0].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Two Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={plotImages[1].src}
                alt={plotImages[1].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={plotImages[2].src}
                alt={plotImages[2].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Bottom Image */}
      <section className="py-8">
        <div className="w-full">
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <Image
              src={plotImages[0].src}
              alt="TDC Ghana serviced plots panoramic view"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Premium Serviced Plots
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                  Tema Communities 25 & 26
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}