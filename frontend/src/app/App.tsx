import { Header } from "../widgets/header";
import { Projects } from "../widgets/projects";

import Quiz from "../widgets/quiz-section/ui/quiz";

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
