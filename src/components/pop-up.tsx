interface PopUpProps {
  event: {
    name: string;
    company: string;
    email: string;
    isAccepted: boolean; // Change to boolean
    startTime: string;
    endTime: string;
    meetingRoom: string;
    isGround: boolean;
    program: string;
  };
  showpopUp: boolean;
  onClose: () => void;
}

function PopUp({ showpopUp, event, onClose }: PopUpProps) {
  // Destructure props directly
  return (
    <>
      {showpopUp ? ( // Simplify the conditional
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto overflow-y-auto bg-black/50" // Added overlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // Close on overlay click
              onClose();
            }
          }}
        >
          <div className="bg-white grid w-[736px] h-[481px] rounded-lg p-6 content-center justify-center items-center mobile:w-[379px] mobile:h-[181px]">
            <button // Use a button element for the close icon
              onClick={onClose}
              className="text-red-500 text-xl absolute top-2 right-2" // Position close button
            >
              X
            </button>{" "}
            {/* or <p>x</p> */}
            <div className="w-[633px] h-[208px]">
              <div className="flex flex-col relative w-full py-1 justify-center mx-auto mobile:w-[313px] mobile:h-[56px] mobile:mt-10">
                {/* Remove the input and label as they don't seem necessary */}
                <div className="text-black">
                  <p>Email: {event.email}</p>
                  <p>Company: {event.company}</p>
                  <p>Start Time: {event.startTime}</p>
                  <p>End Time: {event.endTime}</p>
                  <p>Meeting Room: {event.meetingRoom}</p>
                  {/* ... other event details */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PopUp;
