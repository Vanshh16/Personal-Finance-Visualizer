export default function Footer() {
    return (
      <footer className="mt-12 bg-gray-50 border-t text-gray-600">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {new Date().getFullYear()} Finance Visualizer. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  