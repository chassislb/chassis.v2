import LegalPage, { LegalSection, LegalItem, LegalList } from "./LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="privacy policy"
      title="Privacy Policy"
      subtitle="How Chassis handles information and inquiries."
      lastUpdated="Last updated: May 20, 2026"
      intro="This Privacy Policy explains what information Chassis may collect through this website, how that information may be used, and how third-party platforms may be involved depending on the interaction, project, or technical setup."
    >
      <LegalSection title="Policy Overview">
        <p className="text-base leading-7 text-neutral-600">
          Chassis collects only the information needed to communicate, understand inquiries, and improve the
          website or project experience.
        </p>
        <p className="text-base leading-7 text-neutral-600">
          Chassis is a business structuring, operations systems, and execution infrastructure brand. This website
          may collect information when visitors contact Chassis, submit inquiries, book calls, request services,
          or interact with website features.
        </p>
        <p className="text-base leading-7 text-neutral-600">
          Information may also be processed through third-party platforms depending on the website, project
          scope, client requirements, hosting setup, communication method, analytics setup, payment structure,
          database configuration, or technical implementation.
        </p>
        <p className="text-base leading-7 text-neutral-600">Chassis does not sell personal information.</p>
      </LegalSection>

      <LegalSection title="Information This Policy Covers">
        <p className="text-base leading-7 text-neutral-600">
          Simple, practical, and relevant to this website and client inquiries.
        </p>
        <LegalItem number="01" title="Contact Information">
          Name, email address, phone number, business name, project details, inquiry details, or any information
          submitted directly through forms, calls, messages, or email.
        </LegalItem>
        <LegalItem number="02" title="Website Usage Data">
          Basic analytics such as pages visited, device type, browser, approximate location, traffic source, and
          how visitors interact with the website.
        </LegalItem>
        <LegalItem number="03" title="Project & Scheduling Data">
          Information shared when booking a call, discussing a project, requesting a proposal, submitting
          business details, or communicating about services.
        </LegalItem>
        <LegalItem number="04" title="Technical Data">
          Technical information that may be processed through hosting, analytics, databases, forms, automations,
          security tools, browser behavior, or project-related platforms.
        </LegalItem>
      </LegalSection>

      <LegalSection title="Details">
        <p className="text-base leading-7 text-neutral-600">How information is handled.</p>
        <p className="text-base leading-7 text-neutral-600">
          The information collected is used to respond, improve, operate, and deliver the work properly.
        </p>
        <LegalItem number="01" title="Information Collected">
          Chassis may collect names, email addresses, phone numbers, business names, inquiry details, project
          details, call booking details, website usage data, and technical information needed to understand or
          support a request.
        </LegalItem>
        <LegalItem number="02" title="How It Is Used">
          Information may be used to respond to inquiries, understand business needs, schedule calls, prepare
          proposals, deliver services, improve website performance, maintain communication, and evaluate interest
          in Chassis services.
        </LegalItem>
        <LegalItem number="03" title="Third-Party Platforms">
          This website and Chassis projects may use third-party platforms for analytics, scheduling, hosting,
          databases, forms, payments, communication, automation, file storage, project delivery, or technical
          implementation. The platforms used may vary depending on the client, project, scope, and selected
          setup.
        </LegalItem>
      </LegalSection>

      <LegalSection title="Additional Notes">
        <p className="text-base leading-7 text-neutral-600">
          Chassis takes reasonable steps to protect submitted information, but no online transmission, hosting
          setup, communication channel, database, or digital storage method can be guaranteed as fully secure.
          Visitors and clients should avoid submitting highly sensitive confidential information unless an
          appropriate agreement or secure process is in place.
        </p>
        <LegalList
          items={[
            "Information is not sold to third parties",
            "Submitted inquiries are used for communication and service evaluation",
            "Analytics may be used to understand website performance",
            "Tools and platforms may vary depending on project and client needs",
          ]}
        />
      </LegalSection>

      <LegalSection title="Your Options">
        <p className="text-base leading-7 text-neutral-600">Contact Chassis if you have privacy questions.</p>
        <p className="text-base leading-7 text-neutral-600">
          You may request clarification, correction, or deletion of information you submitted directly to
          Chassis.
        </p>
        <LegalItem title="You can contact Chassis to">
          <LegalList
            items={[
              "Ask what information you submitted through the website",
              "Request correction of inaccurate contact details",
              "Request deletion of direct inquiry information where possible",
              "Ask questions about this Privacy Policy",
            ]}
          />
        </LegalItem>
        <LegalItem title="External platforms">
          <LegalList
            items={[
              "Analytics tools may collect website usage data",
              "Scheduling or communication tools may process booking or contact details",
              "Hosting, database, payment, automation, or technical platforms may process project-related data depending on the selected setup",
              "External platforms follow their own privacy policies and data practices",
            ]}
          />
        </LegalItem>
      </LegalSection>

      <LegalSection title="Contact">
        <p className="text-base leading-7 text-neutral-600">Privacy questions can be sent directly to Chassis.</p>
        <p className="text-base leading-7 text-neutral-600">
          For privacy-related questions, corrections, or deletion requests, contact Chassis by email.
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
