import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResidentialCommercialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0D3562] border-b border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-100 mb-4">
              Serviced Residential & Commercial Plots
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Guidelines for acquiring Serviced Residential or Commercial Plots on leasehold basis at Community 24, our Current Project Site, off the Tema - Accra motorway.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-900">
              Serviced Residential & Commercial Plots - Community 24
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900 mb-6">
                The following are guidelines to acquiring Serviced Residential or Commercial Plots on leasehold basis at Community 24, our Current Project Site, off the Tema - Accra motorway.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">1</span>
                  <p className="pt-1">
                    Your parcel of land will be improved with a network of Tarred Roads, Drains and Gutters, Electricity and Water Supply.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">2</span>
                  <div className="pt-1">
                    <p className="mb-2">
                      An installment payment plan has been put in place to help you acquire the serviced plot:
                    </p>
                    <p className="ml-4 text-gray-600">
                      A minimum 40% deposit of the selling price is required for the plot to be earmarked for each applicant.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">3</span>
                  <p className="pt-1">
                    Please note that the allocation will be on first-come-first-serve basis and noncompliance with the terms of payment will lead to a withdrawal of the plot reserved for you. You will also be subject to any new policy, rule or by-law that may be adopted and or passed by the Corporation.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">4</span>
                  <p className="pt-1">
                    Offer and right of entry letters will only be issued to applicants who have completed payments.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">5</span>
                  <p className="pt-1">
                    Refunds, whether on the basis of request or withdrawal of a plot reservation due to non-payment of the full price shall be made without interest and in the currency made. Original receipts must be attached to request.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">6</span>
                  <p className="pt-1">
                    Kindly note that, after the processing of offer letters and site plans and the rights of entry, refunds will attract a 3% deduction.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center font-semibold text-sm">7</span>
                  <div className="pt-1">
                    <p className="mb-2">
                      Applicants should note that plots once acquired fully must be developed within two (2) years from the offer date.
                    </p>
                    <p className="ml-4 text-gray-600">
                      Extensions may be granted on limited basis by applying to the Managing Director stating tangible reasons.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
                <p className="text-amber-700">
                  All applicants are advised to carefully read and understand these guidelines before proceeding with plot acquisition. For further inquiries, please contact our office.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}