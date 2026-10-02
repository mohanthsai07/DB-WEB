// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const experiences = [
//   {
//     id: 1,
//     number: "01",
//     title: "Academic Environment",
//     shortTitle: "Academic",
//     description:
//       "A focused learning environment where students build strong concepts, practise consistently and engage closely with faculty.",
//     image: "/images/campus/environment.png",
//   },
//   {
//     id: 2,
//     number: "02",
//     title: "Personal Mentoring",
//     shortTitle: "Mentoring",
//     description:
//       "Regular guidance and doubt-clearing help students understand their progress, identify areas to improve and stay focused.",
//     image: "/images/experience/mentoring.jpg",
//   },
//   {
//     id: 3,
//     number: "03",
//     title: "Study & Preparation",
//     shortTitle: "Preparation",
//     description:
//       "A structured approach to learning, practice and assessment helps students prepare for Intermediate education and competitive examinations.",
//     image: "/images/experience/study.jpg",
//   },
//   {
//     id: 4,
//     number: "04",
//     title: "Campus & Student Life",
//     shortTitle: "Campus",
//     description:
//       "Learning extends beyond the classroom through dedicated spaces for study, practical learning, interaction and everyday student life.",
//     image: "/images/experience/campus.jpg",
//   },
// ];

// export default function DhanikBharatExperience() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const activeExperience = experiences[activeIndex];

//   return (
//     <section className="overflow-hidden bg-[#f7f8f4] py-20 sm:py-24 lg:py-32">
//       <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

//         {/* =====================================================
//             MAIN LAYOUT
//         ====================================================== */}

//         <div className="grid items-center gap-12 lg:grid-cols-[44%_56%] lg:gap-8 xl:grid-cols-[43%_50%]">

//           {/* =====================================================
//               LEFT — HEADLINE
//           ====================================================== */}

//           <div className="max-w-[590px]">

//             {/* EYEBROW */}

//             <div className="mb-6 flex items-center gap-3">

//               <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#08783f]" />

//               <span
//                 className="
//                   text-[9px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.25em]
//                   text-[#08783f]
//                   sm:text-[10px]
//                 "
//               >
//                 The Dhanik Bharat Experience
//               </span>

//             </div>


//             {/* =================================================
//                 MAIN HEADLINE
//             ================================================= */}

//             <h2
//               className="
//                 max-w-[560px]
//                 text-[43px]
//                 font-bold
//                 leading-[0.94]
//                 tracking-[-0.055em]
//                 text-[#123b2a]

//                 sm:text-[54px]

//                 md:text-[62px]

//                 lg:text-[64px]

//                 xl:text-[72px]
//               "
//             >
//               More than a
//               <br />
//               classroom.
//               <br />

//               <span className="text-[#e50046]">
//                 A place to grow.
//               </span>
//             </h2>


//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <p
//               className="
//                 mt-7
//                 max-w-[430px]
//                 text-[14px]
//                 leading-6
//                 text-[#647069]

//                 sm:mt-8
//                 sm:text-[15px]
//               "
//             >
//               See what everyday learning looks like at Dhanik Bharat —
//               from classrooms and mentoring to preparation and campus life.
//             </p>


//             {/* =================================================
//                 SMALL PROGRESS
//             ================================================= */}

//             <div className="mt-8 hidden items-center gap-4 lg:flex">

//               <span className="font-mono text-[10px] text-[#08783f]">
//                 {activeExperience.number}
//               </span>

//               <div className="h-px w-16 bg-[#cbd5cf]" />

//               <span className="text-[9px] uppercase tracking-[0.2em] text-[#87938c]">
//                 Explore experience
//               </span>

//             </div>

//           </div>


//           {/* =====================================================
//               RIGHT — IMAGE ACCORDION
//           ====================================================== */}

//           <div className="w-full">

//             <div
//               className="
//                 flex
//                 h-[430px]
//                 w-full
//                 items-stretch
//                 justify-end
//                 gap-2
//                 overflow-hidden

//                 sm:h-[480px]
//                 sm:gap-3

//                 lg:h-[500px]
//               "
//             >

//               {experiences.map((experience, index) => {
//                 const isActive = index === activeIndex;

//                 return (
//                   <button
//                     key={experience.id}
//                     type="button"
//                     onMouseEnter={() => setActiveIndex(index)}
//                     onFocus={() => setActiveIndex(index)}
//                     onClick={() => setActiveIndex(index)}
//                     aria-label={`Show ${experience.title}`}
//                     aria-pressed={isActive}
//                     className={`
//                       group
//                       relative
//                       h-full
//                       shrink-0
//                       overflow-hidden
//                       rounded-[18px]
//                       text-left
//                       outline-none
//                       transition-all
//                       duration-700
//                       ease-[cubic-bezier(0.22,1,0.36,1)]

//                       focus-visible:ring-2
//                       focus-visible:ring-[#08783f]
//                       focus-visible:ring-offset-2

//                       ${
//                         isActive
//                           ? "w-[58%] sm:w-[60%]"
//                           : "w-[42px] sm:w-[48px]"
//                       }
//                     `}
//                   >

//                     {/* =================================================
//                         IMAGE
//                     ================================================= */}

