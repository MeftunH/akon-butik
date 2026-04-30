export default function CustomSelect() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="tf-product-property">
      <div className="item personalize">
        <input className="bg-white" placeholder="Personalize" type="text" />
      </div>
      <div className="item desc">
        <input className="bg-white" placeholder="Write your text" type="text" />
      </div>
    </form>
  );
}
