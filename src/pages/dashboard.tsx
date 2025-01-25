import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "@/lib/types";
import { signout } from "@/services/signincalls";
import useGetData from "@/hooks/useGetData";
import axios from "axios";
import { config } from "@/lib/utils";
import logo from "@/img/icon.svg";
import deleteicon from "@/img/delete.svg";
type Note = {
  id: string;
  userId: string;
  detail: string;
};

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const { loading, error, data } = useGetData<Note[]>("/notes");

  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  const handleCreateNote = async () => {
    if (!newNote.trim()) {
      toast.error("Note cannot be empty");
      return;
    }
    const { data } = await axios.post(
      "/create-note",
      {
        detail: newNote,
        userId: user.id,
      },
      config()
    );
    const note = data.note;

    setNotes((prev) => [note, ...prev]);

    toast.success("Note created successfully");
  };

  const handleDeleteNote = (id: string) => {
    // setNotes((prev) => prev.filter((note) => note.id !== id));
    // toast.success("Note deleted successfully");
    axios
      .delete(`/delete-note/${id}`, config())
      .then(() => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        toast.success("Note deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete note");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-primary dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-800/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <img src={logo} alt="logo" className="h-8 w-8" />
            <h1 className="text-md font-medium">Dashboard</h1>
          </div>
          <Button
            variant="ghost"
            className="text-accent hover:bg-accent/20 dark:hover:bg-secondary/20 underline"
            onClick={() => {
              toast.success("Signed out successfully");
              signout();
              navigate("/signin");
            }}
          >
            {/* <LogOut className="mr-2 h-4 w-4" /> */}
            Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto space-y-6 max-w-4xl p-4">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg bg-white md:p-6 p-4 shadow-custom dark:shadow-custom-dark dark:bg-gray-800"
        >
          <h2 className="mb-2 text-lg font-bold">Welcome, {user.name}!</h2>
          <p className="mb-4 text-sm dark:text-gray-400">Email: {user.email}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
              value={newNote}
              label="Write a new note..."
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1"
            />
          </div>
        </motion.div>
        <Button
          onClick={handleCreateNote}
          className="whitespace-nowrap w-full space-y-4 text-sm font-semibold h-12 px-8"
        >
          Create Note
        </Button>

        {/* Notes Section */}
        <section>
          <h3 className="mb-2 text-md font-medium">Notes</h3>
          <div className="space-y-4 mb-6">
            <AnimatePresence>
              {notes.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="rounded-lg bg-white md:p-4 md:pl-6 shadow-custom dark:shadow-custom-dark dark:bg-gray-800 pl-4 py-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center">
                      <p className="text-sm dark:text-gray-200">
                        {note.detail}
                      </p>
                      {/* <p className="mt-2 text-sm text-gray-500">
                        {note.createdAt.toLocaleString()}
                      </p> */}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteNote(note.id)}
                      className="hover:bg-red-100 flex justify-end dark:hover:bg-red-900/20 dark:text-secondary !h-12"
                    >
                      <img src={deleteicon} alt="delete" className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {notes.length === 0 &&
              (loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg bg-white p-8 text-center dark:bg-gray-800"
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    No notes yet. Create your first note above!
                  </p>
                </motion.div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
