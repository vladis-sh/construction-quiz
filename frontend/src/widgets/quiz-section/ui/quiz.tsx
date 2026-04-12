import { useState, type MouseEvent, type ReactEventHandler } from "react";
import Container from "../../../shared/ui/container/container";
import "./quiz.scss";
import { pluralize } from "../../../shared/lib/pluralize";
interface QuizOption {
  id: number;
  label: string;
}
interface QuizQuestion {
  id: number;
  title: string;
  options: QuizOption[];
}

interface ProjectResult {
  id: number;
  name: string;
  area: number;
  floors: number;
  bedrooms: number;
  price: string;
  image: string;
  match: number;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "Какой у вас бюджет на строительство?",
    options: [
      { id: 11, label: "До 8 млн рублей" },
      { id: 12, label: "8–12 млн рублей" },
      { id: 13, label: "12–18 млн рублей" },
      { id: 14, label: "Более 18 млн рублей" },
    ],
  },
  {
    id: 2,
    title: "Какая площадь дома вас интересует?",
    options: [
      { id: 21, label: "До 80 м²" },
      { id: 22, label: "80–120 м²" },
      { id: 23, label: "120–160 м²" },
      { id: 24, label: "Более 160 м²" },
    ],
  },
  {
    id: 3,
    title: "Сколько этажей вы хотите?",
    options: [
      { id: 31, label: "Одноэтажный" },
      { id: 32, label: "Двухэтажный" },
      { id: 33, label: "Не принципиально" },
    ],
  },
  {
    id: 4,
    title: "Сколько спален вам нужно?",
    options: [
      { id: 41, label: "1–2 спальни" },
      { id: 42, label: "3 спальни" },
      { id: 43, label: "4 и более" },
    ],
  },
  {
    id: 5,
    title: "Какой тип крыши вы предпочитаете?",
    options: [
      { id: 51, label: "Двускатная" },
      { id: 52, label: "Вальмовая" },
      { id: 53, label: "Плоская" },
      { id: 54, label: "Любая" },
    ],
  },
];

const PROJECTS: ProjectResult[] = [
  {
    id: 1,
    name: "ТЭСС – 80",
    area: 80,
    floors: 1,
    bedrooms: 2,
    price: "10 350 000 ₽",
    image: "https://placehold.co/320x200/1f2b3d/4a90d9?text=ТЭСС+80",
    match: 96,
  },
  {
    id: 2,
    name: "ОРИОН – 83",
    area: 83,
    floors: 1,
    bedrooms: 2,
    price: "10 760 000 ₽",
    image: "https://placehold.co/320x200/1f2b3d/4a90d9?text=ОРИОН+83",
    match: 88,
  },
  {
    id: 3,
    name: "АЛЬФА – 95",
    area: 95,
    floors: 1,
    bedrooms: 3,
    price: "12 100 000 ₽",
    image: "https://placehold.co/320x200/1f2b3d/4a90d9?text=АЛЬФА+95",
    match: 74,
  },
];

type QuizSteps = "questions" | "submitting" | "results";

//1 close

