import axios from "axios";
import * as ExcelJS from "exceljs";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { baseUrl } from "src/core/static/static";

interface TaskBarComponentProp {
  handleToggle: () => void;
  Ground: boolean;
}
function TaskBarComponent(props: TaskBarComponentProp) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-all-booking`);
        setData(response.data); // Type casting for safety
      } catch (error) {
        //
      }
    };

    fetchBookings(); // Call the function on component mount
  }, []);

  const handleExportForFacilitesSheet = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("BookingHistory");

    worksheet.addRow([
      "Company Name",
      "Meeting Room Number",
      "Program",
      "Start Time",
      "End Time",
      "Booked By",
    ]);

    data?.forEach((item: any) => {
      worksheet.addRow([
        item.company,
        item.meetingRoom,
        item.program,
        item.startTime,
        item.endTime,
        item.name,
      ]);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "BookingHistory.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    });
  };
  // const ExportToExcelSheet = () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("Users");

  //   worksheet.addRow(["Meeting", "Description", "Location", "date","Notice By"]);

  //   data?.forEach((item: any) => {
  //     worksheet.addRow([item.zone, item.description, item.location,item.date,'operatin Team']);
  //   });

  //   workbook.xlsx.writeBuffer().then((data) => {
  //     const blob = new Blob([data], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "users.xlsx";
  //     link.click();
  //     URL.revokeObjectURL(url);
  //   });
  // };

  const currentDate = new Date();
  const [showList, setShowList] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-4">
        <h5 className="text-xl leading-8 font-semibold text-gray-900">
          {currentDate.toDateString()}
        </h5>
      </div>
      <div className="hidden md:flex items-center gap-3 ">
        <div className="flex items-center gap-2">
          <button className="p-3 text-gray-500 flex items-center justify-center transition-all duration-300 hover:text-gray-900">
            <IoMdNotificationsOutline className=" size-5 font-extrabold" />
          </button>
          <span className="w-px h-7 bg-gray-200"></span>
          <button className="p-3 text-gray-500 flex items-center justify-center transition-all duration-300 hover:text-gray-900">
            {/* <RiFileExcel2Fill className=" size-5 font-extrabold" /> */}
            <BsDownload
              onClick={() => {
                handleExportForFacilitesSheet();
              }}
              className=" size-5 font-extrabold"
            />
          </button>
        </div>
        <button
          onClick={props.handleToggle}
          className="flex items-center gap-px p-1 rounded-md bg-gray-100"
        >
          <button
            onClick={() => {
              props.handleToggle;
            }}
            className={`${
              props.Ground ? "bg-white translate-x-0.5" : "bg-gray-100"
            } py-2.5 px-5 rounded-lg text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-white`}
          >
            Ground
          </button>
          <button
            onClick={() => {
              props.handleToggle;
            }}
            className={`${
              props.Ground ? "bg-gray-100" : "bg-white translate-x-0.5"
            } py-2.5 px-5 rounded-lg text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-white`}
          >
            Basement
          </button>
        </button>
      </div>
      <div className="dropdown relative inline-flex md:hidden">
        <button
          type="button"
          data-target="dropdown-default"
          className="dropdown-toggle inline-flex justify-center items-center gap-2 py-1.5 px-2.5 text-sm bg-gray-50 text-gray-900 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gray-100 "
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3H21M3 15H21M7 9H16.5M7 21H16.5"
              stroke="currentcolor"
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
          </svg>
          <HiChevronDown
            className={`${
              showList ? "rotate-180 duration-500" : "duration-500"
            } size-4 text-gray-600`}
          />
        </button>
        {showList ? (
          <div
            id="dropdown-default"
            className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full w-max -left-20 mt-2 open"
            aria-labelledby="dropdown-default"
          >
            <ul className="py-2">
              <li>
                <a
                  className="block px-6 py-2 hover:bg-gray-100 text-gray-600 font-medium"
                  href="javascript:;"
                >
                  Notifications
                </a>
              </li>
              <li>
                <a
                  className="block px-6 py-2 hover:bg-gray-100 text-gray-600 font-medium"
                  href="javascript:;"
                >
                  Settings
                </a>
              </li>
              <li className="bg-gray-300 w-full h-px"></li>
              <li>
                <a
                  className="block px-6 py-2 hover:bg-gray-100 text-gray-600 font-medium"
                  href="javascript:;"
                >
                  Ground
                </a>
              </li>
              <li>
                <a
                  className="block px-6 py-2 hover:bg-gray-100 text-gray-600 font-medium"
                  href="javascript:;"
                >
                  Basement
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default TaskBarComponent;
