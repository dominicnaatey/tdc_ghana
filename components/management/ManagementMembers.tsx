"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

interface ManagementMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  qualifications?: string[];
}

const managementMembers: ManagementMember[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Chief Executive Officer",
    bio: "John Doe is a seasoned executive with over 20 years of experience in real estate development and urban planning. He has led numerous successful projects across Ghana and West Africa, focusing on sustainable development and community empowerment. His strategic vision and operational expertise have been instrumental in TDC Ghana's growth and transformation.<br><br>Under his leadership, TDC Ghana has expanded its portfolio to include innovative housing solutions, commercial developments, and infrastructure projects that serve the needs of Ghana's growing population. He is committed to excellence in service delivery and maintaining the highest standards of corporate governance.<br><br>John holds advanced degrees in Business Administration and Urban Planning, and is a certified project management professional. He is passionate about creating sustainable communities that enhance the quality of life for all residents.",
    image: "/board/1.jpg",
    qualifications: [
      "Master of Business Administration - University of Ghana Business School",
      "Bachelor of Science in Urban Planning - Kwame Nkrumah University of Science and Technology",
      "Project Management Professional (PMP) Certification",
      "Certified Real Estate Professional",
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Chief Financial Officer",
    bio: "Jane Smith is a distinguished finance professional with extensive experience in corporate finance, financial planning, and risk management. She has been instrumental in strengthening TDC Ghana's financial position and implementing robust financial controls and reporting systems.<br><br>Her expertise spans financial analysis, budgeting, treasury management, and investor relations. She has successfully managed multiple financing arrangements and has been key in securing funding for major development projects. Her strategic financial leadership has contributed significantly to the company's sustainable growth.<br><br>Jane is a chartered accountant with additional qualifications in finance and economics. She is committed to maintaining the highest standards of financial integrity and transparency in all operations.",
    image: "/board/2.jpg",
    qualifications: [
      "Chartered Accountant (CA) - Institute of Chartered Accountants, Ghana",
      "Master of Science in Finance - University of Ghana",
      "Bachelor of Commerce in Accounting - University of Cape Coast",
      "Certified Financial Risk Manager (FRM)",
    ],
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Chief Operations Officer",
    bio: "Michael Johnson is an experienced operations leader with a proven track record in project management, construction oversight, and operational excellence. He oversees all operational aspects of TDC Ghana's projects, ensuring quality delivery and customer satisfaction.<br><br>His expertise includes construction management, quality assurance, supply chain management, and process optimization. He has successfully delivered numerous residential and commercial projects on time and within budget, while maintaining the highest quality standards.<br><br>Michael is passionate about innovation in construction technology and sustainable building practices. He continuously seeks ways to improve operational efficiency and reduce environmental impact in all projects.",
    image: "/board/3.jpg",
    qualifications: [
      "Master of Science in Construction Management - Kwame Nkrumah University of Science and Technology",
      "Bachelor of Engineering in Civil Engineering - University of Ghana",
      "Project Management Professional (PMP) Certification",
      "LEED Accredited Professional",
    ],
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Head of Human Resources",
    bio: "Sarah Williams is a strategic human resources leader with extensive experience in talent management, organizational development, and employee relations. She is responsible for developing and implementing HR strategies that support TDC Ghana's business objectives and foster a positive work environment.<br><br>Her expertise includes recruitment and selection, performance management, training and development, and compensation and benefits administration. She has been instrumental in building a strong organizational culture that promotes excellence, integrity, and teamwork.<br><br>Sarah is committed to developing talent and creating opportunities for career growth and advancement for all employees. She believes in the power of people to drive organizational success.",
    image: "/board/4.jpg",
    qualifications: [
      "Master of Arts in Human Resource Management - University of Ghana",
      "Bachelor of Arts in Psychology - University of Cape Coast",
      "Senior Professional in Human Resources (SPHR) Certification",
      "Certified Compensation Professional (CCP)",
    ],
  },
  {
    id: 5,
    name: "David Brown",
    position: "Head of Marketing & Sales",
    bio: "David Brown is a dynamic marketing and sales professional with a deep understanding of the real estate market in Ghana. He leads TDC Ghana's marketing initiatives and sales strategies, focusing on building strong customer relationships and driving business growth.<br><br>His expertise includes market research, brand management, digital marketing, and sales management. He has successfully launched several marketing campaigns that have significantly increased brand awareness and customer acquisition.<br><br>David is passionate about understanding customer needs and delivering solutions that exceed expectations. He believes in building long-term relationships with customers based on trust and value delivery.",
    image: "/board/5.jpg",
    qualifications: [
      "Master of Business Administration in Marketing - University of Ghana Business School",
      "Bachelor of Arts in Marketing - University of Professional Studies, Accra",
      "Digital Marketing Certification - Google",
      "Certified Sales Professional (CSP)",
    ],
  },
  {
    id: 6,
    name: "Lisa Davis",
    position: "Head of Legal & Compliance",
    bio: "Lisa Davis is a seasoned legal professional with extensive experience in corporate law, real estate law, and regulatory compliance. She ensures that TDC Ghana operates in full compliance with all applicable laws and regulations while protecting the company's legal interests.<br><br>Her expertise includes contract negotiation, property law, corporate governance, and risk management. She has successfully handled numerous complex legal matters and has been instrumental in establishing robust compliance frameworks.<br><br>Lisa is committed to maintaining the highest standards of legal and ethical conduct in all business operations. She provides strategic legal counsel to support business objectives while mitigating legal risks.",
    image: "/board/6.jpg",
    qualifications: [
      "Master of Laws (LLM) in Corporate Law - University of Ghana",
      "Bachelor of Laws (LLB) - University of Ghana",
      "Qualifying Certificate in Law - Ghana School of Law",
      "Member of Ghana Bar Association",
    ],
  },
];

