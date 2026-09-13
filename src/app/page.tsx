import Hero from "../components/home/Hero";
import FounderMessage from "@/components/home/FounderMessage";
import WhyDhanikBharat from "@/components/home/WhyDhanikBharat";
import Programs from "@/components/home/Programs";
import StudentReviews from "@/components/home/StudentReviews";
import LifeAtDhanikBharat from "@/components/home/LifeAtDhanikBharat";
import Directors from "@/components/home/Directors";
export default function HomePage() {
  
  return (
    <>
      <Hero />
      <FounderMessage/>
            <WhyDhanikBharat />
            <Programs />
            <StudentReviews />
         <LifeAtDhanikBharat />
       <Directors />
      {/* <TrustStrip />

      
        <ProgramFinder />
        
        <PerformanceEcosystem />
        <AILearning />
      <CampusPreview />
      
      <AdmissionsCTA /> */}
    </>
  );
}