import Slider from "rc-slider";
import { useState } from "react";

// Tab labels
const tabs = ["Size", "Size Guide"];

// Body shape buttons
const bodyTypes = ["Thin", "Normal", "Plump"];

// Suggested sizes
const suggestions = ["L - shirt", "XL - Pant", "31 - Jeans"];

// Size table data
const sizeTableRows = [
  ["XS", "2", "32", "24 - 25", "33 - 34"],
  ["S", "4", "26 - 27", "34 - 35", "35 - 26"],
  ["M", "6", "28 - 29", "36 - 37", "38 - 40"],
  ["L", "8", "30 - 31", "38 - 29", "42 - 44"],
  ["XL", "10", "32 - 33", "40 - 41", "45 - 47"],
  ["XXL", "12", "34 - 35", "42 - 43", "48 - 50"],
];

export default function SizeGuideModal() {
  const [activeTab, setActiveTab] = useState("Size");
  const [value, setValue] = useState(50);
  const [value2, setValue2] = useState(50);

  return (
    <div className="modal modalCentered fade modal-size-guide" id="size-guide">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content widget-tabs style-2">
          <div className="header">
            <ul className="widget-menu-tab">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`item-title ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="inner h3">{tab}</span>
                </li>
              ))}
            </ul>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="wrap">
            <div className="widget-content-tab">
              {activeTab === "Size" && (
                <div className="widget-content-inner active">
                  <div className="tab-size">
                    <div className="">
                      {/* Height */}
                      <div className="widget-size mb-24">
                        <div className="box-title-size">
                          <div className="title-size h6 text-black">Height</div>
                          <div className="number-size text-small">
                            <span className="max-size">{value}</span>
                            <span>Cm</span>
                          </div>
                        </div>
                        <div className="range-input">
                          <Slider
                            value={value}
                            onChange={(value) => setValue(value as number)}
                            min={0}
                            max={100}
                          />
                        </div>
                      </div>

                      {/* Weight */}
                      <div className="widget-size">
                        <div className="box-title-size">
                          <div className="title-size h6 text-black">Weight</div>
                          <div className="number-size text-small">
                            <span className="max-size">{value2}</span>
                            <span>Kg</span>
                          </div>
                        </div>
                        <div className="range-input">
                          <Slider
                            value={value2}
                            onChange={(value) => setValue2(value as number)}
                            min={0}
                            max={100}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Body Types */}
                    <div className="size-button-wrap choose-option-list">
                      {bodyTypes.map((type) => (
                        <div
                          key={type}
                          className={`size-button-item choose-option-item ${
                            type === "Normal" ? "select-option" : ""
                          }`}
                        >
                          <h6 className="text">{type}</h6>
                        </div>
                      ))}
                    </div>

                    {/* Suggestions */}
                    <div className="suggests">
                      <h4 className="">Suggests for you:</h4>
                      <div className="suggests-list">
                        {suggestions.map((text) => (
                          <a
                            key={text}
                            href="#"
                            className="suggests-item link h6"
                          >
                            {text}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Size Guide" && (
                <div className="widget-content-inner overflow-auto text-nowrap active">
                  <table className="tab-sizeguide-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>US</th>
                        <th>Bust</th>
                        <th>Waist</th>
                        <th>Low Hip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeTableRows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
