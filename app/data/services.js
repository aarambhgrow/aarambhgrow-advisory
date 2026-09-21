import { companyIncorporationData } from "./company-incorporation";
import { msmeUdyamRegistrationData } from "./msme-udyam-registration";
import { gstRegistrationData } from "./gst-registration";
import { incomeTaxItrFilingData } from "./income-tax-itr-filing";
import { mcaAnnualFilingRocComplianceData } from "./mca-annual-filing-roc-compliance";
import { dscDigitalSignatureCertificateData } from "./dsc";
import { startupIndiaDpiitRecognitionData } from "./startup-india-dpiit-recognition";
import { labourLicenceData } from "./labour-licence";
import { fssaiLicenceData } from "./fssai-licence";
import { isoCertificationData } from "./iso-certification";
import { trademarkRegistrationData } from "./trademark-registration";
import zedCertificationData from "./zed-certification";
import eightyIacTaxExemptionData from "./80iac-tax-exemption";

/* =========================================================
   SERVICE REGISTRY

   Single source of truth for every service detail page.
   Adding a service = add its data file + one entry below.

   Consumed by:
     - app/services/[slug]/page.js   (routing, metadata, JSON-LD)
     - app/services/page.js          (service cards)
     - app/components/layout/Navbar  (mega menu)
     - app/sitemap.js
========================================================= */

