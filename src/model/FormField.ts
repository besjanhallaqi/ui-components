import { Types } from "@/enum/Types";

export interface FormField {
    type: Types;
    key: string;
    label: string;
    properties?:any;
    options?: Options[];
    classNames?: InputClassNames;
}