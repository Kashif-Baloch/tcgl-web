"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ReviewClient, ReviewIOModel } from '@/lib/reviews-client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
const Testimonials = () => {
    const widget = "reviews"
    const [reviews, setReviews] = useState<ReviewIOModel | undefined>(undefined);
    const [stats, setStats] = useState<ReviewIOModel | undefined>(undefined);
    useEffect(() => {
        const fetchStats = async () => {
            if (widget === 'reviews' || widget === 'rating') {
                const reviewStats = await ReviewClient.stats();
                setStats(reviewStats);
            }
            if (widget === 'reviews') {
                const reviewTimeline = await ReviewClient.reviews();
                setReviews(reviewTimeline);
            }
        };
        fetchStats();
    }, []);
    console.log({ reviews, stats })

    const getRatingText = (score: number) => {
        if (score >= 4.5) {
            return "Excellent";
        } else if (score >= 3.5) {
            return "Very Good";
        } else if (score >= 2.5) {
            return "Good";
        } else if (score >= 1.5) {
            return "Fair";
        } else {
            return "Poor";
        }
    };

    return (
        <>
            {
                reviews ?
                    <>
                        <section className="py-12 px-6 bg-white">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-6 text-center">Client Testimonials</h2>

                                <div className="flex items-center justify-center mb-4">
                                    <span className="font-bold mr-2">
                                        {getRatingText(reviews.stats.rating)} ({reviews.stats.rating.toFixed(1)})
                                    </span>

                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => {
                                            const fullStars = Math.floor(reviews?.stats.rating);
                                            const hasHalfStar = reviews?.stats.rating % 1 !== 0;

                                            const starNumber = index + 1;
                                            let fillColor = "text-gray-300"; // Default color for empty stars

                                            if (starNumber <= fullStars) {
                                                fillColor = "text-yellow-400"; // Color for full stars
                                            } else if (hasHalfStar && starNumber === fullStars + 1) {
                                                // For a half star, you'd typically use a gradient or a different SVG.
                                                // For simplicity here, we'll just color it slightly less than full.
                                                // A more robust solution might involve a dedicated half-star SVG or masking.
                                                fillColor = "text-yellow-200"; // A lighter yellow for a "half" visual
                                            }

                                            return (
                                                <svg key={index} className={`w-5 h-5 ${fillColor}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            );
                                        })}
                                    </div>
                                    <span className="text-sm text-gray-500 ml-2">{reviews?.stats.count} reviews</span>
                                </div>

                                {/* Testimonial cards would go here */}
                                <ReviewsSlide reviews={reviews} />

                                <div className="mt-8 text-center">
                                    <Button className="bg-[#d73470]/80 hover:bg-[#d73470]/100 cursor-pointer text-white">
                                        Start My Agreement Check
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </>
                    : null
            }
        </>

    )
}

export default Testimonials


const ReviewsSlide = ({ reviews }: { reviews: any }) => {
    // const animation = { duration: 4000, easing: (t: number) => t }

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slides: { perView: 3, spacing: 24 },

        breakpoints: {
            "(max-width: 1300px)": {
                slides: { perView: 2, spacing: 24 }, // Mobile portrait
            },
            "(max-width: 1024px)": {
                slides: { perView: 2, spacing: 24 }, // Mobile portrait
            },
            "(max-width: 704px)": {
                slides: { perView: 1, spacing: 24 }, // Mobile portrait
            },
        },
        // created(s) {
        //     s.moveToIdx(1, true, animation)
        // },
        // updated(s) {
        //     s.moveToIdx(s.track.details.abs + 1, true, animation)
        // },
        // animationEnded(s) {
        //     s.moveToIdx(s.track.details.abs + 1, true, animation)
        // },
    });


    return (
        <div className='w-full relative flex items-center flex-col gap-4 justify-center'>

            <div
                ref={sliderRef} className="keen-slider relative w-full overflow-hidden">

                {
                    reviews.reviews.map((item: any, index: number) => (
                        <div key={`${index}-review-container`} className={`keen-slider__slide cursor-pointer group`}>

                            <div key={`${index}-review`} className="border rounded-lg p-4 h-full">
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, index) => {
                                        const fullStars = Math.floor(item.rating);
                                        const hasHalfStar = item.rating % 1 !== 0;

                                        const starNumber = index + 1;
                                        let fillColor = "text-gray-300"; // Default color for empty stars

                                        if (starNumber <= fullStars) {
                                            fillColor = "text-yellow-400"; // Color for full stars
                                        } else if (hasHalfStar && starNumber === fullStars + 1) {
                                            // For a half star, you'd typically use a gradient or a different SVG.
                                            // For simplicity here, we'll just color it slightly less than full.
                                            // A more robust solution might involve a dedicated half-star SVG or masking.
                                            fillColor = "text-yellow-200"; // A lighter yellow for a "half" visual
                                        }

                                        return (
                                            <svg key={index} className={`w-5 h-5 ${fillColor}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        );
                                    })}
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    {
                                        item.author
                                    }
                                </p>
                                <p className="text-sm ">
                                    {item.comments}
                                </p>
                            </div>
                        </div>

                    ))
                }
            </div>
            {/* buttons  */}
            <div className='w-full flex items-center justify-center gap-2'>
                <button
                    className='size-[40px] border flex items-center justify-center cursor-pointer hover:bg-gray-100'
                    onClick={() => instanceRef.current?.prev()}
                >
                    <ChevronLeft />
                </button>
                <button
                    className='size-[40px] border flex items-center justify-center cursor-pointer hover:bg-gray-100'
                    onClick={() => instanceRef.current?.next()}
                >

                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}