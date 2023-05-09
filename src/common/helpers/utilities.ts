import { TypeOrNonExisting } from "@/engine/models";

export const joinTruthyStrings = (
  strings: TypeOrNonExisting<string | false>[],
  separator = ", "
) => strings.filter(Boolean).join(separator).trim();

export const joinClassNames = (
  ...classNames: TypeOrNonExisting<string | false>[]
) => joinTruthyStrings(classNames, " ");
