import MultiStepForm from "./form/lead-from"

const Hero = () => {
    return (
        <>
            {/* <div className="w-full max-w-3xl mx-auto md:px-4 md:py-6">
                <div
                    className="bg-[white] md:rounded-[16px] flex flex-col gap-4 w-full  box-border py-6 md:py-12 px-4 md:px-14"
                >
                    <div>
                        <h1 className='font-ubuntu font-bold text-3xl md:text-4xl'>
                            Your Car Finance
                        </h1>
                        <p className='text-base md:text-xl mt-2'>
                            Car finance was mis-sold{" "}
                            <span
                                className='underline decoration-primary decoration-[4px] decor'
                            >
                                between 2007 and 2020.
                            </span>{" "}
                        </p>
                        <p className='text-base md:text-xl mt-2'>
                            Select ALL lenders below you want to check for potential claims.
                        </p>
                        <h2 className='font-ubuntu mt-3 font-bold text-2xl md:text-3xl'>
                            Can&apos;t remember...
                        </h2>
                        <h3 className='font-ubuntu mt-2 font-bold text-[19px] md:text-[22px]'>
                            All your lenders?
                        </h3>
                        <p className='text-base md:text-xl mt-2'>
                            Don&apos;t worry just select any other lenders you think you may have had car finance with and we will check.
                        </p>
                    </div>
                    <form className="flex flex-col gap-4" action="#">
                        <div>
                            <label
                                className="block text-[18px] sm:text-[20px] font-bold text-[#373643] mb-2 text-left"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 700,
                                    lineHeight: "150%",
                                    letterSpacing: "0%"
                                }}
                            >
                                Enter Your Postcode to Begin
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="e.g., SW1A 1AA"
                                    style={{ height: 60 }}
                                    className="border border-gray-300 p-2.5 sm:p-4 pr-[135px] rounded-md w-full text-[17px] sm:text-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent animate-expand-pulse"
                                    name="postcode"
                                    defaultValue=""
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 bg-[#1A1F71] text-white rounded-md hover:bg-[#2A2F81] transition duration-200 text-[18px] flex items-center justify-center gap-1 "
                                    disabled={false}
                                    style={{
                                        width: 125,
                                        height: 60,
                                        padding: 0,
                                        fontSize: 18,
                                        lineHeight: 56,
                                        boxSizing: "border-box"
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="text-white cursor-pointer"
                                    >
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Search
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="relative bg-gradient-to-r cursor-pointer from-[#239696] to-[#33CCCC] text-white p-2.5 sm:p-4 rounded-md w-full hover:from-[#1F8585] hover:to-[#2BBBBB] transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed "
                            disabled={false}

                        >
                            Start My Claim
                        </button>
                    </form>
                    <div
                        className="mt-4 flex flex-col items-center justify-center gap-2"
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: 10,
                            lineHeight: "150%",
                            letterSpacing: "0%",
                            verticalAlign: "middle",
                            color: "#373643"
                        }}
                    >
                        <div className="flex items-center">
                            <svg
                                className="mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                style={{ color: "#373643" }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                />
                            </svg>
                            <span
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 400,
                                    fontSize: 10,
                                    lineHeight: "150%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    color: "#373643"
                                }}
                            >
                                Your information is 100% safe and secure on this website
                            </span>
                        </div>
                    </div>

                </div>
            </div> */}
            <MultiStepForm />
        </>
    )
}

export default Hero
