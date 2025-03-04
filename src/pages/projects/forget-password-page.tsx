import { motion } from "framer-motion";
import Navbar from "src/components/navbar";
import ForgetPassword from "src/containers/projects/forget-password";
import { staggerContainer } from "src/core/utils/motion";
import { styles } from "src/styles";

export default function ForgetPasswordPage() {
  return (
    <motion.div
      variants={staggerContainer(1, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`flex flex-col justify-center items-center relative z-0 w-full h-fit`}
    >
      <div className="relative z-0 bg-primary bg-black text-white h-fit w-full">
        <Navbar />
        <div className={`${styles.padding}`}>
          <ForgetPassword />
          {/* <StarsCanvas /> */}
        </div>
      </div>
    </motion.div>
  );
}
