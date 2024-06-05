import { Types } from "@/enum/Types";
import { FormField } from "@/model/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  formFields: FormField[];
  onSubmit: (data: any) => void;
  schema: any;
  inputsBefore?: ReactElement | ReactElement[];
  inputsAfter?: ReactElement | ReactElement[];
  classNames?: FormClassNames;
  properties?: { form: any; button: any };
}

export default function UseFormComponent({
  formFields,
  onSubmit,
  schema,
  inputsBefore,
  inputsAfter,
  classNames,
  properties,
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
    if (input.type === Types.FILE) {
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
    if (input.type === Types.BOOLEAN) {
      return (
        <div
          key={input.key}
          className={`flex flex-row items-center gap-2 ${input.classNames?.base}`}
        >
          <input
            className={`w-5 h-5 ${input.classNames?.input}`}
            type={Types.CHECKBOX}
            id={input.key}
            {...register(input.key)}
            {...input.properties}
          />
          {input.label && (
            <label className={input.classNames?.label} htmlFor={input.key}>
              {input.label}
            </label>
          )}
        </div>
      );
    }

    if (input.type === Types.CHECKBOX || input.type === Types.RADIO) {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          {input.label && (
            <label className={input.classNames?.label}>{input.label}</label>
          )}
          {input.options &&
            input.options.map((option) => (
              <div
                className={`flex flex-row items-center gap-2 ${option.classNames?.base}`}
                key={option.value}
              >
                <input
                  className={`w-5 h-5 ${option.classNames?.input}`}
                  type={input.type}
                  value={option.value}
                  id={option.value}
                  {...register(input.key)}
                  {...option.properties}
                />
                {option.label && (
                  <label
                    className={option.classNames?.label}
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                )}
              </div>
            ))}
          {renderError(input)}
        </div>
      );
    }

    if (input.type === Types.SELECT) {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          {input.label && (
            <label className={input.classNames?.label}>{input.label}</label>
          )}
          <select
            className={`px-1 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
              errors[input.key] && "border-red-700 focus:border-red-700"
            } ${input.classNames?.input}`}
            {...register(input.key)}
            {...input.properties}
          >
            {input.options &&
              input.options.map((option) => (
                <option
                  className={option.classNames?.input}
                  key={option.value}
                  value={option.value}
                  {...option.properties}
                >
                  {option.label}
                </option>
              ))}
          </select>
          {renderError(input)}
        </div>
      );
    }

    if (input.type === Types.TEXTAREA) {
      return (
        <div
          className={`flex flex-col ${input.classNames?.base}`}
          key={input.key}
        >
          {input.label && (
            <label className={input.classNames?.label} htmlFor={input.key}>
              {input.label}
            </label>
          )}
          <textarea
            className={`px-3 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
              errors[input.key] && "border-red-700 focus:border-red-700"
            } ${input.classNames?.input}`}
            id={input.key}
            {...register(input.key)}
            {...input.properties}
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
        {input.label && (
          <label className={input.classNames?.label} htmlFor={input.key}>
            {input.label}
          </label>
        )}
        <input
          className={`px-3 py-2 border-2 border-gray-200 focus:border-gray-400 outline-none transition-all duration-100 rounded-md ${
            errors[input.key] && "border-red-700 focus:border-red-700"
          } ${input.classNames?.input}`}
          type={input.type}
          id={input.key}
          {...register(input.key, {
            valueAsNumber: input.type === Types.NUMBER ? true : false,
          })}
          {...input.properties}
        />
        {renderError(input)}
      </div>
    );
  };

  return (
    <form
      className={`w-full ${classNames?.form}`}
      onSubmit={handleSubmit(onSubmit)}
      {...properties?.form}
    >
      <div className={`flex flex-col gap-2 ${classNames?.inputFields}`}>
        {inputsBefore}
        {formFields.map((field) => returnInput(field))}
        {inputsAfter}
      </div>
      <button
        className={`w-min px-4 py-2 rounded-md border-2 border-gray-200 hover:border-gray-400 transition-all duration-100 ${classNames?.button}`}
        type="submit"
        {...properties?.button}
      >
        Submit
      </button>
    </form>
  );
}
