import React, { useState } from 'react';
import axios from 'axios'
const Editor = () => {
  const [sender,setSender ] = useState("rb@mailbridge.com")
  const [receiver, setReceiver] = useState()
  const [email, setEmail] = useState()
  const [subject, setSubject] = useState()

  const sendEmail = async ()=>{
    try {
      const res = await axios.post("http://localhost:7000/mailBridge/sendEmail", {sender,receiver,email,subject})
      console.log(res);
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <section className="bg-black bg-opacity-75 top-0 left-0 w-full h-full absolute">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Compose Email</h2>
            
            {/* Recipient Input */}
            <div className="mb-4">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                To
              </label>
              <input
                type="email"
                id="to"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                placeholder="Recipient's email"
                onChange={(e)=> setReceiver(e.target.value)}
              />
            </div>
            
            {/* Subject Input */}
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                placeholder="Email subject"
                onChange={(e)=> setSubject(e.target.value)}
              />
            </div>
            
            {/* Body Textarea */}
            <div className="mb-6">
              <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="body"
                rows="8"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                placeholder="Write your message here..."
                onChange={(e)=> setEmail(e.target.value)}
              ></textarea>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                onClick={sendEmail}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Editor;
