"use client";

import { motion, AnimatePresence } from "framer-motion";
import IPhoneFrame from "./IPhoneFrame";

interface Feature {
  key: string;
  mockupSrc: string;
  mockupAlt: string;
}

interface MockupShowcaseProps {
  activeFeature: number;
  features: Feature[];
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MockupShowcase({ activeFeature, features }: MockupShowcaseProps) {
  const active = features[activeFeature];
  if (!active) return null;

  return (
    <div className="flex items-center justify-center py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, x: 20, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.97 }}
          transition={{ duration: 0.25, ease }}
        >
          <IPhoneFrame
            src={active.mockupSrc}
            alt={active.mockupAlt}
            accentColor="#4DFFED"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
