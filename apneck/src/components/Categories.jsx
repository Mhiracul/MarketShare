const Categories = () => {
  return (
    <div className="w-full h-full bg-white text-black py-20">
      <div className="container mx-auto px-10">
        <h1 className="text-xl font-bold  mb-8 text-wrap text-black uppercase">
          Categories
        </h1>{" "}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-20 gap-10 w-full h-full">
          <div className="flex flex-col gap-4 items-center">
            <img
              src="/groceries.svg"
              alt=""
              width={100}
              height={100}
              className="w-[282px] h-[182px] shadow"
            />

            <h1 className="lg:text-3xl md:text-xl text-base">Groceries</h1>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <img
              src="/drinks.svg"
              alt=""
              width={100}
              height={100}
              className="w-[282px] h-[182px] shadow"
            />

            <h1 className="lg:text-3xl md:text-xl text-base">Drinks</h1>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <img
              src="/fooditems.svg"
              alt=""
              width={100}
              height={100}
              className="w-[282px] h-[182px] shadow"
            />

            <h1 className="lg:text-3xl md:text-xl text-base">Food Items</h1>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <img
              src="/confectionary.svg"
              alt=""
              width={100}
              height={100}
              className="w-[282px] h-[182px] shadow"
            />

            <h1 className="lg:text-3xl md:text-xl text-base">
              Confectionaries
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
