"use client";

import React, { useState } from "react";
import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  imageSrc: string;
  overlayBadgeUrl?: string;
};

interface LeadershipSectionProps {
  title?: string;
  leaders?: Leader[];
  paragraphs?: string[];
  className?: string;
}

const DEFAULT_TITLE = "Transformational Leadership: Advancing Ghana’s Housing And Customer Service Excellence";

const DEFAULT_LEADERS: Leader[] = [
  {
    name: "H.E. John Dramani Mahama",
    role: "President of The Republic of Ghana",
    imageSrc: "/leadership/1.jpg",
  },
  {
    name: "Hon. Kenneth Gilbert Adjei",
    role: "Minister for Works and Housing",
    imageSrc: "/leadership/2.jpg",
  },
  {
    name: "Mr. Courage Makafui Nunekpeku",
    role: "Managing Director, TDC Ghana Ltd",
    imageSrc: "/leadership/3.jpg",
  },
];

const DEFAULT_PARAGRAPHS: string[] = [
  "Under the leadership of H.E. John Dramani Mahama, Ghana witnessed remarkable strides in governance and development. His vision and commitment to progress led to the appointment of Hon. Kenneth Gilbert Adjei as Minister for Works and Housing, bringing fresh energy and focus to the sector.",
  "In the same spirit of transformation, Mr. Courage Makafui Nunekpeku was appointed as the Managing Director of TDC Ghana Ltd. Under his stewardship, the face of TDC Ghana has changed significantly, with the establishment of a 24-hour call center to serve clients promptly and efficiently.",
  "Today, TDC Ghana is recognized for delivering prestige and premium services, ensuring that the needs of customers are met with professionalism, speed, and excellence.",
];

const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  title = DEFAULT_TITLE,
  leaders = DEFAULT_LEADERS,
  paragraphs = DEFAULT_PARAGRAPHS,
  className = "",
}) => {
  return (
    <section className={`bg-background-light dark:bg-background-dark py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="max-w-4xl mx-auto text-3xl lg:text-4xl font-bold text-foreground font-serif leading-tight text-center mb-12">
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {leaders.map((leader) => (
            <LeaderCard leader={leader} key={leader.name} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraphs.map((text, idx) => (
                  <p key={idx} className="text-base md:text-lg leading-7 md:leading-8">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;

const LeaderCard: React.FC<{ leader: Leader; widthPx?: number; aspectRatio?: string }> = ({ leader, widthPx = 320, aspectRatio = "4 / 5" }) => {
  const [hadError, setHadError] = useState(false);
  // height is automatically computed by CSS from width and aspectRatio

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <div
          className="relative mx-auto rounded-lg overflow-hidden shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:shadow-lg transition"
          style={{ width: widthPx, aspectRatio }}
        >
          <Image
            src={hadError ? "/placeholder.svg" : leader.imageSrc}
            alt={`Portrait of ${leader.name}`}
            fill
            sizes={`(max-width: 768px) ${widthPx}px, ${widthPx}px`}
            priority={false}
            quality={80}
            className="object-cover"
            onError={() => setHadError(true)}
          />
        </div>
        {leader.overlayBadgeUrl ? (
          <Image
            src={leader.overlayBadgeUrl}
            alt=""
            width={48}
            height={32}
            className="absolute top-4 left-4 rounded"
            priority={false}
            quality={60}
          />
        ) : null}
      </div>
      <h2 className="text-lg font-semibold mt-4 text-text-light dark:text-text-dark">{leader.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{leader.role}</p>
    </div>
  );
};