import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Package,
  FileQuestion,
  Loader2,
  Moon,
  Sun,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  getAllPackages,
  savePackage,
  deletePackage,
} from "@/services/packageService";
import {
  getAllQuestions,
  saveQuestion,
  deleteQuestion,
} from "@/services/questionService";
import { QuestionPackage } from "@/data/packages";
import { Question } from "@/data/questions";
import { toast } from "sonner";

type Category = "structure" | "reading" | "listening" | "full";

const categories: { value: Category; label: string }[] = [
  { value: "full", label: "Full Simulation" },
  { value: "structure", label: "Structure & Written Expression" },
  { value: "reading", label: "Reading Comprehension" },
  { value: "listening", label: "Listening Comprehension" },
];

export default function Admin() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("packages");

  // Packages state
  const [packages, setPackages] = useState<QuestionPackage[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState<QuestionPackage | null>(null);
  const [packageForm, setPackageForm] = useState({
    name: "",
    category: "structure" as Category,
    duration: 25,
    questionIds: [] as number[],
  });

  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionForm, setQuestionForm] = useState({
    question_text: "",
    category: "structure" as Category,
    options: ["", "", "", ""],
    correct_answer: 0,
    explanation: "",
  });

  // Delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "package" | "question";
    id: string | number;
  } | null>(null);

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
  };

  // Load data
  useEffect(() => {
    loadPackages();
    loadQuestions();
  }, []);

  const loadPackages = async () => {
    setIsLoadingPackages(true);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (error) {
      toast.error(t("common.error"));
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const loadQuestions = async () => {
    setIsLoadingQuestions(true);
    try {
      const data = await getAllQuestions();
      setQuestions(data);
    } catch (error) {
      toast.error(t("common.error"));
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Package handlers
  const handleAddPackage = () => {
    setEditingPackage(null);
    setPackageForm({
      name: "",
      category: "structure",
      duration: 25,
      questionIds: [],
    });
    setShowPackageDialog(true);
  };

  const handleEditPackage = (pkg: QuestionPackage) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name,
      category: pkg.category,
      duration: pkg.duration,
      questionIds: pkg.questionIds,
    });
    setShowPackageDialog(true);
  };

  const handleSavePackage = async () => {
    try {
      const packageData: QuestionPackage = {
        id: editingPackage?.id || `${packageForm.category}_pkg_${Date.now()}`,
        name: packageForm.name,
        category: packageForm.category,
        duration: packageForm.duration,
        questionIds: packageForm.questionIds,
        createdAt: editingPackage?.createdAt || new Date(),
      };

      await savePackage(packageData);
      toast.success(t("common.success"));
      setShowPackageDialog(false);
      loadPackages();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Question handlers
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setQuestionForm({
      question_text: "",
      category: "structure",
      options: ["", "", "", ""],
      correct_answer: 0,
      explanation: "",
    });
    setShowQuestionDialog(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionForm({
      question_text: question.question_text,
      category: question.category,
      options: [...question.options],
      correct_answer: question.correct_answer,
      explanation: question.explanation,
    });
    setShowQuestionDialog(true);
  };

  const handleSaveQuestion = async () => {
    try {
      const questionData: Question = {
        id: editingQuestion?.id || Date.now(),
        category: questionForm.category as "structure" | "reading" | "listening",
        question_text: questionForm.question_text,
        options: questionForm.options,
        correct_answer: questionForm.correct_answer,
        explanation: questionForm.explanation,
      };

      await saveQuestion(questionData);
      toast.success(t("common.success"));
      setShowQuestionDialog(false);
      loadQuestions();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Delete handlers
  const confirmDelete = (type: "package" | "question", id: string | number) => {
    setItemToDelete({ type, id });
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === "package") {
        await deletePackage(itemToDelete.id as string);
        loadPackages();
      } else {
        await deleteQuestion(itemToDelete.id as number);
        loadQuestions();
      }
      toast.success(t("common.success"));
    } catch (error) {
      toast.error(t("common.error"));
    } finally {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  // Toggle question in package
  const toggleQuestionInPackage = (questionId: number) => {
    setPackageForm((prev) => {
      const exists = prev.questionIds.includes(questionId);
      return {
        ...prev,
        questionIds: exists
          ? prev.questionIds.filter((id) => id !== questionId)
          : [...prev.questionIds, questionId],
      };
    });
  };

  const filteredQuestionsForPackage = questions.filter(
    (q) =>
      packageForm.category === "full" || q.category === packageForm.category
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                {t("admin.title")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="packages" className="gap-2">
              <Package className="w-4 h-4" />
              {t("admin.packages")}
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <FileQuestion className="w-4 h-4" />
              {t("admin.questions")}
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t("admin.packages")}</CardTitle>
                  <Button onClick={handleAddPackage} className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t("admin.addPackage")}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingPackages ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : packages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">
                      {t("admin.noPackages")}
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("admin.packageName")}</TableHead>
                          <TableHead>{t("admin.category")}</TableHead>
                          <TableHead>{t("admin.questionCount")}</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {packages.map((pkg) => (
                          <TableRow key={pkg.id}>
                            <TableCell className="font-medium">
                              {pkg.name}
                            </TableCell>
                            <TableCell>
                              {categories.find((c) => c.value === pkg.category)
                                ?.label || pkg.category}
                            </TableCell>
                            <TableCell>
                              {pkg.questionIds.length} {t("dashboard.questions")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditPackage(pkg)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => confirmDelete("package", pkg.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t("admin.questions")}</CardTitle>
                  <Button onClick={handleAddQuestion} className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t("admin.addQuestion")}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingQuestions ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : questions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">
                      {t("admin.noQuestions")}
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>{t("admin.category")}</TableHead>
                          <TableHead>{t("admin.questionText")}</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {questions.map((q) => (
                          <TableRow key={q.id}>
                            <TableCell>{q.id}</TableCell>
                            <TableCell>
                              {categories.find((c) => c.value === q.category)
                                ?.label || q.category}
                            </TableCell>
                            <TableCell className="max-w-md truncate">
                              {q.question_text}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditQuestion(q)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => confirmDelete("question", q.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Package Dialog */}
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? t("admin.editPackage") : t("admin.addPackage")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("admin.packageName")}</Label>
                <Input
                  value={packageForm.name}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Paket 1"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("admin.category")}</Label>
                <Select
                  value={packageForm.category}
                  onValueChange={(val) =>
                    setPackageForm((prev) => ({
                      ...prev,
                      category: val as Category,
                      questionIds: [],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Durasi ({t("dashboard.minutes")})</Label>
              <Input
                type="number"
                value={packageForm.duration}
                onChange={(e) =>
                  setPackageForm((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>
                {t("admin.selectPackage")} ({packageForm.questionIds.length}{" "}
                {t("dashboard.questions")})
              </Label>
              <div className="border rounded-lg max-h-64 overflow-y-auto">
                {filteredQuestionsForPackage.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    {t("admin.noQuestions")}
                  </p>
                ) : (
                  <div className="divide-y">
                    {filteredQuestionsForPackage.map((q) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={packageForm.questionIds.includes(q.id)}
                          onCheckedChange={() => toggleQuestionInPackage(q.id)}
                        />
                        <span className="text-sm truncate flex-1">
                          {q.id}. {q.question_text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPackageDialog(false)}>
              {t("quiz.cancel")}
            </Button>
            <Button onClick={handleSavePackage} className="gap-2">
              <Save className="w-4 h-4" />
              {t("admin.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion ? t("admin.editQuestion") : t("admin.addQuestion")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("admin.category")}</Label>
              <Select
                value={questionForm.category}
                onValueChange={(val) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    category: val as Category,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.value !== "full")
                    .map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("admin.questionText")}</Label>
              <Textarea
                value={questionForm.question_text}
                onChange={(e) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    question_text: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("admin.options")}</Label>
              <div className="space-y-2">
                {questionForm.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 text-center font-medium">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...questionForm.options];
                        newOptions[idx] = e.target.value;
                        setQuestionForm((prev) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                      placeholder={`Pilihan ${String.fromCharCode(65 + idx)}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("admin.correctAnswer")}</Label>
              <Select
                value={questionForm.correct_answer.toString()}
                onValueChange={(val) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    correct_answer: parseInt(val),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionForm.options.map((opt, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {String.fromCharCode(65 + idx)}. {opt || `Pilihan ${idx + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("admin.explanation")}</Label>
              <Textarea
                value={questionForm.explanation}
                onChange={(e) =>
                  setQuestionForm((prev) => ({
                    ...prev,
                    explanation: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>
              {t("quiz.cancel")}
            </Button>
            <Button onClick={handleSaveQuestion} className="gap-2">
              <Save className="w-4 h-4" />
              {t("admin.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.deleteConfirm")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.deleteConfirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("quiz.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("admin.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
