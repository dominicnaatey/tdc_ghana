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
    bio: "Hon. Odamtten is a distinguished public servant and corporate executive with over two decades of leadership across the financial, governance and infrastructure development sectors. As the Board Chairman of TDC Ghana Ltd, he brings a powerful blend of visionary leadership and technical expertise to the Company's mandate in urban planning and regeneration. As Member of Parliament for Tema East, he continues to shape national policy, with active contributions across parliamentary committees on Health, Employment and State Enterprises.</br></br> Hon. Odamtten holds a Postgraduate Certificate in Project Management from the Ghana Institute of Management and Public Administration (GIMPA), an MBA in Accounting from the University of Ghana Business School, a Bachelor of Commerce from the University of Cape Coast, and a Master of Practical Theology from Oral Roberts University, USA. His career has spanned corporate banking, where he served as Senior Manager, Corporate Services at International Commercial Bank (now First Bank), to public sector leadership as Metropolitan Chief Executive (MCE) of the Tema Metropolitan Assembly (2013–2017), which he led to national acclaim, earning accolades including Best Performing District (2014, 2016) and significantly advancing municipal infrastructure, sanitation and international partnerships.</br></br> In both public office and corporate leadership, Hon. Odamtten has demonstrated a strategic commitment to sustainable development, stakeholder engagement and performance-based governance. His oversight of major projects, implementation of Public-Private Partnerships and advocacy for underserved communities position him as a transformational leader. As Board Chairman, he provides strategic leadership to TDC, with a focus on urban renewal, efficient service delivery and innovative infrastructure development in Tema and beyond.",
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
    position: "AG Managing Director and a Member",
    bio: "Mr. Nunekpeku is a seasoned engineer with comprehensive expertise in Quantity Surveying and Project Management. Throughout his career, he has delivered exceptional results across complex infrastructure projects, collaborating with prestigious organisations including Regimanuel Gray Estate, Ghana Ports and Harbours Authority, Cappa D'Alberto PLC and Kelm Engineering Limited. His technical proficiency spans both domestic and international markets, supported by rigorous academic studies in Ghana and abroad, with a continued commitment to professional development.</br></br> He holds a Master of Arts degree in Public Sector Management from the University of Ghana, Legon, where he developed a strong foundation in public administration, policy formulation and institutional governance. He also earned a Bachelor of Science with Honours in Construction Engineering and Management from Liverpool John Moores University in the United Kingdom, equipping him with comprehensive technical and managerial skills in the built environment. In addition, he pursued other academic development at the Kwame Nkrumah University of Science and Technology, the University of Ulster in Northern Ireland, United Kingdom as well as the Accra and Ho Technical Universities.</br></br> Beyond his technical capabilities, Mr. Nunekpeku has proven himself as a successful entrepreneur, establishing and scaling businesses across diverse industry sectors. His strategic vision and operational expertise have enabled him to identify market opportunities and create sustainable value for stakeholders. As a leader, he combines technical precision with innovative thinking, driving results whilst maintaining the highest standards of professional integrity.",
    image: "/board/2.jpg",
    qualifications: [
      "Master of Arts in Public Sector Management - University of Ghana, Legon",
      "Bachelor of Science with Honours in Construction Engineering and Management - Liverpool John Moores University, UK",
      "Academic development at Kwame Nkrumah University of Science and Technology",
      "Academic development at University of Ulster, Northern Ireland, UK",
      "Academic development at Accra and Ho Technical Universities",
    ],
  },
  {
    id: 3,
    name: "Dorothy A. Asare-Kumah Adolf, Esq",
    position: "Board Secretary",
    bio: "Mrs. Asare-Kumah Adolf is the Head of Corporate Planning and Communications at TDC Ghana Ltd. She holds dual Master's degrees in Communications and Law (LLM) from Grand Valley University, Michigan, USA, and the University of Law, UK, respectively. Her academic background also includes a Bachelor of Arts from the University of Ghana and a Bachelor of Laws (LLB) from the Ghana Institute of Management and Public Administration (GIMPA), as well as a Qualifying Certificate in Law from the Ghana School of Law. Additionally, she holds a Postgraduate Diploma in Education from the University of Education, Winneba, and a Diploma in Journalism from the Ghana Institute of Journalism.<br><br> Prior to joining TDC nearly two decades ago, Mrs. Asare-Kumah Adolf established her career in journalism and lectured briefly at Tarrant County Community College in Fort Worth, Texas, as well as at the Ghana Institute of Journalism. Since joining TDC, she has played a pivotal role in its transformation from a Public Corporation into a Limited Liability Company, offering strategic legal counsel to workers as a committed workers' Union leader. Her dual legal and communications expertise has been instrumental in staff welfare advocacy and institutional reform. She is a member of the Ghana Bar Association, the Ghana Journalists Association, and the Institute of Public Relations, Ghana.",
    image: "/board/3.jpg",
    qualifications: [
      "Master's degree in Communications - Grand Valley University, Michigan, USA",
      "Master of Laws (LLM) - University of Law, UK",
      "Bachelor of Arts - University of Ghana",
      "Bachelor of Laws (LLB) - Ghana Institute of Management and Public Administration (GIMPA)",
      "Qualifying Certificate in Law - Ghana School of Law",
      "Postgraduate Diploma in Education - University of Education, Winneba",
      "Diploma in Journalism - Ghana Institute of Journalism",
    ],
  },
  {
    id: 4,
    name: "Awal Adam",
    position: "Member",
    bio: "Mr. Adam is a seasoned professional with a strong background in communication and public administration. He brings to the Board extensive experience in strategic leadership, logistics management, and stakeholder engagement across both the public and private sectors. His career reflects a consistent commitment to institutional performance, problem-solving, and results-oriented service delivery.<br><br> He holds a Master's degree in Public Administration from the Ghana Institute of Management and Public Administration (GIMPA) and a Bachelor's degree in Communication Studies from the Islamic University College, Ghana (IUCG). His academic training has equipped him with a robust foundation in policy development, organisational dynamics, and effective communication—skills he has applied across various leadership roles.<br></br> Mr. Adam has served in diverse capacities including Managing Director and Board Member of Legacy Rise Sports, Technician at Ghana Link Network Services Limited, and Sales Team Member at Stanbic Bank Ghana. As a Board Member of TDC Ghana Ltd, he is committed to enhancing institutional efficiency, promoting innovation, and strengthening stakeholder relations. His deep understanding of public sector operations and strategic focus position him as a valuable contributor to the company's ongoing transformation agenda.",
    image: "/board/4.jpg",
    qualifications: [
      "Master's degree in Public Administration - Ghana Institute of Management and Public Administration (GIMPA)",
      "Bachelor's degree in Communication Studies - Islamic University College, Ghana (IUCG)",
    ],
  },
  {
    id: 5,
    name: "Abdul Gafaru Ali, Esq",
    position: "Member",
    bio: "Mr. Ali is a legal practitioner and governance professional with a strong foundation in litigation, corporate advisory, and public policy engagement. He holds a Qualifying Certificate in Law from the Ghana School of Law, as well as a Bachelor of Laws (LLB) and a Bachelor of Arts in Political Science from the University of Ghana. His multidisciplinary background equips him with critical expertise in legal interpretation, institutional development, and regulatory compliance.<br><br> He currently serves as a Senior Associate at Sustineri Attorneys PRUC, where he leads the firm's Dispute Practice Division. His practice focuses on property acquisition, immovable property litigation, corporate transactions, trade and investment, and estate planning. Mr. Ali is a member of the Ghana Bar Association and has participated in several international leadership platforms, including the Friedrich Ebert Stiftung / You-Net Young Leaders Programme and the Socialist & Democrats (S&D Group) Africa Week Summit at the European Parliament in Brussels. <br><br> Beyond legal practice, Mr. Ali has contributed meaningfully to legal scholarship through publications and editorial work, reinforcing his commitment to thought leadership within the profession. His appointment to the Board of TDC Ghana Ltd reflects a deep dedication to strategic governance and institutional advancement. He brings to the role a wealth of expertise in legal analysis, stakeholder engagement, and governance oversight to support the company's long-term growth and compliance frameworks.",
    image: "/board/5.jpg",
    qualifications: [
      "Qualifying Certificate in Law - Ghana School of Law",
      "Bachelor of Laws (LLB) - University of Ghana",
      "Bachelor of Arts in Political Science - University of Ghana",
    ],
  },
  {
    id: 6,
    name: "Ebenezer Sam",
    position: "Member",
    bio: "Mr. Sam is a distinguished leader in Human Resource Management and Development, committed to advancing public sector efficiency and sustainable organisational practices in Ghana. He currently serves as the Director of Human Resource Management and Development at the Ministry of Works, Housing and Water Resources, bringing over a decade of experience in public administration. He holds an MPhil in Sociology with a specialisation in Personnel and Organisational Development from the University of Ghana, alongside a Postgraduate Diploma in Public Administration from GIMPA. His international training includes certifications in Strategic Urban Planning from UTI in Cairo and Project Management from Shanghai Business School, China.<br><br> Mr. Sam's career has been marked by innovation in HR policy development, digital transformation, and institutional reform. He has spearheaded initiatives such as the Scheme of Service for key public sector institutions, gender mainstreaming frameworks, administrative writing guidelines, and performance management systems that have enhanced staff engagement and reduced absenteeism. His leadership has also introduced e-learning platforms and sustainability programmes within the Ministry, reflecting a commitment to continuous learning, inclusivity, and corporate social responsibility.<br><br> Before his appointment as Director in 2018, Mr. Sam served as Deputy Director in both the General Administration and the Policy Planning, Budgeting, Monitoring and Evaluation Directorates at the Ministry of Works and Housing and the Ministry of the Interior. He played key roles in national development frameworks, including the Ghana Poverty Reduction Strategy, the Ghana Shared Growth and Development Agenda, and the National Migration Policy. He also contributes to public sector governance as a board member of the National Commission on Small Arms and Light Weapons and the Land Use and Spatial Planning Authority. A Chartered Professional Administrator and Management Consultant, he is currently pursuing certification as a Senior Professional in Human Resources (SPHRi). His passion lies in shaping ethically driven organisational cultures and mentoring future leaders in the public service.",
    image: "/board/6.jpg",
    qualifications: [
      "MPhil in Sociology with specialisation in Personnel and Organisational Development - University of Ghana",
      "Postgraduate Diploma in Public Administration - GIMPA",
      "Strategic Urban Planning Certification - UTI, Cairo",
      "Project Management Certification - Shanghai Business School, China",
      "Chartered Professional Administrator and Management Consultant",
      "Currently pursuing Senior Professional in Human Resources (SPHRi) certification",
    ],
  },
  {
    id: 7,
    name: "Barbara L. Ayesu, Esq",
    position: "Member",
    bio: "Rev. Mrs. Ayesu is a distinguished legal practitioner and governance expert with over three decades of impactful service in legal practice, public policy, and advocacy. A member of the Ghana Bar Association since 1988, she has built a career around advancing the rights of women, children, and vulnerable groups through strategic legal reform, stakeholder engagement and capacity building. Her expertise covers legal compliance, institutional development and rights-based policy advocacy. <br><br> Mrs. Ayesu holds a Master of Laws (LLM) from Georgetown University Law Center, USA, and a Bachelor of Arts in Law and Religion from the University of Ghana. Her professional work life started at the Ghana Prisons Service where she rose to the rank of Assistant Director in the Legal Department. She previously served on the Board of TDC Ghana Ltd and chaired the Audit Report Implementation Committee (ARIC), where she provided oversight in legal compliance, institutional accountability, and governance. Her leadership has driven several national and cross-border projects, including collaborations with Virginia State University and Anti-Slavery International. She also served as a consultant to reputable institutions such as the International Labour Organisation (ILO). <br><br> At present, she is the National Coordinator of LAWA (Ghana) Alumnae Inc., leading impactful programmes aimed at providing access to justice, legal empowerment, and the rehabilitation of victims of trafficking and domestic servitude. She is fluent in English, Twi, Ga and Ewe, and is widely recognised for her integrity, passion for justice, and dedication to mentoring the next generation of legal professionals. Her contribution to TDC's Board is anchored in her deep commitment to good governance, institutional accountability, and inclusive development.",
    image: "/board/7.jpg",
    qualifications: [
      "Master of Laws (LLM) - Georgetown University Law Center, USA",
      "Bachelor of Arts in Law and Religion - University of Ghana",
      "Member of Ghana Bar Association since 1988",
      "Former Assistant Director, Legal Department - Ghana Prisons Service",
      "National Coordinator - LAWA (Ghana) Alumnae Inc.",
    ],
  },
  {
    id: 8,
    name: "Ms. Patience Ankamah Addo",
    position: "Member",
    bio: "Ms. Addo is a dynamic Human Resource Practitioner and education administrator with over a decade of leadership experience in education, corporate governance, and stakeholder engagement. She currently serves as the Director of El-Shadai School in Tema, where she oversees staff development, curriculum alignment, and institutional reform aimed at enhancing educational performance and outcomes. <br><br> With academic qualifications in Human Resource Management and Business Administration from Central University, Ms. Addo is currently pursuing a Bachelor of Laws (LLB) to broaden her legal and regulatory expertise. Her professional journey includes roles in public relations, stakeholder advocacy, and education management. As a former Public Relations Officer at the Ghana Industrial Trawlers Association, she led international collaboration and capacity-building initiatives that significantly influenced industry standards and practices. <br><br> Ms. Addo is also a committed civic leader, having served in senior roles within the National Democratic Congress (NDC), including Secretary of the Greater Accra Women's Working Committee and Special Aide to the 2024 Presidential Campaign Manager. Her passion for inclusive development, ethical leadership, and staff welfare drives her contributions to both the public and private sectors. She brings to the Board of TDC Ghana Ltd a well-rounded perspective grounded in governance, strategic planning, and community empowerment.",
    image: "/board/8.jpg",
    qualifications: [
      "Human Resource Management and Business Administration - Central University",
      "Currently pursuing Bachelor of Laws (LLB)",
      "Former Public Relations Officer - Ghana Industrial Trawlers Association",
      "Director - El-Shadai School in Tema",
      "Secretary - Greater Accra Women's Working Committee (NDC)",
      "Special Aide to 2024 Presidential Campaign Manager",
    ],
  },
  {
    id: 9,
    name: "Elliot Gordor",
    position: "Member",
    bio: "",
    image: "/board/9.jpg",
    qualifications: [],
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
            Our Board Of 
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our board of directors comprises experienced professionals from
            diverse backgrounds, united in their commitment to excellence and
            sustainable development.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-8">
          {boardMembers.map((member) => (
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

        {/* Board Committees Section */}
        {/* <div className="mt-16 pt-16 border-t border-gray-200">
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
        </div> */}
      </div>

      {/* Board Member Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden overflow-y-auto ">
            <DialogTitle className="sr-only">
              {selectedMember?.name || "Board Member Details"}
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
