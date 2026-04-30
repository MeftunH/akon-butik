import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "./pages/dashboard/layout";
import ScrollTopBehaviour from "./components/common/ScrolltoToBehaviour";
import { ErrorBoundary } from "react-error-boundary";
/* ===============================
   Modals
================================= */
const CartModal = lazy(() => import("@/components/modals/CartModal"));
const CompareColorModal = lazy(
  () => import("@/components/modals/CompareColorModal")
);
const CompareModal = lazy(() => import("@/components/modals/CompareModal"));
const DemoModal = lazy(() => import("@/components/modals/DemoModal"));
const MobileMenu = lazy(() => import("@/components/modals/MobileMenu"));
const QuestionModal = lazy(() => import("@/components/modals/QuestionModal"));
const QuickViewModal = lazy(() => import("@/components/modals/QuickViewModal"));
const SearchModal = lazy(() => import("@/components/modals/SearchModal"));
const ShareModal = lazy(() => import("@/components/modals/ShareModal"));
const ShipAndDaliveryModal = lazy(
  () => import("@/components/modals/ShipAndDaliveryModal")
);
const SizeGuideModal = lazy(() => import("@/components/modals/SizeGuideModal"));
const ToolbarModal = lazy(() => import("@/components/modals/ToolbarModal"));
const NewsLetterModal = lazy(
  () => import("@/components/modals/NewsLetterModal")
);

/* ===============================
   Common / Context
================================= */
const ScrollTop = lazy(() => import("@/components/common/ScrollTop"));
const GlobalEffectsProvider = lazy(
  () => import("@/components/common/GlobalEffectProvider")
);

const CartProvider = lazy(() => import("@/context/Cart"));
const CompareProvider = lazy(() => import("@/context/Compare"));
const QuickViewProvider = lazy(() => import("@/context/QuickView"));
const WishlistProvider = lazy(() => import("@/context/Wishlist"));

/* ===============================
   Home Pages
================================= */
const HomePage = lazy(() => import("./pages"));
const HomePageFashion2 = lazy(() => import("./pages/homes/home-fashion-2"));
const HomePageFashion3 = lazy(() => import("./pages/homes/home-fashion-3"));
const HomePageFashion4 = lazy(() => import("./pages/homes/home-fashion-4"));
const HomePageCosmetic = lazy(() => import("./pages/homes/home-cosmetic"));
const HomePageSkinCare = lazy(() => import("./pages/homes/home-skin-care"));
const HomePageDecor = lazy(() => import("./pages/homes/home-decor"));
const HomePageJewelry = lazy(() => import("./pages/homes/home-jewelry"));
const HomePageElectronicMarket = lazy(
  () => import("./pages/homes/home-electronic-market")
);
const HomePagePetStore = lazy(() => import("./pages/homes/home-pet-store"));
const HomePageSneaker = lazy(() => import("./pages/homes/home-sneaker"));
const HomePageBook = lazy(() => import("./pages/homes/home-book"));
const HomePageOrganic = lazy(() => import("./pages/homes/home-organic"));
const HomePageMedical = lazy(() => import("./pages/homes/home-medical"));
const HomePageGym = lazy(() => import("./pages/homes/home-gym"));
const HomePageArt = lazy(() => import("./pages/homes/home-art"));
const HomePageAccessories = lazy(
  () => import("./pages/homes/home-accessories")
);
const HomePageCarAuto = lazy(() => import("./pages/homes/home-car-auto"));
const HomePageTravel = lazy(() => import("./pages/homes/home-travel"));
const HomePageWatch = lazy(() => import("./pages/homes/home-watch"));

