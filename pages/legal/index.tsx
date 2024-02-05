import Link from "next/link";

export const LegalPage = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto prose prose-invert">
      <h1 className="text-4xl font-bold font-montserrat">Legal</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-montserrat">Privacy Policy</h2>
        <p>
          We take your privacy seriously. To learn more about our privacy
          policy, please visit our{" "}
          <Link href="/legal/privacy" className="text-indigo-500">
            privacy policy page
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-montserrat">
          Return/Refund Policy
        </h2>
        <p>
          All sales are final. Due to the nature of our products, we cannot
          offer returns or refunds. However, if you have any issues with your
          order, please contact us and we will be happy to help remake your
          order. We want you to be happy with your purchase!
        </p>
        <p className="text-sm text-gray-400">
          Please note that we reserve the right to refuse service to anyone for
          any reason at any time.
        </p>
      </div>

      {/* Terms and conditions of any promotions */}

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-montserrat">
          Promotional Terms and Conditions
        </h2>
        <p>
          Promotional offers are subject to change at any time, and may be
          subject to additional terms and conditions.
        </p>
      </div>

      // <div className="flex flex-col gap-4">
      //   <h2 className="text-2xl font-bold font-montserrat">Terms of Service</h2>
      //   <p>
      //     By using our service, you agree to our terms of service. To learn more
      //     about our terms of service, please visit our{" "}
      //     <Link href="/legal/terms" className="text-indigo-500">
      //       terms of service page
      //     </Link>
      //     .
      //   </p>
      // </div>
    </div>
  );
};

export default LegalPage;
