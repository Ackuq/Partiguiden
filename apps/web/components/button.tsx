import { twMerge } from "tailwind-merge";

type BaseButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export function BaseButton({
  children,
  className = "",
  ...props
}: BaseButtonProps) {
  return (
    <button className={twMerge("hover:opacity-75", className)} {...props}>
      {children}
    </button>
  );
}
export function PrimaryButton({ children, className }: BaseButtonProps) {
  return (
    <BaseButton
      className={twMerge(
        "bg-primary dark:bg-primary-dark w-full rounded px-2 py-3 text-white",
        className,
      )}
    >
      {children}
    </BaseButton>
  );
}
