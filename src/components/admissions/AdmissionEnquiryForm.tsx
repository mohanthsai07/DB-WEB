"use client";

import { useState, type FormEvent } from "react";

type EnquiryValues = {
  studentName: string;
  contact: string;
  classLevel: string;
  pathway: string;
};

type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const initialValues: EnquiryValues = {
  studentName: "",
  contact: "",
  classLevel: "",
  pathway: "",
};

const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-[#d6dfd7] bg-[#fbfcfa] px-4 text-sm text-[#123b2a] outline-none transition placeholder:text-[#849087] focus:border-[#08783f] focus:ring-2 focus:ring-[#08783f]/15";

function validate(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.studentName.trim()) errors.studentName = "Enter the student’s name.";

  const contact = values.contact.trim();
  const emailOkay = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phoneDigits = contact.replace(/\D/g, "");
  const phoneOkay = /^[+\d().\s-]+$/.test(contact) && phoneDigits.length >= 7 && phoneDigits.length <= 15;
  if (!contact) errors.contact = "Enter an email address or phone number.";
  else if (!emailOkay && !phoneOkay) errors.contact = "Enter a valid email address or phone number.";

  if (!values.classLevel) errors.classLevel = "Choose a class level.";
  if (!values.pathway) errors.pathway = "Choose a pathway of interest.";
  return errors;
}

export default function AdmissionEnquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [notice, setNotice] = useState("");

  function update(field: keyof EnquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setNotice("Your details were not sent or saved. Online enquiry submission is not connected yet. Please use the institute’s official admissions process when available.");
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Admissions enquiry">
      <div className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#08783f]">Enquiry form</p>
        <p className="mt-2 text-sm leading-6 text-[#647069]">A few essentials are enough to get started.</p>
      </div>

      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="studentName" className="text-[13px] font-semibold text-[#123b2a]">Student name</label>
          <input id="studentName" name="studentName" autoComplete="name" className={fieldClass} value={values.studentName} onChange={(event) => update("studentName", event.target.value)} aria-invalid={Boolean(errors.studentName)} aria-describedby={errors.studentName ? "studentName-error" : undefined} />
          {errors.studentName && <p id="studentName-error" className="mt-1.5 text-xs font-medium text-[#b3233d]">{errors.studentName}</p>}
        </div>

        <div>
          <label htmlFor="contact" className="text-[13px] font-semibold text-[#123b2a]">Email or phone</label>
          <input id="contact" name="contact" autoComplete="off" inputMode="text" className={fieldClass} value={values.contact} onChange={(event) => update("contact", event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-hint contact-error" : "contact-hint"} />
          <p id="contact-hint" className="mt-1.5 text-xs text-[#647069]">Use either one; no other contact details needed.</p>
          {errors.contact && <p id="contact-error" className="mt-1.5 text-xs font-medium text-[#b3233d]">{errors.contact}</p>}
        </div>

        <div>
          <label htmlFor="classLevel" className="text-[13px] font-semibold text-[#123b2a]">Class of interest</label>
          <select id="classLevel" name="classLevel" className={fieldClass} value={values.classLevel} onChange={(event) => update("classLevel", event.target.value)} aria-invalid={Boolean(errors.classLevel)} aria-describedby={errors.classLevel ? "classLevel-error" : undefined}>
            <option value="">Choose a class</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          {errors.classLevel && <p id="classLevel-error" className="mt-1.5 text-xs font-medium text-[#b3233d]">{errors.classLevel}</p>}
        </div>

        <div>
          <label htmlFor="pathway" className="text-[13px] font-semibold text-[#123b2a]">Pathway of interest</label>
          <select id="pathway" name="pathway" className={fieldClass} value={values.pathway} onChange={(event) => update("pathway", event.target.value)} aria-invalid={Boolean(errors.pathway)} aria-describedby={errors.pathway ? "pathway-error" : undefined}>
            <option value="">Choose a pathway</option>
            <option value="mpc-jee">MPC · JEE</option>
            <option value="bipc-neet">BiPC · NEET</option>
            <option value="undecided">I’m still deciding</option>
          </select>
          {errors.pathway && <p id="pathway-error" className="mt-1.5 text-xs font-medium text-[#b3233d]">{errors.pathway}</p>}
        </div>
      </div>

      <button type="submit" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#08783f] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#076b38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08783f] sm:w-auto">
        Check enquiry details <span aria-hidden="true">↗</span>
      </button>

      {Object.keys(errors).length > 0 && (
        <p className="mt-4 rounded-xl border border-[#f0c8cf] bg-[#fff7f8] px-4 py-3 text-sm text-[#8c2034]" role="alert">
          Please review the highlighted fields above.
        </p>
      )}
      {notice && (
        <p className="mt-4 rounded-xl border border-[#d4e4c0] bg-[#f5f9ef] px-4 py-3 text-sm leading-6 text-[#285533]" role="status" aria-live="polite">
          {notice}
        </p>
      )}
      <p className="mt-5 text-xs leading-5 text-[#7a857d]">This form only checks your entries in the browser. Nothing is transmitted or stored.</p>
    </form>
  );
}
