import LegalPage, { LegalSection, LegalItem, LegalList } from "./LegalPage";

export default function Terms() {
  return (
    <LegalPage
      eyebrow="terms of use"
      title="Terms of Use"
      subtitle="Website use, inquiries, and general terms."
      lastUpdated="Last updated: May 20, 2026"
      intro="These Terms of Use explain the general rules for using the Chassis website, submitting inquiries, discussing services, and engaging with public information published by Chassis."
    >
      <LegalSection title="Overview">
        <p className="text-base leading-7 text-neutral-600">
          These website terms are public-facing. Project-specific work is governed by a separate client agreement.
        </p>
        <p className="text-base leading-7 text-neutral-600">
          Chassis provides business structuring, operations systems, execution infrastructure, advisory, websites,
          digital systems, and implementation-related services. The information on this website is provided for
          general business and service understanding.
        </p>
        <p className="text-base leading-7 text-neutral-600">
          Submitting an inquiry, booking a call, or contacting Chassis does not automatically create a client
          relationship, confirmed project, or binding service agreement. Any paid work, scope, timeline,
          deliverables, payment terms, and responsibilities must be agreed separately in writing.
        </p>
        <p className="text-base leading-7 text-neutral-600">
          The signed client agreement controls project-specific work. These website terms only cover general
          website use and public-facing expectations.
        </p>
      </LegalSection>

      <LegalSection title="What These Terms Cover">
        <p className="text-base leading-7 text-neutral-600">Simple rules for website use and inquiries.</p>
        <LegalItem number="01" title="Website Use">
          The content on this website is for general information about Chassis, its positioning, services,
          selected work, and approach.
        </LegalItem>
        <LegalItem number="02" title="Inquiries">
          Contacting Chassis, submitting a form, messaging, or booking a call does not guarantee project
          acceptance, availability, pricing, or service delivery.
        </LegalItem>
        <LegalItem number="03" title="Separate Agreements">
          Client projects, audits, websites, applications, systems, advisory work, and implementation services
          require separate written scope and payment confirmation.
        </LegalItem>
        <LegalItem number="04" title="Professional Boundaries">
          Chassis may decline inquiries, pause discussions, or refuse work that does not fit its services,
          standards, scope, availability, or professional boundaries.
        </LegalItem>
      </LegalSection>

      <LegalSection title="General Terms">
        <p className="text-base leading-7 text-neutral-600">What visitors and clients should understand.</p>
        <p className="text-base leading-7 text-neutral-600">
          The website explains how Chassis works, but final project terms are agreed directly with each client.
        </p>
        <LegalItem number="01" title="No Guaranteed Outcome">
          Chassis provides structure, direction, systems, advisory, and implementation support. Business results
          may vary depending on client execution, market conditions, timing, internal discipline, and external
          factors.
        </LegalItem>
        <LegalItem number="02" title="Project Scope">
          Any specific work must be defined through a written scope, proposal, agreement, invoice, message
          confirmation, or other approved communication before work begins.
        </LegalItem>
        <LegalItem number="03" title="Public Information">
          Website content, pricing ranges, service descriptions, case studies, and examples are provided for
          general guidance and may change over time without prior notice.
        </LegalItem>
      </LegalSection>

      <LegalSection title="Important Note">
        <p className="text-base leading-7 text-neutral-600">
          These Terms of Use do not replace a signed client agreement, proposal, invoice, or project confirmation.
          If there is a conflict between these website terms and a separate signed agreement, the signed
          agreement controls the project relationship.
        </p>
        <LegalList
          items={[
            "Website content is for general information",
            "Project work requires separate confirmation",
            "Results depend on execution and external conditions",
            "Chassis may update public content or services over time",
          ]}
        />
      </LegalSection>

      <LegalSection title="Use & Ownership">
        <p className="text-base leading-7 text-neutral-600">Website content and external platforms.</p>
        <p className="text-base leading-7 text-neutral-600">
          Chassis content, methods, materials, and public website assets should not be copied or reused without
          permission.
        </p>
        <LegalItem title="Intellectual property">
          <LegalList
            items={[
              "Website content, structure, copy, visuals, service framing, and Chassis materials belong to Chassis unless stated otherwise",
              "Visitors may not copy, reproduce, resell, or reuse Chassis materials without permission",
              "Case studies and portfolio references are shared to show selected work and business positioning",
              "Internal methods, templates, systems, and processes remain the property of Chassis",
            ]}
          />
        </LegalItem>
        <LegalItem title="External platforms">
          <LegalList
            items={[
              "This website and Chassis projects may involve external platforms depending on the project setup",
              "External platforms may have their own terms, policies, limitations, outages, pricing, or technical restrictions",
              "Chassis is not responsible for failures, interruptions, or policy changes caused by third-party providers",
              "Clients remain responsible for compliance within their own business, industry, and jurisdiction",
            ]}
          />
        </LegalItem>
      </LegalSection>

      <LegalSection title="Contact">
        <p className="text-base leading-7 text-neutral-600">Questions about these terms can be sent directly to Chassis.</p>
        <p className="text-base leading-7 text-neutral-600">
          For questions about website terms, project scope, service expectations, or client agreements, contact
          Chassis by email.
        </p>
        <p className="text-base font-bold text-neutral-950">
          <a href="mailto:chassis.lb@gmail.com" className="transition hover:text-[#36C6F4]">
            chassis.lb@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
