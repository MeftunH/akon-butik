import { Link } from "react-router-dom";

export default function LookbookProductCard({
  product,
  parentClass = "lookbook-product style-row",
  titleClass = "link text-line-clamp-2",
  hasTag = false,
}) {
  return (
    <div className={parentClass}>
      <div className="content">
        {hasTag ? <span className="tag">Skincare</span> : ""}
        <h6 className="name-prd">
          <Link to={`/product-detail/${product.id}`} className={titleClass}>
            {product.title}
          </Link>
        </h6>
        <div className="price-wrap">
          <span className="price-new h6">${product.price.toFixed(2)}</span>
          <span className="text-third h6">In Stock</span>
        </div>
      </div>
      <Link to={`/product-detail/${product.id}`} className="image">
        <img alt="Product" src={product.imgSrc} width={501} height={500} />
      </Link>
    </div>
  );
}
