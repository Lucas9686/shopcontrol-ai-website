"use client";

import type React from "react";
import { motion, type Variants } from "framer-motion";

interface HeroAnimatedProps {
  headline: React.ReactNode;
  subheadline: string;
  badge?: React.ReactNode;
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

export function HeroAnimated({ headline, subheadline, badge, cta }: HeroAnimatedProps) {
  return (
    <motion.div
      className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      initial="hidden"
      animate="visible"
    >
      {badge && (
        <motion.div custom={0} variants={fadeUp}>
          {badge}
        </motion.div>
      )}
      <motion.h1
        className="text-4xl font-bold tracking-tight md:text-6xl"
        custom={badge ? 1 : 0}
        variants={fadeUp}
      >
        {headline}
      </motion.h1>
      {subheadline && (
        <motion.p
          className="mt-4 text-lg text-muted-foreground md:text-xl"
          custom={badge ? 2 : 1}
          variants={fadeUp}
        >
          {subheadline}
        </motion.p>
      )}
      <motion.div className="mt-8" custom={badge ? 3 : 2} variants={fadeUp}>
        {cta}
      </motion.div>
    </motion.div>
  );
}
