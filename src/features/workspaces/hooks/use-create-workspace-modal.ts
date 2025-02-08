"use client";

// import { useState } from "react";

// export const useCreateWorkspaceModal = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const open = () => {
//     setIsOpen(true);
//     console.log("modal open: ", isOpen);
//   }
//   const close = () => {
//     setIsOpen(false);
//     console.log("modal closen: ", isOpen);
//   }

//   return {
//     isOpen,
//     open,
//     close,
//     setIsOpen,
//   };
// };




// ======================================================
// TODO: fixed error about nuqs modul and them functions

import { parseAsBoolean } from 'nuqs/server';
import { useQueryState } from 'nuqs';

export const useCreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
    parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true }),
  );
  // const [ isOpen, setIsOpen ] = useQueryState('create-workspace', parseAsBoolean.withDefault(false))

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