/* ===============================
   Product Pages
================================= */
const ProductsPageDefault = lazy(
  () => import("./pages/product-pages/shop-default")
);
const ProductsPageDefaultList = lazy(
  () => import("./pages/product-pages/shop-default-list")
);
const ProductsPageColumns2 = lazy(
  () => import("./pages/product-pages/shop-2-columns")
);
const ProductsPageColumns3 = lazy(
  () => import("./pages/product-pages/shop-3-columns")
);
const ProductsPageColumns4 = lazy(
  () => import("./pages/product-pages/shop-4-columns")
);
const ProductsPageColumns5 = lazy(
  () => import("./pages/product-pages/shop-5-columns")
);
const ProductsPageColumns6 = lazy(
  () => import("./pages/product-pages/shop-6-columns")
);
const ProductsPageFullWidthList = lazy(
  () => import("./pages/product-pages/shop-full-width-list")
);
const ProductsPageFullWidthGrid = lazy(
  () => import("./pages/product-pages/shop-full-width-grid")
);
const ProductsPageLeftSidebar = lazy(
  () => import("./pages/product-pages/shop-left-sidebar")
);
const ProductsPageRightSidebar = lazy(
  () => import("./pages/product-pages/shop-right-sidebar")
);
const ProductsPageFilterDropdown = lazy(
  () => import("./pages/product-pages/shop-filter-dropdown")
);
const ProductsPageFilterDrawer = lazy(
  () => import("./pages/product-pages/shop-filter-drawer")
);
const ProductsPageHover1 = lazy(
  () => import("./pages/product-pages/shop-hover-01")
);
const ProductsPageHover2 = lazy(
  () => import("./pages/product-pages/shop-hover-02")
);
const ProductsPageHover3 = lazy(
  () => import("./pages/product-pages/shop-hover-03")
);
const ProductsPageHover4 = lazy(
  () => import("./pages/product-pages/shop-hover-04")
);
const ProductsPageHover5 = lazy(
  () => import("./pages/product-pages/shop-hover-05")
);
const ProductsPageHover6 = lazy(
  () => import("./pages/product-pages/shop-hover-06")
);
const ProductsPageHover7 = lazy(
  () => import("./pages/product-pages/shop-hover-07")
);
const ProductsPageHover8 = lazy(
  () => import("./pages/product-pages/shop-hover-08")
);

/* ===============================
   Product Details Pages
================================= */
const ProductDetailsPageDefault = lazy(
  () => import("./pages/product-detail/product-detail")
);
const ProductDetailsPageLeftThumbnail = lazy(
  () => import("./pages/product-detail/product-left-thumbnail")
);
const ProductDetailsPageRightThumbnail = lazy(
  () => import("./pages/product-detail/product-right-thumbnail")
);
const ProductDetailsPageBottomThumbnail = lazy(
  () => import("./pages/product-detail/product-bottom-thumbnail")
);
const ProductDetailsPageGrid = lazy(
  () => import("./pages/product-detail/product-grid")
);
const ProductDetailsPageGrid2 = lazy(
  () => import("./pages/product-detail/product-grid-2")
);
const ProductDetailsPageStacked = lazy(
  () => import("./pages/product-detail/product-stacked")
);
const ProductDetailsPageInformation = lazy(
  () => import("./pages/product-detail/product-information")
);
const ProductDetailsPageGroup = lazy(
  () => import("./pages/product-detail/product-group")
);
const ProductDetailsPageOptionsCustomizer = lazy(
  () => import("./pages/product-detail/product-options-customizer")
);
const ProductDetailsPageAvailable = lazy(
  () => import("./pages/product-detail/product-available")
);
const ProductDetailsPageVideo = lazy(
  () => import("./pages/product-detail/product-video")
);
const ProductDetailsPageBuyxGety = lazy(
  () => import("./pages/product-detail/product-buyx-gety")
);
const ProductDetailsPageBuyTheLook = lazy(
  () => import("./pages/product-detail/product-buy-the-look")
);
const ProductDetailsPageOutOfStock = lazy(
  () => import("./pages/product-detail/product-out-of-stock")
);
const ProductDetailsPageBoughtTogether = lazy(
  () => import("./pages/product-detail/product-frequently-bought-together")
);
const ProductDetailsPageOftenPuschaseTogether = lazy(
  () => import("./pages/product-detail/product-often-purchased-together")
);
const ProductDetailsPageCountdownTimer = lazy(
  () => import("./pages/product-detail/product-countdown-timer")
);
const ProductDetailsPageVolumeDiscount = lazy(
  () => import("./pages/product-detail/product-volume-discount")
);
const ProductDetailsPageVolumeDiscountThumbnail = lazy(
  () => import("./pages/product-detail/product-volume-discount-thumbnail")
);
const ProductDetailsPageSwatchDropdown = lazy(
  () => import("./pages/product-detail/product-swatch-dropdown")
);
const ProductDetailsPageSwatchDropdownCOlor = lazy(
  () => import("./pages/product-detail/product-swatch-dropdown-color")
);
const ProductDetailsPageImage = lazy(
  () => import("./pages/product-detail/product-swatch-image")
);
const ProductDetailsPageImageSquire = lazy(
  () => import("./pages/product-detail/product-swatch-image-square")
);
const ProductDetailsPageDescriptionAccordion = lazy(
  () => import("./pages/product-detail/product-description-accordion")
);
const ProductDetailsPageDescriptionList = lazy(
  () => import("./pages/product-detail/product-description-list")
);
const ProductDetailsPageDescriptionVertical = lazy(
  () => import("./pages/product-detail/product-description-vertical")
);

