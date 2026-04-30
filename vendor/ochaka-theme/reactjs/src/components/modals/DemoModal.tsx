import { Link } from "react-router-dom";

import { demoItems } from "@/data/menu";

export default function DemoModal() {
  return (
    <div className="modal fade modalDemo" id="modalDemo">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <h3 className="demo-title">Ultimate Reactjs Theme</h3>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="mega-menu">
            <div className="row-demo">
              {demoItems.map((item, index) => (
                <div className="demo-item" key={index}>
                  <Link to={item.href} className="demo-img">
                    <img
                      alt="Demo"
                      src={item.src}
                      width={item.width || 401}
                      height={item.height || 520}
                      className="lazyload"
                    />
                    {item.isNew && (
                      <div className="demo-label">
                        <span>New</span>
                      </div>
                    )}
                  </Link>
                  <Link
                    to={item.href}
                    className={`demo-name ${item.isNew ? "link" : ""}`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
