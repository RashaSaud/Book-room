import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CalendarComponent from "src/components/Calendar";
import TaskBarComponent from "src/components/taskBar";
import { baseUrl } from "src/core/static/static";
import { slideIn } from "src/core/utils/motion";
import { styles } from "src/styles";
import {useAuth} from '../../auth/user-context'
const CalendarContainer = () => {
  const { userData } = useAuth();

  const [Ground, setGround] = useState<boolean>(true);
  const handleToggle = () => {
    setGround(!Ground);
    console.log(userData.user);
    
  };
  useEffect(() => {
    const deleteExpiredBookings = async () => {
      try {
        const response = await axios.delete(`${baseUrl}/delete-booking`);

      } catch (error) {
        //
      }
    };
    const intervalId = setInterval(deleteExpiredBookings, 60000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="h-screen">

      <div
        className={`xl:mt-32 mobile:mt-32 flex xl:flex-row w-full justify-center items-center flex-col-reverse gap-10 mobile:gap-0`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-tertiary2 space-y-7 p-10 mobile:p-0 mobile:px-0 mobile:py-10 h-full w-full rounded-2xl"
        >
          <h3 className={styles.sectionSubText}>Meeting room Calendar</h3>
          <section className="relative py-8 sm:p-8 p-2 bg-white rounded-md">
            <TaskBarComponent
              Ground={Ground}
              handleToggle={() => handleToggle()}
            />
            <CalendarComponent isGround={Ground} />
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarContainer;
