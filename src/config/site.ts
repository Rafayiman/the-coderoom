/**
 * Single source of truth for brand and contact details.
 * Nothing else in the codebase hard-codes an email, phone number or URL.
 */

const phones = [
  { display: "+92 339 2414107", tel: "+923392414107", wa: "923392414107" },
  { display: "+92 332 2677859", tel: "+923322677859", wa: "923322677859" },
  { display: "+92 336 2335312", tel: "+923362335312", wa: "923362335312" },
] as const;

export const site = {
  name: "The CodeRoom",
  domain: "thecoderoom.dev",
  url: "https://thecoderoom.dev",
  tagline: "Software, AI and Data Solutions",
  description:
    "The CodeRoom is a software development company building web applications, AI-powered systems, data analytics and automation for businesses.",

  contact: {
    email: "tcoderoom.dev@gmail.com",
    phones,
    /** Primary WhatsApp number (international format, digits only). */
    whatsapp: phones[0].wa,
    /**
     * Form endpoint. FormSubmit forwards submissions to the business inbox
     * (the first submission asks the inbox owner to confirm once). Swap this
     * URL to use any other service that accepts a JSON POST.
     */
    formEndpoint: "https://formsubmit.co/ajax/tcoderoom.dev@gmail.com",
  },

  nav: [
    { label: "Home", id: "home", path: "/" },
    { label: "About", id: "about", path: "/about" },
    { label: "Services", id: "services", path: "/services" },
    { label: "Projects", id: "projects", path: "/projects" },
    { label: "Contact", id: "contact", path: "/contact" },
  ],
} as const;

export const mailto = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const whatsappUrl = (text = "Hello The CodeRoom, I'd like to discuss a project.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;

/** Per-route meta so every page emits the same title / OG / Twitter set. */
export function pageMeta(title: string, description: string, path = "/") {
  const full = title === site.name ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`;
  const url = `${site.url}${path === "/" ? "" : path}`;
  const image = `${site.url}/og.png`;

  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Organisation structured data, rendered once in the root document. */
export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/thecoderoom.jpeg`,
    email: site.contact.email,
    telephone: site.contact.phones.map((p) => p.tel),
    description: site.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contact.email,
      telephone: site.contact.phones[0].tel,
    },
  };
}