/* ===============================
   Other Pages
================================= */
const ContactUsPage = lazy(() => import("./pages/other-pages/contact-us"));
const ContactUsPage2 = lazy(() => import("./pages/other-pages/contact-us-2"));
const AboutusPage = lazy(() => import("./pages/other-pages/about-us"));
const StoreListage = lazy(() => import("./pages/other-pages/store-list"));
const NotFoundPage = lazy(() => import("./pages/not-found"));
const FaqPage = lazy(() => import("./pages/other-pages/faq"));
const TrackOrder = lazy(() => import("./components/other-pages/TrackOrder"));
const InvoicePage = lazy(() => import("./pages/other-pages/invoice"));
const CheckoutPage = lazy(() => import("./pages/other-pages/checkout"));
const ComparePage = lazy(() => import("./pages/other-pages/compare"));
const LoginPage = lazy(() => import("./pages/other-pages/login"));
const Registerage = lazy(() => import("./pages/other-pages/register"));
const ViewCartage = lazy(() => import("./pages/other-pages/view-cart"));
const Wishlistage = lazy(() => import("./pages/other-pages/wishlist"));

/* ===============================
   Dashboard Pages
================================= */
const AccountPage = lazy(() => import("./pages/dashboard/account-page"));
const AccountOrdersPage = lazy(
  () => import("./pages/dashboard/account-orders")
);
const AccountOrderDetailsPage = lazy(
  () => import("./pages/dashboard/account-orders-detail")
);
const AccountAddressPage = lazy(
  () => import("./pages/dashboard/account-addresses")
);
const AccountSettingsPage = lazy(
  () => import("./pages/dashboard/account-setting")
);

/* ===============================
   Blog Pages
================================= */
const BlogGridPage = lazy(() => import("./pages/blogs/blog-grid"));
const BlogListPage1 = lazy(() => import("./pages/blogs/blog-list-1"));
const BlogListPage2 = lazy(() => import("./pages/blogs/blog-list-2"));
const BlogDetailPage = lazy(() => import("./pages/blogs/blog-detail"));

