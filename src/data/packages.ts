export interface QuestionPackage {
  id: string;
  name: string;
  category: "structure" | "reading" | "listening" | "full";
  questionIds: number[];
  duration: number; // in minutes
  createdAt: Date;
}

// Default packages for each category
export const defaultPackages: QuestionPackage[] = [
  {
    id: "structure_pkg_1",
    name: "Paket 1",
    category: "structure",
    questionIds: [1, 2, 3, 4, 5],
    duration: 15,
    createdAt: new Date(),
  },
  {
    id: "structure_pkg_2",
    name: "Paket 2",
    category: "structure",
    questionIds: [6, 7, 8, 9, 10],
    duration: 15,
    createdAt: new Date(),
  },
  {
    id: "reading_pkg_1",
    name: "Paket 1",
    category: "reading",
    questionIds: [11, 12, 13, 14, 15],
    duration: 20,
    createdAt: new Date(),
  },
  {
    id: "reading_pkg_2",
    name: "Paket 2",
    category: "reading",
    questionIds: [16, 17, 18, 19, 20],
    duration: 20,
    createdAt: new Date(),
  },
  {
    id: "listening_pkg_1",
    name: "Paket 1",
    category: "listening",
    questionIds: [21, 22, 23, 24, 25],
    duration: 15,
    createdAt: new Date(),
  },
  {
    id: "listening_pkg_2",
    name: "Paket 2",
    category: "listening",
    questionIds: [26, 27, 28, 29, 30],
    duration: 15,
    createdAt: new Date(),
  },
  {
    id: "full_pkg_1",
    name: "Simulasi Lengkap 1",
    category: "full",
    questionIds: [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25],
    duration: 55,
    createdAt: new Date(),
  },
  {
    id: "full_pkg_2",
    name: "Simulasi Lengkap 2",
    category: "full",
    questionIds: [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30],
    duration: 55,
    createdAt: new Date(),
  },
];
