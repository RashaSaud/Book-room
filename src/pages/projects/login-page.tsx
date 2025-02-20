import { motion } from "framer-motion";
import { StarsCanvas } from "src/components/canvas";
import Navbar from "src/components/navbar";
import SignIn from "src/containers/projects/signinContainar";
import { staggerContainer } from "src/core/utils/motion";
import { styles } from "src/styles";

export default function LoginPage() {
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
          <SignIn />
          <StarsCanvas />
        </div>
      </div>
    </motion.div>
  );
}
