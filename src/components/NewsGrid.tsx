"use client";

import { motion } from "framer-motion";

/**
 * NewsGrid — Figma node 186:3303
 *
 * 4 article cards in a horizontal row (with horizontal scroll on overflow)
 * Each card: Image (400px) + Content area (title + description + "Ler mais")
 *
 * Height: 979px
 */

const articles = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: null,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: null,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: null,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: null,
  },
];

export function NewsGrid() {
  return (
    <section className="relative w-full py-36 bg-white overflow-hidden">
      <div className="page-container">
        {/* Cards row — Figma node 186:3340 */}
        <div className="flex flex-wrap gap-4">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 min-w-[280px] max-w-[340px] flex flex-col cursor-pointer group"
            >
              {/* Image — Figma node 186:3311 */}
              <div className="w-full h-[400px] bg-neutral-950 rounded-t-lg" />

              {/* Content — Figma node 186:3310 */}
              <div className="bg-neutral-50 p-6 flex flex-col gap-7 rounded-b-lg">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-regular leading-snug text-neutral-950">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {article.description}
                  </p>
                </div>
                <button className="self-center px-6 py-2 text-base font-regular text-neutral-950 hover:text-dark-blue-500 transition-colors">
                  Ler mais
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
