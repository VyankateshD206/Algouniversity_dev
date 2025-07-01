import { useNavigate } from 'react-router-dom';

function ProblemTable({ problems }) {
  const navigate = useNavigate();

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Tags</th>
          <th className="p-2 border">Difficulty</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((prob, index) => (
          <tr key={index} className="text-center">
            <td className="p-2 border">{prob.name}</td>
            <td className="p-2 border">{prob.tags.join(', ')}</td>
            <td className="p-2 border">{prob.difficulty}</td>
            <td className="p-2 border">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => navigate(`/dashboard/solve/${prob._id}`)}
              >
                Solve
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProblemTable;
