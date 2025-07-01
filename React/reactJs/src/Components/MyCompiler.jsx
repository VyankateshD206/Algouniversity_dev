import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { codeExec } from '../Services/problemService';

function MyCompiler({ defaultCode }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [customInput, setCustomInput] = useState('');
  const [verdictResult, setVerdictResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const problemId = useSelector(state => state.problem.problemId);
  const token = localStorage.getItem('token');

  const handleRun = async () => {
    setOutput('');
    try {
      const { data } = await codeExec(code,customInput,language,); // assume customInput is passed
      setOutput(data.output);
    } catch (error) {
      setOutput(error.response?.data?.error || 'Execution error');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setVerdictResult(null);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND1_URL}/api/judge`, {
        code,
        language,
        problemId,
      },
       {
        headers: {
        Authorization: `Bearer ${token}` 
        }
      }
    );
     
      setVerdictResult(data);
    } catch (err) {
      setVerdictResult({ verdict: "Error", message: err.response?.data?.error || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        AlgoHelix Compiler
      </h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500"
      >
        <option value='cpp'>C++</option>
        <option value='c'>C</option>
        <option value='py'>Python</option>
        <option value='java'>Java</option>
      </select>

      <br />

      <div className="bg-gray-100 shadow-md w-full max-w-lg mb-4" style={{ height: '300px', overflowY: 'auto' }}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 'none',
            border: 'none',
            backgroundColor: '#f7fafc',
            height: '100%',
            overflowY: 'auto'
          }}
        />
      </div>


      <div className="mt-3">
        <button
          onClick={handleRun}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="ml-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Submit
        </button>
      </div>

      <div className="flex w-full max-w-4xl mt-4 gap-4">
  {/* Left - Custom Input */}
  <div className="flex flex-col md:flex-row w-full max-w-4xl mt-4 gap-4">
  {/* Left - Custom Input */}
  <textarea
    value={customInput}
    onChange={(e) => setCustomInput(e.target.value)}
    placeholder="Enter custom input for Run..."
    className="w-full md:w-1/2 h-40 p-3 border rounded font-mono text-sm resize-none"
  />

  {/* Right - Output */}
  <div className="w-full md:w-1/2 h-40 p-3 bg-gray-100 rounded shadow overflow-auto">
    <p className="font-mono text-sm whitespace-pre-wrap break-words">
      {output || 'Output will appear here after running the code.'}
    </p>
  </div>
</div>

</div>


      {verdictResult && (
        <div className="verdictbox mt-4 bg-gray-100 rounded-md shadow-md p-4 w-full max-w-lg">
          <h3 className="font-bold mb-2">Submission Result: {verdictResult.verdict}</h3>

          {verdictResult.results && (
            <ul className="list-disc list-inside text-sm font-mono">
              {verdictResult.results.map((t, index) => (
                <li key={index}>
                  <strong>Test {index + 1}:</strong> {t.status} <br />
                  <strong>Input:</strong> {t.input}<br />
                  <strong>Expected:</strong> {t.expected}<br />
                  <strong>Actual:</strong> {t.actual}<br />
                </li>
              ))}
            </ul>
          )}

          {verdictResult.message && (
            <p className="text-red-500 text-sm">{verdictResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyCompiler;
