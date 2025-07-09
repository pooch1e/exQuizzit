import Link from 'next/link';

export default function SeedUserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  async function handleSeedSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!username || !email) {
      setErrorMessage("Please fill in both username and email.");
      return;
    }

    const { error } = await supabase.from("users").insert([
      
      {
        id: uuidv4(), // generates a random UUID
        email,
        userName: username,
        createdAt: new Date().toISOString(),
        highScore: 0,
        quizzBuckTotal: 0,
        questionsCorrect: 0,
        avatar: null,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error.message);
      setErrorMessage("❌ Failed to add user to database.");
    } else {
      setSuccessMessage("✅ User added successfully!");
      setUsername("");
      setEmail("");

      setTimeout(() => {
        router.push("/home");
      }, 1000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">exQuizzit</h1>
        <p className="text-gray-600 mb-8">Test your knowledge of countries around the world!</p>
        
        <div className="space-y-4">
          <Link 
            href="/quiz"
            className="block w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
          >
            Start Quiz 🚀
          </Link>
          
          <Link 
            href="/leaderboard"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            View Leaderboard 🏆
          </Link>
        </div>
      </div>
    </div>
  );
}
