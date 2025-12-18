import { useState } from "react";
import { Link } from "react-router-dom";
import type { Question, Answer } from "../types";
import { getStoredQuestions, saveQuestions } from "../hooks/useGameState";

export function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    getStoredQuestions()
  );
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
  };

  const handleCreateQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      answers: [{ text: "", points: 0 }],
    };
    setEditingQuestion(newQuestion);
    setIsCreating(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question, answers: [...question.answers] });
    setIsCreating(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette question?")) {
      const newQuestions = questions.filter((q) => q.id !== id);
      handleSaveQuestions(newQuestions);
    }
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;

    // Validate
    if (!editingQuestion.question.trim()) {
      alert("Veuillez entrer une question");
      return;
    }

    const validAnswers = editingQuestion.answers.filter(
      (a) => a.text.trim() && a.points > 0
    );
    if (validAnswers.length === 0) {
      alert("Veuillez ajouter au moins une réponse avec des points");
      return;
    }

    const questionToSave = {
      ...editingQuestion,
      answers: validAnswers,
    };

    let newQuestions: Question[];
    if (isCreating) {
      newQuestions = [...questions, questionToSave];
    } else {
      newQuestions = questions.map((q) =>
        q.id === questionToSave.id ? questionToSave : q
      );
    }

    handleSaveQuestions(newQuestions);
    setEditingQuestion(null);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setIsCreating(false);
  };

  const handleAddAnswer = () => {
    if (!editingQuestion) return;
    setEditingQuestion({
      ...editingQuestion,
      answers: [...editingQuestion.answers, { text: "", points: 0 }],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    if (!editingQuestion) return;
    const newAnswers = editingQuestion.answers.filter((_, i) => i !== index);
    setEditingQuestion({
      ...editingQuestion,
      answers: newAnswers,
    });
  };

  const handleUpdateAnswer = (
    index: number,
    field: keyof Answer,
    value: string | number
  ) => {
    if (!editingQuestion) return;
    const newAnswers = [...editingQuestion.answers];
    newAnswers[index] = {
      ...newAnswers[index],
      [field]: field === "points" ? Number(value) : value,
    };
    setEditingQuestion({
      ...editingQuestion,
      answers: newAnswers,
    });
  };

  const handleExportQuestions = () => {
    const dataStr = JSON.stringify({ questions }, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "questions.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.questions && Array.isArray(data.questions)) {
          handleSaveQuestions(data.questions);
          alert("Questions importées avec succès!");
        } else {
          alert("Format de fichier invalide");
        }
      } catch {
        alert("Erreur lors de l'importation du fichier");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold text-yellow-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Administration des Questions
          </h1>
          <Link
            to="/host"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            ← Retour au jeu
          </Link>
        </div>

        {/* Import/Export */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleExportQuestions}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            📥 Exporter JSON
          </button>
          <label className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer">
            📤 Importer JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportQuestions}
              className="hidden"
            />
          </label>
          <button
            onClick={handleCreateQuestion}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg ml-auto"
          >
            + Nouvelle Question
          </button>
        </div>

        {/* Question Editor */}
        {editingQuestion && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {isCreating ? "Nouvelle Question" : "Modifier la Question"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">
                Question
              </label>
              <input
                type="text"
                value={editingQuestion.question}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    question: e.target.value,
                  })
                }
                className="w-full bg-gray-700 px-4 py-2 rounded-lg"
                placeholder="Entrez la question..."
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Réponses</label>
                <button
                  onClick={handleAddAnswer}
                  className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  + Ajouter
                </button>
              </div>

              <div className="space-y-2">
                {editingQuestion.answers.map((answer, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="text-gray-500 w-6">{index + 1}.</span>
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) =>
                        handleUpdateAnswer(index, "text", e.target.value)
                      }
                      className="flex-1 bg-gray-700 px-3 py-2 rounded"
                      placeholder="Réponse..."
                    />
                    <input
                      type="number"
                      value={answer.points || ""}
                      onChange={(e) =>
                        handleUpdateAnswer(index, "points", e.target.value)
                      }
                      className="w-20 bg-gray-700 px-3 py-2 rounded text-center"
                      placeholder="Pts"
                      min="0"
                    />
                    <button
                      onClick={() => handleRemoveAnswer(index)}
                      className="text-red-500 hover:text-red-400 px-2"
                      disabled={editingQuestion.answers.length <= 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSaveQuestion}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
              >
                Sauvegarder
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-gray-500 text-sm">#{index + 1}</span>
                  <h3 className="text-lg font-bold">{question.question}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {question.answers.map((answer, i) => (
                      <span
                        key={i}
                        className="bg-blue-900/50 px-2 py-1 rounded text-sm"
                      >
                        {answer.text}{" "}
                        <span className="text-yellow-400">
                          ({answer.points})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl mb-4">Aucune question</p>
              <button
                onClick={handleCreateQuestion}
                className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
              >
                Créer votre première question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