export default function Quiz() {
  const [step, setStep] = useState<QuizSteps>("questions");
  const [isOpen, setOpen] = useState(false);
  const [currIdx, setCurrIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<null | number>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const openQuiz = () => {
    setStep("questions");
    setCurrIdx(0);
    setAnswers([]);
    setSelected(null);
    setOpen(true);
  };
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  const handleSelectOption = (optionId: number) => {
    setSelected(optionId);
  };

  const handleNext = () => {
    if (selected === null) {
      return;
    }
    const question = QUESTIONS[currIdx];
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    if (currIdx < QUESTIONS.length - 1) {
      setCurrIdx(currIdx + 1);
      setSelected(newAnswers[QUESTIONS[currIdx + 1].id] ?? null); // if last question set to null selected option
    } else {
      setStep("submitting");
      setTimeout(() => {
        setStep("results");
      }, 3200);
      console.log(answers);
    }
  };

  const handlePrev = () => {
    if (currIdx === 0) return;
    const question = QUESTIONS[currIdx];
    const newAnswers = {
      ...answers,
      [question.id]: selected ?? answers[question.id],
    };
    setAnswers(newAnswers);
    const prevIdx = currIdx - 1;
    setCurrIdx(prevIdx);
    setSelected(newAnswers[QUESTIONS[prevIdx].id] ?? null);
  };

  const currentQuestion = QUESTIONS[currIdx];
  const progressFill = ((currIdx + 1) / QUESTIONS.length) * 100;
  const options = QUESTIONS[currIdx].options;
  const isLast = currIdx === QUESTIONS.length - 1;
  return (
    <>
      <section className="quiz">
        <Container>
          <div className="quiz__section-container">
            <div className="quiz__section-inner">
              <h2 className="quiz__title">ПОДБЕРИ СВОЙ ПЕРСОНАЛЬНЫЙ ПРОЕКТ</h2>
              <p className="quiz__description">
                Ответьте на несколько вопросов и мы покажем проекты домов,
                которые подойдут именно вам
              </p>
            </div>
            <button className="quiz__start" onClick={openQuiz}>
              Пройти опрос
            </button>
          </div>
        </Container>
      </section>
      {isOpen && (
        <div className="quiz__overlay" onClick={handleOverlayClick}>
          <div className="quiz__modal">
            <div className="quiz__modal-container">
              <button
                className="close__btn"
                aria-label="Закрыть"
                onClick={handleClose}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 4L4 14M4 4l10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="quiz__modal-steps">
                {/**Questions step */}
                {step === "questions" && (
                  <div className="quiz__questions">
                    <div className="progress__container">
                      <span className="progress__label">
                        ВОПРОС {currIdx + 1} ИЗ {QUESTIONS.length}
                      </span>
                      <div className="progress__bar">
                        <div
                          className="progress__line"
                          style={{ width: `${progressFill}%` }}
                        ></div>
                      </div>
                    </div>
                    <h3 className="question__title">{currentQuestion.title}</h3>
                    <div className="options">
                      {options.map(opt => (
                        <button
                          key={opt.id}
                          className={`option__button ${selected === opt.id ? "option__button-selected" : ""}`}
                          onClick={() => handleSelectOption(opt.id)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <div className="navigation">
                      {currIdx > 0 ? (
                        <button className="nav__prev" onClick={handlePrev}>
                          ← Назад
                        </button>
                      ) : null}
                      <button className="nav__next" onClick={handleNext}>
                        {isLast ? "Показать результаты" : "Далее →"}
                      </button>
                    </div>
                  </div>
                )}

                {/**Submitting step */}
                {step === "submitting" && (
                  <div className="submitting">
                    <div className="submitting__container">
                      <div className="spinner"></div>
                      <span className="loading__text">
                        Подбираем проекты<span className="dots"></span>
                      </span>
                    </div>
                  </div>
                )}
                {/**Results step */}
                {step === "results" && (
                  <div className="results">
                    <div className="results__container">
                      <h3 className="results__title">
                        Ваши персональные проекты
                      </h3>
                      <p className="results__subtitle">
                        Мы нашли {PROJECTS.length} проектов под ваши запросы:
                      </p>
                      <div className="projects">
                        {PROJECTS.map(p => (
                          <div key={p.id} className="project__card">
                            <div className="project__img">
                              <img src={p.image} alt={p.name} />
                            </div>
                            <div className="project__card-info">
                              <h4 className="project__name">{p.name}</h4>
                              <div className="project__stats">
                                <span>{p.area}&nbsp;м²</span>
                                <span className="card__dot">·</span>
                                <span>{pluralize(p.floors, "этаж")}</span>
                                <span className="card__dot">·</span>
                                <span>{pluralize(p.bedrooms, "спальня")}</span>
                              </div>
                              <span className="project__price">{p.price}</span>
                            </div>
                            <div className="download__pdf">
                              <button className="pdf__btn">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 15V3M12 15l-4-4M12 15l4-4M3 19h18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Скачать PDF
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/** Contacts Phone Tg Whatsapp */}
                    <div className="contacts">
                      <div className="contacts__container">
                        <a href="tel:+1234567890" className="contact__phone">
                          Позвонить нам
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
