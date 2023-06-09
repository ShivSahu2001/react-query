import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import './App.css';
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.page";
import MySuperHeroesPage from "./components/MySuperHeroes.page";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicParallel.page";
import DependentQueriesPage from "./components/DependentQueries.page";

// creating an instance of queryClient
 const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/my-super-heroes">My Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/rq-dependent" element={<DependentQueriesPage email='shiv@gmail.com' />} />
          <Route path="/rq-dynamic-parallel" element={<DynamicParallelPage heroIds={[1,3]} />} />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/my-super-heroes" element={<MySuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router> 
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
