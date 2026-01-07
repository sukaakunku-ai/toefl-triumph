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
  BookText,
  Bold,
  Underline,
  Eye,
  Upload,
  VolumeX,
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
  DialogDescription,
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
  deleteQuestionAudio,
  uploadQuestionAudio,
  convertDriveLink,
} from "@/services/questionService";
import {
  getAllArticles,
  saveArticle,
  deleteArticle,
  Article
} from "@/services/articleService";
import { QuestionPackage } from "@/data/packages";
import { Question } from "@/data/questions";
import { toast } from "sonner";

type Category = "structure" | "reading" | "listening" | "full";

const categories: { value: Category; label: string }[] = [
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
    passage: "",
    audio_url: "",
    question_audio_url: "",
    category: "structure" as Category,
    options: ["", "", "", ""],
    correct_answer: 0,
    explanation: "",
  });
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [questionCategoryFilter, setQuestionCategoryFilter] = useState<Category | "all">("all");
  const [showAssignPackageDialog, setShowAssignPackageDialog] = useState(false);
  const [selectedPackageForAssign, setSelectedPackageForAssign] = useState<string>("");

  // Package selection for bulk delete
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());

  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState<Article>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    category: "Tips & Strategi",
    date: new Date().toISOString().split('T')[0],
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read"
  });
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set());
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "package" | "question" | "article" | "audio";
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
    loadArticles();
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

  const loadArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      toast.error("Failed to load articles");
    } finally {
      setIsLoadingArticles(false);
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

  // Format text helper
  const insertFormatTag = (tag: 'b' | 'u') => {
    const textarea = document.getElementById('question-text-input') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = questionForm.question_text;

    if (start === end) return;

    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}<${tag}>${selectedText}</${tag}>${after}`;

    setQuestionForm(prev => ({ ...prev, question_text: newText }));
  };

  // Question handlers
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setQuestionForm({
      question_text: "",
      passage: "",
      audio_url: "",
      question_audio_url: "",
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
      passage: question.passage || "",
      audio_url: question.audio_url || "",
      question_audio_url: question.question_audio_url || "",
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

      if (questionForm.category === 'reading' && questionForm.passage) {
        questionData.passage = questionForm.passage;
      }

      if (questionForm.category === 'listening' && questionForm.audio_url) {
        questionData.audio_url = questionForm.audio_url;
      }

      if (questionForm.category === 'listening' && questionForm.question_audio_url) {
        questionData.question_audio_url = questionForm.question_audio_url;
      }

      await saveQuestion(questionData);
      toast.success(t("common.success"));
      setShowQuestionDialog(false);
      loadQuestions();
    } catch (error) {
      console.error("Save question error details:", error);
      toast.error(error instanceof Error ? error.message : t("common.error"));
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
      } else if (itemToDelete.type === "question") {
        await deleteQuestion(itemToDelete.id as number);
        loadQuestions();
      } else if (itemToDelete.type === "article") {
        await deleteArticle(itemToDelete.id as string);
        loadArticles();
      } else if (itemToDelete.type === "audio") {
        const question = questions.find(q => q.id === itemToDelete.id);
        if (question && question.audio_url) {
          await deleteQuestionAudio(question.audio_url);
          await saveQuestion({ ...question, audio_url: "" });
          loadQuestions();
          toast.success("Audio berhasil dihapus");
        }
      }
      toast.success(t("common.success"));
    } catch (error) {
      toast.error(t("common.error"));
    } finally {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  // Bulk delete questions
  const handleBulkDeleteQuestions = async () => {
    if (selectedQuestions.size === 0) return;

    try {
      for (const id of Array.from(selectedQuestions)) {
        await deleteQuestion(id);
      }
      toast.success(`${selectedQuestions.size} soal berhasil dihapus`);
      setSelectedQuestions(new Set());
      loadQuestions();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Bulk delete packages
  const handleBulkDeletePackages = async () => {
    if (selectedPackages.size === 0) return;

    try {
      for (const id of Array.from(selectedPackages)) {
        await deletePackage(id);
      }
      toast.success(`${selectedPackages.size} paket berhasil dihapus`);
      setSelectedPackages(new Set());
      loadPackages();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Toggle question selection
  const toggleQuestionSelection = (id: number) => {
    setSelectedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle package selection
  const togglePackageSelection = (id: string) => {
    setSelectedPackages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Select all questions
  const toggleSelectAll = () => {
    if (selectedQuestions.size === filteredQuestions.length && filteredQuestions.length > 0) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(filteredQuestions.map(q => q.id)));
    }
  };

  // Select all packages
  const toggleSelectAllPackages = () => {
    if (selectedPackages.size === packages.length && packages.length > 0) {
      setSelectedPackages(new Set());
    } else {
      setSelectedPackages(new Set(packages.map(p => p.id)));
    }
  };

  // Assign questions to package
  const handleAssignToPackage = async () => {
    if (!selectedPackageForAssign || selectedQuestions.size === 0) {
      toast.error("Pilih paket dan soal terlebih dahulu");
      return;
    }

    try {
      const pkg = packages.find(p => p.id === selectedPackageForAssign);
      if (!pkg) return;

      const updatedQuestionIds = Array.from(new Set([...pkg.questionIds, ...Array.from(selectedQuestions)]));

      await savePackage({
        ...pkg,
        questionIds: updatedQuestionIds,
      });

      toast.success(`${selectedQuestions.size} soal ditambahkan ke ${pkg.name}`);
      setShowAssignPackageDialog(false);
      setSelectedQuestions(new Set());
      setSelectedPackageForAssign("");
      loadPackages();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Article handlers
  const handleAddArticle = () => {
    setEditingArticle(null);
    setArticleForm({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      author: "Admin",
      category: "Tips & Strategi",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
      readTime: "5 min read"
    });
    setShowArticleDialog(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleForm(article);
    setShowArticleDialog(true);
  };

  const handleSaveArticle = async () => {
    try {
      if (!articleForm.title || !articleForm.content) {
        toast.error("Title and content are required");
        return;
      }

      await saveArticle(articleForm);
      toast.success(editingArticle ? "Article updated" : "Article created");
      setShowArticleDialog(false);
      loadArticles();
    } catch (error) {
      toast.error("Failed to save article");
    }
  };

  const handleBulkDeleteArticles = async () => {
    if (selectedArticles.size === 0) return;

    try {
      for (const id of Array.from(selectedArticles)) {
        await deleteArticle(id);
      }
      toast.success(`${selectedArticles.size} articles deleted`);
      setSelectedArticles(new Set());
      loadArticles();
    } catch (error) {
      toast.error(t("common.error"));
    }
  };

  // Toggle article selection
  const toggleArticleSelection = (id: string) => {
    setSelectedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Select all articles
  const toggleSelectAllArticles = () => {
    if (selectedArticles.size === articles.length && articles.length > 0) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(articles.map(a => a.id)));
    }
  };

  const filteredQuestions = questions
    .filter(q => questionCategoryFilter === "all" || q.category === questionCategoryFilter)
    .sort((a, b) => b.id - a.id);

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

  // Toggle all questions in package dialog
  const toggleAllQuestionsInPackage = () => {
    const allVisibleIds = filteredQuestionsForPackage.map(q => q.id);
    const areAllSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => packageForm.questionIds.includes(id));

    if (areAllSelected) {
      setPackageForm(prev => ({
        ...prev,
        questionIds: prev.questionIds.filter(id => !allVisibleIds.includes(id))
      }));
    } else {
      setPackageForm(prev => ({
        ...prev,
        questionIds: Array.from(new Set([...prev.questionIds, ...allVisibleIds]))
      }));
    }
  };


  const filteredQuestionsForPackage = questions.filter((q) => {
    const isCorrectCategory = packageForm.category === "full" || q.category === packageForm.category;

    // Check if the question is already in another package (not the one being edited)
    const isAlreadyInOtherPackage = packages.some(
      (pkg) => pkg.id !== editingPackage?.id && pkg.questionIds.includes(q.id)
    );

    return isCorrectCategory && !isAlreadyInOtherPackage;
  }).sort((a, b) => b.id - a.id);

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
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("adminAuth");
                window.location.href = "/admin/login";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-xl grid-cols-3 mx-auto mb-8">
            <TabsTrigger value="packages" className="gap-2">
              <Package className="w-4 h-4" />
              {t("admin.packages")}
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <FileQuestion className="w-4 h-4" />
              {t("admin.questions")}
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2">
              <BookText className="w-4 h-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>{t("admin.packages")}</CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedPackages.size > 0 && (
                      <Button
                        variant="destructive"
                        onClick={handleBulkDeletePackages}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus ({selectedPackages.size})
                      </Button>
                    )}
                    <Button onClick={handleAddPackage} className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t("admin.addPackage")}
                    </Button>
                  </div>
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
                          <TableHead className="w-10">
                            <Checkbox
                              checked={selectedPackages.size === packages.length && packages.length > 0}
                              onCheckedChange={toggleSelectAllPackages}
                            />
                          </TableHead>
                          <TableHead className="w-12">No.</TableHead>
                          <TableHead>{t("admin.packageName")}</TableHead>
                          <TableHead>{t("admin.category")}</TableHead>
                          <TableHead>{t("admin.questionCount")}</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {packages.map((pkg, index) => (
                          <TableRow key={pkg.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedPackages.has(pkg.id)}
                                onCheckedChange={() => togglePackageSelection(pkg.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{index + 1}</TableCell>
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
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>{t("admin.questions")}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={questionCategoryFilter} onValueChange={(val) => setQuestionCategoryFilter(val as Category | "all")}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        {categories.filter(c => c.value !== "full").map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedQuestions.size > 0 && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setShowAssignPackageDialog(true)}
                          className="gap-2"
                        >
                          <Package className="w-4 h-4" />
                          Tambah ke Paket ({selectedQuestions.size})
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleBulkDeleteQuestions}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus ({selectedQuestions.size})
                        </Button>
                      </>
                    )}
                    <Button onClick={handleAddQuestion} className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t("admin.addQuestion")}
                    </Button>
                  </div>
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
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="w-12">No.</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>{t("admin.category")}</TableHead>
                          <TableHead>Paket</TableHead>
                          <TableHead>{t("admin.questionText")}</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredQuestions.map((q, index) => (
                          <TableRow key={q.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedQuestions.has(q.id)}
                                onCheckedChange={() => toggleQuestionSelection(q.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">{q.id}</TableCell>
                            <TableCell>
                              {categories.find((c) => c.value === q.category)
                                ?.label || q.category}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {packages
                                .filter((p) => p.questionIds.includes(q.id))
                                .map((p) => p.name)
                                .join(", ") || "-"}
                            </TableCell>
                            <TableCell className="max-w-md truncate">
                              <span dangerouslySetInnerHTML={{ __html: q.question_text }} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {q.audio_url && q.audio_url.includes('firebasestorage') && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setItemToDelete({ type: "audio", id: q.id });
                                      setDeleteConfirmOpen(true);
                                    }}
                                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                                    title="Hapus Audio Terupload"
                                  >
                                    <VolumeX className="w-4 h-4" />
                                  </Button>
                                )}
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

          {/* Articles Tab */}
          <TabsContent value="articles">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Artikel Blog</CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedArticles.size > 0 && (
                      <Button
                        variant="destructive"
                        onClick={handleBulkDeleteArticles}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus ({selectedArticles.size})
                      </Button>
                    )}
                    <Button onClick={handleAddArticle} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Artikel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingArticles ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : articles.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">
                      Belum ada artikel
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10">
                            <Checkbox
                              checked={selectedArticles.size === articles.length && articles.length > 0}
                              onCheckedChange={toggleSelectAllArticles}
                            />
                          </TableHead>
                          <TableHead className="w-12">No.</TableHead>
                          <TableHead>Judul</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {articles.map((article, index) => (
                          <TableRow key={article.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedArticles.has(article.id)}
                                onCheckedChange={() => toggleArticleSelection(article.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="font-medium max-w-xs truncate">
                              {article.title}
                            </TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell>{article.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditArticle(article)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setItemToDelete({ type: "article", id: article.id });
                                    setDeleteConfirmOpen(true);
                                  }}
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
            <DialogDescription>
              Silahkan isi detail paket soal di bawah ini.
            </DialogDescription>
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
                  <div className="divide-y relative">
                    {filteredQuestionsForPackage.length > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-muted/40 sticky top-0 z-10 border-b">
                        <Checkbox
                          checked={filteredQuestionsForPackage.length > 0 && filteredQuestionsForPackage.every(q => packageForm.questionIds.includes(q.id))}
                          onCheckedChange={toggleAllQuestionsInPackage}
                        />
                        <span className="text-sm font-semibold">Pilih Semua</span>
                      </div>
                    )}
                    {filteredQuestionsForPackage.map((q, index) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={packageForm.questionIds.includes(q.id)}
                          onCheckedChange={() => toggleQuestionInPackage(q.id)}
                        />
                        <span
                          className="text-sm truncate flex-1"
                          dangerouslySetInnerHTML={{ __html: `${index + 1}. ${q.question_text}` }}
                        />
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
          <Tabs defaultValue="edit" className="w-full">
            <DialogHeader>
              <div className="flex items-center justify-between pr-8">
                <div className="space-y-1">
                  <DialogTitle>
                    {editingQuestion ? t("admin.editQuestion") : t("admin.addQuestion")}
                  </DialogTitle>
                  <DialogDescription>
                    Kelola detail pertanyaan dan pilihan jawaban.
                  </DialogDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="edit" className="gap-2">
                    <Pencil className="w-4 h-4" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>
            </DialogHeader>

            <TabsContent value="edit" className="space-y-4 py-4 mt-0">
              <div className="space-y-4">
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

                {questionForm.category === 'reading' && (
                  <div className="space-y-2">
                    <Label>Teks Artikel/Passage</Label>
                    <Textarea
                      value={questionForm.passage}
                      onChange={(e) =>
                        setQuestionForm((prev) => ({
                          ...prev,
                          passage: e.target.value,
                        }))
                      }
                      placeholder="Masukkan teks artikel di sini..."
                      rows={6}
                    />
                  </div>
                )}

                {questionForm.category === 'listening' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Audio URL (.mp3)</Label>
                        <Input
                          value={questionForm.audio_url === "ERROR_FOLDER_LINK" ? "" : questionForm.audio_url}
                          onChange={(e) => {
                            const val = e.target.value;
                            const converted = convertDriveLink(val);

                            if (converted === "ERROR_FOLDER_LINK") {
                              toast.error("Itu link FOLDER. Harap masukkan link khusus FILE .mp3 di dalam folder tersebut.");
                              return;
                            }

                            setQuestionForm((prev) => ({
                              ...prev,
                              audio_url: converted,
                            }));
                          }}
                          placeholder="Ketik Link File MP3 (Direct atau Link Google Drive)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Upload File Audio</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="audio/mp3,audio/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              setIsUploadingAudio(true);
                              try {
                                const questionId = editingQuestion?.id || Date.now();
                                const url = await uploadQuestionAudio(questionId, file, (p) => setUploadProgress(p));
                                setQuestionForm(prev => ({ ...prev, audio_url: url }));
                                toast.success("Audio berhasil diunggah");
                              } catch (error) {
                                console.error("Upload error details:", error);
                                toast.error(error instanceof Error ? error.message : "Gagal mengunggah audio");
                              } finally {
                                setIsUploadingAudio(false);
                              }
                            }}
                            className="hidden"
                            id="audio-upload"
                            disabled={isUploadingAudio}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => document.getElementById('audio-upload')?.click()}
                            disabled={isUploadingAudio}
                          >
                            {isUploadingAudio ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            {isUploadingAudio ? `Mengunggah (${uploadProgress}%)` : "Upload MP3"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {questionForm.audio_url && (
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <Label className="text-xs font-semibold flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-pulse" />
                            {t("listening.preview")}
                          </div>
                          <div className="flex gap-2">
                            {questionForm.audio_url.includes('firebasestorage') && (
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Uploaded</span>
                            )}
                            {questionForm.audio_url.includes('drive.google.com') || questionForm.audio_url.includes('docs.google.com') ? (
                              <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">G-Drive Link</span>
                            ) : null}
                          </div>
                        </Label>
                        <audio
                          key={questionForm.audio_url}
                          src={questionForm.audio_url}
                          controls
                          crossOrigin="anonymous"
                          preload="auto"
                          className="w-full h-10"
                          onError={(e) => {
                            console.error("Audio Load Error:", e);
                            if (questionForm.audio_url) {
                              toast.error("Audio gagal dimuat. Pastikan link benar dan akses bersifat Publik.");
                            }
                          }}
                        />
                        {questionForm.audio_url.includes('firebasestorage') && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="w-full gap-2"
                            onClick={async () => {
                              try {
                                await deleteQuestionAudio(questionForm.audio_url);
                                setQuestionForm(prev => ({ ...prev, audio_url: "" }));
                                toast.success("Audio berhasil dihapus");
                              } catch (error) {
                                toast.error(error instanceof Error ? error.message : "Gagal menghapus audio");
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus Audio
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t("admin.questionText")}</Label>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => insertFormatTag('b')}
                        title="Bold"
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => insertFormatTag('u')}
                        title="Underline"
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="question-text-input"
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

                {questionForm.category === 'listening' && (
                  <div className="space-y-2 border-t pt-4 mt-4">
                    <Label className="text-sm font-semibold text-muted-foreground">Audio untuk Teks Soal (Opsional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">URL Audio Soal</Label>
                        <Input
                          value={questionForm.question_audio_url === "ERROR_FOLDER_LINK" ? "" : questionForm.question_audio_url}
                          onChange={(e) => {
                            const val = e.target.value;
                            const converted = convertDriveLink(val);

                            if (converted === "ERROR_FOLDER_LINK") {
                              toast.error("Itu link FOLDER. Harap masukkan link khusus FILE .mp3 di dalam folder tersebut.");
                              return;
                            }

                            setQuestionForm((prev) => ({
                              ...prev,
                              question_audio_url: converted,
                            }));
                          }}
                          placeholder="Link MP3 atau Google Drive"
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Upload File Audio Soal</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="audio/mp3,audio/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              setIsUploadingAudio(true);
                              try {
                                const questionId = editingQuestion?.id || Date.now();
                                const url = await uploadQuestionAudio(questionId, file, (p) => setUploadProgress(p), 'question');
                                setQuestionForm(prev => ({ ...prev, question_audio_url: url }));
                                toast.success("Audio soal berhasil diunggah");
                              } catch (error) {
                                console.error("Upload error details:", error);
                                toast.error(error instanceof Error ? error.message : "Gagal mengunggah");
                              } finally {
                                setIsUploadingAudio(false);
                              }
                            }}
                            className="hidden"
                            id="question-audio-upload"
                            disabled={isUploadingAudio}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2 text-xs"
                            size="sm"
                            onClick={() => document.getElementById('question-audio-upload')?.click()}
                            disabled={isUploadingAudio}
                          >
                            {isUploadingAudio ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Upload className="w-3 h-3" />
                            )}
                            {isUploadingAudio ? `Uploading (${uploadProgress}%)` : "Upload Audio"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {questionForm.question_audio_url && (
                      <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <Label className="text-xs font-semibold flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-pulse" />
                            Preview Audio Soal
                          </div>
                          <div className="flex gap-2">
                            {questionForm.question_audio_url.includes('firebasestorage') && (
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Uploaded</span>
                            )}
                            {questionForm.question_audio_url.includes('drive.google.com') || questionForm.question_audio_url.includes('docs.google.com') ? (
                              <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">G-Drive</span>
                            ) : null}
                          </div>
                        </Label>
                        <audio
                          key={questionForm.question_audio_url}
                          src={questionForm.question_audio_url}
                          controls
                          crossOrigin="anonymous"
                          preload="auto"
                          className="w-full h-8"
                          onError={(e) => {
                            console.error("Audio Load Error:", e);
                            if (questionForm.question_audio_url) {
                              toast.error("Audio gagal dimuat.");
                            }
                          }}
                        />
                        {questionForm.question_audio_url.includes('firebasestorage') && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="w-full gap-2 text-xs h-7"
                            onClick={async () => {
                              try {
                                await deleteQuestionAudio(questionForm.question_audio_url);
                                setQuestionForm(prev => ({ ...prev, question_audio_url: "" }));
                                toast.success("Audio soal berhasil dihapus");
                              } catch (error) {
                                toast.error("Gagal menghapus audio");
                              }
                            }}
                          >
                            <VolumeX className="w-3 h-3" />
                            Hapus Audio Soal
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}

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
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="py-8">
                <Card className="border-2 border-primary/20 bg-card shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <span className="text-sm text-primary font-bold uppercase tracking-wider">
                        {categories.find(c => c.value === questionForm.category)?.label || questionForm.category} Preview
                      </span>
                    </div>

                    {questionForm.category === 'listening' && questionForm.audio_url && (
                      <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <p className="text-sm font-bold text-primary uppercase tracking-wider">{t("listening.audio")}</p>
                        </div>
                        <audio
                          src={questionForm.audio_url}
                          controls
                          className="w-full h-10"
                        />
                      </div>
                    )}

                    {questionForm.passage && (
                      <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
                        <p className="text-sm font-semibold mb-2">Reading Passage:</p>
                        <div
                          className="text-sm text-foreground whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: questionForm.passage }}
                        />
                      </div>
                    )}

                    {questionForm.category === 'listening' && questionForm.question_audio_url && (
                      <div className="mb-6 p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                          <p className="text-sm font-bold text-orange-500 uppercase tracking-wider">Audio Soal</p>
                        </div>
                        <audio
                          src={questionForm.question_audio_url}
                          controls
                          className="w-full h-10"
                        />
                      </div>
                    )}

                    <div className="mb-2">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pertanyaan:</span>
                    </div>
                    <p
                      className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-8"
                      dangerouslySetInnerHTML={{ __html: questionForm.question_text || "<i>Teks soal akan muncul di sini...</i>" }}
                    />

                    <div className="space-y-3">
                      {questionForm.options.map((option, index) => (
                        <div
                          key={index}
                          className="w-full p-4 rounded-xl border-2 border-border bg-card flex items-center gap-4"
                        >
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-semibold text-sm text-muted-foreground">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span
                            className="flex-1 text-foreground"
                            dangerouslySetInnerHTML={{ __html: option || `Pilihan ${String.fromCharCode(65 + index)}` }}
                          />
                          {questionForm.correct_answer === index && (
                            <span className="text-[10px] font-bold bg-green-500/10 text-green-600 px-2 py-1 rounded dark:bg-green-500/20 dark:text-green-400">
                              KUNCI JAWABAN
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {questionForm.explanation && (
                      <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-sm font-semibold text-primary mb-1">Penjelasan:</p>
                        <p
                          className="text-sm text-muted-foreground italic"
                          dangerouslySetInnerHTML={{ __html: questionForm.explanation }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="mt-4 p-4 rounded-lg bg-muted/30 text-xs text-center text-muted-foreground italic">
                  Tampilan di atas adalah ilustrasi bagaimana soal akan muncul di layar peserta kuis.
                </div>
              </div>
            </TabsContent>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>
                {t("quiz.cancel")}
              </Button>
              <Button onClick={handleSaveQuestion} className="gap-2">
                <Save className="w-4 h-4" />
                {t("admin.save")}
              </Button>
            </DialogFooter>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToDelete?.type === 'audio' ? "Hapus Audio?" : t("admin.deleteConfirm")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.type === 'audio'
                ? "Tindakan ini akan menghapus file mp3 yang sudah diupload dari server secara permanen."
                : t("admin.deleteConfirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("quiz.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {itemToDelete?.type === 'audio' ? "Hapus" : t("admin.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Assign Package Dialog */}
      <Dialog open={showAssignPackageDialog} onOpenChange={setShowAssignPackageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambahkan ke Paket</DialogTitle>
            <DialogDescription>
              Pilih paket tujuan untuk memasukkan soal yang dipilih.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pilih Paket</Label>
              <Select
                value={selectedPackageForAssign}
                onValueChange={setSelectedPackageForAssign}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih paket..." />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.questionIds.length} soal)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedQuestions.size} soal akan ditambahkan ke paket yang dipilih.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignPackageDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleAssignToPackage} disabled={!selectedPackageForAssign}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Article Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "Edit Artikel" : "Tambah Artikel"}
            </DialogTitle>
            <DialogDescription>
              Tulis konten artikel blog di sini.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Judul Artikel</Label>
              <Input
                value={articleForm.title}
                onChange={(e) =>
                  setArticleForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Judul artikel..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Input
                  value={articleForm.category}
                  onChange={(e) => setArticleForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g. Tips & Strategi"
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={articleForm.author}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="Nama penulis"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>URL Gambar Cover</Label>
              <Input
                value={articleForm.imageUrl}
                onChange={(e) =>
                  setArticleForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Excerpt (Ringkasan)</Label>
              <Textarea
                value={articleForm.excerpt}
                onChange={(e) =>
                  setArticleForm((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Ringkasan singkat artikel..."
              />
            </div>

            <div className="space-y-2">
              <Label>Konten Artikel (Markdown/HTML)</Label>
              <Textarea
                className="min-h-[300px] font-mono"
                value={articleForm.content}
                onChange={(e) =>
                  setArticleForm((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Tulis konten artikel di sini..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowArticleDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveArticle}>
              <Save className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
