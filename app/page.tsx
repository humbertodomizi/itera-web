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

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[color:rgba(255,87,35,0.15)] to-transparent" />;
}

export default async function Home() {
  const { t, lang } = await getTranslation();
  return (
    <LangProvider initialLang={lang}>
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
