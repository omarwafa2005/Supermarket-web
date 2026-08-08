import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { isAdminEmail } from "../../utils/admin";
import { getStoredUsers } from "../../utils/users";

const Users = () => {
  const { user, adminEmails } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const users = getStoredUsers();

  return (
    <section className={darkMode ? "text-white" : "text-black"}>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-600">
          Customer base
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Users
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <h2 className="text-2xl font-bold">Current session</h2>

          <div className="mt-4 space-y-3 text-sm">
            <p><span className="font-semibold">Name:</span> {user?.displayName || user?.name || "Guest"}</p>
            <p><span className="font-semibold">Email:</span> {user?.email || "Not signed in"}</p>
            <p><span className="font-semibold">UID:</span> {user?.uid || "N/A"}</p>
          </div>
        </div>

        <div className={`rounded-3xl border p-6 shadow-sm ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Stored profiles</h2>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600">
              {users.length}
            </span>
          </div>

          {users.length === 0 ? (
            <div className={`mt-6 rounded-2xl border border-dashed p-8 text-center ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
              <p className="text-lg font-semibold">No users stored yet</p>
              <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Register or log in to populate this local profile list.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {users.map((profile) => (
                <div key={profile.uid || profile.email} className={`rounded-2xl border p-4 ${darkMode ? "border-gray-800 bg-gray-950/40" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold">{profile.name}</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {profile.email}
                      </p>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isAdminEmail(profile.email, adminEmails) ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"}`}>
                      {isAdminEmail(profile.email, adminEmails) ? "admin" : profile.role || "customer"}
                    </span>
                  </div>

                  <div className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p>Created: {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : "N/A"}</p>
                    <p>Last login: {profile.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString() : "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;