import { useTranslation } from "react-i18next";

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength?: number;
  rows?: number;
  className: string;
  minLength?: number;
  name: string;
}

export function Textarea({
  label,
  maxLength,
  name,
  minLength,
  rows,
  className,
  ...props
}: TextareaProps) {
  const { i18n } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-2">
      <label
        className={`${
          i18n.language === "en"
            ? "font-en text-sm text-curren mobile:text-base"
            : "text-curren text-2xl font-arabic_normal mobile:text-2xl"
        }`}
      >
        {label}
      </label>
      <textarea
        {...props}
        id="message"
        name={name}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        className={className}
      />
    </div>
  );
}

export default Textarea;
