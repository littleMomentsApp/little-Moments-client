import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import Carousel from "react-bootstrap/Carousel";

function HomePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"HomePage " + theme}>
      <Carousel id="Caroussel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dctxow0kh/image/upload/v1688724163/baby_shower.3_gnatrg.avif"
            alt="First slide"
          />
          <Carousel.Caption className="text-white bold">
            <h3>No time to plan? Little Moments is here to help!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dctxow0kh/image/upload/v1688724164/Baby_Shower2_s3czzt.webp"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dctxow0kh/image/upload/v1688724164/Baby_Shower_n3dp7u.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomePage;
