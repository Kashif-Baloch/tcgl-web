import React from 'react'
import { Button } from '../ui/button'

const HowItworks = () => {
    return (
        <section className="bg-primary text-white py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-8 text-center">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white text-blue-900 p-6 rounded-lg relative">
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#d73470] text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <h3 className="font-bold mb-2">Find your agreement</h3>
                        <p className="text-sm">
                            If you&apos;ve had a car finance agreement, you may be due a refund. Check if you&apos;re eligible in just 30
                            seconds.
                        </p>
                    </div>

                    <div className="bg-white text-blue-900 p-6 rounded-lg relative">
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#d73470] text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <h3 className="font-bold mb-2">We handle your claim</h3>
                        <p className="text-sm">
                            Our team of experts will handle your claim from start to finish with regular updates on your progress.
                        </p>
                    </div>

                    <div className="bg-white text-blue-900 p-6 rounded-lg relative">
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#d73470] text-white rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <h3 className="font-bold mb-2">Get compensation</h3>
                        <p className="text-sm">
                            We aim to get you the maximum compensation for your case. The average claim is worth £2,860*.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button className="bg-[#d73470]/80 hover:bg-[#d73470]/100 cursor-pointer text-white">
                        Start My Agreement Check
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HowItworks
