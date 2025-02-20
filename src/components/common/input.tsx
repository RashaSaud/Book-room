import { useTranslation } from "react-i18next";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  isChallenge?: boolean;
  className: string;
}

export function Input({
  isChallenge = false,
  label,
  className,
  ...props
}: InputProps) {
  const { i18n } = useTranslation();
  const textColor = isChallenge ? "white" : "";

  return (
    <div className="grid grid-cols-1 gap-2">
      <label
        htmlFor={props.name}
        className={`${
          i18n.language === "en"
            ? `font-en text-curren mobile:text-base text-sm text-${textColor}`
            : `text-curren text-2xl font-arabic_normal mobile:text-2xl text-${textColor}`
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        style={{ fontSize: "14px" }}
        type={props.type || "text"}
        className={className}
      />
    </div>
  );
}

export default Input;
