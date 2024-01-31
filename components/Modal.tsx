import { Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
export const Modal = (props: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  visible: boolean;
  hideBG?: boolean;
  className?: string;
  noAnimation?: boolean;
  zIndex?: number;
}) => {
  const { children, onClose, visible, hideBG, className, noAnimation } = props;
  const [document, setDocument] = useState(null as Document | null);
  useEffect(() => {
    setDocument(window.document);
  }, []);
  if (!document) return null;

  return createPortal(
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-full bg-gray-900 ${
          visible ? `opacity-80` : `opacity-0 pointer-events-none`
        }`}
        onClick={onClose}
        style={{
          zIndex: props.zIndex ?? 10000,
        }}
      />
      {noAnimation ? (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${
            !hideBG && `bg-gray-800 `
          } rounded-3xl text-gray-100 ${className} ${visible ? `` : `hidden`}`}
          style={{
            zIndex: 20000,
          }}
        >
          {children}
        </div>
      ) : (
        <Transition
          show={visible}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-0 md:translate-y-full md:scale-100 "
          enterTo="opacity-100 scale-100 md:translate-y-0 md:scale-100 "
          leave="transition ease-bounce duration-300 "
          leaveFrom="opacity-100 scale-100 md:translate-y-0 md:scale-100 "
          leaveTo="opacity-0 scale-0 md:translate-y-full md:scale-100 "
          as={React.Fragment}
        >
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 z-50 ${
              !hideBG && `bg-gray-800/50 backdrop-blur-lg`
            } rounded-3xl text-gray-100 ${className} md:bottom-0 md:top-auto md:translate-y-0 md:rounded-b-none`}
            style={{
              zIndex: 20000,
            }}
          >
            {children}
          </div>
        </Transition>
      )}
    </>,
    document.getElementById("__next")!
  );
};
