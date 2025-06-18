import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Link from 'next/link'
import { Button } from '../ui/button'

const Faqs = () => {
    return (
        <section className="py-6 md:py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-white px-6 py-10 md:p-12 rounded-[16px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

                <Accordion type="single" collapsible className="">
                    <AccordionItem value="item-1" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">Why might I have a claim?</AccordionTrigger>
                        <AccordionContent className="text-sm">
                            <p>
                                If you purchased a vehicle on finance between 2007 and 2021, then it is likely that the car finance was mis-sold to you due to the car dealership failing to disclose commission they were paid by the lender for setting up your car finance.
                            </p>
                            <p className="mt-2">
                                Unbeknown to consumers, some lenders allowed car dealerships to increase the interest rate paid by consumers for their car finance, to increase the commission they earned.
                            </p>
                            <p className="mt-2">
                                It is estimated that consumers were overcharged by a staggering £300 million a year for their car finance due to the poor practices of car dealerships and lenders*.
                            </p>
                            <p className="mt-2">
                                *See: <Link target="_blank" className="text-blue-500 hover:underline" href={"https://www.fca.org.uk/publication/multi-firm-reviews/our-work-on-motor-finance-final-findings.pdf"}>https://www.fca.org.uk/publication/multi-firm-reviews/our-work-on-motor-finance-final-findings.pdf</Link> s. 2.17, Pg9.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">
                            How long will my claim take?
                        </AccordionTrigger>
                        <AccordionContent className="">
                            Most claims are resolved within 8-12 weeks, although complex cases may take longer.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">
                            How much could my claim be worth?
                        </AccordionTrigger>
                        <AccordionContent className="">
                            The average claim is worth £2,860, but the exact amount depends on your specific circumstances and the
                            details of your finance agreement.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">
                            Do I need to use a law firm, or claims management company to make my claim?
                        </AccordionTrigger>
                        <AccordionContent className="">
                            While you can make a claim yourself, our expertise and experience can help maximize your chances of
                            success and potentially increase the amount you receive.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">What are your fees?</AccordionTrigger>
                        <AccordionContent className="">
                            We operate on a no-win, no-fee basis. If your claim is successful, our fee is 25% + VAT of the amount
                            recovered.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6" className="border-b border-blue-800">
                        <AccordionTrigger className="text-left text-base hover:no-underline">
                            I was referred to you via a THIRD-party, how are they paid?
                        </AccordionTrigger>
                        <AccordionContent className="">
                            If you were referred by a third party, they may receive a referral fee from us. This does not affect
                            the amount you receive from your claim.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-8 text-center">
                    <Button className="bg-[#d73470]/80 hover:bg-[#d73470]/100 cursor-pointer text-white">
                        Start My Agreement Check
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Faqs
