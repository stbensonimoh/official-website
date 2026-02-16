import { Metadata } from "next";
import { roboto } from "@/app/fonts";
import PageTracker from "@/app/components/PageTracker";
import { 
  FiMonitor, 
  FiCode, 
  FiTerminal,
  FiExternalLink,
  FiCalendar
} from "react-icons/fi";
import usesData from "@/data/uses.json";

export const metadata: Metadata = {
  title: "Uses - Benson Imoh,ST",
  description: "A list of hardware, software, and development tools I use for software engineering, DevOps, and open source advocacy.",
  openGraph: {
    url: "https://stbensonimoh.com/uses",
    title: "Uses - Benson Imoh,ST",
    description: "A list of hardware, software, and development tools I use for software engineering, DevOps, and open source advocacy.",
    images: [
      {
        url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
        width: 1500,
        height: 1500,
        alt: "Benson Imoh,ST",
      },
    ],
    siteName: "Benson Imoh,ST",
  },
  twitter: {
    creator: "@stbensonimoh",
    card: "summary_large_image",
    title: "Uses - Benson Imoh,ST",
    description: "A list of hardware, software, and development tools I use for software engineering, DevOps, and open source advocacy.",
    images: {
      url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
      alt: "Benson Imoh, ST's Logo",
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor: FiMonitor,
  Code: FiCode,
  Terminal: FiTerminal,
};

interface UsesItem {
  name: string;
  description: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: UsesItem[];
}

export default function Uses() {
  const categories: Category[] = usesData.categories;
  const lastUpdated = usesData.lastUpdated;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageTracker pageType="uses" />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-surface">
        <div className="text-center max-w-4xl">
          <h1 className={`${roboto.className} text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6`}>
            My Setup<span className="text-primary">.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            A comprehensive list of hardware, software, and development tools I use daily for building software, managing infrastructure, and contributing to open source.
          </p>
          <div className="flex items-center justify-center mt-8 text-secondary">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Last updated: {formatDate(lastUpdated)}
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="flex-grow py-16 md:py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon];
              
              return (
                <div 
                  key={category.id}
                  className="flex flex-col bg-surface rounded-lg p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]"
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mr-4">
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>
                    <div>
                      <h2 className={`${roboto.className} text-2xl font-medium text-foreground`}>
                        {category.name}
                      </h2>
                      <p className="text-sm text-secondary mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <ul className="space-y-4 flex-grow">
                    {category.items.map((item, index) => (
                      <li key={index} className="group">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-3 rounded-md transition-colors duration-200 hover:bg-background"
                        >
                          <div className="flex-grow">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 flex items-center">
                              {item.name}
                              <FiExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </h3>
                            <p className="text-sm text-secondary mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-6 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-secondary text-sm">
            Some links above may be affiliate links. I only recommend tools I genuinely use and trust. 
            This page was inspired by the{" "}
            <a 
              href="https://uses.tech/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              /uses
            </a>
            {" "}movement.
          </p>
        </div>
      </section>
    </div>
  );
}
