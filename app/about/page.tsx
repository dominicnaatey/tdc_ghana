import Header from "@/components/header"
import Footer from "@/components/footer"
import AboutHero from "@/components/about/AboutHero"
import BackgroundHistory from "@/components/about/BackgroundHistory"
import MissionVisionValues from "@/components/about/MissionVisionValues"
import RespectValues from "@/components/about/RespectValues";
import LeadershipTeam from "@/components/about/LeadershipTeam"
import Achievements from "@/components/about/Achievements"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        <AboutHero />
        <BackgroundHistory />
        <MissionVisionValues />
        <RespectValues />
        {/* <LeadershipTeam /> */}
        <Achievements />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
