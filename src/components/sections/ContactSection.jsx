import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import "../../styles/contact.css";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const ContactSection = () => {

  const form = useRef();

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendEmail = (e) => {

    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    emailjs
      .sendForm(
        "service_wufg5vd",
        "template_u4pnt4a",
        form.current,
        "_O4fj5_zeT7PETexp"
      )
      .then(() => {
        setSending(false);
        setSuccess("Message sent successfully!");
        form.current.reset();
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch(() => {
        setSending(false);
        setError("Something went wrong. Please try again.");
        setTimeout(() => setError(""), 5000);
      });

  };

  return (
    <section id="contact" className="contact-section">
      <Reveal>
        <div className="container">

          <SectionTitle
            subtitle="LET'S GET IN TOUCH"
            title="Contact"
          />

          <div className="contact-intro">
            <h2>Connect With Our Team.</h2>

            <p>
              Interested in collaborating with us or learning more about our
              projects?
            </p>
            <p>
              Feel free to contact any of our team members or send us
              a message using the form below.
            </p>
          </div>

          <div className="contact-wrapper">

            {/* member grid */}

            <div className="team-grid">

              {/* member 1 */}

              <div className="member-card">

                <h3>Lee Hom</h3>

                <span className="member-role">
                  Frontend & UI/UX Lead
                </span>

                <div className="contact-card">

                  <FaEnvelope className="contact-icon" />

                  <div>

                    <h4>Email</h4>

                    <a href="mailto:linghom@graduate.utm.my">
                      linghom@graduate.utm.my
                    </a>

                  </div>

                </div>

                <div className="social-links">

                  <a
                    href="https://github.com/leehom22"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ling-lee-hom-b67367250/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>

                </div>

              </div>

              {/* member2 */}

              <div className="member-card">

                <h3>Lee Xuan Ying</h3>

                <span className="member-role">
                  Three.js & 3D Developer
                </span>

                <div className="contact-card">

                  <FaEnvelope className="contact-icon" />

                  <div>

                    <h4>Email</h4>

                    <a href="mailto:ying04@graduate.utm.my">
                      ying04@graduate.utm.my
                    </a>

                  </div>

                </div>

                <div className="social-links">

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>

                </div>

              </div>

              {/* member3 */}

              <div className="member-card">

                <h3>Darshni Prakash</h3>

                <span className="member-role">
                  Multimedia & Content
                </span>

                <div className="contact-card">

                  <FaEnvelope className="contact-icon" />

                  <div>

                    <h4>Email</h4>

                    <a href="mailto:darshniprakash3@gmail.com">
                      darshniprakash3@gmail.com
                    </a>

                  </div>

                </div>

                <div className="social-links">

                  <a
                    href="https://github.com/drshni03"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/uthayadarshniprakash/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>

                </div>

              </div>

              {/* member4*/}

              <div className="member-card">

                <h3>Nicholas</h3>

                <span className="member-role">
                  Backend & Deployment
                </span>

                <div className="contact-card">

                  <FaEnvelope className="contact-icon" />

                  <div>

                    <h4>Email</h4>

                    <a href="mailto:nichoyek@gmail.com">
                      nichoyek@gmail.com
                    </a>

                  </div>

                </div>

                <div className="social-links">

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nicholas-yek-ei-zhe-510103272/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>

                </div>

              </div>

            </div>

            {/* contact form */}

            <div className="contact-form">

              <h3>Send Us A Message</h3>

              <p>
                We'll get back to you as soon as possible.
              </p>

              <form ref={form} onSubmit={sendEmail}>

                <div className="row">

                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    type="email"
                    name="reply_to"
                    placeholder="Your Email"
                    required
                  />

                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />

                <textarea
                  name="message"
                  rows="7"
                  placeholder="Your Message"
                  required
                ></textarea>

                <button type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                </button>

                {success && (
                  <div className="form-status form-status--success">
                    <FaCheckCircle />
                    {success}
                  </div>
                )}

                {error && (
                  <div className="form-status form-status--error">
                    <FaExclamationCircle />
                    {error}
                  </div>
                )}

              </form>

            </div>

          </div>

        </div>
      </Reveal>
    </section>
  );
};

export default ContactSection;