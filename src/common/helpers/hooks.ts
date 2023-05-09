import { useMemo } from "react";

import { joinClassNames } from "@/common/helpers/utilities";
import { TypeOrNonExisting } from "@/engine/models";

export const useClassNames = (
  classNames: TypeOrNonExisting<string | false>[]
) => useMemo(() => joinClassNames(...classNames), [classNames]);
