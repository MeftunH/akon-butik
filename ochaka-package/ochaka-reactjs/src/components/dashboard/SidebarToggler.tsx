export default function SidebarToggler() {
  return (
    <div className="btn-sidebar-mb d-lg-none left">
      <button data-bs-toggle="offcanvas" data-bs-target="#mbSidebar">
        <i className="icon icon-sidebar" />
      </button>
    </div>
  );
}
