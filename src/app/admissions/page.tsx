import type { Metadata } from "next";
import Link from "next/link";
import AdmissionEnquiryForm from "@/components/admissions/AdmissionEnquiryForm";

export const metadata: Metadata = {
  title: "Admissions | Dhanik Bharat",
  description:
    "Explore the admissions journey for integrated Intermediate education and JEE or NEET preparation at Dhanik Bharat.",
  openGraph: {
    title: "Admissions | Dhanik Bharat",
    description: "Explore the admissions journey for integrated Intermediate education and JEE or NEET preparation.",
    images: ["/images/hero/student.jpg"],
  },
};

const steps = [
  {
    number: "01",
    title: "Tell us what you’re looking for",
    body: "Share a few details in the enquiry form. It helps frame the next conversation around the student’s interests.",
  },
  {
    number: "02",
    title: "Explore the right pathway",
    body: "Compare MPC with JEE preparation and BiPC with NEET preparation to see which direction fits.",
  },
  {
    number: "03",
    title: "Talk through your questions",
    body: "A conversation with the admissions team can help you understand the study approach and what to consider next.",
  },
  {
    number: "04",
    title: "Review the application details",
    body: "Once you decide to proceed, confirm the current application requirements and any details needed for enrolment.",
  },
  {
    number: "05",
    title: "Confirm the next steps",
    body: "The team will explain the remaining steps for your application. Specific requirements can be confirmed directly.",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="overflow-hidden bg-[#f7f8f4] text-[#123b2a]">
      <section className="px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="animate-fade-up">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#08783f]">
              <span className="h-px w-8 bg-[#08783f]" /> Admissions · Classes 11 &amp; 12
            </p>
            <h1 className="max-w-[640px] text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
              A clear path to <span className="text-[#08783f]">what’s next.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#59655f] sm:text-[18px] sm:leading-8">
              Explore integrated Intermediate learning and focused preparation for JEE or NEET. Start with a conversation, then take each step with clarity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#enquiry" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#08783f] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#076b38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f]">
                Begin an enquiry <span aria-hidden="true" className="ml-3 text-lg">↗</span>
              </a>
              <Link href="/programs" className="text-sm font-semibold text-[#123b2a] underline decoration-[#b9c9bd] underline-offset-4 transition hover:text-[#08783f]">
                Compare programs
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-[#dfe6df] pt-5 text-sm text-[#59655f]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e9efe9] text-[#08783f]" aria-hidden="true">↘</span>
              <span>Five straightforward steps, from first question to next steps.</span>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#123b2a] sm:min-h-[470px] sm:rounded-[36px]">
            <div className="absolute inset-0 bg-[url('/images/hero/student.jpg')] bg-cover bg-[center_40%]" role="img" aria-label="Student studying at Dhanik Bharat" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102d22]/90 via-[#123b2a]/10 to-[#123b2a]/5" />
            <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#123b2a]/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-8 sm:top-8">
              Learn with intention
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">Your next chapter starts here</p>
              <p className="mt-3 max-w-[440px] text-[24px] font-medium leading-tight tracking-[-0.035em] sm:text-[34px]">
                Strong foundations for ambitious goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="journey-title">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-11 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.65fr] md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#08783f]">The admissions journey</p>
              <h2 id="journey-title" className="max-w-[660px] text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
                Five steps. One considered decision.
              </h2>
            </div>
            <p className="max-w-[380px] text-sm leading-6 text-[#647069] md:justify-self-end">
              Begin with questions, learn about the pathways, and confirm the details that matter to your family.
            </p>
          </div>
          <ol className="grid gap-0 border-t border-[#dfe6df] md:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step.number} className="group relative border-b border-[#dfe6df] py-6 md:border-b-0 md:border-r md:px-5 md:py-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="mb-7 flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c9bd] text-xs font-semibold text-[#08783f] transition group-hover:border-[#08783f] group-hover:bg-[#08783f] group-hover:text-white">{step.number}</span>
                <h3 className="max-w-[210px] text-[19px] font-semibold leading-tight tracking-[-0.035em]">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-[#647069]">{step.body}</p>
                {index < steps.length - 1 && <span aria-hidden="true" className="absolute right-5 top-11 hidden h-px w-5 bg-[#c9f36a] md:block" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="enquiry" aria-labelledby="enquiry-title">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden rounded-[28px] border border-[#dfe6df] bg-white lg:grid-cols-[0.82fr_1.18fr] lg:rounded-[36px]">
          <div className="relative overflow-hidden bg-[#123b2a] p-7 text-white sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute -right-20 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-7 -top-3 h-40 w-40 rounded-full border border-[#c9f36a]/30" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9f36a]">Start a conversation</p>
              <h2 id="enquiry-title" className="mt-5 max-w-[420px] text-[36px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[48px]">
                Let’s find the right direction.
              </h2>
              <p className="mt-5 max-w-[360px] text-sm leading-6 text-white/75">
                Leave only the details needed to start an enquiry. Your information stays in this browser; this form is not connected to an admissions system.
              </p>
              <div className="mt-10 border-t border-white/20 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Explore pathways</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/programs" className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium transition hover:border-[#c9f36a] hover:text-[#c9f36a]">MPC · JEE</Link>
                  <Link href="/programs" className="rounded-full border border-white/25 px-4 py-2 text-xs font-medium transition hover:border-[#c9f36a] hover:text-[#c9f36a]">BiPC · NEET</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10 lg:p-12">
            <AdmissionEnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
