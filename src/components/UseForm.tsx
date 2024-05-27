import { FormField } from "@/model/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormProps {
  formFields: FormField[];
  onSubmit: (data: any) => void;
  schema: any;
  classNames?: FormClassNames;
}

export default function UseFormComponent({
  formFields,
  onSubmit,
  schema,
  classNames,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const renderError = (input: FormField) => {
    if (!errors[input.key]) {
      return;
    }
    if (input.type === "file") {
      return (
        <p className={`text-red-700 font-medium ${input.classNames?.error}`}>
          {(errors as any)[input.key][0].message}
        </p>
      );
    }
    return (
      <p className={`text-red-700 font-medium ${input.classNames?.error}`}>
        {(errors as any)[input.key].message}
      </p>
    );
  };

  const returnInput = (input: FormField) => {
    if (input.type === "checkbox" || input.type === "radio") {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          <label className={input.classNames?.label}>{input.label}</label>
          {input.options &&
            input.options.map((option) => (
              <div
                className={`flex flex-row items-center gap-2 ${option.classNames?.base}`}
                key={option.key}
              >
                <input
                  className={`w-5 h-5 ${option.classNames?.input}`}
                  type={input.type}
                  value={option.key}
                  id={option.key}
                  {...register(input.key)}
                />
                <label
                  className={option.classNames?.label}
                  htmlFor={option.key}
                >
                  {option.label}
                </label>
              </div>
            ))}
          {renderError(input)}
        </div>
      );
    }

    if (input.type === "select") {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          <label className={input.classNames?.label}>{input.label}</label>
          <select
            className={`px-1 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
              errors[input.key] && "border-red-700 focus:border-red-700"
            } ${input.classNames?.input}`}
            {...register(input.key)}
          >
            {input.options &&
              input.options.map((option) => (
                <option
                  className={option.classNames?.input}
                  key={option.key}
                  value={option.key}
                >
                  {option.label}
                </option>
              ))}
          </select>
          {renderError(input)}
        </div>
      );
    }

    if (input.type === "textarea") {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          <label className={input.classNames?.label} htmlFor={input.key}>
            {input.label}
          </label>
          <textarea
            className={`px-3 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
              errors[input.key] && "border-red-700 focus:border-red-700"
            } ${input.classNames?.input}`}
            id={input.key}
            {...register(input.key)}
            rows={input.rows || 2}
          />
          {renderError(input)}
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col ${input.classNames?.base}`}
        key={input.key}
      >
        <label className={input.classNames?.label} htmlFor={input.key}>
          {input.label}
        </label>
        <input
          className={`px-3 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
            errors[input.key] && "border-red-700 focus:border-red-700"
          } ${input.classNames?.input}`}
          type={input.type}
          id={input.key}
          {...register(input.key, {
            valueAsNumber: input.type === "number" ? true : false,
          })}
        />
        {renderError(input)}
      </div>
    );
  };

  return (
    <form
      className={`w-full ${classNames?.form}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={`flex flex-col gap-2 py-4 ${classNames?.inputFields}`}>
        {formFields.map((field) => returnInput(field))}
      </div>
      <button
        className={`w-min px-4 py-2 rounded-md border-2 border-gray-200 hover:border-gray-400 transition-all duration-100 ${classNames?.button}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
