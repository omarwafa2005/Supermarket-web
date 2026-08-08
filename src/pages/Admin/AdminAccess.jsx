import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { normalizeEmail, normalizeAdminEmails } from "../../utils/admin";

const AdminAccess = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user, adminEmails, updateAdminEmails } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const sortedEmails = useMemo(
    () => [...normalizeAdminEmails(adminEmails)].sort((a, b) => a.localeCompare(b)),
    [adminEmails]
  );

  const handleAddAdmin = async (event) => {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || sortedEmails.includes(normalizedEmail)) {
      setEmail("");
      return;
    }

    setSaving(true);

    try {
      await updateAdminEmails([...sortedEmails, normalizedEmail]);
      setEmail("");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAdmin = async (targetEmail) => {
    if (sortedEmails.length <= 1) {
      return;
    }

    setSaving(true);

    try {
      await updateAdminEmails(
        sortedEmails.filter((adminEmail) => adminEmail !== targetEmail)
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={darkMode ? "text-white" : "text-black"}>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
            Access control
          </p>

          <h1 className="mt-4 text-4xl font-bold">Admins</h1>

          <p className={`mt-3 max-w-2xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Manage who can open the admin dashboard. Changes are saved locally and synced to Firestore when available.
          </p>
        </div>

        <div className={`rounded-2xl border px-4 py-3 text-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <p className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Signed in as
          </p>
          <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {user?.email || "No active user"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">Add admin</h2>

          <form onSubmit={handleAddAdmin} className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-green-500 ${darkMode ? "border-gray-700 bg-gray-950 text-white" : "border-gray-300 bg-white text-black"}`}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add admin"}
            </button>
          </form>
        </div>

        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Allowed admins</h2>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600">
              {sortedEmails.length}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {sortedEmails.map((adminEmail) => (
              <div
                key={adminEmail}
                className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 md:flex-row md:items-center md:justify-between ${darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50"}`}
              >
                <div>
                  <p className="font-semibold">{adminEmail}</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Can open the dashboard and manage store data.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveAdmin(adminEmail)}
                  disabled={saving || sortedEmails.length <= 1}
                  className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAccess;