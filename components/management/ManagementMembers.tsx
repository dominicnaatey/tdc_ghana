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
    name: "COURAGE MAKAFUI NUNEKPEKU",
    position: "Managing Director",
    bio: "Mr. Nunekpeku is a seasoned engineer with expertise in Quantity Surveying and Project Management. Throughout his career, he has delivered exceptional results across complex infrastructure projects, collaborating with prestigious organisations including Regimanuel Gray Estate, the Ghana Ports and Harbours Authority, Cappa D'Alberto PLC and Kelm Engineering Limited. His technical proficiency spans both domestic and international markets, supported by rigorous academic studies in Ghana and abroad, with a continued commitment to professional development.<br><br>He holds a Master of Arts degree in Public Sector Management from the University of Ghana, Legon, where he developed a strong foundation in public administration, policy formulation and institutional governance. He also earned a Bachelor of Science with Honours in Construction Engineering and Management from Liverpool John Moores University in the United Kingdom, equipping him with comprehensive technical and managerial skills in the built environment. In addition, he pursued other academic interests at the Kwame Nkrumah University of Science and Technology, the University of Ulster in Northern Ireland, United Kingdom as well as the Accra and Ho Technical Universities.<br><br>Beyond his technical capabilities, Mr. Nunekpeku has proven himself as a successful entrepreneur, establishing and scaling businesses across diverse industry sectors. His strategic vision and operational expertise have enabled him to identify market opportunities and create sustainable value for stakeholders. As a leader, he combines technical precision with innovative thinking, driving results whilst maintaining the highest standards of professional integrity.",
    image: "/management/1.jpg",
    qualifications: [
      "Master of Arts in Public Sector Management - University of Ghana, Legon",
      "Bachelor of Science with Honours in Construction Engineering and Management - Liverpool John Moores University, UK",
      "Studies at Kwame Nkrumah University of Science and Technology",
      "Studies at University of Ulster, Northern Ireland, UK",
      "Studies at Accra and Ho Technical Universities",
    ],
  },
  {
    id: 2,
    name: "Abdul Al-Mumin Yakubu",
    position: "General Manager, Finance & Administration",
    bio: "Alhaji Abdul Al-Mumin Yakubu is the General Manager in charge of Finance and Administration at TDC Ghana Ltd. He is a distinguished Fellow of both the Association of Chartered Certified Accountants (ACCA) and the Institute of Chartered Accountants, Ghana (ICAG). In addition, he is a Barrister at Law and a member of the Ghana Bar Association.<br><br>Abdul holds a Qualifying Certificate in Law from the Ghana School of Law, Makola, and a Bachelor of Laws (LLB) degree from the Ghana Institute of Management and Public Administration (GIMPA), where he focused on Labour Law, Administrative Law, Commercial Law, as well as Corporate and Public Financial Management Laws. He also earned a Master of Science (MSc) in Accounting and Finance from the University of Northampton, UK.<br><br>With nearly thirty(30) years of professional experience, Abdul has developed deep expertise in finance, auditing, internal systems review, and recovery strategies. He began his career at TDC in 1995 as an Audit Clerk and steadily progressed through roles including Audit Supervisor, Finance Manager, and Finance Director. Since 2015, he has led the Finance and Administration division as General Manager, providing strategic leadership and driving growth across the organization.",
    image: "/management/2.jpg",
    qualifications: [
      "Fellow of the Association of Chartered Certified Accountants (ACCA)",
      "Fellow of the Institute of Chartered Accountants, Ghana (ICAG)",
      "Barrister at Law - Member of Ghana Bar Association",
      "Master of Science in Accounting and Finance - University of Northampton, UK",
      "Bachelor of Laws (LLB) - Ghana Institute of Management and Public Administration (GIMPA)",
      "Qualifying Certificate in Law - Ghana School of Law, Makola",
    ],
  },
   {
    id: 3,
    name: "Lariba Abaduri-Weseh",
    position: "Head of Finance",
    bio: "",
    image: "/management/3.jpg",
    qualifications: [
      ""
    ],
  },
  {
    id: 4,
    name: "George Opoku-Ware Boateng",
    position: "Head of Legal",
    bio: "George Opoku-Ware Boateng holds a Master's Degree in Management and Administration from the University of Ghana Business School, Legon. He also earned a Bachelor of Arts in History and Religions and a Bachelor of Laws, both from the University of Ghana.<br><br>Called to the Ghana Bar in 2008, he has maintained an active membership with the Ghana Bar Association since then. Beginning his career at TDC as a Legal Officer in 2008, GEORGE OPOKU-WARE BOATENG has played an integral role in the company's legal endeavors, successfully prosecuting and defending major cases.<br><br>His extensive experience and steadfast commitment led to his appointment as Head of Legal in 2025, where he continues to provide expert legal oversight and guidance.",
    image: "/management/4.jpg",
    qualifications: [
      "Master's Degree in Management and Administration - University of Ghana Business School, Legon",
      "Bachelor of Laws - University of Ghana",
      "Bachelor of Arts in History and Religions - University of Ghana",
      "Called to the Ghana Bar in 2008",
      "Member of Ghana Bar Association",
    ],
  },
  {
    id: 5,
    name: "DOROTHY A. ASARE-KUMAH ADOLF, ESQ",
    position: "Board Secretary and Head of Corporate Planning & Communication",
    bio: "Mrs. Asare-Kumah Adolf is the Head of Corporate Planning and Communications at TDC Ghana Ltd. She holds dual Master's degrees in Communications and Law (LLM) from Grand Valley University, Michigan, USA, and the University of Law, UK, respectively. Additionally, she holds a Postgraduate Diploma in Education from the University of Education, Winneba, and a Diploma in Journalism from the Ghana Institute of Journalism.<br><br>Prior to joining TDC nearly two decades ago, Mrs. Asare-Kumah Adolf established her career in journalism and lectured briefly at Tarrant County Community College in Fort Worth, Texas, as well as at the Ghana Institute of Journalism. As a former workers' Union leader, she continuously utilised her dual legal and communications expertise in staff welfare advocacy and institutional reforms.<br><br>She is a member of the Ghana Bar Association, the Ghana Journalists Association and the Institute of Public Relations, Ghana.",
    image: "/management/5.jpg",
    qualifications: [
      "Master's Degree in Communications - Grand Valley University, Michigan, USA",
      "Master of Laws (LLM) - University of Law, UK",
      "Postgraduate Diploma in Education - University of Education, Winneba",
      "Diploma in Journalism - Ghana Institute of Journalism",
      "Member of Ghana Bar Association",
      "Member of Ghana Journalists Association",
      "Member of Institute of Public Relations, Ghana",
    ],
  },
  {
    id: 6,
    name: "John Felix Wardy",
    position: "Head of Administration",
    bio: "John Felix Wardy joined TDC in June 2006. He began his career in the judicial service of Ghana.In 1992 he joined the judicial service of Ghana as an Assistant Registrar.<br><br>In 1999, John was assigned the position of Circuit Court Registrar attached as a probationary position awaiting confirmation as High Court Registrar.<br><br>In 2000 he was promoted to the rank of High Court Registrar attached to the District Court.Here,he was in charge of the day-to-day runing of the court and the personnel attached.His schedule include preparation of affidavits,writs of summons,conducting marriage ceremonies,strategically enforcing the orders of the court such as writ of fifa,absconding warrants and Garnishee order.<br><br>In 2005, John as a high court Registrar was attached to High Court I,II,III and IV.Here,John served as deputy administrator for four different high courts.Quite apart from performing similar duties outlined he was also in charge of wills,settlement of appeal records and also doubled as a Commissioner for Oaths.<br><br>In 2006, he resigned from the Judicial Service to join TDC.<br><br>John holds a Bachelor of Arts (BA) degree from the University of Cape Coast and a Master of Public Administration (MPA) from the University of Ghana,Legon. John is also a member of the Institute of Human Resource Practitioners (Ghana).",
    image: "/management/6.jpg",
    qualifications: [
      "Bachelor of Arts (BA) - University of Cape Coast",
      "Master of Public Administration (MPA) - University of Ghana, Legon",
      "Member of Institute of Human Resource Practitioners (Ghana)",
      "Former High Court Registrar - Judicial Service of Ghana",
    ],
  },
  {
    id: 7,
    name: "Samuel Abutiate",
    position: "Chief Internal Auditor",
    bio: "A Chartered Accountant by profession, Mr. Samuel Abutiate is a product of University of Ghana Business School, from where he holds a Bachelor of Science (BSc) Honors Degree in Accounting.<br><br>He also holds a Masters of Business Administration (MBA) Degree in Finance also from University of Ghana Business School.<br><br>He is a good standing member of the Institute of Chartered Accountants (ICA) Ghana, membership of Institute of Internal Auditors Ghana and obtained the Professional Level of the Chartered Institute of Taxation, Ghana.<br><br>He has over 22 years varied and extensive experience in the Services, Manufacturing and Real Estates Industries. Mr. Abutiate has detailed knowledge in Auditing, Accounting, Financial Management and Real Estate Development.<br><br>Samuel commenced his career at Ghana Post Company Limited in 2003 as Assistant Audit Manager. He moved to Crystal Auto Limited, a Manufacturing Company in 2007, as an Accounts Manager and later joined TDC Ghana Ltd in 2011, as an Internal Audit Manager.<br><br>Prior to his appointment as Ag. Chief Internal Auditor, he attended many capacity building and management trainee workshops. He served in various capacities and on various committees. He was an Executive Member of the Senior Staff Association in the Company for two consecutive terms.<br><br>In his current position, he manages and oversees the activities of the Internal Audit Department.",
    image: "/management/7.jpg",
    qualifications: [
      "Bachelor of Science (BSc) Honours in Accounting - University of Ghana Business School",
      "Master of Business Administration (MBA) in Finance - University of Ghana Business School",
      "Member of Institute of Chartered Accountants (ICA) Ghana",
      "Member of Institute of Internal Auditors Ghana",
      "Professional Level - Chartered Institute of Taxation, Ghana",
    ],
  },
  {
    id: 8,
    name: "Sarah Donkor",
    position: "Head of Estates",
    bio: "Surveyor Sarah Donkor (Mrs) has over two decades experience in Land Administration and Management.<br><br> She joined TDC in 1999 as a National Service person and has risen through the ranks to her current position as the Head of Estates.<br><br> She is a Chartered Valuer and a professional member of the Ghana Institution of Surveyors (GhIS). She holds a BSC in Land Economy and MSc in Real Estate from the Kwame Nkrumah University of Science and Technology. Kumasi. She has attended several Capacity Building courses in Valuation, Land Administration and Management. She serves on the Board of Regency Engineering and Construction Limited (REC), a Ghanaian company which offers Engineering and Project Management services.",
    image: "/management/8.jpg",
    qualifications: [
      "BSc in Land Economy - Kwame Nkrumah University of Science and Technology, Kumasi",
      "MSc in Real Estate - Kwame Nkrumah University of Science and Technology, Kumasi",
      "Chartered Valuer",
      "Professional Member of Ghana Institution of Surveyors (GhIS)",
      "Board Member - Regency Engineering and Construction Limited (REC)",
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
          {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our management team comprises experienced professionals dedicated to
            operational excellence and strategic growth in real estate development.
          </p> */}
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