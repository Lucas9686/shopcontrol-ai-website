"use client";

import type React from "react";
import { motion, type Variants } from "framer-motion";

interface HeroAnimatedProps {
  headline: React.ReactNode;
  subheadline: string;
  cta: React.ReactNode;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroAnimated({ headline, subheadline, cta }: HeroAnimatedProps) {
  return (
    <motion.div
      className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold tracking-tight md:text-6xl"
        custom={0}
        variants={fadeUp}
      >
        {headline}
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-muted-foreground md:text-xl"
        custom={1}
        variants={fadeUp}
      >
        {subheadline}
      </motion.p>
      <motion.div className="mt-8" custom={2} variants={fadeUp}>
        {cta}
      </motion.div>
    </motion.div>
  );
}
