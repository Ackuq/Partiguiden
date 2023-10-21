import { twMerge } from "tailwind-merge";

import { type Committee, committeeInfo } from "@lib/committees";
import { committeeBackground } from "@lib/styles/committees";

type CardHeaderProps = React.PropsWithChildren<{
  className?: string;
}>;

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={twMerge("w-full px-4 py-1", className)}>
      <span>{children}</span>
    </div>
  );
}

type CommitteeHeaderProps = {
  committee?: Committee | null;
};

export function CommitteeHeader({ committee }: CommitteeHeaderProps) {
  if (!committee) {
    return;
  }
  const info = committeeInfo[committee];
  return (
    <CardHeader
      className={twMerge("text-slate-50", committeeBackground[committee])}
    >
      {info.desc}
    </CardHeader>
  );
}

type BaseCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Card({ children, className = "", ...props }: BaseCardProps) {
  return (
    <div
      className={twMerge(
        "overflow-hidden rounded bg-white p-4 shadow-md",
        "dark:bg-slate-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
