import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss";

type SharedProps = {
 children: ReactNode;
 className?: string;
};

type LinkProps = SharedProps &
 Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
  href: string;
 };

type NativeButtonProps = SharedProps &
 Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  href?: undefined;
 };

type ButtonProps = LinkProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
 const className = [styles.button, props.className].filter(Boolean).join(" ");

 if (props.href) {
  const { children, href, className: _className, ...anchorProps } = props;
  return <a {...anchorProps} className={className} href={href}>{children}</a>;
 }

 const { children, className: _className, type = "button", ...buttonProps } = props as NativeButtonProps;
 return <button {...buttonProps} className={className} type={type}>{children}</button>;
}
