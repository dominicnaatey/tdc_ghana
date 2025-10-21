import { Calendar, Building, CheckCircle } from "lucide-react";
import { newObjects2017 } from "@/lib/data/about-data";

export default function BackgroundHistory() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-8 text-center">
            Background Of TDC Ghana Ltd.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-start">
            <div>
              <div className="flex items-center mb-6">
                <Calendar className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground font-serif">
                  Established 1952
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In the early 1950s, the Government of the Gold Coast initiated
                the construction of a new seaport at Tema to relieve pressure on
                Takoradi Harbour, then the only deep-water port. Concurrently, a
                modern township was planned to house workers for the industrial
                activities arising from the port and the Akosombo Dam project.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Approximately 63 square miles of land, known as the Tema
                Acquisition Area (TAA), was compulsorily acquired in 1952 from
                the Traditional Authorities of Tema, Nungua and Kpone and leased
                to the newly established Tema Development Corporation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                TDC was given a 125 year lease term to manage this land area
                known as the Tema Acquisition Area. The Company since its birth
                has gone through many experiences involving structural and
                legislative changes that have cumulatively given it a new lease
                of life.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-foreground font-serif mb-4">
                Initial Functions
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Doxiadis Associates was contracted in the 1960s to develop a
                master plan for the entire Acquisition Area, which, with
                periodic revisions, continues to guide development to this day.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The 1952 Ordinance has since undergone a series of amendments.
                Until January 2017, TDC operated on the mandate as provided in
                the Tema Development Corporation (Amendment) Instrument, 1989
                (L.I. 1468), which set out the Corporation's functions as
                follows:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground text-base">
                    To plan, lay-out, and develop the Tema area;
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground text-base">
                    <p>
                      Without prejudice to the general effect of paragraph (a),
                      of this Part, the Corporation may for the purpose of the
                      attainment of the objects described in that paragraph and
                      with the prior approval of the Tema District Assembly:
                    </p>
                    <ul className="list-disc ml-6 mt-3 space-y-1">
                      <li>Construct roads, public buildings, and markets;</li>
                      <li>Prepare and execute housing schemes;</li>
                      <li>Develop industrial and commercial sites;</li>
                      <li>
                        Provide public utilities such as sewerages and street
                        lights;
                      </li>
                      <li>
                        Carry on such other activities as are incidental or
                        conducive to the attainment of its objects.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Through this amendment, the objects of TDC were revised to
                exclude responsibilities for the maintenance of roads, public
                buildings, markets and sewerage systems, as well as the
                provision of public parks and gardens, which originally formed
                part of its functions. These functions were transferred to the
                Tema District Assembly (now Tema Metropolitan Assembly - TMA).
                The amendment also led to a duplication of some development
                control functions between the Corporation and the Assembly. To
                manage the resulting potential for friction, a Joint Technical
                Evaluation Committee was established by the two institutions to
                process development permit applications.
              </p>
            </div>
          </div>
        </div>

        {/* 2017 Conversion */}
        <div className="bg-[#0D3562] rounded-2xl p-8 lg:p-12 mb-16">
          <div className="flex items-center mb-6">
            <Building className="h-8 w-8 text-accent mr-3" />
            <h3 className="text-2xl font-bold text-gray-100 font-serif">
              2017 Transformation
            </h3>
          </div>
          <p className="text-gray-100 leading-relaxed mb-8">
            In January 2017, the Government granted approval and TDC was
            converted into a Limited Liability Company. Its mandate was enhanced
            to include expanded operational and geographical scope beyond the
            Tema Acquisition Area. It was renamed TDC Ghana Ltd. Its new objects
            are:
          </p>

          <h4 className="text-xl font-bold text-gray-100 font-serif mb-6">
            Enhanced Objects & Mandate
          </h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                To carry on the objects of Tema Development Corporation as per
                the Tema Development Corporation Instrument 1965 (L.I. 469) as
                amended by the Tema Development Corporation (Amendment
                Instrument), 1989 (L.I. 1468).
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (a) To acquire land both in and outside Ghana for real estate
                development and management.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (b) The planning, development, and construction of towns and
                cities in and outside Ghana.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (c) The development and management of commercial and industrial
                areas.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (d) To provide consultancy services.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (e) To partner and /or collaborate with other real estate
                developers (both local and international) and agencies for
                provision of the above services.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (f) Investment in real estate concerns.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-100 text-sm md:text-base">
                (g) Any other activities incidental to the attainment of the
                above-stated objects.
              </p>
            </div>
          </div>

          <p className="text-gray-100 leading-relaxed mt-6">
            The new objects place enormous responsibility on TDC to expand its
            operations, engage, where necessary, additional skilled,
            experienced, and well-tested human capital, and deploy appropriate
            technology to improve the fortunes of the Company and remain
            competitive.
          </p>
          <p className="text-gray-100 leading-relaxed mt-4">
            As a government agency, TDC has a mandate to support the provision
            of social housing in addition to its commercial operations.
            Fulfilling this mandate requires direct government intervention,
            particularly in the provision of essential infrastructure at
            identified social housing sites, to ensure affordability,
            accessibility and long-term sustainability.
          </p>
        </div>

        {/* Renaming */}

        <div className="">
          <div className="flex items-center mb-6">
            <h3 className="text-2xl font-bold text-foreground font-serif">
              Change of Company Name to TDC Ghana Ltd
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To be consistent with the guidelines provided in Section 21(1)(a) of the Companies Act, 2019 (Act 992), the Board decided to change the name of the Company from TDC Development Company Limited to TDC Ghana Ltd. in April 2023 upon approval of the Shareholder.
          </p>
        </div>
      </div>
    </section>
  );
}
