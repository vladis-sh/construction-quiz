import { Header } from "../widgets/header";
import { Projects } from "../widgets/projects";
import { Quiz } from "../widgets/quiz-section";

function App() {
  return (
    <div className="App">
      <Header />
      <Quiz />
      <Projects />
    </div>
  );
}

export default App;
