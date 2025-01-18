
// import '../../styles/Intro.css';

const Intro = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dbczn8b8l/video/upload/v1737211570/enngzycxl2vb1skb5zeo.mp4" // Replace with the URL of your video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Intro Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">  Welcome to Eventia, your premier event management system.</h1>
        <p className="text-lg md:text-2xl mb-6 max-w-2xl">
        Seamlessly organize, manage, and execute events with ease and efficiency. Experience unparalleled tools designed to make your events unforgettable.
        </p>
        <button className="bg-yellow-500 text-teal-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition duration-300">
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Intro;
