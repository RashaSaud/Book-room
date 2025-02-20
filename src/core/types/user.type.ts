export type TapsModel = {
  id: number;
  title: string;
  content?: string;
  notification?: boolean;
};

export type StepperProps = {
  title: string;
  description: string;
};
export type ProjectProps = {
  name: string;
  description: string;
  image: string;
  source_code_link: string;
  tags?: TagsProps[];
  index: number;
};

export type TagsProps = {
  name: string;
  color: string;
};

export type InitialValuesUserType = {
  email: string;
  Password: string;
};

export type InitialValuesType = {
  name: string;
  email: string;
  massage: string;
  number: number;
};
