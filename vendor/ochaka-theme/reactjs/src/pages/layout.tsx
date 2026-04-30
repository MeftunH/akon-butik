import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import CartModal from "@/components/modals/CartModal";
import CompareColorModal from "@/components/modals/CompareColorModal";
import CompareModal from "@/components/modals/CompareModal";
import DemoModal from "@/components/modals/DemoModal";
import MobileMenu from "@/components/modals/MobileMenu";
import QuestionModal from "@/components/modals/QuestionModal";
import QuickViewModal from "@/components/modals/QuickViewModal";
import SearchModal from "@/components/modals/SearchModal";
import ShareModal from "@/components/modals/ShareModal";
import ShipAndDaliveryModal from "@/components/modals/ShipAndDaliveryModal";
import SizeGuideModal from "@/components/modals/SizeGuideModal";
import ToolbarModal from "@/components/modals/ToolbarModal";
import Context from "@/context/Cart";
import ScrollTop from "@/components/common/ScrollTop";
import GlobalEffectsProvider from "@/components/common/GlobalEffectProvider";
import NewsLetterModal from "@/components/modals/NewsLetterModal";
import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main id="wrapper">
          <Context>
            {children}
            <CartModal />
            <CompareColorModal />
            <CompareModal />
            <DemoModal />
            <MobileMenu />
            <QuestionModal />
            <QuickViewModal />
            <SearchModal />
            <ShareModal />
            <ShipAndDaliveryModal />
            <SizeGuideModal />
            <ToolbarModal /> <NewsLetterModal />
          </Context>
          <GlobalEffectsProvider />
          <ScrollTop />
        </main>
      </body>
    </html>
  );
}
