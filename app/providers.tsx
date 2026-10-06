"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { ModalContext, ScrollContext } from "../lib/context";

export default function Providers({ children }) {
 const [isModalOpen, setModalOpen] = useState(false);
 const scrollPositionRef = useRef(0);
 const [scrollYObj, setScrollYObj] = useState({});

 useEffect(() => {
  const body = document.querySelector("body");
  if (!body) return;
	const originalPosition = body.style.position;
	const originalOverflow = body.style.overflow;
	const originalTop = body.style.top;
	const originalWidth = body.style.width;

  if (isModalOpen) {
    scrollPositionRef.current = window.pageYOffset;
   body.style.top = `-${window.pageYOffset}px`;
   body.style.position = "fixed";
   body.style.overflow = "hidden";
   body.style.width = "100%";
   return () => {
    body.style.position = originalPosition;
    body.style.overflow = originalOverflow;
    body.style.top = originalTop;
    body.style.width = originalWidth;
   };
  }

  body.style.position = originalPosition;
  body.style.overflow = originalOverflow;
  body.style.top = originalTop;
  body.style.width = originalWidth;
  window.scrollTo(0, scrollPositionRef.current);
 }, [isModalOpen]);

 return (
  <ScrollContext.Provider value={[scrollYObj, setScrollYObj]}>
   <ModalContext.Provider value={[isModalOpen, setModalOpen]}>
    {children}
   </ModalContext.Provider>
  </ScrollContext.Provider>
 );
}
