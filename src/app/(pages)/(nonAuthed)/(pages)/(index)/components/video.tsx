export default function VideoWelcome ( ) {
    return (
        <div className="flex justify-center my-10">
            <video
                className="rounded-2xl"
                src="https://res.cloudinary.com/dgunvvl28/video/upload/v1736010417/3253113-hd_1920_1080_25fps_hrg5yq.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                style={{ width: '65%', height: 'auto' }}
                >
                Your browser does not support the video tag.
            </video>
        </div>
    )
}