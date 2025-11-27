// Global styles and application setup
import "@/styles/globals.css";
import { useEffect } from "react"; // React hooks
import Head from 'next/head'; // Next.js head management
import { Poppins, JetBrains_Mono } from "next/font/google"; // Google Fonts
import createUniformContext from "@/uniformContext/context"; // Uniform context creation
import { UniformAppProps } from "@uniformdev/context-next"; // Uniform Next.js integration
import { UniformContext } from "@uniformdev/context-react"; // Uniform React context
import type { RootComponentInstance } from '@uniformdev/canvas'; // Uniform composition types
import type { AppContext } from 'next/app'; // Next.js App context for getInitialProps
import { MobileMenuProvider } from "@/contexts/MobileMenuContext"; // Mobile menu state management

/**
 * Font Configuration - Google Fonts Setup
 * 
 * Using Next.js font optimization for better performance:
 * - Poppins: Main UI font (clean, modern sans-serif with nature-friendly feel)
 * - JetBrains Mono: Code/monospace font (for technical content)
 * 
 * CSS Variables:
 * - --font-sans: Available in CSS as var(--font-sans)
 * - --font-mono: Available in CSS as var(--font-mono)
 */
const poppins = Poppins({
  subsets: ["latin"], // Character subset to load
  variable: "--font-sans", // CSS variable name
  weight: ["300", "400", "500", "600", "700"], // Available font weights
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Create Uniform context for client-side operations
const clientContext = createUniformContext();

/**
 * Geo Props Interface - Vercel IP Geolocation Data
 * 
 * These values are extracted from Vercel's edge network headers
 * and made available to all pages for location-based personalization.
 */
interface GeoProps {
  geoCity: string;
  geoCountry: string;
  geoRegion: string;
}

/**
 * Next.js App Component - Application Root
 * 
 * This is the root component that wraps every page in the application.
 * It sets up global providers, fonts, metadata, and Uniform context.
 * 
 * Key Responsibilities:
 * - Global CSS injection
 * - SEO metadata management (title, description, keywords)
 * - Font loading and CSS variable setup  
 * - Uniform context provider setup
 * - Mobile menu state management
 * - Server/client context handling
 * - Geolocation-based personalization
 * 
 * Metadata Handling:
 * - Extracts page metadata from Uniform composition parameters
 * - Sets HTML title, meta description, and keywords
 * - Provides fallback values for better SEO
 * 
 * Provider Hierarchy:
 * 1. MobileMenuProvider: Mobile navigation state
 * 2. UniformContext: Uniform CMS context and personalization
 * 3. Font variables: CSS custom properties for fonts
 */
function App({
  Component, // The page component being rendered
  pageProps, // Props passed to the page component
  serverUniformContext, // Uniform context from server-side
}: UniformAppProps<{ data: RootComponentInstance } & GeoProps>) {
  const outputType = "standard"; // Uniform output type for rendering

  // Get the Uniform context (server or client)
  const context = serverUniformContext ?? clientContext;
  
  // Extract composition data for metadata
  const { data: composition } = pageProps || {};
  const { pageTitle, pageMetaDescription, pageKeywords } = composition?.parameters || {};
  
  // Extract metadata values with fallbacks
  const title = (pageTitle?.value as string) || 'Son Doong Cave - The World\'s Largest Cave';
  const description = (pageMetaDescription?.value as string) || 'Explore Son Doong Cave, the world\'s largest cave. Join us for an unforgettable expedition into nature\'s grandest underground wonder.';
  const keywords = (pageKeywords?.value as string) || 'son doong, cave expedition, vietnam tourism, adventure travel, cave exploration';

  // Update Uniform context with geolocation quirks for personalization
  useEffect(() => {
    const quirks: Record<string, string> = {};

    // Set Vercel geolocation quirks
    if (pageProps?.geoCity) quirks["vc-city"] = pageProps.geoCity;
    if (pageProps?.geoCountry) quirks["vc-country"] = pageProps.geoCountry;
    if (pageProps?.geoRegion) quirks["vc-region"] = pageProps.geoRegion;

    // Update context if we have quirks to set
    if (Object.keys(quirks).length > 0) {
      context
        .update({ quirks })
        .then(() => console.info("Uniform context updated with geolocation quirks:", quirks))
        .catch((e: unknown) => console.error("Failed to update Uniform context:", e));
    }
  }, [pageProps?.geoCity, pageProps?.geoCountry, pageProps?.geoRegion, context]);

  return (
    <>
      {/* HTML Head - SEO and Metadata */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Application Providers and Layout */}
      <MobileMenuProvider>
        <UniformContext
          context={context}
          outputType={outputType}
        >
          {/* Font CSS variables wrapper */}
          <div className={`font-sans ${poppins.variable} ${jetbrainsMono.variable}`}>
            {/* Render the current page component */}
            <Component {...pageProps} />
          </div>
        </UniformContext>
      </MobileMenuProvider>
    </>
  );
}

/**
 * App.getInitialProps - Server-Side Geolocation Extraction
 * 
 * Extracts IP-based geolocation data from Vercel's edge network headers.
 * These headers are automatically added by Vercel when deployed:
 * - x-vercel-ip-city: City name (e.g., "San Francisco")
 * - x-vercel-ip-country: ISO country code (e.g., "US")
 * - x-vercel-ip-country-region: Region/state code (e.g., "CA")
 * 
 * Default values are set for local development where headers aren't available.
 */
App.getInitialProps = async (context: AppContext) => {
  const { headers } = context.ctx.req || {};

  // Extract geo data from Vercel headers with fallback defaults
  const geoCity = (headers?.["x-vercel-ip-city"] as string) ?? "Unknown";
  const geoCountry = (headers?.["x-vercel-ip-country"] as string) ?? "Unknown";
  const geoRegion = (headers?.["x-vercel-ip-country-region"] as string) ?? "Unknown";

  return {
    pageProps: {
      geoCity,
      geoCountry,
      geoRegion,
    },
  };
};

export default App;
