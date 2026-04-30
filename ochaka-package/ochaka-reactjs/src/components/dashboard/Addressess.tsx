import { useState } from "react";
import Sidebar from "./Sidebar";
import AccountEditModal from "./AccountEditModal";

interface Address {
  id: number;
  label: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export default function Addressess() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "My home",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      phone: "+8(800) 123 4567",
      isDefault: true,
    },
    {
      id: 2,
      label: "Company",
      address: "8500 Sunset Blvd. Los Angeles, California 90069",
      phone: "+1 (800) 987 6543",
      isDefault: false,
    },
  ]);

  const [editing, setEditing] = useState<Address | null>(null);

  const openEdit = (addr: Address) => setEditing({ ...addr });

  const saveAddress = (next: Address) => {
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === next.id
          ? next
          : next.isDefault
          ? { ...a, isDefault: false }
          : a
      )
    );
    setEditing(null);
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 d-none d-xl-block">
              <Sidebar />
            </div>

            <div className="col-xl-9">
              <div className="my-account-content">
                <h2 className="account-title type-semibold">My Address</h2>

                <div className="account-my_address">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="account-address-item file-delete"
                    >
                      <div className="address-item_content">
                        <h4 className="address-title">
                          {addr.isDefault ? "Default" : "Address"}
                        </h4>

                        <div className="address-info">
                          <h5 className="fw-semibold">{addr.label}</h5>
                          <p className="h6">{addr.address}</p>
                        </div>

                        <div className="address-info">
                          <h5 className="fw-semibold">Phone</h5>
                          <p className="h6">{addr.phone}</p>
                        </div>
                      </div>

                      <div className="address-item_action">
                        <button
                          data-bs-target="#editAddress"
                          data-bs-toggle="modal"
                          className="tf-btn animate-btn"
                          onClick={() => openEdit(addr)}
                        >
                          Edit
                        </button>

                        <a
                          href="#"
                          className="tf-btn style-line remove"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteAddress(addr.id);
                          }}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* pagination (kept as-is) */}
                  <div className="wd-full wg-pagination orther-del">
                    <a href="#" className="pagination-item h6 direct">
                      <i className="icon icon-caret-left" />
                    </a>
                    <a href="#" className="pagination-item h6">
                      1
                    </a>
                    <span className="pagination-item h6 active">2</span>
                    <a href="#" className="pagination-item h6">
                      3
                    </a>
                    <a href="#" className="pagination-item h6">
                      4
                    </a>
                    <a href="#" className="pagination-item h6">
                      5
                    </a>
                    <a href="#" className="pagination-item h6 direct">
                      <i className="icon icon-caret-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for editing the selected address */}
      <AccountEditModal editing={editing} onSave={saveAddress} />
    </>
  );
}
