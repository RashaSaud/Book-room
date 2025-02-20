import { StarsCanvas } from "src/components/canvas";
import Navbar from "src/components/navbar";
import Contact from "src/containers/projects/contactContainar";
import { styles } from "src/styles";

export default function ProjectFormPage() {
  return (
    <div className="relative z-0 bg-primary bg-black text-white h-fit w-full">
      <Navbar />
      <div className={`${styles.padding}`}>
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}