export default function ManagementMembers() {
  const [selectedMember, setSelectedMember] = useState<ManagementMember | null>(
    null
  );

  const handleMemberClick = (member: ManagementMember) => {
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    setSelectedMember(null);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
            Our Management Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our management team comprises experienced professionals dedicated to
            operational excellence and strategic growth in real estate development.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8">
          {managementMembers.map((member) => (
            <div
              key={member.id}
              className="text-center cursor-pointer group"
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative w-full aspect-[9/10] mx-auto mb-4 md:mb-6 rounded-lg overflow-hidden bg-gray-200 border-1 border-gray-200 shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-base md:text-xl font-bold text-gray-900 text-start md:text-center mb-2 group-hover:text-gray-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-medium text-start md:text-center italic">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Management Member Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden overflow-y-auto ">
            <DialogTitle className="sr-only">
              {selectedMember?.name || "Management Member Details"}
            </DialogTitle>
            {selectedMember && (
              <div className="w-full">
                <div className="flex flex-col md:flex-row items-start py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:px-12">
                  <div className="md:w-1/3  mb-6 md:mb-0 md:mr-12 flex-shrink-0">
                    <Image
                      src={selectedMember.image}
                      alt={`Portrait of ${selectedMember.name}`}
                      width={300}
                      height={375}
                      className="rounded-lg shadow-md w-full aspect-[14/15] object-cover object-top"
                    />
                    {selectedMember.qualifications &&
                      selectedMember.qualifications.length > 0 && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-md hidden md:block">
                          <h3 className="text-base font-bold text-gray-900 mb-2">
                            QUALIFICATIONS
                          </h3>
                          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                            {selectedMember.qualifications.map(
                              (qualification, index) => (
                                <li key={index}>{qualification}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                  <div className="md:w-2/3">
                    <h1 className="text-2xl font-bold text-black tracking-wider">
                      {selectedMember.name}
                    </h1>
                    <h2 className="text-sm font-semibold text-accent tracking-widest mt-2">
                      {selectedMember.position}
                    </h2>
                    {selectedMember.qualifications &&
                      selectedMember.qualifications.length > 0 && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-md md:hidden">
                          <h3 className="text-base font-bold text-gray-900 mb-2">
                            QUALIFICATIONS
                          </h3>
                          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                            {selectedMember.qualifications.map(
                              (qualification, index) => (
                                <li key={index}>{qualification}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    <div className="mt-6 text-gray-900 text-start space-y-4">
                      <div
                        dangerouslySetInnerHTML={{ __html: selectedMember.bio }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
      </Dialog>
    </section>
  );
}