"use client";

import { useRouter } from "next/navigation";
import { TableRow } from "../ui/table";

type clickableRowProps = {
  children: React.ReactNode;
  link?: string;
};

const ClickableRow = (props: clickableRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => {
        if (props.link) {
          router.replace(props.link);
        }
      }}
    >
      {props.children}
    </TableRow>
  );
};
export default ClickableRow;
