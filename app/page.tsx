import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/features/hero/hero";
import { Services } from "@/features/services/services";
import { HowItWorks } from "@/features/how-it-works/how-it-works";
import { Processes } from "@/features/processes/processes";
import { About } from "@/features/about/about";
import { ContactCTA } from "@/features/contact-cta/contact-cta";
import { getTranslation } from "@/lib/i18n/get-translation";
import { LangProvider } from "@/lib/i18n/use-translation";
import { absoluteUrl, siteConfig } from "@/lib/seo";

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[color:rgba(255,87,35,0.15)] to-transparent" />;
}

export default async function Home() {
  const { t, lang } = await getTranslation();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon"),
        description: siteConfig.description,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: siteConfig.whatsapp,
            availableLanguage: ["Spanish", "English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: lang === "en" ? "en" : "es",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#service"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        telephone: siteConfig.whatsapp,
        areaServed: "Worldwide",
        serviceType: t.services.items.map((item) => item.title),
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        telephone: siteConfig.whatsapp,
        email: "weareitera@gmail.com",
        logo: absoluteUrl("/itera-og.png"),
        image: absoluteUrl("/itera-og.png"),
        address: {
          "@type": "PostalAddress",
          addressCountry: "AR",
        },
        areaServed: [
          { "@type": "Country", name: "Argentina" },
          { "@type": "Country", name: "Uruguay" },
          { "@type": "Country", name: "Chile" },
        ],
        priceRange: "$$",
        sameAs: [
          "https://www.instagram.com/weareitera",
          "https://www.linkedin.com/company/weareitera",
        ],
      },
    ],
  };

  return (
    <LangProvider initialLang={lang}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main className="pt-16">
        <Hero t={t.hero} />
        <Divider />
        <Services t={t.services} />
        <Divider />
        <HowItWorks t={t.how} />
        <Divider />
        <Processes t={t.processes} />
        <Divider />
        <About t={t.about} />
        <Divider />
        <ContactCTA t={t.cta} />
      </main>
      <SiteFooter t={t.footer} />
    </LangProvider>
  );
}
