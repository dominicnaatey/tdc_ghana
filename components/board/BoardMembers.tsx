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

interface BoardMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  qualifications?: string[];
}

const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: "Isaac Ashai Odamtten (MP, Tema East)",
    position: "Board Chairman",
    bio: "Hon. Odamtten is a distinguished public servant and corporate executive with over two decades of leadership across the financial, governance and infrastructure development sectors. As the Board Chairman of TDC Ghana Ltd, he brings a powerful blend of visionary leadership and technical expertise to the Company's mandate in urban planning and regeneration. As Member of Parliament for Tema East, he continues to shape national policy, with active contributions across parliamentary committees on Health, Employment and State Enterprises. Hon. Odamtten holds a Postgraduate Certificate in Project Management from the Ghana Institute of Management and Public Administration (GIMPA), an MBA in Accounting from the University of Ghana Business School, a Bachelor of Commerce from the University of Cape Coast, and a Master of Practical Theology from Oral Roberts University, USA. His career has spanned corporate banking, where he served as Senior Manager, Corporate Services at International Commercial Bank (now First Bank), to public sector leadership as Metropolitan Chief Executive (MCE) of the Tema Metropolitan Assembly (2013–2017), which he led to national acclaim, earning accolades including Best Performing District (2014, 2016) and significantly advancing municipal infrastructure, sanitation and international partnerships. In both public office and corporate leadership, Hon. Odamtten has demonstrated a strategic commitment to sustainable development, stakeholder engagement and performance-based governance. His oversight of major projects, implementation of Public-Private Partnerships and advocacy for underserved communities position him as a transformational leader. As Board Chairman, he provides strategic leadership to TDC, with a focus on urban renewal, efficient service delivery and innovative infrastructure development in Tema and beyond.",
    image: "/board/1.jpg",
    qualifications: [
      "Postgraduate Certificate in Project Management - Ghana Institute of Management and Public Administration (GIMPA)",
      "MBA in Accounting - University of Ghana Business School",
      "Bachelor of Commerce - University of Cape Coast",
      "Master of Practical Theology - Oral Roberts University, USA",
    ],
  },
  {
    id: 2,
    name: "Courage Makafui Nunekpeku",
    position: "Ag Managing Director and a Member",
    bio: "Mr. Nunekpeku is a seasoned engineer with comprehensive expertise in Quantity Surveying and Project Management. Throughout his career, he has delivered exceptional results across complex infrastructure projects, collaborating with prestigious organisations including Regimanuel Gray Estate, Ghana Ports and Harbours Authority, Cappa D'Alberto PLC and Kelm Engineering Limited. His technical proficiency spans both domestic and international markets, supported by rigorous academic studies in Ghana and abroad, with a continued commitment to professional development. He holds a Master of Arts degree in Public Sector Management from the University of Ghana, Legon, where he developed a strong foundation in public administration, policy formulation and institutional governance. He also earned a Bachelor of Science with Honours in Construction Engineering and Management from Liverpool John Moores University in the United Kingdom, equipping him with comprehensive technical and managerial skills in the built environment. In addition, he pursued other academic development at the Kwame Nkrumah University of Science and Technology, the University of Ulster in Northern Ireland, United Kingdom as well as the Accra and Ho Technical Universities. Beyond his technical capabilities, Mr. Nunekpeku has proven himself as a successful entrepreneur, establishing and scaling businesses across diverse industry sectors. His strategic vision and operational expertise have enabled him to identify market opportunities and create sustainable value for stakeholders. As a leader, he combines technical precision with innovative thinking, driving results whilst maintaining the highest standards of professional integrity.",
    image: "/board/2.jpg",
    qualifications: [
      "Master of Arts in Public Sector Management - University of Ghana, Legon",
      "Bachelor of Science with Honours in Construction Engineering and Management - Liverpool John Moores University, UK",
      "Academic development at Kwame Nkrumah University of Science and Technology",
      "Academic development at University of Ulster, Northern Ireland, UK",
      "Academic development at Accra and Ho Technical Universities"
    ],
  },
  {
    id: 3,
    name: "Dorothy A. Asare-Kumah Adolf, Esq",
    position: "Board Secretary",
    bio: "Mrs. Asare-Kumah Adolf is the Head of Corporate Planning and Communications at TDC Ghana Ltd. She holds dual Master's degrees in Communications and Law (LLM) from Grand Valley University, Michigan, USA, and the University of Law, UK, respectively. Her academic background also includes a Bachelor of Arts from the University of Ghana and a Bachelor of Laws (LLB) from the Ghana Institute of Management and Public Administration (GIMPA), as well as a Qualifying Certificate in Law from the Ghana School of Law. Additionally, she holds a Postgraduate Diploma in Education from the University of Education, Winneba, and a Diploma in Journalism from the Ghana Institute of Journalism. Prior to joining TDC nearly two decades ago, Mrs. Asare-Kumah Adolf established her career in journalism and lectured briefly at Tarrant County Community College in Fort Worth, Texas, as well as at the Ghana Institute of Journalism. Since joining TDC, she has played a pivotal role in its transformation from a Public Corporation into a Limited Liability Company, offering strategic legal counsel to workers as a committed workers' Union leader. Her dual legal and communications expertise has been instrumental in staff welfare advocacy and institutional reform. She is a member of the Ghana Bar Association, the Ghana Journalists Association, and the Institute of Public Relations, Ghana.",
    image: "/board/3.jpg",
    qualifications: [
      "Master's degree in Communications - Grand Valley University, Michigan, USA",
      "Master of Laws (LLM) - University of Law, UK",
      "Bachelor of Arts - University of Ghana",
      "Bachelor of Laws (LLB) - Ghana Institute of Management and Public Administration (GIMPA)",
      "Qualifying Certificate in Law - Ghana School of Law",
      "Postgraduate Diploma in Education - University of Education, Winneba",
      "Diploma in Journalism - Ghana Institute of Journalism"
    ],
  },
  {
    id: 4,
    name: "Awal Adam",
    position: "Member",
    bio: "Mr. Adam is a seasoned professional with a strong background in communication and public administration. He brings to the Board extensive experience in strategic leadership, logistics management, and stakeholder engagement across both the public and private sectors. His career reflects a consistent commitment to institutional performance, problem-solving, and results-oriented service delivery. He holds a Master's degree in Public Administration from the Ghana Institute of Management and Public Administration (GIMPA) and a Bachelor's degree in Communication Studies from the Islamic University College, Ghana (IUCG). His academic training has equipped him with a robust foundation in policy development, organisational dynamics, and effective communication—skills he has applied across various leadership roles. Mr. Adam has served in diverse capacities including Managing Director and Board Member of Legacy Rise Sports, Technician at Ghana Link Network Services Limited, and Sales Team Member at Stanbic Bank Ghana. As a Board Member of TDC Ghana Ltd, he is committed to enhancing institutional efficiency, promoting innovation, and strengthening stakeholder relations. His deep understanding of public sector operations and strategic focus position him as a valuable contributor to the company's ongoing transformation agenda.",
    image: "/board/4.jpg",
    qualifications: [
      "Master's degree in Public Administration - Ghana Institute of Management and Public Administration (GIMPA)",
      "Bachelor's degree in Communication Studies - Islamic University College, Ghana (IUCG)"
    ],
  },
  {
    id: 5,
    name: "Abdul Gafaru Ali, Esq",
    position: "Member",
    bio: "A legal expert with specialization in real estate law and corporate governance. He ensures compliance with regulatory requirements and oversees legal aspects of major projects.",
    image: "/board/5.jpg",
    qualifications: ["LLB", "BL", "MSc Real Estate Law"],
  },
  {
    id: 6,
    name: "Ebenezer Sam",
    position: "Member",
    bio: "A marketing and communications strategist with deep understanding of the Ghanaian real estate market. She leads strategic initiatives for market expansion and customer engagement.",
    image: "/board/6.jpg",
    qualifications: [
      "MBA Marketing",
      "BSc Business Administration",
      "Certified Marketing Professional",
    ],
  },
  {
    id: 7,
    name: "Barbara L. Ayesu, Esq",
    position: "Member",
    bio: "A marketing and communications strategist with deep understanding of the Ghanaian real estate market. She leads strategic initiatives for market expansion and customer engagement.",
    image: "/board/7.jpg",
    qualifications: [
      "MBA Marketing",
      "BSc Business Administration",
      "Certified Marketing Professional",
    ],
  },
  {
    id: 8,
    name: "Ms. Patience Ankamah Addo",
    position: "Member",
    bio: "A marketing and communications strategist with deep understanding of the Ghanaian real estate market. She leads strategic initiatives for market expansion and customer engagement.",
    image: "/board/8.jpg",
    qualifications: [
      "MBA Marketing",
      "BSc Business Administration",
      "Certified Marketing Professional",
    ],
  },
];

