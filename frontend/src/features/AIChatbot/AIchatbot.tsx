import Header from '../../shared/components/header/Header';
import PageList from '../../shared/components/sidebar/PageList';
// import PagecontentSide from '../../../shared/components/content-side/container/PagecontentSide';
const AIchatbot = () => {
  return (
        <div>
            <Header/>
            <div className='flex'>
            <PageList />
           <div className="relative w-full rounded-4xl bg-gray-100 flex items-end justify-center">
              <div className="relative w-full max-w-4xl mx-auto pb-25 ">
                <input
                  type="text"
                  placeholder="Ask Anything"
                  className="w-full rounded-full px-8 py-4 pr-24 text-lg focus:outline-none focus:ring-2 focus:ring-blue-700  "
                />
                <button
                  className="absolute right-3 top-7 -translate-y-1/2 bg-blue-700 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </div>
            </div>
          </div>
     
  );
};

export default AIchatbot;


