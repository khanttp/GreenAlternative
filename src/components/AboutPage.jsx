import "../assets/styles/AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <div className="about-page-container">
        <div className="about-content">
          <h1 className="about-title">About EcoChoice</h1>
          <p className="about-description">
            Welcome to EcoChoice! Our mission is to make sustainable living
            accessible and straightforward for everyone. By helping you discover
            eco-friendly alternatives for everyday products, we aim to reduce
            environmental impact and support greener choices.
          </p>
          <p className="about-description">
            Whether you're looking to replace a product in your home or seeking
            sustainable options for your lifestyle, EcoChoice is here to guide you.
            We use trusted sources and recommendations to ensure the alternatives
            we suggest align with eco-conscious values, without compromising
            quality or usability.
          </p>
          <p className="about-description">
            Together, let's make the world a better place—one choice at a time.
          </p>
        </div>
      </div>
    </>
  );
}