export default function BoardMembers() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(
    null
  );

  const handleMemberClick = (member: BoardMember) => {
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
            Our Distinguished Board
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our board of directors comprises experienced professionals from
            diverse backgrounds, united in their commitment to excellence and
            sustainable development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="text-center cursor-pointer group"
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative w-full aspect-[9/10] mx-auto mb-6 rounded-lg overflow-hidden bg-gray-200 border-1 border-gray-200 shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-start mb-2 group-hover:text-gray-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-600 font-medium text-start italic">
                {member.position}
              </p>
            </div>
          ))}
        </div>

        {/* Board Committees Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">
              Board Committees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our board operates through specialized committees to ensure
              effective governance and oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">AC</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">
                  Audit Committee
                </h3>
                <p className="text-gray-600 text-sm">
                  Oversees financial reporting, internal controls, and risk
                  management processes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">RC</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">
                  Risk Committee
                </h3>
                <p className="text-gray-600 text-sm">
                  Identifies, assesses, and monitors enterprise-wide risks and
                  mitigation strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">NC</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">
                  Nominations Committee
                </h3>
                <p className="text-gray-600 text-sm">
                  Responsible for board composition, succession planning, and
                  governance matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Board Member Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          {selectedMember && (
            <div className="container mx-auto ">
              <div className="flex flex-col max-w-7xl md:flex-row items-start py-16 px-16 sm:px-6 lg:px-8">
                <div className="md:w-1/3  mb-6 md:mb-0 md:mr-12 flex-shrink-0">
                  <Image
                    src={selectedMember.image}
                    alt={`Portrait of ${selectedMember.name}`}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-md w-full object-cover object-top"
                  />
                  {selectedMember.qualifications && selectedMember.qualifications.length > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <h3 className="text-base font-bold text-gray-900 mb-2">QUALIFICATIONS</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                        {selectedMember.qualifications.map((qualification, index) => (
                          <li key={index}>{qualification}</li>
                        ))}
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
