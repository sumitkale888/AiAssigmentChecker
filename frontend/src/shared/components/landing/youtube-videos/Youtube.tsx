import React from 'react'

const Youtube = () => {
  return (
    <section className="py-16 bg-gradient-to-tr from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Experience Classroom in Action</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            {/* Replace the iframe src with your own product/demo/video links */}
            <div className="rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
              <iframe
                src="https://www.youtube.com/embed/sQzp5mvGSAo"
                title="Classroom Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-56"
              ></iframe>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
              <iframe
                src="https://www.youtube.com/embed/T6FvCs-OHcg"
                title="Feature Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-56"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Youtube