export const services = [
  {
    slug: "company-incorporation",
    label: "Company Incorporation",
    navDescription: "Pvt Ltd, OPC, LLP and Partnership Deed",
    icon: "Building2",
    data: companyIncorporationData,
    intro: {
      title: "Company Incorporation Services",
    },
    seo: {
      title: "Company Incorporation Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for company incorporation in India, including business structure selection, documentation, registration, filing, and incorporation compliance support.",
    },
    schema: {
      name: "Company Incorporation Services",
      serviceType: "Company Incorporation",
      description: "Structured assistance for company incorporation in India, including business structure selection, documentation, registration, filing, and incorporation compliance support.",
    },
    sections: [
      { key: "benefits", title: "Company Incorporation Benefits", id: "company-incorporation-benefits", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit From Company Incorporation?", id: "who-can-benefit-from-company-incorporation", navLabel: "Who Can Benefit", variant: "list" },
      { key: "incorporationAreas", title: "Company Incorporation Areas", id: "company-incorporation-areas", navLabel: "Company Incorporation Areas", variant: "list" },
      { key: "businessStructures", title: "Business Structures", id: "business-structures", navLabel: "Business Structures", variant: "cards" },
      { key: "businessNeeds", title: "Business Incorporation Requirements", id: "business-incorporation-requirements", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required", id: "documents-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Company Incorporation Process", id: "company-incorporation-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our Company Incorporation Support?", id: "why-choose-our-company-incorporation-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is company incorporation?",
        answer: "Company incorporation is the legal process of registering a business entity and establishing its legal structure according to applicable requirements.",
      },
      {
        question: "Which business structures can be incorporated?",
        answer: "Depending on the business requirements and applicable rules, structures may include Private Limited Company, One Person Company (OPC), LLP, and Partnership Firm.",
      },
      {
        question: "What documents are required for company incorporation?",
        answer: "Common requirements may include identity and address proofs, PAN, registered office details, business information, and entity-specific incorporation documents.",
      },
      {
        question: "What is the company incorporation process?",
        answer: "The process generally includes business assessment, structure selection, information and document collection, application preparation, filing, verification, and incorporation-related formalities.",
      },
      {
        question: "Can startups and MSMEs get incorporation assistance?",
        answer: "Yes. Startups, MSMEs, entrepreneurs, professionals, and other eligible businesses can receive structured assistance based on their proposed business structure and applicable requirements.",
      },
    ],
  },
  {
    slug: "msme-udyam-registration",
    label: "MSME / Udyam Registration",
    navDescription: "Udyam registration and MSME certificate assistance",
    icon: "BadgeCheck",
    data: msmeUdyamRegistrationData,
    intro: {
      title: "MSME / Udyam Registration Services",
    },
    seo: {
      title: "MSME Udyam Registration Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for MSME Udyam Registration in India, including application preparation, documentation support, registration guidance, and Udyam certificate assistance.",
    },
    schema: {
      name: "MSME Udyam Registration Services",
      serviceType: "MSME Udyam Registration",
      description: "Professional assistance for MSME Udyam Registration in India, including application preparation, documentation support, registration guidance, and Udyam certificate assistance.",
    },
    sections: [
      { key: "benefits", title: "Benefits of MSME / Udyam Registration", id: "benefits-of-msme-udyam-registration", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "registrationAreas", title: "Udyam Registration Areas", id: "udyam-registration-areas", navLabel: "Udyam Registration Areas", variant: "list" },
      { key: "msmeCategories", title: "MSME Categories", id: "msme-categories", navLabel: "MSME Categories", variant: "cards" },
      { key: "businessNeeds", title: "Business Needs We Support", id: "business-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents & Information Required", id: "documents-information-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "MSME / Udyam Registration Process", id: "msme-udyam-registration-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our Udyam Registration Support", id: "why-choose-our-udyam-registration-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is MSME / Udyam Registration?",
        answer: "Udyam Registration is the government registration framework for eligible Micro, Small and Medium Enterprises. It provides a formal MSME identity based on the applicable enterprise classification and registration requirements.",
      },
      {
        question: "Who can apply for Udyam Registration?",
        answer: "Eligible micro, small and medium enterprises across manufacturing, services and other applicable business activities may apply, subject to the applicable Udyam Registration requirements.",
      },
      {
        question: "What documents are required for Udyam Registration?",
        answer: "The information required generally includes Aadhaar details of the proprietor, managing partner or authorized person as applicable, PAN and business-related information. Additional information may be required depending on the business structure and applicable requirements.",
      },
      {
        question: "Can a startup or small business apply for Udyam Registration?",
        answer: "Eligible startups and small businesses may apply for Udyam Registration if they satisfy the applicable MSME classification and registration requirements.",
      },
      {
        question: "What are the benefits of MSME / Udyam Registration?",
        answer: "An eligible enterprise may use its Udyam Registration as formal MSME registration evidence and may become eligible for applicable schemes, programs, facilities or benefits subject to the relevant rules and eligibility conditions.",
      },
    ],
  },
  {
    slug: "gst-registration",
    label: "GST Registration",
    navDescription: "GST registration, documentation and ARN tracking",
    icon: "Receipt",
    data: gstRegistrationData,
    intro: {
      title: "GST Registration Services",
    },
    seo: {
      title: "GST Registration Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for GST registration in India, including eligibility assessment, documentation, application filing, ARN tracking, and GST compliance support.",
    },
    schema: {
      name: "GST Registration Services",
      serviceType: "GST Registration",
      description: "Structured assistance for GST registration in India, including eligibility assessment, documentation, application filing, ARN tracking, and GST compliance support.",
    },
    sections: [
      { key: "benefits", title: "Benefits of GST Registration Support", id: "benefits-of-gst-registration-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "gstTypes", title: "GST Registration Types", id: "gst-registration-types", navLabel: "GST Registration Types", variant: "cards" },
      { key: "registrationAreas", title: "GST Registration Areas", id: "gst-registration-areas", navLabel: "GST Registration Areas", variant: "list" },
      { key: "businessNeeds", title: "GST Business Needs", id: "gst-business-needs", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required for GST Registration", id: "documents-required-for-gst-registration", navLabel: "Documents", variant: "list" },
      { key: "process", title: "GST Registration Process", id: "gst-registration-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our GST Support", id: "why-choose-our-gst-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is GST Registration?",
        answer: "GST Registration is the process through which an eligible business or person obtains registration under the applicable Goods and Services Tax framework. The requirement depends on the nature of the business, taxable supplies, turnover, location, and other applicable conditions.",
      },
      {
        question: "Who may need GST Registration?",
        answer: "Businesses and persons engaged in taxable supplies may require GST registration depending on applicable turnover thresholds, business activities, interstate supplies, e-commerce activities, and other conditions under GST law.",
      },
      {
        question: "Which GST Registration is applicable to my business?",
        answer: "The applicable GST registration requirements depend on the nature of the business, type of supplies, location, turnover, interstate activities, e-commerce operations, and other applicable conditions. The specific business profile should be assessed before applying.",
      },
      {
        question: "What documents are required for GST Registration?",
        answer: "Common documents may include PAN, identity and address proof, photographs, business constitution documents, principal place of business details, address proof, bank details, authorized signatory information, and other supporting documents depending on the applicant and business structure.",
      },
      {
        question: "Can GST Registration details be amended?",
        answer: "Yes. Certain GST registration details may be amended when there is a change in business information, address, authorized signatory, contact details, or other applicable particulars, subject to the relevant GST procedures.",
      },
      {
        question: "Do you provide GST Registration application support?",
        answer: "Yes. The service can include GST applicability assessment, document preparation, application assistance, submission support, clarification support where applicable, and guidance regarding subsequent GST compliance requirements.",
      },
    ],
  },
  {
    slug: "income-tax-itr-filing",
    label: "Income Tax (ITR) Filing",
    navDescription: "Return preparation, filing and verification support",
    icon: "FileText",
    data: incomeTaxItrFilingData,
    intro: {
      title: "Income Tax (ITR) Filing Services",
    },
    seo: {
      title: "Income Tax & ITR Filing Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for income tax return (ITR) filing in India, including tax assessment, documentation, return preparation, filing, verification, and income tax compliance support.",
    },
    schema: {
      name: "Income Tax & ITR Filing Services",
      serviceType: "Income Tax Return Filing",
      description: "Structured assistance for income tax return filing in India, including tax assessment, documentation, return preparation, filing, verification, and income tax compliance support.",
    },
    sections: [
      { key: "benefits", title: "Benefits of ITR Filing Support", id: "benefits-of-itr-filing-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "itrAreas", title: "ITR Filing Areas", id: "itr-filing-areas", navLabel: "ITR Filing Areas", variant: "list" },
      { key: "taxpayerTypes", title: "Taxpayer Types", id: "taxpayer-types", navLabel: "Taxpayer Types", variant: "cards" },
      { key: "incomeSources", title: "Income Sources Covered", id: "income-sources-covered", navLabel: "Income Sources Covered", variant: "list" },
      { key: "taxNeeds", title: "Tax Filing Needs", id: "tax-filing-needs", navLabel: "Tax Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required for ITR Filing", id: "documents-required-for-itr-filing", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Income Tax Return Filing Process", id: "income-tax-return-filing-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our ITR Filing Support", id: "why-choose-our-itr-filing-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is Income Tax Return (ITR) Filing?",
        answer: "Income Tax Return filing is the process of reporting applicable income, deductions, taxes, and other required information to the Income Tax Department through the applicable return form and procedure.",
      },
      {
        question: "Who may need to file an Income Tax Return?",
        answer: "Individuals, businesses, firms, companies, professionals, and other taxpayers may have an income tax return filing requirement depending on their income, nature of activities, applicable provisions, and other circumstances.",
      },
      {
        question: "Which ITR form is applicable?",
        answer: "The applicable ITR form depends on factors such as taxpayer type, sources of income, residential status, business or professional income, capital gains, and other applicable conditions. The correct form should be selected after reviewing the taxpayer's profile.",
      },
      {
        question: "What documents are required for ITR Filing?",
        answer: "Common documents and information may include PAN, Aadhaar, Form 16, salary details, bank statements, interest income details, investment information, capital gains statements, business or professional income records, deduction documents, and other applicable financial records.",
      },
      {
        question: "Can ITR Filing include deductions and tax benefits?",
        answer: "Applicable deductions, exemptions, and tax benefits may be considered based on the taxpayer's eligibility, selected tax regime, income sources, and supporting documentation under the applicable income-tax provisions.",
      },
      {
        question: "Do you provide ITR Filing support for businesses and professionals?",
        answer: "Yes. ITR filing support can cover eligible individuals, salaried taxpayers, professionals, proprietors, firms, companies, and other taxpayers based on their applicable return filing requirements.",
      },
    ],
  },
  {
    slug: "mca-annual-filing-roc-compliance",
    label: "MCA Annual Filing / ROC Compliance",
    navDescription: "Annual returns, financial statements and ROC filings",
    icon: "FileCheck",
    data: mcaAnnualFilingRocComplianceData,
    intro: {
      title: "MCA Annual Filing & ROC Compliance",
    },
    seo: {
      title: "MCA Annual Filing & ROC Compliance Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for MCA annual filing and ROC compliance in India, including annual return filing, financial statement filing, documentation, compliance tracking, and statutory filing support.",
    },
    schema: {
      name: "MCA Annual Filing & ROC Compliance Services",
      serviceType: "MCA Annual Filing & ROC Compliance",
      description: "Professional assistance for MCA annual filing and ROC compliance in India, including annual return filing, financial statement filing, documentation, compliance tracking, and statutory filing support.",
    },
    sections: [
      { key: "benefits", title: "Benefits of MCA Annual Filing Support", id: "benefits-of-mca-annual-filing-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "complianceAreas", title: "MCA & ROC Compliance Areas", id: "mca-roc-compliance-areas", navLabel: "MCA & ROC Compliance Areas", variant: "list" },
      { key: "filingTypes", title: "MCA Filing Types", id: "mca-filing-types", navLabel: "MCA Filing Types", variant: "cards" },
      { key: "corporateNeeds", title: "Corporate Compliance Needs We Support", id: "corporate-compliance-needs-we-support", navLabel: "Compliance Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required", id: "documents-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "MCA Annual Filing Process", id: "mca-annual-filing-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our MCA & ROC Support", id: "why-choose-our-mca-roc-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is MCA annual filing?",
        answer: "MCA annual filing refers to the periodic statutory filing and reporting requirements applicable to companies and other entities registered under the Ministry of Corporate Affairs, based on their applicable legal and compliance requirements.",
      },
      {
        question: "Who needs MCA annual filing support?",
        answer: "Companies and other applicable entities registered with the MCA may have periodic filing and compliance requirements. The exact requirements depend on the entity type, financial year, business status, and applicable regulations.",
      },
      {
        question: "What documents are generally required for MCA annual filing?",
        answer: "Documents may include financial statements, audit reports where applicable, Board Report, company master data, director and shareholder information, shareholding details, meeting records, previous MCA filings, and other company-specific records.",
      },
      {
        question: "What is ROC compliance?",
        answer: "ROC compliance refers to applicable statutory filings, disclosures, records, and reporting requirements that companies are required to maintain or submit to the Registrar of Companies under the applicable corporate regulations.",
      },
      {
        question: "Can you assist with MCA filing preparation?",
        answer: "Yes. Assistance can include compliance requirement assessment, document collection, financial and corporate information review, filing preparation, submission support, and maintaining post-filing records.",
      },
    ],
  },
  {
    slug: "dsc",
    label: "DSC (Digital Signature Certificate)",
    navDescription: "Application, issuance and renewal of digital signatures",
    icon: "Stamp",
    data: dscDigitalSignatureCertificateData,
    intro: {
      title: "Digital Signature Certificate (DSC) Services",
    },
    seo: {
      title: "DSC Digital Signature Certificate Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for Digital Signature Certificate (DSC) application, issuance, renewal, and usage for MCA, GST, income tax, tenders, and other online filings.",
    },
    schema: {
      name: "Digital Signature Certificate (DSC) Services",
      serviceType: "Digital Signature Certificate",
      description: "Structured assistance for Digital Signature Certificate application, issuance, renewal, and usage for MCA, GST, income tax, tenders, e-procurement, and other online filings.",
    },
    sections: [
      { key: "benefits", title: "DSC Service Benefits", id: "dsc-service-benefits", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who May Require a DSC?", id: "who-may-require-a-dsc", navLabel: "Who Can Benefit", variant: "list" },
      { key: "dscTypes", title: "Types of Digital Signature Certificates", id: "types-of-digital-signature-certificates", navLabel: "Types of Digital Signature Certificates", variant: "cards" },
      { key: "usageAreas", title: "DSC Usage Areas", id: "dsc-usage-areas", navLabel: "DSC Usage Areas", variant: "list" },
      { key: "businessNeeds", title: "Business & Compliance Requirements", id: "business-compliance-requirements", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required for DSC", id: "documents-required-for-dsc", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Digital Signature Certificate Process", id: "digital-signature-certificate-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our DSC Support?", id: "why-choose-our-dsc-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is a Digital Signature Certificate (DSC)?",
        answer: "A Digital Signature Certificate is an electronic credential used to digitally sign documents, forms, applications, and online submissions where digital authentication is required.",
      },
      {
        question: "Where is a DSC used?",
        answer: "DSC may be required for MCA and ROC filings, GST-related activities, income tax submissions, e-tendering, e-procurement, government applications, and other digital transactions.",
      },
      {
        question: "Who may require a DSC?",
        answer: "Business owners, directors, designated partners, professionals, authorized signatories, companies, LLPs, taxpayers, and other eligible users may require a DSC depending on the applicable online filing or transaction.",
      },
      {
        question: "What documents are required for DSC?",
        answer: "Requirements may include PAN, Aadhaar or other identity proof, address proof, photograph, mobile number, email address, and applicable business or organization details.",
      },
      {
        question: "Can an existing DSC be renewed or replaced?",
        answer: "Yes. DSC renewal, replacement, and related assistance may be required when a certificate expires, is lost, becomes unusable, or when updated applicant information is required.",
      },
    ],
  },
  {
    slug: "startup-india-dpiit-recognition",
    label: "Startup India (DPIIT) Recognition",
    navDescription: "Eligibility assessment and DPIIT recognition support",
    icon: "Sparkles",
    data: startupIndiaDpiitRecognitionData,
    intro: {
      title: "Startup India (DPIIT) Recognition Services",
    },
    seo: {
      title: "Startup India DPIIT Recognition Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for Startup India DPIIT Recognition in India, including eligibility assessment, application preparation, documentation support, and DPIIT recognition process guidance.",
    },
    schema: {
      name: "Startup India DPIIT Recognition Services",
      serviceType: "Startup India DPIIT Recognition",
      description: "Professional assistance for Startup India DPIIT Recognition in India, including eligibility assessment, application preparation, documentation support, and DPIIT recognition process guidance.",
    },
    sections: [
      { key: "benefits", title: "Benefits of DPIIT Recognition Support", id: "benefits-of-dpiit-recognition-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "recognitionAreas", title: "DPIIT Recognition Areas", id: "dpiit-recognition-areas", navLabel: "DPIIT Recognition Areas", variant: "list" },
      { key: "startupTypes", title: "Startup Types We Support", id: "startup-types-we-support", navLabel: "Startup Types We Support", variant: "cards" },
      { key: "businessNeeds", title: "Startup Business Needs We Support", id: "startup-business-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents & Information Required", id: "documents-information-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Startup India DPIIT Recognition Process", id: "startup-india-dpiit-recognition-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our DPIIT Recognition Support", id: "why-choose-our-dpiit-recognition-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is Startup India DPIIT Recognition?",
        answer: "Startup India DPIIT Recognition is a formal recognition process for eligible startups under the Startup India framework. The application involves reviewing the startup profile, business structure, activities, innovation or improvement, scalability, and supporting information against applicable requirements.",
      },
      {
        question: "Who can apply for DPIIT Startup Recognition?",
        answer: "Eligible startups operating through applicable business structures may apply for DPIIT recognition, subject to the conditions and requirements applicable to their entity, business activity, incorporation or registration status, and other relevant criteria.",
      },
      {
        question: "What documents are required for DPIIT Recognition?",
        answer: "Documents and information may include incorporation or registration records, PAN, entity details, founder or director information, business activity, business model, product or service information, innovation or improvement details, scalability information, and other supporting documents applicable to the application.",
      },
      {
        question: "Is DPIIT Recognition the same as company registration?",
        answer: "No. Company or entity registration establishes the legal business structure, while DPIIT recognition is a separate recognition process under the Startup India framework for eligible startups.",
      },
      {
        question: "Can you help with the DPIIT Recognition application?",
        answer: "Yes. Assistance can cover startup profile assessment, applicable requirement review, documentation, application preparation, submission support, and applicable follow-up.",
      },
    ],
  },
  {
    slug: "labour-licence",
    label: "Labour Licence",
    navDescription: "Labour licence registration and compliance support",
    icon: "BriefcaseBusiness",
    data: labourLicenceData,
    intro: {
      title: "Labour Licence Services",
    },
    seo: {
      title: "Labour Licence Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for labour licence registration in India, including application preparation, documentation, compliance support, and licence process guidance.",
    },
    schema: {
      name: "Labour Licence Services",
      serviceType: "Labour Licence",
      description: "Professional assistance for labour licence registration in India, including application preparation, documentation, compliance support, and licence process guidance.",
    },
    sections: [
      { key: "benefits", title: "Benefits of Labour Licence Support", id: "benefits-of-labour-licence-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "licenceTypes", title: "Labour Licence Types", id: "labour-licence-types", navLabel: "Labour Licence Types", variant: "cards" },
      { key: "labourAreas", title: "Labour Compliance Areas", id: "labour-compliance-areas", navLabel: "Labour Compliance Areas", variant: "list" },
      { key: "businessNeeds", title: "Business Needs We Support", id: "business-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required", id: "documents-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Labour Licence Process", id: "labour-licence-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our Labour Licence Support", id: "why-choose-our-labour-licence-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is a Labour Licence?",
        answer: "A Labour Licence is an applicable registration or licence required under relevant labour regulations for certain establishments, contractors, or activities. The specific requirement depends on the nature of the business, workforce, contractual arrangements, location, and applicable regulations.",
      },
      {
        question: "Who may require Labour Licence support?",
        answer: "Contractors, principal employers, companies, establishments, and businesses engaging workers or contract labour may require applicable registrations, licences, or compliance support depending on their business activities and workforce arrangements.",
      },
      {
        question: "What documents are required for Labour Licence?",
        answer: "Documents may include business registration details, PAN, identity and address proofs, establishment details, contractor or principal employer information, worksite details, contract or work-order information, workforce details, and other documents applicable to the specific registration or licence.",
      },
      {
        question: "Can you help with the Labour Licence application process?",
        answer: "Yes. Assistance can cover requirement assessment, document preparation, application information, submission support, applicable follow-up, and maintaining relevant records.",
      },
      {
        question: "Does every business need a Labour Licence?",
        answer: "Not necessarily. Labour registration and licensing requirements vary according to the nature of the establishment, workforce, contractual arrangements, state or location, and applicable labour laws and regulations.",
      },
    ],
  },
  {
    slug: "fssai-licence",
    label: "FSSAI Licence",
    navDescription: "Food licence registration, renewal and compliance",
    icon: "Utensils",
    data: fssaiLicenceData,
    intro: {
      title: "FSSAI Licence & Registration",
    },
    seo: {
      title: "FSSAI Licence Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for FSSAI licence and registration, including eligibility assessment, documentation, application filing, renewal, and food business compliance support.",
    },
    schema: {
      name: "FSSAI Licence Services",
      serviceType: "FSSAI Licence and Registration",
      description: "Structured assistance for FSSAI licence and registration, including eligibility assessment, documentation, application filing, renewal, and food business compliance support.",
    },
    sections: [
      { key: "benefits", title: "Benefits of FSSAI Licence Support", id: "benefits-of-fssai-licence-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "licenceTypes", title: "FSSAI Licence Types", id: "fssai-licence-types", navLabel: "FSSAI Licence Types", variant: "cards" },
      { key: "foodBusinessAreas", title: "Food Business Areas", id: "food-business-areas", navLabel: "Food Business Areas", variant: "list" },
      { key: "businessNeeds", title: "FSSAI Business Needs", id: "fssai-business-needs", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required", id: "documents-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "FSSAI Licence Process", id: "fssai-licence-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our FSSAI Support", id: "why-choose-our-fssai-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is FSSAI Licence?",
        answer: "FSSAI Licence or registration is applicable to eligible food businesses as required under the applicable food safety regulations. The requirement depends on the nature, scale, activities, and other applicable conditions of the food business.",
      },
      {
        question: "Who needs FSSAI Registration or Licence?",
        answer: "Food manufacturers, processors, restaurants, retailers, wholesalers, distributors, caterers, cloud kitchens, food traders, and other applicable food businesses may require FSSAI registration or licensing based on their business activities and applicable requirements.",
      },
      {
        question: "Which type of FSSAI Licence is applicable?",
        answer: "The applicable category may depend on the nature of the food business, scale of operations, turnover, activities, location, and other regulatory conditions. The requirement should be assessed based on the specific business profile.",
      },
      {
        question: "What documents are required for FSSAI Licence?",
        answer: "Documents may include applicant identity details, PAN, business registration documents, address and premises information, food business activity details, product information, and other supporting documents depending on the business type and applicable licence category.",
      },
      {
        question: "Can FSSAI Licence be renewed or modified?",
        answer: "FSSAI registration or licence may require renewal, modification, or other updates depending on the applicable requirements and changes in the food business. The specific requirement should be reviewed based on the licence and business profile.",
      },
      {
        question: "Do you provide FSSAI application support?",
        answer: "Yes. The service can include requirement assessment, document preparation, application assistance, submission support, application tracking, and applicable renewal or modification assistance.",
      },
    ],
  },
  {
    slug: "iso-certification",
    label: "ISO Certification",
    navDescription: "Standard selection, documentation and audit readiness",
    icon: "Award",
    data: isoCertificationData,
    intro: {
      title: "ISO Certification Services",
    },
    seo: {
      title: "ISO Certification Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for ISO certification in India, including standard selection, documentation, implementation support, audit preparation, and certification process guidance.",
    },
    schema: {
      name: "ISO Certification Services",
      serviceType: "ISO Certification",
      description: "Structured assistance for ISO certification in India, including standard selection, documentation, implementation support, audit preparation, and certification process guidance.",
    },
    sections: [
      { key: "benefits", title: "Benefits of ISO Certification Support", id: "benefits-of-iso-certification-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "isoStandards", title: "ISO Standards", id: "iso-standards", navLabel: "ISO Standards", variant: "cards" },
      { key: "certificationAreas", title: "ISO Certification Areas", id: "iso-certification-areas", navLabel: "ISO Certification Areas", variant: "list" },
      { key: "businessNeeds", title: "Business Needs", id: "business-needs", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents Required for ISO Certification", id: "documents-required-for-iso-certification", navLabel: "Documents", variant: "list" },
      { key: "process", title: "ISO Certification Process", id: "iso-certification-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our ISO Support", id: "why-choose-our-iso-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is ISO Certification?",
        answer: "ISO certification is a formal assessment of an organization's management system or processes against the requirements of a specified ISO standard by an applicable certification body. Different ISO standards address areas such as quality management, environmental management, information security, occupational health and safety, food safety, and other management systems.",
      },
      {
        question: "Which ISO Certification is suitable for my business?",
        answer: "The appropriate ISO standard depends on the nature of the organization, products or services, operational processes, business objectives, risks, and applicable requirements. A business profile and process assessment can help identify relevant ISO standards.",
      },
      {
        question: "Who can apply for ISO Certification?",
        answer: "Companies, startups, MSMEs, manufacturers, service providers, traders, exporters, technology businesses, healthcare organizations, educational institutions, and other organizations may consider applicable ISO certification based on their activities and management system requirements.",
      },
      {
        question: "What documents are required for ISO Certification?",
        answer: "Documentation can vary by ISO standard and organization. Common information may include business registration details, organization structure, process information, policies, procedures, operational records, quality records, risk assessments, training records, internal audit records, and management review records where applicable.",
      },
      {
        question: "How does the ISO Certification process work?",
        answer: "The process generally involves identifying the applicable standard, assessing existing processes, conducting a gap assessment, preparing required documentation, supporting implementation readiness, preparing for the certification audit, and addressing applicable findings before certification is completed by the certification body.",
      },
      {
        question: "Do you provide ISO documentation and audit preparation support?",
        answer: "Yes. Support can include ISO standard identification, gap assessment, management system documentation, implementation readiness, internal audit preparation, certification audit preparation, corrective action support, and coordination through applicable certification stages.",
      },
    ],
  },
  {
    slug: "trademark-registration",
    label: "Trademark Registration",
    navDescription: "Trademark search, filing and registration support",
    icon: "Tags",
    data: trademarkRegistrationData,
    intro: {
      title: "Trademark Registration Services",
    },
    seo: {
      title: "Trademark Registration Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for trademark registration in India, including trademark search, application preparation, documentation, filing support, and registration process guidance.",
    },
    schema: {
      name: "Trademark Registration Services",
      serviceType: "Trademark Registration",
      description: "Professional assistance for trademark registration in India, including trademark search, application preparation, documentation, filing support, and registration process guidance.",
    },
    sections: [
      { key: "benefits", title: "Benefits of Trademark Registration Support", id: "benefits-of-trademark-registration-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "trademarkTypes", title: "Types of Trademarks", id: "types-of-trademarks", navLabel: "Types of Trademarks", variant: "cards" },
      { key: "trademarkClasses", title: "Trademark Classification Areas", id: "trademark-classification-areas", navLabel: "Trademark Classification Areas", variant: "list" },
      { key: "businessNeeds", title: "Business Needs We Support", id: "business-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents & Information Required", id: "documents-information-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "Trademark Registration Process", id: "trademark-registration-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our Trademark Registration Support", id: "why-choose-our-trademark-registration-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is Trademark Registration?",
        answer: "Trademark Registration is the formal process of registering an eligible trademark such as a brand name, logo, symbol, word, label, tagline, or other mark used in connection with goods or services. The application and registration process is subject to applicable trademark laws and requirements.",
      },
      {
        question: "Who can apply for Trademark Registration?",
        answer: "Entrepreneurs, startups, companies, LLPs, partnership firms, proprietorships, MSMEs, and other eligible applicants may apply for trademark registration depending on the nature of the mark and applicable requirements.",
      },
      {
        question: "What can be registered as a trademark?",
        answer: "Depending on applicable requirements, trademarks may include brand names, words, logos, symbols, labels, taglines, product names, service names, and combinations of eligible marks.",
      },
      {
        question: "Why is trademark search important?",
        answer: "A preliminary trademark search can help identify potentially relevant existing marks before filing. It can assist with evaluating the proposed mark and selecting an appropriate application strategy, although a search does not guarantee registration.",
      },
      {
        question: "What documents are required for trademark registration?",
        answer: "Documents may include applicant identity and address details, business registration documents where applicable, trademark or logo details, goods or services description, class information, use-related information where applicable, authorization documents, and other supporting documents.",
      },
      {
        question: "Can you help with trademark application filing?",
        answer: "Yes. Assistance can include preliminary search, class identification, application preparation, documentation, filing support, application tracking, and applicable examination or objection-related assistance.",
      },
    ],
  },
  {
    slug: "zed-certification",
    label: "ZED Certification",
    navDescription: "ZED assessment readiness and certification assistance",
    icon: "Factory",
    data: zedCertificationData,
    intro: {
      title: "ZED Certification Services",
      extra: "ZED Certification focuses on encouraging MSMEs to improve quality, manufacturing processes, productivity, resource efficiency, environmental performance, and responsible business practices. Our support covers requirement assessment, documentation, process preparation, assessment readiness, and certification-related assistance.",
    },
    seo: {
      title: "ZED Certification Services in India | AarambhGrow Advisory",
      description: "Get professional assistance for ZED Certification in India, including eligibility assessment, application support, documentation, certification guidance, and ZED compliance assistance for MSMEs.",
    },
    schema: {
      name: "ZED Certification Services",
      serviceType: "ZED Certification",
      description: "Professional assistance for ZED Certification in India, including eligibility assessment, application support, documentation, certification guidance, and ZED compliance assistance for MSMEs.",
    },
    sections: [
      { key: "benefits", title: "Benefits of ZED Certification Support", id: "benefits-of-zed-certification-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "zedLevels", title: "ZED Certification Levels", id: "zed-certification-levels", navLabel: "ZED Certification Levels", variant: "cards" },
      { key: "assessmentAreas", title: "ZED Assessment Areas", id: "zed-assessment-areas", navLabel: "ZED Assessment Areas", variant: "list" },
      { key: "businessNeeds", title: "Business Needs We Support", id: "business-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents & Information Required", id: "documents-information-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "ZED Certification Process", id: "zed-certification-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our ZED Certification Support", id: "why-choose-our-zed-certification-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is ZED Certification?",
        answer: "ZED, or Zero Defect Zero Effect, is an MSME-focused initiative that encourages businesses to improve product quality, manufacturing processes, productivity, environmental performance, and responsible business practices.",
      },
      {
        question: "Who can apply for ZED Certification?",
        answer: "Micro, small, and medium enterprises may consider ZED-related registration and certification requirements based on their business profile, manufacturing activities, and applicable scheme requirements.",
      },
      {
        question: "What are the ZED Certification levels?",
        answer: "The ZED framework includes Bronze, Silver, and Gold levels. The applicable assessment and certification requirements depend on the relevant scheme criteria and the enterprise's readiness.",
      },
      {
        question: "What areas are covered under ZED assessment?",
        answer: "Assessment areas may include product and process quality, productivity, defect and waste reduction, resource efficiency, environmental performance, workplace practices, quality records, customer satisfaction, and continuous improvement.",
      },
      {
        question: "What documents are required for ZED Certification?",
        answer: "Documents and information may include Udyam details, business registration documents, manufacturing and process information, quality records, SOPs, inspection or testing records, environmental and resource-efficiency records, safety information, and existing certifications where applicable.",
      },
      {
        question: "Can you help with ZED assessment preparation?",
        answer: "Yes. Assistance can include requirement assessment, documentation review, process preparation, quality and operational readiness, assessment documentation, application support, and applicable post-assessment coordination.",
      },
    ],
  },
  {
    slug: "80iac-tax-exemption",
    label: "80IAC Tax Exemption",
    navDescription: "Section 80-IAC eligibility and exemption application",
    icon: "Percent",
    data: eightyIacTaxExemptionData,
    intro: {
      title: "80-IAC Tax Exemption Services",
    },
    seo: {
      title: "80IAC Tax Exemption Services in India | AarambhGrow Advisory",
      description: "Get structured assistance for Section 80-IAC tax exemption eligibility, documentation, application, and startup tax compliance requirements.",
    },
    schema: {
      name: "80IAC Tax Exemption Services",
      serviceType: "Section 80-IAC Tax Exemption",
      description: "Structured assistance for Section 80-IAC tax exemption eligibility, documentation, application, and startup tax compliance requirements.",
    },
    sections: [
      { key: "benefits", title: "Benefits of 80-IAC Tax Exemption Support", id: "benefits-of-80-iac-tax-exemption-support", navLabel: "Benefits", variant: "cards" },
      { key: "suitedFor", title: "Who Can Benefit", id: "who-can-benefit", navLabel: "Who Can Benefit", variant: "list" },
      { key: "eligibilityAreas", title: "80-IAC Eligibility Areas", id: "80-iac-eligibility-areas", navLabel: "80-IAC Eligibility Areas", variant: "list" },
      { key: "exemptionAreas", title: "Tax Exemption Areas", id: "tax-exemption-areas", navLabel: "Tax Exemption Areas", variant: "list" },
      { key: "businessNeeds", title: "Startup Tax Needs We Support", id: "startup-tax-needs-we-support", navLabel: "Business Needs", variant: "cards" },
      { key: "whatWeDo", title: "What We Do", id: "what-we-do", navLabel: "What We Do", variant: "list" },
      { key: "documents", title: "Documents & Information Required", id: "documents-information-required", navLabel: "Documents", variant: "list" },
      { key: "process", title: "80-IAC Tax Exemption Process", id: "80-iac-tax-exemption-process", navLabel: "Process", variant: "process" },
      { key: "whyChoose", title: "Why Choose Our 80-IAC Support", id: "why-choose-our-80-iac-support", navLabel: "Why Choose Us", variant: "cards" },
    ],
    faqs: [
      {
        question: "What is Section 80-IAC tax exemption?",
        answer: "Section 80-IAC provides a tax deduction framework for eligible startups that satisfy the applicable conditions under the Income-tax Act and related rules. Eligibility depends on the startup's legal structure, recognition status, incorporation date, business activity, and other applicable requirements.",
      },
      {
        question: "Who can apply for 80-IAC tax exemption?",
        answer: "Eligible startups that satisfy the applicable conditions can seek the benefit under Section 80-IAC. Eligibility depends on factors such as startup recognition, legal structure, incorporation date, business activity, and other prescribed requirements.",
      },
      {
        question: "Is DPIIT recognition required for 80-IAC tax exemption?",
        answer: "Startup recognition and other prescribed conditions form an important part of the 80-IAC eligibility assessment. The applicable requirements should be reviewed based on the startup's current status and supporting documentation.",
      },
      {
        question: "What documents are required for 80-IAC tax exemption?",
        answer: "Documents may include incorporation records, PAN, startup recognition documents where applicable, constitutional documents, founder or director information, business model details, financial information, tax records, and other supporting documents relevant to the eligibility and application process.",
      },
      {
        question: "Does every startup automatically qualify for 80-IAC?",
        answer: "No. The benefit is subject to applicable eligibility conditions and requirements. A startup should be assessed based on its legal structure, recognition status, incorporation details, business activity, documentation, and other applicable conditions before applying.",
      },
    ],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) || null;
}

export function getServiceEntry(service) {
  return service?.data?.services?.[0] || null;
}