//                     <Image
//                       src={experience.image}
//                       alt={experience.title}
//                       fill
//                       priority={index === 0}
//                       sizes="(max-width: 1024px) 60vw, 450px"
//                       className={`
//                         object-cover
//                         transition-transform
//                         duration-[1000ms]
//                         ease-out

//                         ${
//                           isActive
//                             ? "scale-100"
//                             : "scale-[1.04]"
//                         }
//                       `}
//                     />


//                     {/* =================================================
//                         IMAGE OVERLAY
//                     ================================================= */}

//                     <div
//                       className={`
//                         absolute
//                         inset-0
//                         transition-all
//                         duration-700

//                         ${
//                           isActive
//                             ? "bg-gradient-to-t from-[#031a11]/90 via-[#031a11]/20 to-transparent"
//                             : "bg-[#031a11]/35 group-hover:bg-[#031a11]/20"
//                         }
//                       `}
//                     />


//                     {/* =================================================
//                         ACTIVE CONTENT
//                     ================================================= */}

//                     <div
//                       className={`
//                         absolute
//                         bottom-0
//                         left-0
//                         right-0
//                         p-6
//                         sm:p-7
//                         lg:p-8

//                         transition-all
//                         duration-500

//                         ${
//                           isActive
//                             ? "translate-y-0 opacity-100"
//                             : "translate-y-5 opacity-0"
//                         }
//                       `}
//                     >

//                       {/* NUMBER */}

//                       <div className="mb-3 flex items-center gap-3">

//                         <span className="font-mono text-[10px] tracking-[0.12em] text-[#c9f36a]">
//                           {experience.number}
//                         </span>

//                         <span className="h-px w-8 bg-white/50" />

//                         <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/65">
//                           Dhanik Bharat
//                         </span>

//                       </div>


//                       {/* TITLE */}

//                       <h3
//                         className="
//                           max-w-[420px]
//                           text-[27px]
//                           font-semibold
//                           leading-[1]
//                           tracking-[-0.035em]
//                           text-white

//                           sm:text-[32px]

//                           lg:text-[38px]

//                           xl:text-[42px]
//                         "
//                       >
//                         {experience.title}
//                       </h3>


//                       {/* DESCRIPTION */}

//                       <p
//                         className="
//                           mt-3
//                           max-w-[440px]
//                           text-[12px]
//                           leading-5
//                           text-white/70

//                           sm:text-[13px]
//                           sm:leading-6
//                         "
//                       >
//                         {experience.description}
//                       </p>

//                     </div>


//                     {/* =================================================
//                         ACTIVE NUMBER — TOP RIGHT
//                     ================================================= */}

//                     <span
//                       className={`
//                         absolute
//                         right-4
//                         top-4
//                         font-mono
//                         text-[9px]
//                         transition-colors
//                         duration-300

//                         ${
//                           isActive
//                             ? "text-[#c9f36a]"
//                             : "text-white/70"
//                         }
//                       `}
//                     >
//                       {experience.number}
//                     </span>


//                     {/* =================================================
//                         INACTIVE VERTICAL TITLE
//                     ================================================= */}

//                     <div
//                       className={`
//                         absolute
//                         bottom-7
//                         left-1/2
//                         transition-all
//                         duration-500

//                         ${
//                           isActive
//                             ? "pointer-events-none opacity-0"
//                             : "opacity-100"
//                         }
//                       `}
//                     >

//                       <span
//                         className="
//                           block
//                           -translate-x-1/2
//                           rotate-90
//                           whitespace-nowrap
//                           text-[11px]
//                           font-semibold
//                           tracking-[-0.01em]
//                           text-white
//                         "
//                       >
//                         {experience.title}
//                       </span>

//                     </div>

//                   </button>
//                 );
//               })}

//             </div>


//             {/* =====================================================
//                 MOBILE INDICATOR
//             ====================================================== */}

//             <div className="mt-5 flex items-center justify-between lg:hidden">

//               {/* DOTS */}

//               <div className="flex items-center gap-1.5">

//                 {experiences.map((experience, index) => (
//                   <button
//                     key={experience.id}
//                     type="button"
//                     onClick={() => setActiveIndex(index)}
//                     aria-label={`Show ${experience.title}`}
//                     className={`
//                       h-[5px]
//                       rounded-full
//                       transition-all
//                       duration-300

//                       ${
//                         index === activeIndex
//                           ? "w-8 bg-[#08783f]"
//                           : "w-5 bg-[#d2dad4]"
//                       }
//                     `}
//                   />
//                 ))}

//               </div>


//               {/* COUNTER */}

//               <span className="font-mono text-[10px] text-[#87938c]">
//                 {String(activeIndex + 1).padStart(2, "0")} / 04
//               </span>

//             </div>

//           </div>

//         </div>


//         {/* =====================================================
//             MOBILE EXPERIENCE LABEL
//         ====================================================== */}

//         <div className="mt-8 flex items-center gap-3 lg:hidden">

//           <span className="h-px w-10 bg-[#08783f]/40" />

//           <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#789087]">
//             {activeExperience.shortTitle}
//           </span>

//         </div>

//       </div>
//     </section>
//   );
// }