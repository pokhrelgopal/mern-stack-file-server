import { ArrowCircleRight } from "iconsax-react";
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/tw-merge";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  className,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
          className={cn("fixed inset-y-0 right-0 z-50 w-full", className)}
        >
          <div ref={sheetRef} className="relative h-full bg-white shadow-xl">
            {showCloseButton && (
              <p className="absolute top-20 -left-4 clear-both bg-white rounded-full">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowCircleRight className="stroke-dark cursor-pointer size-5" />
                </button>
              </p>
            )}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sheet;
