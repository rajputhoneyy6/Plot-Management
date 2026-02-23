import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../Images/banner1.jpg";
import banner2 from "../Images/banner2.jpg";
import banner3 from "../Images/banner3.jpg";

const Home = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Welcome to Kumar's Real Estate";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid px-0 mt-5">

      <Carousel className="w-100" fade interval={4000} pause={false} controls indicators>

        {[banner1, banner2, banner3].map((banner, i) => (
          <Carousel.Item key={i}>

            <div className="position-relative vh-100 w-100">

              <img
                className="w-100 h-70"
                src={banner}
                alt={`Banner`}
                style={{
                  objectFit: "cover",
                  filter: "brightness(60%)"
                }}
              />

              <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                <h1 className="fw-bold display-4">
                  {animatedText}
                </h1>
                <p className="fs-5">
                  Manage your plots and registrations easily
                </p>
              </div>

            </div>

          </Carousel.Item>
        ))}

      </Carousel>

      {/* About Section */}
      <div className="container py-5">
        <h2 className="fw-bold mb-3">About Kumar's Real Estate</h2>

        <p>
          Kumar's Real Estate Pvt Ltd is a leading real estate company specializing in plot management and property development.
          We focus on providing transparent, reliable, and efficient services for property owners, buyers, and investors.
        </p>

        <p>
          With years of expertise, our team ensures accurate records, timely communication, and seamless support
          for all clients. From plot allocation to registration, we handle every step with professionalism and integrity.
        </p>

        <p>
          Our vision is to make property ownership transparent and stress-free, helping our clients make informed decisions.
        </p>

        <h4 className="mt-4">Why Choose Us?</h4>

        <ul>
          <li>Accurate and up-to-date plot records</li>
          <li>Easy registration process</li>
          <li>Dedicated support for all queries</li>
          <li>Modern dashboard for plot management</li>
          <li>Commitment to transparency and professionalism</li>
        </ul>
      </div>

    </div>
  );
};

export default Home;
