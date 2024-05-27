import UseFormComponent from "@/components/UseForm";
import { Types } from "@/enum/Types";
import { FormField } from "@/model/FormField";
import { Inter } from "next/font/google";
import { z } from "zod";

const inter = Inter({ subsets: ["latin"] });

const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  email: z
    .string()
    .min(1, { message: "E-mail is required" })
    .email("Invalid e-mail"),
  age: z
    .number({
      invalid_type_error: "Age is required and must be a number",
    })
    .min(0)
    .max(150),
  isAdmin: z.boolean(),
  hobbies: z
    .array(z.enum(["football", "e-gaming", "films"]))
    .min(1, { message: "Hobbies is required" }),
  experience: z.enum(["less1", "1to3", "3to5", "5more"], {
    message: "Experience is required",
  }),
  select: z.string().min(1, { message: "Select is required" }),
  birthday: z.string().refine(isValidDate, {
    message: "Invalid date",
  }),
  file: z.object({
    0: z.instanceof(File, { message: "File is required" }),
  }),
});

export default function UseForm() {
  const formFields: FormField[] = [
    {
      type: Types.TEXT,
      key: "text",
      label: "Text",
    },
    {
      type: Types.TEXTAREA,
      key: "textarea",
      label: "Textarea",
      rows: 3,
    },
    { type: Types.EMAIL, key: "email", label: "Email" },
    { type: Types.NUMBER, key: "number", label: "Number" },
    { type: Types.BOOLEAN, key: "boolean", label: "Boolean" },
    {
      type: Types.CHECKBOX,
      key: "checkbox",
      label: "Checkbox",
      options: [
        { key: "option1", label: "Option 1" },
        { key: "option2", label: "Option 2" },
        { key: "option3", label: "Option 3" },
      ],
    },
    {
      type: Types.RADIO,
      key: "radio",
      label: "Radio",
      options: [
        { key: "option1", label: "Option 1" },
        { key: "option2", label: "Option 2" },
        { key: "option3", label: "Option 3" },
      ],
    },
    {
      type: Types.SELECT,
      key: "select",
      label: "Select",
      options: [
        { key: "", label: "Choose option" },
        { key: "option1", label: "Option 1" },
        { key: "option2", label: "Option 2" },
        { key: "option3", label: "Option 3" },
      ],
    },
    { type: Types.DATE, key: "date", label: "Date" },
    { type: Types.FILE, key: "file", label: "File" },
  ];

  const submitFormFunction = (data: any) => {
    console.log(data);
  };

  return (
    <div
      className={`flex min-h-screen bg-white flex-col items-center p-24 ${inter.className}`}
    >
      <div className="w-[400px]">
        <h1>Dynamic Form</h1>
        <UseFormComponent
          onSubmit={submitFormFunction}
          formFields={formFields}
          schema={schema}
        />
      </div>
    </div>
  );
}
