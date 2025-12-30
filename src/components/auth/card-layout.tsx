import Link from "next/link";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AudioWaveform } from "lucide-react";
import { ReactNode } from "react";

export interface CardLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: {
    text: string;
    linkText: string;
    LinkHref: string;
  };
}

export default function CardLayout({
  title,
  description,
  children,
  footer,
}: CardLayoutProps) {
  return (
    <>
      <CardHeader
        className="
          text-center
          md:mb-8
        "
      >
        <AudioWaveform
          size={40}
          className="
            mx-auto mb-4
            transition-colors
            hover:text-chart-4
          "
        />
        <CardTitle
          className="
            transition-colors
            hover:text-chart-4
            md:text-2xl md:font-bold
          "
        >
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent
        className="
          flex flex-col
          gap-6
        "
      >
        {children}
        {footer ? (
          <span
            className="
              text-xs text-center
            "
          >
            {footer.text}{" "}
            <Link
              href={footer.LinkHref}
              className="
                inline-block
                text-chart-4
                underline-offset-4 hover:underline
              "
            >
              {footer.linkText}
            </Link>
          </span>
        ) : (
          <div></div>
        )}
      </CardContent>
    </>
  );
}
