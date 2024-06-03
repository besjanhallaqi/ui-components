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
  text: z.string().min(1, { message: "Text is required" }),
  textarea: z.string().min(1, { message: "Textarea is required" }),
  email: z
    .string()
    .min(1, { message: "E-mail is required" })
    .email("Invalid e-mail"),
  number: z
    .number({
      invalid_type_error: "Number is required and must be a number",
    })
    .min(0)
    .max(150),
  boolean: z.boolean(),
  checkbox: z
    .array(z.enum(["checkbox1", "checkbox2", "checkbox3"]))
    .min(1, { message: "Checkbox is required" }),
  radio: z.enum(["radio1", "radio2", "radio3"], {
    message: "Radio is required",
  }),
  select: z.string().min(1, { message: "Select is required" }),
  date: z.string().refine(isValidDate, {
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
      properties: {
        rows: "3",
      },
    },
    { type: Types.EMAIL, key: "email", label: "E-mail" },
    { type: Types.NUMBER, key: "number", label: "Number" },
    { type: Types.BOOLEAN, key: "boolean", label: "Boolean" },
    {
      type: Types.CHECKBOX,
      key: "checkbox",
      label: "Checkbox",
      options: [
        { value: "checkbox1", label: "Checkbox 1" },
        { value: "checkbox2", label: "Checkbox 2" },
        { value: "checkbox3", label: "Checkbox 3" },
      ],
    },
    {
      type: Types.RADIO,
      key: "radio",
      label: "Radio",
      options: [
        { value: "radio1", label: "Radio 1" },
        { value: "radio2", label: "Radio 2" },
        { value: "radio3", label: "Radio 3" },
      ],
    },
    {
      type: Types.SELECT,
      key: "select",
      label: "Select",
      options: [
        { value: "", label: "Choose option" },
        { value: "select1", label: "Select 1" },
        { value: "select2", label: "Select 2" },
        { value: "select3", label: "Select 3" },
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
        <UseFormComponent
          onSubmit={submitFormFunction}
          formFields={formFields}
          schema={schema}
        />
      </div>
    </div>
  );
}
