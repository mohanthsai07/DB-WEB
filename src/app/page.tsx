import Hero from "../components/home/Hero";
import FounderMessage from "@/components/home/FounderMessage";
import DraggableLife from "@/components/home/DraggableLife";
import Programs from "@/components/home/Programs";
import StudentReviews from "@/components/home/StudentReviews";
import DhanikTimeline from "@/components/ui/dhanik-timeline";
import Directors from "@/components/home/Directors";
import AdmissionsCTA from "@/components/home/AdmissionsCTA";
export default function HomePage() {
  
  return (
    <>
      <Hero />
      <FounderMessage/>
            <DraggableLife />
            <Programs />
            <StudentReviews />
             <DhanikTimeline />
         {/* <LifeAtDhanikBharat /> */}
       <Directors />
       <AdmissionsCTA />
      {/* <TrustStrip />

      
        <ProgramFinder />
        
        <PerformanceEcosystem />
        <AILearning />
      <CampusPreview />
      
      <AdmissionsCTA /> */}
    </>
  );
}
