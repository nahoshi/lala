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
{/* Container do Texto Fixo + Morphing */}
<div
  className="
    font-black text-center italic uppercase mix-blend-difference
    text-4xl 
    [@media(max-height:700px)_and_(max-width:500px)_and_(pointer:coarse)]:text-3xl
    sm:text-5xl 
    md:text-6xl
    lg:text-7xl
  "
>
  {textFixed && <span className="block mb-2">{textFixed}</span>}
  <MorphingText
    texts={texts}
    className="
      text-center
      text-4xl
      [@media(max-height:700px)_and_(max-width:500px)_and_(pointer:coarse)]:text-3xl
      sm:text-5xl
      md:text-6xl
      lg:text-7xl
    "
  />
</div>
      </div>
    </>
  );
}
