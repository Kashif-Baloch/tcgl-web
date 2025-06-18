import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 px-6 text-center text-xs text-gray-500">
      <p>
        Copyright ©{new Date().getFullYear()} Auto Redress All rights reserved.{" "}
        <span className="my-2 block">
          Auto Redress is a trading style of The Claims Guys Legal.
        </span>
        The Claims Guys Legal Limited is authorised and regulated by the
        Solicitors Regulation Authority (SRA Number: 642517).
      </p>
      <p className="mt-2 w-10/12 mx-auto max-w-[1200px] leading-[1.6]">
        *Value is an estimate and is not indicative of a guaranteed compensation
        amount. The FCA confirmed in their publication "Our work on motor
        finance - Final Finding" that on a 4 year car finance agreement of
        £10,000, a Discretionary Commission Arrangement typically resulted in
        consumers being overcharged £1,100
        <a
          rel="noopener noreferrer"
          target="_blank"
          className="underline mx-1"
          href="https://www.fca.org.uk/publication/multi-firm-reviews/our-work-on-motor-finance-final-findings.pdf"
        >
          https://www.fca.org.uk/publication/multi-firm-reviews/our-work-on-motor-finance-final-findings.pdf
        </a>
        s. 2.15, Pg9. We have taken this value and multiplied it by our average
        number of car agreements per client, as identified from credit report
        data, which is 2.6 as of 05/02/2025.
        <br /> **Free Agreement Check refers only to the live soft-credit check
        completed online to identify your car finance agreements. If you
        instruct us to proceed with a claim(s) on your behalf our Success Fee
        will apply
      </p>
      <div className="mt-4 space-x-4">
        <a
          href="https://theclaimsguyslegal.com/privacy-policy/"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          Privacy Policy
        </a>
        <a href="#" className="underline">
          Terms of Service
        </a>
        <a href="#" className="underline">
          Cookie Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
