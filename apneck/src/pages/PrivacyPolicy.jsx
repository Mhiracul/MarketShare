import PrivacyTop from "../components/PrivacyTop";

const PrivacyPolicy = () => {
  return (
    <div>
      <PrivacyTop />

      <div className="py-5 md:px-20 px-10 mt-3 ">
        <div className="bg-white px-8 py-6">
          <h1 className="py-2 font-bold text-[#008605]">Privacy Policy</h1>
          <p>Last Updated: 26th July 2023.</p>
          <p>
            Welcome to MarketShare (`we` or `our`` or us`). This Privacy Policy
            explains how we collect, use, disclose, and protect your personal
            information when you use our website, products, and services. We are
            committed to protecting your privacy and ensuring the security of
            your personal information.
          </p>

          <h2 className="py-2 font-bold ">1. Information We Collect</h2>
          <p>We collect various types of information, including:</p>

          <h3 className="py-2 font-bold ">1.1 Personal Information</h3>
          <p>
            We may collect personal information that can be used to identify
            you, such as:
          </p>
          <ul className="text-xs">
            <li>Name</li>
            <li>Email address</li>
            <li>Postal address</li>
            <li>Phone number</li>
            <li>Payment information (credit card details, billing address)</li>
          </ul>

          <h3 className="py-2 font-bold ">1.2 Transaction Information</h3>
          <p>
            We collect information related to your transactions on our website,
            including:
          </p>
          <ul className="text-xs">
            <li>Product purchases</li>
            <li>Order history</li>
            <li>Shipping and billing information</li>
          </ul>

          <h3 className="py-2 font-bold ">1.3 Usage Information</h3>
          <p>
            We collect information about how you use our website, including:
          </p>
          <ul className="text-xs">
            <li>Browsing activity</li>
            <li>Pages visited</li>
            <li>Interactions with our website</li>
            <li>Referring URL</li>
          </ul>

          <h3 className="py-2 font-bold ">1.4 Device and Log Information</h3>
          <p>
            We may automatically collect information about your device and usage
            of our services, including:
          </p>
          <ul className="text-xs">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Unique device identifiers</li>
            <li>Mobile network information</li>
            <li>Standard web log information (pages viewed, access times)</li>
          </ul>

          {/* Continue to render the content of each section */}

          {/* Continue to render the content of each section */}

          <h2 className="py-2 font-bold ">2. Security</h2>
          <p className="text-xs">
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. However,
            <br /> no data transmission over the internet or electronic storage
            is completely secure.
          </p>

          {/* Continue to render the content of each section */}

          <h2 className="py-2 font-bold ">3. Children{"'"}s Privacy</h2>
          <p className="text-xs">
            Our services are not intended for children under the age of 13. We
            do not knowingly collect personal information from children.
          </p>

          {/* Continue to render the content of each section */}

          <h2 className="py-2 font-bold ">4. Changes to this Privacy Policy</h2>
          <p className="text-xs">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational,
            <br /> legal, or regulatory reasons. We will notify you of any
            changes by posting the updated Privacy Policy on our website.
          </p>

          {/* Continue to render the content of each section */}

          <h2 className="py-2 font-bold ">5. Contact Us</h2>
          <p className="text-xs">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us <br /> at
            info@marketsharestore.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
