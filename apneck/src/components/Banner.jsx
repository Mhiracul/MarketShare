const Banner = () => {
  return (
    <div className="bg-white w-full h-full py-8">
      <div
        className="container mx-auto"
        style={{
          backgroundImage: `url("/banner.svg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
        }}
      ></div>
    </div>
  );
};

export default Banner;
