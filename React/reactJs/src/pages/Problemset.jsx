import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProblems } from '../Services/problemService';
import ProblemTable from '../Components/ProblemTable';

function Problemset() {
  const [problems, setProblems] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems()
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let temp = problems;
    if (search) temp = temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (difficulty) temp = temp.filter(p => p.difficulty === difficulty);
    if (tag) temp = temp.filter(p => p.tags.includes(tag));
    setFiltered(temp);
  }, [search, difficulty, tag, problems]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problemset</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value=''>All Difficulty</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
        <input
          type="text"
          placeholder="Search by tag"
          className="border p-2 rounded"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <ProblemTable problems={filtered}/>
    </div>
  );
}

export default Problemset;
