import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { selectionMeetingPlaces } from "src/core/static/static";

interface DropListComponentProps {
  title: string;
  id: string;
  label: string;
  name: string;
  currrentValue: string;
  onClick: (value: string) => void;
  selectionList: string[];
  isSectionFloor?: boolean;
}
export default function DropListComponent(props: DropListComponentProps) {
  const [showList, setShowList] = useState<boolean>(false);

  const groupedMeetingPlaces = selectionMeetingPlaces.reduce(
    (groups: { [key: string]: string[] }, place) => {
      const floor = place.includes("Ground Floor")
        ? "Ground Floor"
        : "Basement Floor";
      groups[floor] = groups[floor] || [];
      groups[floor].push(place);
      return groups;
    },
    {},
  );
  const removeFloorLevel = (place: string): string => {
    return place
      .replace("meeting Room Ground Floor ", "Meeting Room ")
      .replace("meeting Room Basement Floor ", "Meeting Room ");
  };

  return (
    <div className="grid grid-cols-1 gap-2" id={props.id}>
      <label
        htmlFor={props.label}
        className={`text-white text-2xl font-arabic_normal mobile:text-2xl`}
      >
        {props.label}
      </label>
      <div className="mobile:w-full tablet:w-full relative w-full">
        <div
          onClick={() => {
            setShowList(!showList);
          }}
          className="flex-row flex w-full mobile:w-full tablet:w-full items-center relative justify-between gap-2
        border-dakPurple mobile:rounded-lg rounded-lg font-medium border-2 shadow-md px-6 py-4 cursor-pointer"
        >
          <div
            className={`mobile:mr-3 flex flex-col mobile:gap-2 tablet:gap-2`}
          >
            <div
              className={`text-sm font-arMedium mobile:text-base text-searchText font-verdana`}
            >
              {props.title}
            </div>
          </div>
          <HiChevronDown
            className={`${
              showList ? "rotate-180 duration-500" : "duration-500"
            } mobile:ml-3 text-searchText text-2xl`}
          />
          {showList ? (
            <div
              className="-mr-8 mobile:-mr-0 tablet:-mr-0 absolute top-12 inset-0 w-full h-fit font-verdana max-h-[336px] bg-tertiary rounded z-40 mobile:w-full
            mobile:h-[250px] mobile:top-12 tablet:w-full tablet:h-[216px] tablet:top-[75px] shadow-md py-4
            px-3.5 overflow-y-auto"
            >
              <div className="flex flex-col items-end w-full">
                {props.isSectionFloor ? (
                  <div className="w-full">
                    {Object.keys(groupedMeetingPlaces).map((floor, index) => (
                      <div className="w-full" key={floor}>
                        <h2>{floor}</h2>
                        {groupedMeetingPlaces[floor].map((place) => (
                          <p
                            className="pr-4 flex flex-col items-end justify-center text-base w-full h-10 hover:bg-dakPurple"
                            key={place}
                          >
                            {removeFloorLevel(place)}
                            {index === props.selectionList.length - 1 ? null : (
                              <hr className="bg-white w-full h-[0.3px]" />
                            )}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full">
                    {props.selectionList.map((item, index) => (
                      <>
                        <p
                          onClick={() => props.onClick(item)}
                          className="pr-4 hover:bg-dakPurple flex flex-col items-end justify-center font-ar text-M3 text-base w-full h-10 hover:bg-searchHover"
                        >
                          {item}
                        </p>
                        {index === props.selectionList.length - 1 ? null : (
                          <hr className="bg-slate-300 w-full h-[0.3px]" />
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