export default function App() {
  return (
    <main id="wrapper">
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <h2>Something went wrong.</h2>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button
              className="btn btn-primary mt-3"
              onClick={resetErrorBoundary}
            >
              Try again
            </button>
          </div>
        )}
      >
        <Suspense
          fallback={
            <div
              className="position-fixed top-0 start-0 h-100 d-flex justify-content-center align-items-center bg-white"
              style={{ zIndex: 1050, width: "100vw" }}
            >
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <CartProvider>
            <CompareProvider>
              <QuickViewProvider>
                <WishlistProvider>
                  <Routes>
                    <Route path="/">
                      <Route index element={<HomePage />} />

                      <Route
                        path="home-fashion-2"
                        element={<HomePageFashion2 />}
                      />
                      <Route
                        path="home-fashion-3"
                        element={<HomePageFashion3 />}
                      />
                      <Route
                        path="home-fashion-4"
                        element={<HomePageFashion4 />}
                      />
                      <Route
                        path="home-cosmetic"
                        element={<HomePageCosmetic />}
                      />
                      <Route
                        path="home-skin-care"
                        element={<HomePageSkinCare />}
                      />
                      <Route path="home-decor" element={<HomePageDecor />} />
                      <Route
                        path="home-jewelry"
                        element={<HomePageJewelry />}
                      />
                      <Route
                        path="home-electronic-market"
                        element={<HomePageElectronicMarket />}
                      />
                      <Route
                        path="home-pet-store"
                        element={<HomePagePetStore />}
                      />
                      <Route
                        path="home-sneaker"
                        element={<HomePageSneaker />}
                      />
                      <Route path="home-book" element={<HomePageBook />} />
                      <Route
                        path="home-organic"
                        element={<HomePageOrganic />}
                      />
                      <Route
                        path="home-medical"
                        element={<HomePageMedical />}
                      />
                      <Route path="home-gym" element={<HomePageGym />} />
                      <Route path="home-art" element={<HomePageArt />} />
                      <Route
                        path="home-accessories"
                        element={<HomePageAccessories />}
                      />
                      <Route
                        path="home-car-auto"
                        element={<HomePageCarAuto />}
                      />
                      <Route path="home-travel" element={<HomePageTravel />} />
                      <Route path="home-watch" element={<HomePageWatch />} />

                      <Route
                        path="shop-default"
                        element={<ProductsPageDefault />}
                      />
                      <Route
                        path="shop-default-list"
                        element={<ProductsPageDefaultList />}
                      />
                      <Route
                        path="shop-2-columns"
                        element={<ProductsPageColumns2 />}
                      />
                      <Route
                        path="shop-3-columns"
                        element={<ProductsPageColumns3 />}
                      />
                      <Route
                        path="shop-4-columns"
                        element={<ProductsPageColumns4 />}
                      />
                      <Route
                        path="shop-5-columns"
                        element={<ProductsPageColumns5 />}
                      />
                      <Route
                        path="shop-6-columns"
                        element={<ProductsPageColumns6 />}
                      />
                      <Route
                        path="shop-full-width-list"
                        element={<ProductsPageFullWidthList />}
                      />
                      <Route
                        path="shop-full-width-grid"
                        element={<ProductsPageFullWidthGrid />}
                      />
                      <Route
                        path="shop-left-sidebar"
                        element={<ProductsPageLeftSidebar />}
                      />
                      <Route
                        path="shop-right-sidebar"
                        element={<ProductsPageRightSidebar />}
                      />
                      <Route
                        path="shop-filter-dropdown"
                        element={<ProductsPageFilterDropdown />}
                      />
                      <Route
                        path="shop-filter-drawer"
                        element={<ProductsPageFilterDrawer />}
                      />
                      <Route
                        path="shop-hover-01"
                        element={<ProductsPageHover1 />}
                      />
                      <Route
                        path="shop-hover-02"
                        element={<ProductsPageHover2 />}
                      />
                      <Route
                        path="shop-hover-03"
                        element={<ProductsPageHover3 />}
                      />
                      <Route
                        path="shop-hover-04"
                        element={<ProductsPageHover4 />}
                      />
                      <Route
                        path="shop-hover-05"
                        element={<ProductsPageHover5 />}
                      />
                      <Route
                        path="shop-hover-06"
                        element={<ProductsPageHover6 />}
                      />
                      <Route
                        path="shop-hover-07"
                        element={<ProductsPageHover7 />}
                      />
                      <Route
                        path="shop-hover-08"
                        element={<ProductsPageHover8 />}
                      />

                      <Route
                        path="product-detail/:id"
                        element={<ProductDetailsPageDefault />}
                      />
                      <Route
                        path="product-left-thumbnail/:id"
                        element={<ProductDetailsPageLeftThumbnail />}
                      />
                      <Route
                        path="product-right-thumbnail/:id"
                        element={<ProductDetailsPageRightThumbnail />}
                      />
                      <Route
                        path="product-bottom-thumbnail/:id"
                        element={<ProductDetailsPageBottomThumbnail />}
                      />
                      <Route
                        path="product-grid/:id"
                        element={<ProductDetailsPageGrid />}
                      />
                      <Route
                        path="product-grid-2/:id"
                        element={<ProductDetailsPageGrid2 />}
                      />
                      <Route
                        path="product-stacked/:id"
                        element={<ProductDetailsPageStacked />}
                      />
                      <Route
                        path="product-information/:id"
                        element={<ProductDetailsPageInformation />}
                      />
                      <Route
                        path="product-group/:id"
                        element={<ProductDetailsPageGroup />}
                      />
                      <Route
                        path="product-options-customizer/:id"
                        element={<ProductDetailsPageOptionsCustomizer />}
                      />
                      <Route
                        path="product-available/:id"
                        element={<ProductDetailsPageAvailable />}
                      />
                      <Route
                        path="product-video/:id"
                        element={<ProductDetailsPageVideo />}
                      />
                      <Route
                        path="product-buyx-gety/:id"
                        element={<ProductDetailsPageBuyxGety />}
                      />
                      <Route
                        path="product-buy-the-look/:id"
                        element={<ProductDetailsPageBuyTheLook />}
                      />
                      <Route
                        path="product-out-of-stock/:id"
                        element={<ProductDetailsPageOutOfStock />}
                      />
                      <Route
                        path="product-frequently-bought-together/:id"
                        element={<ProductDetailsPageBoughtTogether />}
                      />
                      <Route
                        path="product-often-purchased-together/:id"
                        element={<ProductDetailsPageOftenPuschaseTogether />}
                      />
                      <Route
                        path="product-countdown-timer/:id"
                        element={<ProductDetailsPageCountdownTimer />}
                      />
                      <Route
                        path="product-volume-discount/:id"
                        element={<ProductDetailsPageVolumeDiscount />}
                      />
                      <Route
                        path="product-volume-discount-thumbnail/:id"
                        element={<ProductDetailsPageVolumeDiscountThumbnail />}
                      />
                      <Route
                        path="product-swatch-dropdown/:id"
                        element={<ProductDetailsPageSwatchDropdown />}
                      />
                      <Route
                        path="product-swatch-dropdown-color/:id"
                        element={<ProductDetailsPageSwatchDropdownCOlor />}
                      />
                      <Route
                        path="product-swatch-image/:id"
                        element={<ProductDetailsPageImage />}
                      />
                      <Route
                        path="product-swatch-image-square/:id"
                        element={<ProductDetailsPageImageSquire />}
                      />
                      <Route
                        path="product-description-accordion/:id"
                        element={<ProductDetailsPageDescriptionAccordion />}
                      />
                      <Route
                        path="product-description-list/:id"
                        element={<ProductDetailsPageDescriptionList />}
                      />
                      <Route
                        path="product-description-vertical/:id"
                        element={<ProductDetailsPageDescriptionVertical />}
                      />

                      <Route path="contact-us" element={<ContactUsPage />} />
                      <Route path="contact-us-2" element={<ContactUsPage2 />} />
                      <Route path="about-us" element={<AboutusPage />} />
                      <Route path="store-list" element={<StoreListage />} />
                      <Route path="404" element={<NotFoundPage />} />
                      <Route path="faq" element={<FaqPage />} />
                      <Route path="track-order" element={<TrackOrder />} />
                      <Route path="invoice" element={<InvoicePage />} />

                      <Route path="blog-grid" element={<BlogGridPage />} />
                      <Route path="blog-list-1" element={<BlogListPage1 />} />
                      <Route path="blog-list-2" element={<BlogListPage2 />} />
                      <Route path="blog-detail" element={<BlogDetailPage />} />

                      <Route
                        path="account-page"
                        element={
                          <DashboardLayout>
                            <AccountPage />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="account-orders"
                        element={
                          <DashboardLayout>
                            <AccountOrdersPage />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="account-addresses"
                        element={
                          <DashboardLayout>
                            <AccountAddressPage />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="account-orders-detail"
                        element={
                          <DashboardLayout>
                            <AccountOrderDetailsPage />
                          </DashboardLayout>
                        }
                      />
                      <Route
                        path="account-setting"
                        element={
                          <DashboardLayout>
                            <AccountSettingsPage />
                          </DashboardLayout>
                        }
                      />
                      <Route path="checkout" element={<CheckoutPage />} />
                      <Route path="compare" element={<ComparePage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="register" element={<Registerage />} />

                      <Route path="view-cart" element={<ViewCartage />} />
                      <Route path="wishlist" element={<Wishlistage />} />

                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
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
                  <ToolbarModal /> <NewsLetterModal />{" "}
                </WishlistProvider>
              </QuickViewProvider>
            </CompareProvider>
          </CartProvider>
          <GlobalEffectsProvider />
          <ScrollTop />
          <ScrollTopBehaviour />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
