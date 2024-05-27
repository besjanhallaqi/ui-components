import { Types } from "@/enum/Types";

export interface FormField {
    type: Types;
    key: string;
    label: string;
    rows?: number;
    options?: Options[];
    classNames?: InputClassNames;
}