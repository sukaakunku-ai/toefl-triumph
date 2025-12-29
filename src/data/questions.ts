export interface Question {
  id: number;
  category: 'structure' | 'reading' | 'listening';
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export const structureQuestions: Question[] = [
  {
    id: 1,
    category: 'structure',
    question_text: "The committee _____ their decision tomorrow.",
    options: ["will announce", "announcing", "announced", "has announcing"],
    correct_answer: 0,
    explanation: "The future tense 'will announce' is correct because the sentence indicates an action that will happen 'tomorrow'."
  },
  {
    id: 2,
    category: 'structure',
    question_text: "Neither the students nor the teacher _____ satisfied with the results.",
    options: ["were", "was", "are being", "have been"],
    correct_answer: 1,
    explanation: "With 'neither...nor', the verb agrees with the noun closest to it. 'Teacher' is singular, so 'was' is correct."
  },
  {
    id: 3,
    category: 'structure',
    question_text: "_____ the rain, the football match continued.",
    options: ["Despite of", "In spite", "Despite", "Although"],
    correct_answer: 2,
    explanation: "'Despite' is followed directly by a noun. 'Despite of' is incorrect, and 'Although' requires a clause."
  },
  {
    id: 4,
    category: 'structure',
    question_text: "The book _____ I borrowed from the library is very interesting.",
    options: ["who", "whom", "which", "whose"],
    correct_answer: 2,
    explanation: "'Which' is used for things. 'Who' and 'whom' are for people, and 'whose' indicates possession."
  },
  {
    id: 5,
    category: 'structure',
    question_text: "Had I known about the meeting, I _____ attended it.",
    options: ["would", "would have", "will have", "had"],
    correct_answer: 1,
    explanation: "This is a third conditional (past unreal). 'Had I known' requires 'would have + past participle'."
  },
  {
    id: 6,
    category: 'structure',
    question_text: "The number of students _____ increased significantly this year.",
    options: ["have", "has", "are", "were"],
    correct_answer: 1,
    explanation: "'The number of' is treated as singular and takes 'has'. Compare with 'A number of' which is plural."
  },
  {
    id: 7,
    category: 'structure',
    question_text: "She suggested that he _____ a doctor immediately.",
    options: ["sees", "saw", "see", "seeing"],
    correct_answer: 2,
    explanation: "After 'suggest', the subjunctive mood requires the base form of the verb without 'to'."
  },
  {
    id: 8,
    category: 'structure',
    question_text: "Not only _____ the exam, but he also got the highest score.",
    options: ["he passed", "did he pass", "he did pass", "passed he"],
    correct_answer: 1,
    explanation: "'Not only' at the beginning of a sentence requires subject-verb inversion: 'did he pass'."
  },
  {
    id: 9,
    category: 'structure',
    question_text: "The scientist, along with her colleagues, _____ the experiment.",
    options: ["conduct", "conducts", "are conducting", "have conducted"],
    correct_answer: 1,
    explanation: "'Along with' doesn't change the subject. 'The scientist' is singular, so 'conducts' is correct."
  },
  {
    id: 10,
    category: 'structure',
    question_text: "It is essential that every student _____ the assignment on time.",
    options: ["submits", "submit", "submitted", "will submit"],
    correct_answer: 1,
    explanation: "After 'It is essential that', the subjunctive 'submit' (base form) is required."
  },
];

export const readingQuestions: Question[] = [
  {
    id: 11,
    category: 'reading',
    question_text: "According to the passage, photosynthesis primarily occurs in which part of the plant?",
    options: ["Roots", "Stems", "Leaves", "Flowers"],
    correct_answer: 2,
    explanation: "Photosynthesis primarily occurs in the leaves where chlorophyll is concentrated in the chloroplasts."
  },
  {
    id: 12,
    category: 'reading',
    question_text: "The word 'ubiquitous' in paragraph 2 is closest in meaning to:",
    options: ["Rare", "Widespread", "Ancient", "Complex"],
    correct_answer: 1,
    explanation: "'Ubiquitous' means existing or being everywhere at the same time, which is closest to 'widespread'."
  },
  {
    id: 13,
    category: 'reading',
    question_text: "What can be inferred about the author's attitude toward climate change?",
    options: ["Dismissive", "Neutral", "Concerned", "Optimistic"],
    correct_answer: 2,
    explanation: "The author's use of urgent language and emphasis on consequences suggests a concerned attitude."
  },
  {
    id: 14,
    category: 'reading',
    question_text: "The passage suggests that renewable energy sources:",
    options: ["Are too expensive to implement", "Will replace fossil fuels completely", "Offer a viable alternative", "Have no environmental impact"],
    correct_answer: 2,
    explanation: "The passage presents renewable energy as a practical alternative while acknowledging challenges."
  },
  {
    id: 15,
    category: 'reading',
    question_text: "Which of the following best describes the organization of the passage?",
    options: ["Chronological order", "Cause and effect", "Problem and solution", "Compare and contrast"],
    correct_answer: 2,
    explanation: "The passage first presents problems and then discusses potential solutions."
  },
  {
    id: 16,
    category: 'reading',
    question_text: "The author mentions 'biodiversity' primarily to:",
    options: ["Define a scientific term", "Support the main argument", "Introduce a new topic", "Contradict previous claims"],
    correct_answer: 1,
    explanation: "Biodiversity is mentioned as evidence supporting the author's argument about ecosystem importance."
  },
  {
    id: 17,
    category: 'reading',
    question_text: "According to paragraph 3, what is the primary challenge of urbanization?",
    options: ["Population growth", "Resource management", "Cultural preservation", "Economic development"],
    correct_answer: 1,
    explanation: "The paragraph emphasizes the difficulty of managing resources in rapidly growing urban areas."
  },
  {
    id: 18,
    category: 'reading',
    question_text: "The phrase 'paradigm shift' in the passage refers to:",
    options: ["A minor adjustment", "A fundamental change", "A temporary solution", "A political movement"],
    correct_answer: 1,
    explanation: "'Paradigm shift' refers to a fundamental change in approach or underlying assumptions."
  },
  {
    id: 19,
    category: 'reading',
    question_text: "Which statement would the author most likely agree with?",
    options: ["Technology alone can solve environmental problems", "Individual actions have no impact", "Collective effort is necessary for change", "Economic growth should be prioritized"],
    correct_answer: 2,
    explanation: "The author repeatedly emphasizes the importance of collective action and cooperation."
  },
  {
    id: 20,
    category: 'reading',
    question_text: "The purpose of the final paragraph is to:",
    options: ["Summarize the main points", "Introduce new evidence", "Call readers to action", "Question the thesis"],
    correct_answer: 2,
    explanation: "The final paragraph urges readers to take action based on the information presented."
  },
];

export const listeningQuestions: Question[] = [
  {
    id: 21,
    category: 'listening',
    question_text: "What is the main topic of the lecture?",
    options: ["Marine biology", "Climate patterns", "Ancient civilizations", "Modern architecture"],
    correct_answer: 0,
    explanation: "The lecture focuses primarily on marine biology and ocean ecosystems."
  },
  {
    id: 22,
    category: 'listening',
    question_text: "Why does the professor mention coral reefs?",
    options: ["To give an example", "To contradict a theory", "To change the subject", "To assign homework"],
    correct_answer: 0,
    explanation: "Coral reefs are mentioned as an example to illustrate the biodiversity of marine ecosystems."
  },
  {
    id: 23,
    category: 'listening',
    question_text: "What does the student imply when she says 'That's fascinating'?",
    options: ["She is bored", "She is genuinely interested", "She disagrees", "She wants to leave"],
    correct_answer: 1,
    explanation: "The enthusiastic tone indicates genuine interest in the topic being discussed."
  },
  {
    id: 24,
    category: 'listening',
    question_text: "According to the conversation, what is the deadline for the project?",
    options: ["Next Monday", "Next Friday", "In two weeks", "End of the month"],
    correct_answer: 1,
    explanation: "The speakers explicitly mention that the project is due next Friday."
  },
  {
    id: 25,
    category: 'listening',
    question_text: "What problem does the student have?",
    options: ["Missing class materials", "Scheduling conflict", "Financial difficulties", "Health issues"],
    correct_answer: 1,
    explanation: "The student explains that they have a scheduling conflict with another class."
  },
  {
    id: 26,
    category: 'listening',
    question_text: "What does the professor suggest the student do?",
    options: ["Drop the class", "Meet during office hours", "Email the assignment", "Work with a partner"],
    correct_answer: 1,
    explanation: "The professor offers to discuss the matter further during office hours."
  },
  {
    id: 27,
    category: 'listening',
    question_text: "What is the professor's attitude toward the research findings?",
    options: ["Skeptical", "Enthusiastic", "Indifferent", "Confused"],
    correct_answer: 1,
    explanation: "The professor's tone and word choice indicate enthusiasm about the research findings."
  },
  {
    id: 28,
    category: 'listening',
    question_text: "Which aspect of the experiment does the professor emphasize?",
    options: ["The methodology", "The results", "The cost", "The duration"],
    correct_answer: 0,
    explanation: "The professor spends significant time explaining the methodology and its importance."
  },
  {
    id: 29,
    category: 'listening',
    question_text: "What can be inferred about the library's new policy?",
    options: ["It is popular with students", "It has been controversial", "It was implemented recently", "It will be changed soon"],
    correct_answer: 2,
    explanation: "The speakers refer to the policy as 'new' and discuss adjusting to it."
  },
  {
    id: 30,
    category: 'listening',
    question_text: "What will the students probably do next?",
    options: ["Go to the library", "Attend another class", "Have lunch together", "Meet with the professor"],
    correct_answer: 0,
    explanation: "The conversation ends with plans to go to the library to work on the project."
  },
];

export const allQuestions = [...structureQuestions, ...readingQuestions, ...listeningQuestions];

export const testConfigs = {
  full: {
    name: "Full TOEFL Simulation",
    description: "Complete test with all sections",
    duration: 55,
    questions: allQuestions,
  },
  structure: {
    name: "Structure & Written Expression",
    description: "Grammar and sentence structure",
    duration: 25,
    questions: structureQuestions,
  },
  reading: {
    name: "Reading Comprehension",
    description: "Reading passages and analysis",
    duration: 35,
    questions: readingQuestions,
  },
  listening: {
    name: "Listening Comprehension",
    description: "Audio-based questions",
    duration: 30,
    questions: listeningQuestions,
  },
};
