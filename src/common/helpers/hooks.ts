import { useMemo } from "react";

import { TypeOrNonExisting } from "@/common/helpers/models";
import { joinClassNames } from "@/common/helpers/utilities";

export const useClassNames = (
  classNames: TypeOrNonExisting<string | false>[]
) => useMemo(() => joinClassNames(...classNames), [classNames]);
