import { motion } from "framer-motion";
import { StarsCanvas } from "src/components/canvas";
import Navbar from "src/components/navbar";
import CalendarContainer from "src/containers/projects/calindarContainer";
import { staggerContainer } from "src/core/utils/motion";
import { styles } from "src/styles";

export default function OperationPage() {
  return (
    <motion.div
      variants={staggerContainer(1, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`w-full h-screen`}
    >
      <div className="relative z-0 bg-black text-white h-fit  w-full">
        <Navbar />
        <div className={`${styles.padding}`}>
          <CalendarContainer />
          <StarsCanvas />
        </div>
      </div>
    </motion.div>
  );
}
