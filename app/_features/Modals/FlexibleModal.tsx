import { motion } from "motion/react";

function FlexibleModal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute bg-black-100 z-[9999] bottom-0 right-0 rounded-t-2xl ${className}`}
      layout
      transition={{ type: "spring", stiffness: 1000, damping: 40 }}
    >
      {children}
    </motion.div>
  );
}

export default FlexibleModal;
