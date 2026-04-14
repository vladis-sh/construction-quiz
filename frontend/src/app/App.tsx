import { Header } from "../widgets/header";
import { Projects } from "../widgets/projects";
import { QuizSection } from "../widgets/quiz-section";

function App() {
  return (
    <div className="App">
      <Header />
      <QuizSection />
      <Projects />
    </div>
  );
}

export default App;
