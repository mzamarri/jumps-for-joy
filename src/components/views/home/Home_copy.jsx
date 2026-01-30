export default function Home() {
return (
    <div className="bg-white">
        {/* Hero Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-6">Welcome to Our Business</h1>
                <p className="text-xl text-gray-600 mb-8">Your success is our priority</p>
                <button className="bg-sky-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-sky-600 transition-colors">
                    Get Started
                </button>
            </div>
        </section>

        {/* About Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-4xl mx-auto text-center px-8">
                <h2 className="text-5xl font-bold text-gray-800 mb-8">About Us</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    We are a dedicated team committed to providing exceptional services 
                    and solutions that drive your business forward. With years of experience 
                    and a passion for excellence, we deliver results that matter.
                </p>
            </div>
        </section>

        {/* Services Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="max-w-6xl mx-auto px-8">
                <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-sky-50 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Consulting</h3>
                        <p className="text-gray-600">Expert advice to guide your business decisions</p>
                    </div>
                    <div className="text-center p-8 bg-sky-50 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Development</h3>
                        <p className="text-gray-600">Custom solutions built for your needs</p>
                    </div>
                    <div className="text-center p-8 bg-sky-50 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Support</h3>
                        <p className="text-gray-600">Ongoing support to ensure your success</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact Section - Full Screen */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-sky-50">
            <div className="text-center">
                <h2 className="text-5xl font-bold text-gray-800 mb-8">Get In Touch</h2>
                <p className="text-xl text-gray-600 mb-12">Ready to start your journey with us?</p>
                <div className="space-y-4">
                    <p className="text-lg">📧 contact@business.com</p>
                    <p className="text-lg">📞 (555) 123-4567</p>
                    <button className="bg-sky-500 text-white px-10 py-4 rounded-lg text-lg hover:bg-sky-600 transition-colors mt-8">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    </div>
)
}