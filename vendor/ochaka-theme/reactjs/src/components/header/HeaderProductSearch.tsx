import { useEffect, useRef, useState } from "react";

interface Category {
  label: string;
  value: string;
}

interface HeaderProductSearchProps {
  parentClass?: string;
}

const categories: Category[] = [
  { label: "All categories", value: "" },
  { label: "Apple products", value: "apple-products" },
  { label: "Audio Equipments", value: "audio-equipments" },
  { label: "Camera & Video", value: "camera-video" },
  { label: "Game & Room Furniture", value: "game-room-furniture" },
  { label: "Gaming Accessories", value: "gaming-accessories" },
  { label: "Headphone", value: "headphone" },
  { label: "Laptop & Tablet", value: "laptop-tablet" },
  { label: "Server & Workstation", value: "server-workstation" },
  { label: "Smartphone", value: "smartphone" },
  { label: "Smartwatch", value: "smartwatch" },
  { label: "Storage & Digital Devices", value: "storage-digital-devices" },
];

export default function HeaderProductSearch({
  parentClass = "form_search-product style-search-2 style-search-3 d-none d-xl-flex",
}: HeaderProductSearchProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // 🧠 Outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        event.target instanceof Node &&
        !formRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <form
      className={parentClass}
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="select-category">
        <div
          onClick={() => setIsDropdownOpen(true)}
          className={`tf-select-custom ${isDropdownOpen ? "Active" : ""}`}
        >
          {selectedCategory.label}
        </div>

        <ul
          className={`select-options ${isDropdownOpen ? "d-block" : "d-none"}`}
        >
          <div className="header-select-option">
            <span>Select Categories</span>
            <span
              className="close-option"
              onClick={() => setIsDropdownOpen(false)}
            >
              <i className="icon-close" />
            </span>
          </div>

          {categories.map((category) => (
            <li
              key={category.value}
              rel={category.value}
              className={
                category.value === selectedCategory.value ? "active" : ""
              }
              onClick={() => handleCategoryClick(category)}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>

      <span className="br-line type-vertical" />

      <input
        className="style-def"
        type="text"
        placeholder={`Search for products...`}
        required
      />
    </form>
  );
}
