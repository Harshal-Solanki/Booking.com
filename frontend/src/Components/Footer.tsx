const Footer= ()=>{
    return(
        <div className="bg-blue-800 py-10">
            <div className="container mx-auto flex items-center justify-between">
                <span className="ml-40 text-3xl text-white font-bold tracking-tight">
                    Booking.com
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer ">Privacy Policy</p>
                    <p className="cursor-pointer mr-40">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;