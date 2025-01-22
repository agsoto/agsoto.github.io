

export function generateStaticPaths() {
    const supportedLocales = ['en', 'es']; // List of supported locales
    return supportedLocales.map((lang) => ({
      params: { lang }, // `lang` matches the dynamic `[lang]` segment
    }));
  }
