import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
    name: "Dr. Kwame Asante",
    position: "Chairman of the Board",
    bio: "Dr. Asante brings over 25 years of experience in real estate development and urban planning. He has been instrumental in shaping Ghana's housing policy and sustainable development initiatives.",
    image: "/placeholder-user.jpg",
    qualifications: ["PhD in Urban Planning", "MBA Finance", "Chartered Real Estate Developer"]
  },
  {
    id: 2,
    name: "Mrs. Akosua Mensah",
    position: "Vice Chairperson",
    bio: "A seasoned finance executive with extensive experience in project financing and investment management. She has overseen major infrastructure projects across West Africa.",
    image: "/placeholder-user.jpg",
    qualifications: ["CPA", "MSc Finance", "Chartered Financial Analyst"]
  },
  {
    id: 3,
    name: "Eng. Samuel Osei",
    position: "Board Member",
    bio: "A distinguished civil engineer with expertise in construction management and infrastructure development. He has led numerous large-scale residential and commercial projects.",
    image: "/placeholder-user.jpg",
    qualifications: ["BSc Civil Engineering", "MSc Construction Management", "Professional Engineer"]
  },
  {
    id: 4,
    name: "Prof. Grace Adjei",
    position: "Independent Director",
    bio: "An academic and policy expert specializing in sustainable development and environmental planning. She advises on green building practices and sustainable urban development.",
    image: "/placeholder-user.jpg",
    qualifications: ["PhD Environmental Science", "MSc Urban Planning", "LEED Accredited Professional"]
  },
  {
    id: 5,
    name: "Mr. Joseph Boateng",
    position: "Board Member",
    bio: "A legal expert with specialization in real estate law and corporate governance. He ensures compliance with regulatory requirements and oversees legal aspects of major projects.",
    image: "/placeholder-user.jpg",
    qualifications: ["LLB", "BL", "MSc Real Estate Law"]
  },
  {
    id: 6,
    name: "Mrs. Efua Darko",
    position: "Board Member",
    bio: "A marketing and communications strategist with deep understanding of the Ghanaian real estate market. She leads strategic initiatives for market expansion and customer engagement.",
    image: "/placeholder-user.jpg",
    qualifications: ["MBA Marketing", "BSc Business Administration", "Certified Marketing Professional"]
  }
];

export default function BoardMembers() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4">
            Our Distinguished Board
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our board of directors comprises experienced professionals from diverse backgrounds, 
            united in their commitment to excellence and sustainable development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600 font-medium italic">
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
              Our board operates through specialized committees to ensure effective governance and oversight.
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
                  Oversees financial reporting, internal controls, and risk management processes.
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
                  Identifies, assesses, and monitors enterprise-wide risks and mitigation strategies.
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
                  Responsible for board composition, succession planning, and governance matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}