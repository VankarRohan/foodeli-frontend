import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (

    <div className="container">


      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            <span>Need Help?</span>{" "}
            <span className="description-title">Contact Us</span>
          </p>
        </div>
        {/* End Section Title */}
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="mb-5">
            {/* <iframe
              title="Google Map Location"
              style={{ width: "100%", height: 400 }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
              frameBorder={0}
              allowFullScreen=""
            /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.4591429521806!2d73.20594541107543!3d23.226373408604296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395de27577a22d49%3A0x8addc2401096a3bf!2s66G5%2BGCR%2C%20Dahegam%20-%20Bayad%20Rd%2C%20Bayad%2C%20Gujarat%20383325!5e0!3m2!1sen!2sin!4v1751632206588!5m2!1sen!2sin"
              style={{ width: "100%", height: 400 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" />
          </div>
          {/* End Google Maps */}
          <div className="row gy-4">
            <div className="col-md-6">
              <div
                className="info-item d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <i className="icon bi bi-geo-alt flex-shrink-0" />
                <div>
                  <h3>Address</h3>
                  <p>keshav Residency,Bayad</p>
                </div>
              </div>
            </div>
            {/* End Info Item */}
            <div className="col-md-6">
              <div
                className="info-item d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <i className="icon bi bi-telephone flex-shrink-0" />
                <div>
                  <h3>Call Us</h3>
                  <p>+91 9904314184</p>
                </div>
              </div>
            </div>
            {/* End Info Item */}
            <div className="col-md-6">
              <div
                className="info-item d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <i className="icon bi bi-envelope flex-shrink-0" />
                <div>
                  <h3>Email Us</h3>
                  <p>vankarrohan56@gmail.com</p>
                </div>
              </div>
            </div>
            {/* End Info Item */}
            <div className="col-md-6">
              <div
                className="info-item d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay={500}
              >
                <i className="icon bi bi-clock flex-shrink-0" />
                <div>
                  <h3>
                    Opening Hours
                    <br />
                  </h3>
                  <p>
                    <strong>Mon-Sat:</strong> 11AM - 23PM; <strong>Sunday:</strong>{" "}
                    Closed
                  </p>
                </div>
              </div>
            </div>
            {/* End Info Item */}
          </div>
         
          {/* End Contact Form */}
        </div>
      </section>
    </div>
  )
}

export default Contact
