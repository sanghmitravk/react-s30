import { HTMLAttributes } from "react";

export namespace ListTypes {
  export interface IList extends HTMLAttributes<HTMLButtonElement> {
    email?: string;
    name: TNAME;
  }

  export type TNAME = {
    first?: string;
    last?: string;
    title?: string;
  };
}
