import Carousel from 'react-bootstrap/Carousel';
import './crousal.css'
import data from "./crousaldata"


function CarouselFadeExample() {
  return (
    <Carousel fade>
        {data.map(val=>{
           return(
            <Carousel.Item key={val.id}>
                <img
                  className="d-block temp"
                  src={val.imgsrc}
                  alt={val.altval}
                />
                <Carousel.Caption>
                  <h3 style={{fontWeight:"bold"}}>{val.title}</h3>
                  <p>{val.details}</p>
                </Carousel.Caption>
             </Carousel.Item>
           )
        })}
      
     
    </Carousel>
  );
}

export default CarouselFadeExample;