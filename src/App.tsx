import { motion } from "framer-motion";

import { staggerContainer } from "./core/utils/motion";
import ProjectFormPage from "./pages/projects/project-form-page";

function App() {
  return (
    <motion.div
      variants={staggerContainer(1, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`w-full h-screen`}
    >
      <ProjectFormPage />
    </motion.div>
  );
}

export default App;
