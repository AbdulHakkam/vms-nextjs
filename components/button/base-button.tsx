"use client";

type buttonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const BaseButton = (props: buttonProps) => {
  return (
    <button
      className={`h-[30px] bg-main p-4 ${props.className} text-white flex items-center justify-center rounded-md`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default BaseButton;
