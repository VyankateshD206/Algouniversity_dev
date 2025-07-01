import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProblemById } from '../Services/problemService';
import MyCompiler from '../Components/MyCompiler';
import { useDispatch } from 'react-redux';
import { setProblemId, setProblemData } from '../store/problemSlice';

function Solve() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
   const dispatch = useDispatch();
  useEffect(() => {
  fetchProblemById(id)
    .then(res => {
      setProblem(res.data);
      dispatch(setProblemId(id));           
      dispatch(setProblemData(res.data));    
    })
    .catch(console.error);
}, [id]);

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="flex h-[90vh]">
      {/* Left side - problem statement */}
      <div className="w-1/2 p-4 overflow-auto border-r">
        <h2 className="text-2xl font-bold">{problem.name}</h2>
        <p className="mt-4 whitespace-pre-line">{problem.statement}</p>
        <p className="mt-4 whitespace-pre-line">{problem.inputFormat}</p>
        <p className="mt-4 whitespace-pre-line">{problem.outputFormat}</p>
        <p className="mt-4 whitespace-pre-line">{problem.constraints}</p>
        {problem.samples && (
          <div className="mt-6">
            <p className="font-semibold">Sample Inputs & Outputs:</p>
            {problem.samples.map((sample, index) => (
              <div key={index} className="mt-2 border p-2 rounded bg-gray-50">
                <p><strong>Input:</strong> {sample.input}</p>
                <p><strong>Output:</strong> {sample.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side - compiler */}
      <div className="w-1/2 p-4 overflow-auto">
        <MyCompiler defaultCode={'#include<iostream>\nusing namespace std;\nint main() {\n  return 0;\n}'} />

      </div>
    </div>
  );
}

export default Solve;
