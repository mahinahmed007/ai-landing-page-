import React, { useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [idea, setIdea] = useState("");
  const [category, setCategory] =  useState("AI SaaS");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    
    setLoading(true);
    setResult("");

     const response = await axios.post (
         "https://openrouter.ai/api/v1/chat/completions",
         {
            model:"openai/gpt-3.5-turbo",
             messages: [
                    {
                        role:"user",
                        content:`You are an expert front-end developer.
                            You are a front-end generator. Produce ONE complete, valid HTML document using ONLY standard HTML and a single <style> block in the <head>. 
Do NOT include JavaScript, external stylesheets, frameworks, Google Fonts, markdown fences, comments, or any text before/after the HTML.

Goal:
A modern, responsive landing page for a product in the "${category}" category called "${idea}".

Hard rules:
- Output must start with <!doctype html> and end with </html>, with nothing else outside.
- Use one internal <style> block for all CSS (no external links).
- Color palette:
  - Background (light): #F8FAFC
  - Text (light): #111827
  - Background (dark): #0F172A (use via body.dark)
  - Text (dark): #F8FAFC
  - Primary: #6366F1
  - Secondary: #F43F5E
  - Card light: #FFFFFF
  - Card dark: #1E293B
- Rounded corners, soft shadows, tasteful spacing, and hover/focus states.
- Mobile-first responsive layout that scales to tablet/desktop.

Structure:
1) HERO
   - Large bold H1 with the product name (${idea}).
   - Short subheading (1–2 sentences) describing value.
   - Optional subtle gradient/shape background using pure CSS (no images).

2) FEATURES (exactly 3 cards)
   - Responsive grid: 1 column on small screens, 3 columns on wider screens.
   - Each card includes: an emoji/icon, a short feature title, and a one-line description.
   - Card style: rounded corners, border, soft shadow, good contrast in light and dark.

3) CTA
   - Prominent centered button (primary color) labeled “Get Started” (or similar).
   - Small secondary text link (secondary color) under or next to it.

Accessibility & polish:
- Use semantic tags (header, main, section, h1–h3).
- Legible, system-font stack (no external fonts).
- Sufficient color contrast.
- Visible focus styles for interactive elements.
- Make the code self-contained and clean.

Dark mode:
- Support an optional dark theme activated by adding class="dark" on <body>. 
- Provide corresponding dark styles for background, text, and cards.

 return ONLY the HTML document.
`,
                    },
                ],
            },
           
              {  headers: {
                    Authorization:`Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}` ,
                    "Content-Type":"application/json",
                    "HTTP-Referer":"http://localhost:5173",
                   
                }
            }
     )
       setResult(response.data.choices[0].message.content);
        setLoading(false);
  }

    const copyCode = () => {
        navigator.clipboard.writeText(result);
        alert("Copied to clipboard!");
}


  return (
    <div>
        <div className='min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-100 px-4 py-10 font-sans'>
            <div className=" w-full max-w-8xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-purple-100">
                
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-10 leading-relaxed">
                AI Landing Page Generator</h1>
               <div className="flex flex-col items-center gap-4">
                 <div className="flex flex-col md:flex-row gap-4">

                <input type="text" 
                 value={idea}
                 onChange={(e) => setIdea(e.target.value)}
                placeholder='Enter your product idea (e.g:Travel, Shopping)'
                className='w-2xl  border border-gray-300 px-4 py-3 rounded-lg mb-5 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400  transition  outline-none  text-gray-700 placeholder-gray-400 '/>
                
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-2xl border border-gray-300 px-4 py-3 rounded-lg mb-5 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400  transition  outline-none  text-gray-700 placeholder-gray-400'>
            <option value="AI SaaS">AI SaaS</option> 
            <option value="Productivity Tool">Productivity Tool</option>
            <option value="Startup">Startup</option>   
            </select>    
            </div>

            <button className='w-64 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-85 shadow-lg transition outline-none'
            onClick={handleGenerate}>
             {loading ? "Generating..." : "✨ Generate Landing Page"}
             </button>
            </div>
             
                {result && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className='mt-10 md:col-span-2 '>
                        <h2 className='text-xl mb-3 font-bold'>Live preview</h2>

                        <div className='border p-5 rounded-lg mb-2 text-left w-full' dangerouslySetInnerHTML={{
                            __html:result
                        }}/>
                         </div>

                        <div className='mt-6 '>
                            <h3 className='text-lg font-semibold mb-2'>HTML Code:</h3>
                            <button
                            className='px-5 py-2 rounded-lg  bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-85 shadow-lg transition text-white font-medium outline-none'
                            onClick={copyCode}>
                                Copy Code
                            </button>
                            <pre className='bg-black text-white p-4 text-sm overflow-auto rounded-lg mt-2 max-h-[600px] flex-1 '>
                                {result}
                            </pre>
                        </div>
                    </div>
                   
                )}


            </div>
        </div>
    </div>
  )
}

export default Home