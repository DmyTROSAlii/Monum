// import { parseAsBoolean, useQueryState } from 'nuqs';

// export const useCreateWorkspaceModal = () => {
//   const [isOpen, setIsOpen] = useQueryState(
//     "create-workspace",
//     parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
//   );

//   const open = () => setIsOpen(true);
//   const close = () => setIsOpen(false);

//   return {
//     isOpen,
//     open,
//     close,
//     setIsOpen,
//   };
// };

import { parseAsBoolean, useQueryState } from 'nuqs';

export const useCreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useQueryState('bool', parseAsBoolean.withDefault(true));
  return {isOpen, setIsOpen};
};
