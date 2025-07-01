import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Submissions() {
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [problemFilter, setProblemFilter] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 5;

  const userId = useSelector(state => state.auth.user?._id);
useEffect(() => {
  if (!userId){
    alert("ohoo");
  }

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND1_URL}/api/submissions/user/${userId}`);
      setAllSubmissions(data);
      setFiltered(data);
    } catch (err) {
      console.error('Error fetching submissions:', err.message);
    }
  };

  fetchSubmissions();
}, [userId]);


  useEffect(() => {
    let filteredData = allSubmissions;
    if (problemFilter)
      filteredData = filteredData.filter(sub =>
        sub.problemId?.name?.toLowerCase().includes(problemFilter.toLowerCase())
      );
    if (verdictFilter)
      filteredData = filteredData.filter(sub =>
        sub.verdict === verdictFilter
      );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [problemFilter, verdictFilter, allSubmissions]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copied!");
  };

  const paginated = filtered.slice(
    (currentPage - 1) * submissionsPerPage,
    currentPage * submissionsPerPage
  );

  const totalPages = Math.ceil(filtered.length / submissionsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Submissions</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by problem name"
          className="border rounded px-3 py-1"
          value={problemFilter}
          onChange={(e) => setProblemFilter(e.target.value)}
        />
        <select 
          className="border rounded px-3 py-1"
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value)}
        >
          <option value="">All Verdicts</option>
          <option value="Accepted">Accepted</option>
          <option value="Failed">Failed</option>
          <option value="Error">Error</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No submissions found.</p>
      ) : (
        <div className="space-y-4">
          {paginated.map((s, i) => (
            <div key={i} className="border rounded shadow p-4 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{s.problemId?.name || 'Untitled Problem'}</p>
                  <p className="text-sm text-gray-600">
                    Verdict: <span className={s.verdict === 'Accepted' ? 'text-green-600' : 'text-red-600'}>
                      {s.verdict}</span> | {s.language.toUpperCase()} | {new Date(s.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  {expandedIndex === i ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {expandedIndex === i && (
                <div className="mt-4 bg-gray-50 p-3 rounded text-sm font-mono">
                  <p className="mb-2 font-semibold">Code:</p>
                  <div className="relative">
                    <pre className="bg-gray-200 p-2 rounded overflow-auto">{s.code}</pre>
                    <button
                      onClick={() => copyToClipboard(s.code)}
                      className="absolute top-1 right-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-3 font-semibold">Test Results:</p>
                  <ul className="list-disc list-inside">
                    {s.testResults.map((t, idx) => (
                      <li key={idx} className="mb-1">
                        <strong>Test {idx + 1}:</strong> {t.status} <br />
                        <strong>Input:</strong> {t.input} <br />
                        <strong>Expected:</strong> {t.expected} <br />
                        <strong>Actual:</strong> {t.actual}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Submissions;
