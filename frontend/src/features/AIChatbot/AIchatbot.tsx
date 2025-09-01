import Header from '../../shared/components/header/Header';
import PageList from '../../shared/components/sidebar/PageList';
import axios from 'axios';
import type {ApiResponse} from "../../types/api";
import { useState } from "react";


const AIchatbot = () => {
  const [input, setInput] = useState("");      // for user query
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const sendQuery = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        query: input
      });
      console.log("Response:", res.data);
      setResponse(res.data); // store chatbot response
    } catch (err) {
      console.error("Error:", err);
      setResponse({ summary: "Error fetching response", topic: "", sources: [], tools: [] });
    }
  };

  return (
    <div>
      <Header/>
      <div className='flex'>
        <PageList />
        <div className="relative w-full rounded-4xl bg-gray-100 flex flex-col items-center justify-center p-6">
           <div className="flex-1 w-full max-w-4xl mx-auto mt-10">
            {response && (
            <div className="w-full max-w-4xl mt-10 p-4 rounded-xl">
              <h2 className="text-xl font-bold">{response.topic}</h2>
              <p className="mt-2">{response.summary}</p>
              {response.sources?.length > 0 && (
                <>
                  <h3 className="mt-4 font-semibold">Sources:</h3>
                  <ul className="list-disc pl-5">
                    {response.sources.map((src, i) => (
                      <li key={i}><a href={src} className="text-blue-500" target="_blank" rel="noreferrer">{src}</a></li>
                    ))}
                  </ul>
                </>
              )}
              {response.tools?.length > 0 && (
                <>
                  <h3 className="mt-4 font-semibold">Tools:</h3>
                  <p>{response.tools.join(", ")}</p>
                </>
              )}
            </div>
          )}
        </div>
          <div className="relative w-full max-w-4xl mx-auto pb-20">
            <input
              type="text"
              placeholder="Ask Anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-full px-8 py-4 pr-24 text-lg focus:outline-none focus:ring-2 focus:ring-blue-700 border border-gray-300"
            />
            <button
              onClick={sendQuery}
              className="absolute right-3 top-8 -translate-y-1/2 bg-blue-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-600 transition"
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
