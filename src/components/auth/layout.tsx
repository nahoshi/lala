import { ReactNode } from "react";
import { Card } from "../ui/card";
import { MorphingText } from "../ui/morphing-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface AuthLayoutProps {
  textFixed?: string;
  texts: string[];
  children: ReactNode;
}

export default function AuthLayout({
  children,
  textFixed,
  texts,
}: AuthLayoutProps) {
  return (
    <>
      <Card
        className="
          flex flex-col
          w-full
          bg-card/80
          rounded-b-none
          justify-center backdrop-blur-md
          md:max-w-5/12 md:h-full md:bg-card/88 md:rounded-r-lg md:rounded-l-none
        "
      >
        <Link
          href="/"
          className="
            flex
            text-sm font-semibold text-chart-4
            transition-colors
            absolute top-5 left-5 gap-2 items-center hover:opacity-70
          "
        >
          <ArrowLeft size={20} />
          Início
        </Link>
        <div
          className="
            md:min-w-sm md:mx-auto
          "
        >
          {children}
        </div>
      </Card>
      <div
        className="
          flex
          w-full h-full
          p-8
          justify-center items-center
        "
      >
        <div
          className="
            font-black text-6xl text-center
            mix-blend-difference uppercase italic
            md:text-8xl
          "
        >
          {textFixed && <span>{textFixed}</span>}
          <MorphingText
            texts={texts}
            className="
              text-center
            "
          />
        </div>
      </div>
    </>
  );
}
